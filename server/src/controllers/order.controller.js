import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { restaurantId, restaurantName, items, totalPrice, deliveryAddress } = req.body;

    if (!userId || !restaurantId || !restaurantName || !items?.length || totalPrice === undefined) {
      const error = new Error("All order fields are required.");
      error.statusCode = 400;
      return next(error);
    }

    const newOrder = await Order.create({
      user: userId,
      restaurantId,
      restaurantName,
      items,
      totalPrice,
      deliveryAddress: deliveryAddress?.trim() || "Home address",
    });

    res.status(201).json({ message: "Order placed successfully", data: newOrder });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};