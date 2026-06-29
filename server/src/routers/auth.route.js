import express from 'express';
import { LoginUser, RegisterUser, LogoutUser } from '../controllers/auth.controller.js';
import { AuthProject } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);

export default router;
