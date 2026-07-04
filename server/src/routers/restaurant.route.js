import express from "express";
import { createRestaurant, getMenu, getRestaurants, setMenu } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurants);
router.post("/", createRestaurant);
router.get("/:id/menu", getMenu);
router.post("/:id/menu", setMenu);

export default router;
