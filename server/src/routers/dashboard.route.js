import express from "express";
import { getDashboardOverview } from "../controllers/dashboard.controller.js";
import { verifyToken }  from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/overview", verifyToken, getDashboardOverview);

export default router;