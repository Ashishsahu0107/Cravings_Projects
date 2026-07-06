import express from 'express';
import multer from 'multer';
import { LoginUser, RegisterUser, LogoutUser } from '../controllers/auth.controller.js';
import { UpdateUserProfile } from '../controllers/user.controller.js';
import { AuthProtect } from '../middleware/auth.middleware.js';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.put("/profile", AuthProtect, upload.single('photo'), UpdateUserProfile);

export default router;
