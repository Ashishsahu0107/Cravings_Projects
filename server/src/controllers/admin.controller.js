import Restaurant from "../models/restaurant.modal.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Menu from "../models/menu.nodal.js";

export const getAdminOverview = async (req, res) => {
  try {
    const [
      totalRestaurants,
      activeRestaurants,
      totalUsers,
      totalManagers,
      totalOrders,
      totalMenuItems,
    ] = await Promise.all([
      Restaurant.countDocuments(),

      Restaurant.countDocuments({
        status: "active",
      }),

      User.countDocuments(),

      User.countDocuments({
        role: "manager",
      }),

      Order.countDocuments(),

      Menu.countDocuments(),
    ]);

    const revenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalRestaurants,
        activeRestaurants,
        totalUsers,
        totalManagers,
        totalOrders,
        totalMenuItems,
        totalRevenue: revenue[0]?.totalRevenue || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};