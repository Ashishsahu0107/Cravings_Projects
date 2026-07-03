import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const AuthProtect = async (req, res, next) => {
    try {
        const token = req.cookies?.CravingToken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            const error = new Error("Authentication token missing");
            error.statusCode = 401;
            return next(error);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        req.user = user;
        next();
    } catch (error) {
        const authError = new Error("Authentication failed");
        authError.statusCode = 401;
        next(authError);
    }
};

