import User from "../models/user.model.js";

export const UpdateUserProfile = async (req, res, next) => {
    try {
        const userId = req.user?._id || req.body.userId;

        if (!userId) {
            const error = new Error("User id is required");
            error.statusCode = 400;
            return next(error);
        }

        const { fullName, phone, photo, email } = req.body;
        const updates = {};

        if (fullName !== undefined) updates.fullName = fullName.trim();
        if (phone !== undefined) updates.phone = phone.trim();
        if (photo !== undefined) updates.photo = photo;
        if (email !== undefined) updates.email = email.trim();

        if (Object.keys(updates).length === 0) {
            const error = new Error("Nothing to update");
            error.statusCode = 400;
            return next(error);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

        if (!updatedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({ message: "Profile updated successfully", data: updatedUser });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
