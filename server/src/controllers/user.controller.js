import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary-config.js";

const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "cravings/profile", width: 500, height: 500 },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            },
        );

        stream.end(fileBuffer);
    });
};

const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return true;

    return new Promise((resolve) => {
        cloudinary.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
            if (error) {
                console.error("Cloudinary delete error:", error.message);
                resolve(false);
                return;
            }
            resolve(result?.result === "ok");
        });
    });
};

const getCloudinaryPublicId = (photo) => {
    if (!photo) return null;

    if (typeof photo === "string") {
        if (!photo.includes("res.cloudinary.com")) return null;

        const match = photo.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
        return match?.[1] || null;
    }

    if (typeof photo === "object") {
        return photo.publicId || null;
    }

    return null;
};

export const UpdateUserProfile = async (req, res, next) => {
    try {
        const userId = req.user?._id || req.body.userId;

        if (!userId) {
            const error = new Error("User id is required");
            error.statusCode = 400;
            return next(error);
        }

        const { fullName, phone, email } = req.body;
        const updates = {};

        if (fullName !== undefined) updates.fullName = fullName.trim();
        if (phone !== undefined) updates.phone = phone.trim();
        if (email !== undefined) updates.email = email.trim();

        if (req.file) {
            const existingUser = await User.findById(userId).select("photo");

            if (!existingUser) {
                const error = new Error("User not found");
                error.statusCode = 404;
                return next(error);
            }

            const uploadedImage = await uploadToCloudinary(req.file.buffer);
            const previousPublicId = getCloudinaryPublicId(existingUser.photo);

            updates.photo = {
                url: uploadedImage.secure_url,
                publicId: uploadedImage.public_id,
            };

            if (previousPublicId && previousPublicId !== uploadedImage.public_id) {
                await deleteFromCloudinary(previousPublicId);
            }
        }

        if (Object.keys(updates).length === 0) {
            const error = new Error("Nothing to update");
            error.statusCode = 400;
            return next(error);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
        }).select("-password");

        if (!updatedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        const updatedUserResponse = updatedUser.toObject();
        updatedUserResponse.photo = updatedUserResponse.photo?.url || updatedUserResponse.photo || null;
        delete updatedUserResponse.password;

        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedUserResponse,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const ChangePassword = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!userId) {
            const error = new Error("Authentication required");
            error.statusCode = 401;
            return next(error);
        }

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            const error = new Error("All password fields are required");
            error.statusCode = 400;
            return next(error);
        }

        if (newPassword !== confirmNewPassword) {
            const error = new Error("New password and confirm password do not match");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findById(userId).select("+password");
        if (!existingUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
        if (!isMatch) {
            const error = new Error("Current password is incorrect");
            error.statusCode = 401;
            return next(error);
        }

        const salt = await bcrypt.genSalt(10);
        existingUser.password = await bcrypt.hash(newPassword, salt);
        await existingUser.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
