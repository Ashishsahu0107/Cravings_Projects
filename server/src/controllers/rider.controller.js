import Rider from "../models/rider.modal.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

// Helper to ensure rider profile exists
const getOrCreateRider = async (userId) => {
  let rider = await Rider.findOne({ riderId: userId });
  if (!rider) {
    rider = await Rider.create({
      riderId: userId,
      vehicleDetails: {
        vehicleType: "motorcycle",
        vehicleNumber: "N/A",
        vehicleModel: "N/A",
        vehicleColor: "N/A",
      },
      documents: {
        drivingLicense: "Pending Upload",
        vehicleRegistrationCertificate: "Pending Upload",
        insuranceCertificate: "Pending Upload",
        aadharCard: "Pending Upload",
        panCard: "Pending Upload",
      },
      currentAddress: {
        address: "N/A",
        city: "N/A",
        state: "N/A",
        pinCode: "N/A",
        country: "N/A",
      },
      financialDetails: {
        bankName: "N/A",
        accountNumber: "N/A",
        ifscCode: "N/A",
      },
      currentLocation: { lat: "23.2599", lon: "77.4126" },
      isAvailable: false,
      status: "inactive",
    });
  }
  return rider;
};

// GET /rider/profile
export const getRiderProfile = async (req, res, next) => {
  try {
    const rider = await getOrCreateRider(req.user._id);
    res.status(200).json({ success: true, data: rider });
  } catch (error) {
    next(error);
  }
};

// PUT /rider/profile
export const updateRiderProfile = async (req, res, next) => {
  try {
    const rider = await getOrCreateRider(req.user._id);
    const { vehicleDetails, documents, currentAddress, financialDetails } = req.body;

    if (vehicleDetails) rider.vehicleDetails = { ...rider.vehicleDetails, ...vehicleDetails };
    if (documents) rider.documents = { ...rider.documents, ...documents };
    if (currentAddress) rider.currentAddress = { ...rider.currentAddress, ...currentAddress };
    if (financialDetails) rider.financialDetails = { ...rider.financialDetails, ...financialDetails };

    // Mark as active once essential details are filled, or leave status updates to Admin.
    // Let's keep it pending admin approval: if it's new, status is inactive.
    await rider.save();

    res.status(200).json({ success: true, message: "Rider profile updated successfully", data: rider });
  } catch (error) {
    next(error);
  }
};

// GET /rider/dashboard
export const getRiderDashboard = async (req, res, next) => {
  try {
    const rider = await getOrCreateRider(req.user._id);
    
    // Calculate analytics
    const historicalJobs = await Order.find({ riderId: req.user._id, status: "Delivered" });
    const jobCounts = historicalJobs.length;
    const earnings = jobCounts * 40; // ₹40 per delivery

    res.status(200).json({
      success: true,
      data: {
        earnings,
        rating: rider.averageRating || 5.0,
        jobCounts,
        status: rider.status,
        isAvailable: rider.isAvailable,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /rider/toggle-availability
export const toggleAvailability = async (req, res, next) => {
  try {
    const rider = await getOrCreateRider(req.user._id);

    if (rider.status !== "active") {
      const error = new Error("Rider account must be approved (active) by admin to go online");
      error.statusCode = 403;
      return next(error);
    }

    rider.isAvailable = !rider.isAvailable;
    await rider.save();

    res.status(200).json({ success: true, message: `Rider status updated to ${rider.isAvailable ? 'Online' : 'Offline'}`, isAvailable: rider.isAvailable });
  } catch (error) {
    next(error);
  }
};

// PATCH /rider/location
export const syncLocation = async (req, res, next) => {
  try {
    const { lat, lon } = req.body;
    if (!lat || !lon) {
      const error = new Error("Latitude and longitude are required");
      error.statusCode = 400;
      return next(error);
    }

    const rider = await getOrCreateRider(req.user._id);
    rider.currentLocation = { lat: String(lat), lon: String(lon) };
    await rider.save();

    res.status(200).json({ success: true, currentLocation: rider.currentLocation });
  } catch (error) {
    next(error);
  }
};

// GET /rider/orders/available
export const getAvailableJobs = async (req, res, next) => {
  try {
    const rider = await getOrCreateRider(req.user._id);

    if (!rider.isAvailable || rider.status !== "active") {
      return res.status(200).json({ success: true, data: [] });
    }

    // Available orders are those ready for pickup: Confirmed or Preparing, and riderId is not set.
    const orders = await Order.find({
      status: { $in: ["Confirmed", "Preparing"] },
      riderId: { $exists: false },
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// GET /rider/orders/active
export const getActiveJob = async (req, res, next) => {
  try {
    const activeOrder = await Order.findOne({
      riderId: req.user._id,
      status: { $in: ["Preparing", "Confirmed", "Out for Delivery"] },
    });

    res.status(200).json({ success: true, data: activeOrder || null });
  } catch (error) {
    next(error);
  }
};

// PATCH /rider/orders/:orderId/accept
export const acceptJob = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const rider = await getOrCreateRider(req.user._id);

    if (!rider.isAvailable || rider.status !== "active") {
      const error = new Error("You must be Online and approved by Admin to accept jobs.");
      error.statusCode = 403;
      return next(error);
    }

    const activeJob = await Order.findOne({
      riderId: req.user._id,
      status: { $in: ["Preparing", "Confirmed", "Out for Delivery"] },
    });

    if (activeJob) {
      const error = new Error("You already have an active job run.");
      error.statusCode = 400;
      return next(error);
    }

    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      return next(error);
    }

    if (order.riderId) {
      const error = new Error("This order has already been taken by another rider.");
      error.statusCode = 400;
      return next(error);
    }

    order.riderId = req.user._id;
    order.status = "Preparing"; // Rider accepted, still preparing or ready.
    await order.save();

    res.status(200).json({ success: true, message: "Delivery job accepted", data: order });
  } catch (error) {
    next(error);
  }
};

// PATCH /rider/orders/:orderId/status
export const updateJobStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // should be 'pickedUp' (moves order to 'Out for Delivery') or 'delivered' (moves order to 'Delivered')

    const order = await Order.findOne({ _id: orderId, riderId: req.user._id });
    if (!order) {
      const error = new Error("Order not found or not assigned to you.");
      error.statusCode = 404;
      return next(error);
    }

    if (status === "pickedUp" || status === "Out for Delivery") {
      order.status = "Out for Delivery";
    } else if (status === "delivered" || status === "Delivered") {
      order.status = "Delivered";
    } else {
      const error = new Error("Invalid status transition requested.");
      error.statusCode = 400;
      return next(error);
    }

    await order.save();
    res.status(200).json({ success: true, message: `Status updated to ${order.status}`, data: order });
  } catch (error) {
    next(error);
  }
};

// GET /rider/deliveries
export const getDeliveriesHistory = async (req, res, next) => {
  try {
    const history = await Order.find({ riderId: req.user._id, status: "Delivered" }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};
