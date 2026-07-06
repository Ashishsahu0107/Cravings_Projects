import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "cravings/profile",width:500,height:500 },
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
            const uploadedImage = await uploadToCloudinary(req.file.buffer);
            updates.photo = uploadedImage.secure_url;
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

        res
            .status(200)
            .json({ message: "Profile updated successfully", data: updatedUser });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
