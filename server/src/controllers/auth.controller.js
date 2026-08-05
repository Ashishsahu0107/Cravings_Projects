import User from "../models/user.model.js";
import OTP from "../models/otp.modal.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
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

        const photo = {
            url: `https://placehold.co/600x400?text=${encodeURIComponent(fullName.charAt(0).toUpperCase())}`,
            publicId: "",
        };

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

                const existingUser = await User.findOne({ email }).select("+password +isBlocked");

        if (!existingUser) {
            const error = new Error("Email not registered");
            error.statusCode = 404;
            return next(error);
        }

        if (existingUser.isBlocked) {
            const error = new Error("Your account has been suspended by an administrator.");
            error.statusCode = 403;
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
        res.clearCookie("Oreo", { maxAge: 0 });
        res.clearCookie("kitkat", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const RefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.kitkat;
        if (!refreshToken) {
            const error = new Error("Refresh token missing");
            error.statusCode = 401;
            return next(error);
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("Oreo", newAccessToken, {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({ message: "Token renewed successfully", data: user });
    } catch (error) {
        const err = new Error("Invalid or expired refresh token");
        err.statusCode = 401;
        next(err);
    }
};

export const GetMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};



