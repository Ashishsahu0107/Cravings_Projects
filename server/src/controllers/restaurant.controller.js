import Restaurant from "../models/restaurant.modal.js";
import Menu from "../models/menu.nodal.js";
import Order from "../models/order.model.js";
import cloudinary from "../config/cloudinary-config.js";

// Helper to upload single image to Cloudinary from memory buffer
const uploadImageBuffer = async (fileBuffer, folder = "cravings/restaurants") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, width: 500, height: 500, crop: "fill" },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    stream.end(fileBuffer);
  });
};

// GET /restaurants (Public)
export const getRestaurants = async (req, res, next) => {
  try {
    const city = req.query.city;
    const filter = { status: "active" };
    if (city) {
      filter.city = { $regex: new RegExp(city, "i") };
    }
    const list = await Restaurant.find(filter).populate("managerId", "fullName email");
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// GET /restaurants/:id/menu (Public)
export const getMenu = async (req, res, next) => {
  try {
    const { id } = req.params; // Restaurant ObjectId
    const menu = await Menu.findOne({ restaurantId: id });
    res.status(200).json(menu ? menu.menuItems : []);
  } catch (error) {
    next(error);
  }
};

// Helper to get manager's restaurant
const getManagerRestaurant = async (managerId) => {
  let rest = await Restaurant.findOne({ managerId });
  if (!rest) {
    rest = await Restaurant.create({
      managerId,
      restaurantName: "My Restaurant",
      address: "N/A",
      city: "N/A",
      state: "N/A",
      pinCode: "N/A",
      country: "N/A",
      cuisines: ["Indian"],
      cuisineTypes: ["Indian"],
      restaurantImage: [{ url: "https://placehold.co/600x400?text=Restaurant", publicId: "default" }],
      coverImage: { url: "https://placehold.co/1200x600?text=Cover", publicId: "default" },
      description: "Ready to serve delicious food.",
      restaurantType: "both",
      status: "inactive", // needs admin approval
      isOpen: false,
      documents: {
        legalName: "Pending",
        companyType: "Proprietorship",
        gstCertificate: "Pending Upload",
        fssaiCertificate: "Pending Upload",
        panCard: "Pending Upload",
      },
      financialDetails: {
        bankName: "Pending",
        accountNumber: "Pending",
        ifscCode: "Pending",
      },
      contactDetails: {
        email: "manager@example.com",
        phone: "0000000000",
      },
      servingHours: {
        openingTime: "09:00",
        closingTime: "22:00",
      }
    });
  }
  return rest;
};

// POST /restaurant (Manager profile update/create)
export const createRestaurant = async (req, res, next) => {
  try {
    const managerId = req.user?._id;
    if (!managerId) {
      const error = new Error("Auth required");
      error.statusCode = 401;
      return next(error);
    }

    const {
      restaurantName,
      address,
      city,
      state,
      pinCode,
      country,
      cuisineTypes,
      description,
      restaurantType,
      contactDetails,
      servingHours,
      documents,
      financialDetails,
    } = req.body;

    const rest = await getManagerRestaurant(managerId);

    if (restaurantName) rest.restaurantName = restaurantName;
    if (address) rest.address = address;
    if (city) rest.city = city;
    if (state) rest.state = state;
    if (pinCode) rest.pinCode = pinCode;
    if (country) rest.country = country;
    if (description) rest.description = description;
    if (restaurantType) rest.restaurantType = restaurantType;
    if (cuisineTypes) rest.cuisineTypes = Array.isArray(cuisineTypes) ? cuisineTypes : JSON.parse(cuisineTypes);
    if (contactDetails) rest.contactDetails = { ...rest.contactDetails, ...contactDetails };
    if (servingHours) rest.servingHours = { ...rest.servingHours, ...servingHours };
    if (documents) rest.documents = { ...rest.documents, ...documents };
    if (financialDetails) rest.financialDetails = { ...rest.financialDetails, ...financialDetails };

    // Handle files if uploaded
    if (req.files) {
      if (req.files.restaurantImage) {
        const img = await uploadImageBuffer(req.files.restaurantImage[0].buffer, "cravings/restaurants");
        rest.restaurantImage = [img];
      }
      if (req.files.coverImage) {
        const cover = await uploadImageBuffer(req.files.coverImage[0].buffer, "cravings/restaurants/covers");
        rest.coverImage = cover;
      }
      if (req.files.gstCertificate) {
        const gst = await uploadImageBuffer(req.files.gstCertificate[0].buffer, "cravings/restaurants/docs");
        rest.documents.gstCertificate = gst.url;
      }
      if (req.files.fssaiCertificate) {
        const fssai = await uploadImageBuffer(req.files.fssaiCertificate[0].buffer, "cravings/restaurants/docs");
        rest.documents.fssaiCertificate = fssai.url;
      }
      if (req.files.panCard) {
        const pan = await uploadImageBuffer(req.files.panCard[0].buffer, "cravings/restaurants/docs");
        rest.documents.panCard = pan.url;
      }
    }

    await rest.save();
    res.status(200).json({ success: true, message: "Profile saved successfully", data: rest });
  } catch (error) {
    next(error);
  }
};

// GET /restaurant/dashboard
export const getRestaurantDashboard = async (req, res, next) => {
  try {
    const rest = await getManagerRestaurant(req.user._id);

    // Calculate analytics
    const orders = await Order.find({ restaurantId: rest._id.toString() });
    const totalOrders = orders.length;

    const deliveredOrders = orders.filter((o) => o.status === "Delivered");
    const revenue = deliveredOrders.reduce((sum, o) => sum + o.totalPrice, 0);

    res.status(200).json({
      success: true,
      data: {
        revenue,
        averageRating: rest.averageRating || 0,
        totalOrders,
        isOpen: rest.isOpen,
        status: rest.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /restaurant/toggle-status
export const toggleStatus = async (req, res, next) => {
  try {
    const rest = await getManagerRestaurant(req.user._id);

    if (rest.status !== "active") {
      const error = new Error("Your restaurant profile must be approved (active) by Admin before going open.");
      error.statusCode = 403;
      return next(error);
    }

    rest.isOpen = !rest.isOpen;
    await rest.save();

    res.status(200).json({ success: true, message: `Restaurant is now ${rest.isOpen ? 'Open' : 'Closed'}`, isOpen: rest.isOpen });
  } catch (error) {
    next(error);
  }
};

// GET /restaurant/menu (Manager-only)
export const getManagerMenu = async (req, res, next) => {
  try {
    const rest = await getManagerRestaurant(req.user._id);
    let menu = await Menu.findOne({ restaurantId: rest._id });
    if (!menu) {
      menu = await Menu.create({ restaurantId: rest._id, menuItems: [] });
    }
    res.status(200).json({ success: true, data: menu.menuItems });
  } catch (error) {
    next(error);
  }
};

// POST /restaurant/menu/add-item
export const addMenuItem = async (req, res, next) => {
  try {
    const { itemName, description, price, category, isTopRated, isRecommended } = req.body;

    if (!itemName || !price || !category) {
      const error = new Error("Item name, price, and category are required");
      error.statusCode = 400;
      return next(error);
    }

    const rest = await getManagerRestaurant(req.user._id);
    let menu = await Menu.findOne({ restaurantId: rest._id });
    if (!menu) {
      menu = await Menu.create({ restaurantId: rest._id, menuItems: [] });
    }

    let img = { url: "https://placehold.co/200x200?text=Food", publicId: "default" };
    if (req.file) {
      img = await uploadImageBuffer(req.file.buffer, "cravings/menu");
    }

    const newItem = {
      itemName,
      description: description || "",
      price: Number(price),
      category,
      isAvailable: true,
      isTopRated: isTopRated === "true" || isTopRated === true,
      isRecommended: isRecommended === "true" || isRecommended === true,
      image: img,
    };

    menu.menuItems.push(newItem);
    await menu.save();

    res.status(201).json({ success: true, message: "Menu item added", data: menu.menuItems });
  } catch (error) {
    next(error);
  }
};

// PUT /restaurant/menu/update-item/:itemId
export const updateMenuItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { itemName, description, price, category, isAvailable, isTopRated, isRecommended } = req.body;

    const rest = await getManagerRestaurant(req.user._id);
    const menu = await Menu.findOne({ restaurantId: rest._id });
    if (!menu) {
      const error = new Error("Menu not found");
      error.statusCode = 404;
      return next(error);
    }

    const idx = menu.menuItems.findIndex((item) => item._id.toString() === itemId);
    if (idx === -1) {
      const error = new Error("Menu item not found");
      error.statusCode = 404;
      return next(error);
    }

    if (itemName !== undefined) menu.menuItems[idx].itemName = itemName;
    if (description !== undefined) menu.menuItems[idx].description = description;
    if (price !== undefined) menu.menuItems[idx].price = Number(price);
    if (category !== undefined) menu.menuItems[idx].category = category;
    if (isAvailable !== undefined) menu.menuItems[idx].isAvailable = isAvailable === "true" || isAvailable === true;
    if (isTopRated !== undefined) menu.menuItems[idx].isTopRated = isTopRated === "true" || isTopRated === true;
    if (isRecommended !== undefined) menu.menuItems[idx].isRecommended = isRecommended === "true" || isRecommended === true;

    if (req.file) {
      const img = await uploadImageBuffer(req.file.buffer, "cravings/menu");
      menu.menuItems[idx].image = img;
    }

    await menu.save();
    res.status(200).json({ success: true, message: "Menu item updated", data: menu.menuItems[idx] });
  } catch (error) {
    next(error);
  }
};

// DELETE /restaurant/menu/delete-item/:itemId
export const deleteMenuItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const rest = await getManagerRestaurant(req.user._id);
    const menu = await Menu.findOne({ restaurantId: rest._id });

    if (!menu) {
      const error = new Error("Menu not found");
      error.statusCode = 404;
      return next(error);
    }

    menu.menuItems = menu.menuItems.filter((item) => item._id.toString() !== itemId);
    await menu.save();

    res.status(200).json({ success: true, message: "Menu item deleted successfully", data: menu.menuItems });
  } catch (error) {
    next(error);
  }
};

// PATCH /restaurant/menu/toggle/:itemId
export const toggleMenuItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const rest = await getManagerRestaurant(req.user._id);
    const menu = await Menu.findOne({ restaurantId: rest._id });

    if (!menu) {
      const error = new Error("Menu not found");
      error.statusCode = 404;
      return next(error);
    }

    const idx = menu.menuItems.findIndex((item) => item._id.toString() === itemId);
    if (idx === -1) {
      const error = new Error("Menu item not found");
      error.statusCode = 404;
      return next(error);
    }

    menu.menuItems[idx].isAvailable = !menu.menuItems[idx].isAvailable;
    await menu.save();

    res.status(200).json({ success: true, message: "Menu item availability toggled", data: menu.menuItems[idx] });
  } catch (error) {
    next(error);
  }
};

// GET /restaurant/orders
export const getRestaurantOrders = async (req, res, next) => {
  try {
    const rest = await getManagerRestaurant(req.user._id);
    const filter = { restaurantId: rest._id.toString() };
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// PATCH /restaurant/orders/:orderId/accept
export const acceptOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const rest = await getManagerRestaurant(req.user._id);
    const order = await Order.findOne({ _id: orderId, restaurantId: rest._id.toString() });

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      return next(error);
    }

    order.status = "Confirmed";
    await order.save();
    res.status(200).json({ success: true, message: "Order accepted", data: order });
  } catch (error) {
    next(error);
  }
};

// PATCH /restaurant/orders/:orderId/reject
export const rejectOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const rest = await getManagerRestaurant(req.user._id);
    const order = await Order.findOne({ _id: orderId, restaurantId: rest._id.toString() });

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      return next(error);
    }

    order.status = "Cancelled";
    // We can store cancellation reasons or log it.
    await order.save();
    res.status(200).json({ success: true, message: `Order rejected: ${reason || 'no reason'}`, data: order });
  } catch (error) {
    next(error);
  }
};

// PATCH /restaurant/orders/:orderId/status (preparing -> ready)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // usually "Preparing" or "Out for Delivery" (ready for pickup)

    const rest = await getManagerRestaurant(req.user._id);
    const order = await Order.findOne({ _id: orderId, restaurantId: rest._id.toString() });

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      return next(error);
    }

    // Move status: preparing -> ready (ready maps to Preparing/Out for Delivery in standard status states)
    if (status) {
      order.status = status;
    } else {
      if (order.status === "Confirmed") {
        order.status = "Preparing";
      } else if (order.status === "Preparing") {
        order.status = "Out for Delivery";
      }
    }

    await order.save();
    res.status(200).json({ success: true, message: `Status updated to ${order.status}`, data: order });
  } catch (error) {
    next(error);
  }
};
