import express from 'express';
import { LoginUser, RegisterUser, LogoutUser, UpdateUserProfile } from '../controllers/auth.controller.js';
import { AuthProtect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.put("/profile", AuthProtect, UpdateUserProfile);

export default router;
