import express from 'express';
import { LoginUser, RegisterUser, LogoutUser } from '../controllers/auth.controller.js';
import { sapleMiddleware, sapleMiddleware1 } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/login", sapleMiddleware1, LoginUser);
router.post("/register", sapleMiddleware, sapleMiddleware1, RegisterUser);
router.get("/logout",sapleMiddleware, LogoutUser);

export default router;
