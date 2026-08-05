import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getAdminOverview,
  getUsers,
  updateUserStatus,
  getAdminRestaurants,
  updateRestaurantStatus,
  getAdminRiders,
  updateRiderStatus,
  getAdminOrders,
  getContacts,
  deleteContact,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/overview", verifyToken, getAdminOverview);
router.get("/users", verifyToken, getUsers);
router.patch("/users/:userId/status", verifyToken, updateUserStatus);

router.get("/restaurants", verifyToken, getAdminRestaurants);
router.patch("/restaurants/:restaurantId/status", verifyToken, updateRestaurantStatus);

router.get("/riders", verifyToken, getAdminRiders);
router.patch("/riders/:riderId/status", verifyToken, updateRiderStatus);

router.get("/orders", verifyToken, getAdminOrders);
router.get("/contacts", verifyToken, getContacts);
router.delete("/contacts/:contactId", verifyToken, deleteContact);

export default router;