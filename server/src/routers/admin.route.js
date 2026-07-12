import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getAdminOverview } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/overview", verifyToken, getAdminOverview);

export default router;