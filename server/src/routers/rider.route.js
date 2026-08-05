import express from "express";
import { AuthProtect } from "../middleware/auth.middleware.js";
import {
  getRiderProfile,
  updateRiderProfile,
  getRiderDashboard,
  toggleAvailability,
  syncLocation,
  getAvailableJobs,
  getActiveJob,
  acceptJob,
  updateJobStatus,
  getDeliveriesHistory,
} from "../controllers/rider.controller.js";

const router = express.Router();

router.get("/profile", AuthProtect, getRiderProfile);
router.put("/profile", AuthProtect, updateRiderProfile);
router.get("/dashboard", AuthProtect, getRiderDashboard);
router.patch("/toggle-availability", AuthProtect, toggleAvailability);
router.patch("/location", AuthProtect, syncLocation);

router.get("/orders/available", AuthProtect, getAvailableJobs);
router.get("/orders/active", AuthProtect, getActiveJob);
router.patch("/orders/:orderId/accept", AuthProtect, acceptJob);
router.patch("/orders/:orderId/status", AuthProtect, updateJobStatus);
router.get("/deliveries", AuthProtect, getDeliveriesHistory);

export default router;
