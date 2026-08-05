import express from "express";
import multer from "multer";
import { AuthProtect } from "../middleware/auth.middleware.js";
import {
  getRestaurants,
  getMenu,
  createRestaurant,
  getRestaurantDashboard,
  toggleStatus,
  getManagerMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItem,
  getRestaurantOrders,
  acceptOrder,
  rejectOrder,
  updateOrderStatus,
} from "../controllers/restaurant.controller.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const uploadProfile = upload.fields([
  { name: "restaurantImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
  { name: "gstCertificate", maxCount: 1 },
  { name: "fssaiCertificate", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
]);

// Public endpoints
router.get("/", getRestaurants);
router.get("/:id/menu", getMenu);

// Authenticated manager endpoints
router.post("/", AuthProtect, uploadProfile, createRestaurant);
router.get("/dashboard", AuthProtect, getRestaurantDashboard);
router.patch("/toggle-status", AuthProtect, toggleStatus);

// Menu management
router.get("/menu", AuthProtect, getManagerMenu);
router.post("/menu/add-item", AuthProtect, upload.single("image"), addMenuItem);
router.put("/menu/update-item/:itemId", AuthProtect, upload.single("image"), updateMenuItem);
router.delete("/menu/delete-item/:itemId", AuthProtect, deleteMenuItem);
router.patch("/menu/toggle/:itemId", AuthProtect, toggleMenuItem);

// Orders pipeline
router.get("/orders", AuthProtect, getRestaurantOrders);
router.patch("/orders/:orderId/accept", AuthProtect, acceptOrder);
router.patch("/orders/:orderId/reject", AuthProtect, rejectOrder);
router.patch("/orders/:orderId/status", AuthProtect, updateOrderStatus);

export default router;
