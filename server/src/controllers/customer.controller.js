import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.modal.js";
import Order from "../models/order.model.js";
import Rider from "../models/rider.modal.js";
import User from "../models/user.model.js";

// Helper to ensure customer profile exists
const getOrCreateCustomer = async (userId) => {
  let customer = await Customer.findOne({ customerId: userId });
  if (!customer) {
    customer = await Customer.create({
      customerId: userId,
      addressBook: [],
      cart: { restaurantId: "", restaurantName: "", items: [] },
      favorites: [],
    });
  }
  return customer;
};

// GET /customer/cart
export const getCart = async (req, res, next) => {
  try {
    const customer = await getOrCreateCustomer(req.user._id);
    res.status(200).json({ success: true, cart: customer.cart });
  } catch (error) {
    next(error);
  }
};

// POST /customer/cart/add
export const addToCart = async (req, res, next) => {
  try {
    const { restaurantId, restaurantName, itemId, name, price, qty = 1, image } = req.body;

    if (!restaurantId || !itemId || !name || price === undefined) {
      const error = new Error("Missing required item fields");
      error.statusCode = 400;
      return next(error);
    }

    const customer = await getOrCreateCustomer(req.user._id);

    // Validate single-restaurant rule
    if (customer.cart.items.length > 0 && customer.cart.restaurantId !== restaurantId) {
      const error = new Error("Cannot add items from a different restaurant. Clear your cart first.");
      error.statusCode = 400;
      return next(error);
    }

    // Set restaurant details if cart is empty
    if (customer.cart.items.length === 0) {
      customer.cart.restaurantId = restaurantId;
      customer.cart.restaurantName = restaurantName || "Restaurant";
    }

    // Check if item already exists
    const existingIndex = customer.cart.items.findIndex((item) => item.itemId === itemId);
    if (existingIndex > -1) {
      customer.cart.items[existingIndex].qty += Number(qty);
    } else {
      customer.cart.items.push({
        itemId,
        name,
        price,
        qty: Number(qty),
        image: image || { url: "", publicId: "" },
      });
    }

    await customer.save();
    res.status(200).json({ success: true, message: "Item added to cart", cart: customer.cart });
  } catch (error) {
    next(error);
  }
};

// PATCH /customer/cart/update
export const updateCart = async (req, res, next) => {
  try {
    const { itemId, qty } = req.body;

    if (!itemId || qty === undefined) {
      const error = new Error("Item ID and quantity are required");
      error.statusCode = 400;
      return next(error);
    }

    const customer = await getOrCreateCustomer(req.user._id);
    const itemIndex = customer.cart.items.findIndex((item) => item.itemId === itemId);

    if (itemIndex === -1) {
      const error = new Error("Item not found in cart");
      error.statusCode = 404;
      return next(error);
    }

    if (Number(qty) <= 0) {
      customer.cart.items.splice(itemIndex, 1);
    } else {
      customer.cart.items[itemIndex].qty = Number(qty);
    }

    if (customer.cart.items.length === 0) {
      customer.cart.restaurantId = "";
      customer.cart.restaurantName = "";
    }

    await customer.save();
    res.status(200).json({ success: true, message: "Cart updated", cart: customer.cart });
  } catch (error) {
    next(error);
  }
};

// DELETE /customer/cart/remove/:itemId
export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const customer = await getOrCreateCustomer(req.user._id);

    customer.cart.items = customer.cart.items.filter((item) => item.itemId !== itemId);

    if (customer.cart.items.length === 0) {
      customer.cart.restaurantId = "";
      customer.cart.restaurantName = "";
    }

    await customer.save();
    res.status(200).json({ success: true, message: "Item removed from cart", cart: customer.cart });
  } catch (error) {
    next(error);
  }
};

// DELETE /customer/cart/clear
export const clearCart = async (req, res, next) => {
  try {
    const customer = await getOrCreateCustomer(req.user._id);

    customer.cart.restaurantId = "";
    customer.cart.restaurantName = "";
    customer.cart.items = [];

    await customer.save();
    res.status(200).json({ success: true, message: "Cart cleared", cart: customer.cart });
  } catch (error) {
    next(error);
  }
};

// GET /customer/addresses
export const getAddresses = async (req, res, next) => {
  try {
    const customer = await getOrCreateCustomer(req.user._id);
    res.status(200).json({ success: true, addressBook: customer.addressBook });
  } catch (error) {
    next(error);
  }
};

// POST /customer/address
export const addAddress = async (req, res, next) => {
  try {
    const { name, address, city, state, pinCode, country, type, isDefault, geoLocation } = req.body;

    if (!name || !address || !city || !state || !pinCode || !country || !type) {
      const error = new Error("All address fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const customer = await getOrCreateCustomer(req.user._id);

    if (isDefault) {
      customer.addressBook.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    customer.addressBook.push({
      name,
      address,
      city,
      state,
      pinCode,
      country,
      type,
      isDefault: !!isDefault,
      geoLocation: geoLocation || { lat: "0", lon: "0" },
    });

    await customer.save();
    res.status(201).json({ success: true, message: "Address added successfully", addressBook: customer.addressBook });
  } catch (error) {
    next(error);
  }
};

// PATCH /customer/address/:addressId/default
export const setDefaultAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const customer = await getOrCreateCustomer(req.user._id);

    let addressFound = false;
    customer.addressBook.forEach((addr) => {
      if (addr._id.toString() === addressId) {
        addr.isDefault = true;
        addressFound = true;
      } else {
        addr.isDefault = false;
      }
    });

    if (!addressFound) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }

    await customer.save();
    res.status(200).json({ success: true, message: "Default address updated", addressBook: customer.addressBook });
  } catch (error) {
    next(error);
  }
};

// DELETE /customer/address/:addressId
export const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const customer = await getOrCreateCustomer(req.user._id);

    customer.addressBook = customer.addressBook.filter((addr) => addr._id.toString() !== addressId);

    await customer.save();
    res.status(200).json({ success: true, message: "Address deleted successfully", addressBook: customer.addressBook });
  } catch (error) {
    next(error);
  }
};

// GET /customer/favorites
export const getFavorites = async (req, res, next) => {
  try {
    const customer = await getOrCreateCustomer(req.user._id);
    await customer.populate("favorites");
    res.status(200).json({ success: true, favorites: customer.favorites });
  } catch (error) {
    next(error);
  }
};

// POST /customer/favorites/:restaurantId
export const addFavorite = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const customer = await getOrCreateCustomer(req.user._id);

    if (!customer.favorites.includes(restaurantId)) {
      customer.favorites.push(restaurantId);
      await customer.save();
    }

    res.status(200).json({ success: true, message: "Restaurant added to favorites", favorites: customer.favorites });
  } catch (error) {
    next(error);
  }
};

// DELETE /customer/favorites/:restaurantId
export const removeFavorite = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const customer = await getOrCreateCustomer(req.user._id);

    customer.favorites = customer.favorites.filter((id) => id.toString() !== restaurantId);
    await customer.save();

    res.status(200).json({ success: true, message: "Restaurant removed from favorites", favorites: customer.favorites });
  } catch (error) {
    next(error);
  }
};

// POST /customer/order/place
export const placeOrder = async (req, res, next) => {
  try {
    const { restaurantId, restaurantName, items, deliveryAddress } = req.body;

    if (!restaurantId || !restaurantName || !items || items.length === 0) {
      const error = new Error("Order items and restaurant details are required");
      error.statusCode = 400;
      return next(error);
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Platform Fee: ₹5, Convenience Fee: ₹2, GST: 5%, Delivery Charges: ₹30
    const platformFee = 5;
    const convenienceFee = 2;
    const gst = Math.round(subtotal * 0.05 * 100) / 100;
    const deliveryCharges = 30;
    const totalPrice = Math.round((subtotal + platformFee + convenienceFee + gst + deliveryCharges) * 100) / 100;

    const newOrder = await Order.create({
      user: req.user._id,
      restaurantId,
      restaurantName,
      items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      totalPrice,
      deliveryAddress: deliveryAddress || "Default Address",
      status: "Pending",
    });

    // Clear cart after order is placed
    const customer = await getOrCreateCustomer(req.user._id);
    customer.cart.restaurantId = "";
    customer.cart.restaurantName = "";
    customer.cart.items = [];
    await customer.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
      billDetails: {
        subtotal,
        platformFee,
        convenienceFee,
        gst,
        deliveryCharges,
        totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /customer/orders
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// GET /customer/orders/:orderId/track
export const trackOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      return next(error);
    }

    let riderDetails = null;
    if (order.riderId) {
      const rider = await Rider.findOne({ riderId: order.riderId }).populate("riderId", "fullName phone photo");
      if (rider) {
        riderDetails = {
          name: rider.riderId?.fullName || "Delivery Partner",
          phone: rider.riderId?.phone || "N/A",
          photo: rider.riderId?.photo?.url || "",
          location: rider.currentLocation || { lat: "23.2599", lon: "77.4126" }, // default coordinates
          vehicleDetails: rider.vehicleDetails || {},
        };
      }
    }

    res.status(200).json({
      success: true,
      status: order.status,
      restaurantName: order.restaurantName,
      rider: riderDetails,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /customer/orders/:orderId/cancel
export const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, user: req.user._id });

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      return next(error);
    }

    if (order.status !== "Pending") {
      const error = new Error(`Cannot cancel order in status: ${order.status}`);
      error.statusCode = 400;
      return next(error);
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled successfully", data: order });
  } catch (error) {
    next(error);
  }
};

// POST /customer/orders/:orderId/review
export const reviewOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { rating, comment } = req.body;

    if (rating === undefined || rating < 1 || rating > 5) {
      const error = new Error("Invalid rating. Must be between 1 and 5.");
      error.statusCode = 400;
      return next(error);
    }

    const order = await Order.findOne({ _id: orderId, user: req.user._id });

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      return next(error);
    }

    order.review = { rating, comment: comment || "" };
    await order.save();

    // Re-calculate restaurant rating
    const allReviews = await Order.find({ restaurantId: order.restaurantId, "review.rating": { $exists: true } });
    if (allReviews.length > 0) {
      const averageRating = allReviews.reduce((sum, o) => sum + o.review.rating, 0) / allReviews.length;
      await Restaurant.findByIdAndUpdate(order.restaurantId, { averageRating: Math.round(averageRating * 10) / 10 });
    }

    res.status(200).json({ success: true, message: "Review submitted successfully", data: order });
  } catch (error) {
    next(error);
  }
};
