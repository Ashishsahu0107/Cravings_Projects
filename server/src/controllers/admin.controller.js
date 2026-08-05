import Restaurant from "../models/restaurant.modal.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Menu from "../models/menu.nodal.js";
import Rider from "../models/rider.modal.js";
import Contact from "../models/contact.model.js";

// GET /admin/dashboard
export const getAdminOverview = async (req, res) => {
  try {
    const [
      totalRestaurants,
      activeRestaurants,
      totalUsers,
      totalCustomers,
      totalManagers,
      totalRiders,
      totalOrders,
      totalMenuItems,
    ] = await Promise.all([
      Restaurant.countDocuments(),
      Restaurant.countDocuments({ status: "active" }),
      User.countDocuments(),
      User.countDocuments({ userType: "customer" }),
      User.countDocuments({ userType: "restaurant" }),
      User.countDocuments({ userType: "rider" }),
      Order.countDocuments(),
      Menu.countDocuments(),
    ]);

    // Calculate total platform revenue (sum of all delivered orders)
    const revenueStats = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = revenueStats[0]?.totalRevenue || 0;

    return res.status(200).json({
      success: true,
      data: {
        totalRestaurants,
        activeRestaurants,
        totalUsers,
        totalCustomers,
        totalManagers,
        totalRiders,
        totalOrders,
        totalMenuItems,
        totalRevenue,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /admin/users (filterable, searchable)
export const getUsers = async (req, res, next) => {
  try {
    const { userType, search } = req.query;
    const filter = {};

    if (userType) {
      filter.userType = userType;
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
        { phone: { $regex: new RegExp(search, "i") } },
      ];
    }

    const list = await User.find(filter).select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

// PATCH /admin/users/:userId/status
export const updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isBlocked } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    user.isBlocked = isBlocked !== undefined ? !!isBlocked : !user.isBlocked;
    await user.save();

    res.status(200).json({ success: true, message: `User account is now ${user.isBlocked ? 'Blocked' : 'Active'}`, data: user });
  } catch (error) {
    next(error);
  }
};

// GET /admin/restaurants
export const getAdminRestaurants = async (req, res, next) => {
  try {
    const list = await Restaurant.find().populate("managerId", "fullName email phone").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

// PATCH /admin/restaurants/:restaurantId/status
export const updateRestaurantStatus = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { status } = req.body; // e.g. "active", "inactive", "blocked"

    if (!status) {
      const error = new Error("Status is required");
      error.statusCode = 400;
      return next(error);
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      return next(error);
    }

    restaurant.status = status;
    await restaurant.save();

    res.status(200).json({ success: true, message: `Restaurant status updated to ${status}`, data: restaurant });
  } catch (error) {
    next(error);
  }
};

// GET /admin/riders
export const getAdminRiders = async (req, res, next) => {
  try {
    const list = await Rider.find().populate("riderId", "fullName email phone").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

// PATCH /admin/riders/:riderId/status
export const updateRiderStatus = async (req, res, next) => {
  try {
    const { riderId } = req.params; // Rider model _id
    const { status } = req.body; // e.g. "active", "inactive", "blocked"

    if (!status) {
      const error = new Error("Status is required");
      error.statusCode = 400;
      return next(error);
    }

    const rider = await Rider.findById(riderId);
    if (!rider) {
      const error = new Error("Rider profile not found");
      error.statusCode = 404;
      return next(error);
    }

    rider.status = status;
    await rider.save();

    res.status(200).json({ success: true, message: `Rider profile status updated to ${status}`, data: rider });
  } catch (error) {
    next(error);
  }
};

// GET /admin/orders
export const getAdminOrders = async (req, res, next) => {
  try {
    const list = await Order.find().populate("user", "fullName email").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

// GET /admin/contacts
export const getContacts = async (req, res, next) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

// DELETE /admin/contacts/:contactId
export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      const error = new Error("Contact submission not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ success: true, message: "Feedback cleared successfully" });
  } catch (error) {
    next(error);
  }
};