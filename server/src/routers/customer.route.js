import express from "express";
import { AuthProtect } from "../middleware/auth.middleware.js";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
  getAddresses,
  addAddress,
  setDefaultAddress,
  deleteAddress,
  getFavorites,
  addFavorite,
  removeFavorite,
  placeOrder,
  getOrders,
  trackOrder,
  cancelOrder,
  reviewOrder,
} from "../controllers/customer.controller.js";

const router = express.Router();

// Cart management
router.get("/cart", AuthProtect, getCart);
router.post("/cart/add", AuthProtect, addToCart);
router.patch("/cart/update", AuthProtect, updateCart);
router.delete("/cart/remove/:itemId", AuthProtect, removeFromCart);
router.delete("/cart/clear", AuthProtect, clearCart);

// Address book
router.get("/addresses", AuthProtect, getAddresses);
router.post("/address", AuthProtect, addAddress);
router.patch("/address/:addressId/default", AuthProtect, setDefaultAddress);
router.delete("/address/:addressId", AuthProtect, deleteAddress);

// Favorites
router.get("/favorites", AuthProtect, getFavorites);
router.post("/favorites/:restaurantId", AuthProtect, addFavorite);
router.delete("/favorites/:restaurantId", AuthProtect, removeFavorite);

// Orders
router.post("/order/place", AuthProtect, placeOrder);
router.get("/orders", AuthProtect, getOrders);
router.get("/orders/:orderId/track", AuthProtect, trackOrder);
router.patch("/orders/:orderId/cancel", AuthProtect, cancelOrder);
router.post("/orders/:orderId/review", AuthProtect, reviewOrder);

export default router;
