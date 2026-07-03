import express from "express";
import { createOrder, getMyOrders } from "../controllers/order.controller.js";
import { AuthProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", AuthProtect, createOrder);
router.get("/my", AuthProtect, getMyOrders);

export default router;
