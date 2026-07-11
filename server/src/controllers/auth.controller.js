import User from "../models/user.model.js";
import OTP from "../models/otp.modal.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { generateToken } from "../utils/auth.service.js";
import sendOtpEmail from "../utils/email.service.js";

export const RegisterUser = async (req, res, next) => {

    try {
        const { fullName, email, password, phone, gender, dob, userType } = req.body;

        if (!fullName || !email || !password || !phone || !gender || !dob || !userType) {
            const error = new Error("All fields Required");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("Email already registred");
            error.statusCode = 409;
            return next(error);
        }

        const photo= `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;


        const SALT = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, SALT);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phone,
            gender,
            dob,
            photo,
            userType
        });

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ message: "User Created Successfully", data: userResponse });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error("All fields Required");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findOne({ email }).select("+password");

        if (!existingUser) {
            const error = new Error("Email not registred");
            error.statusCode = 404;
            return next(error);
        }

        const isVerified = await bcrypt.compare(password, existingUser.password);

        if (!isVerified) {
            const error = new Error("Incorrect Password");
            error.statusCode = 401;
            return next(error);
        }

        await generateToken(existingUser, res);

        const userResponse = existingUser.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: "WelCome Back",
            data: userResponse,
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const ForgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            const error = new Error("Email is required");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const error = new Error("Email not registered");
            error.statusCode = 404;
            return next(error);
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        await OTP.findOneAndUpdate(
            { email },
            { email, otp: hashedOtp, expiresAt: Date.now() + 5 * 60 * 1000 },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        await sendOtpEmail(email, otp);

        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const ResetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword, confirmNewPassword } = req.body;

        if (!email || !otp || !newPassword || !confirmNewPassword) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error);
        }

        if (newPassword !== confirmNewPassword) {
            const error = new Error("New password and confirm password do not match");
            error.statusCode = 400;
            return next(error);
        }

        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            const error = new Error("OTP not requested for this email");
            error.statusCode = 400;
            return next(error);
        }

        if (otpRecord.expiresAt < new Date()) {
            const error = new Error("OTP has expired");
            error.statusCode = 400;
            return next(error);
        }

        const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
        if (!isOtpValid) {
            const error = new Error("Invalid OTP");
            error.statusCode = 400;
            return next(error);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        await OTP.deleteOne({ email });

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const LogoutUser = (req, res, next) => {
    try {
        res.clearCookie("CravingToken", {maxAge : 0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

