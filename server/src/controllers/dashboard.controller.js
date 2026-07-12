import Restaurant from "../models/restaurant.modal.js";

export const getDashboardOverview = async (req, res) => {
  try {
    const managerId = req.user._id; // Auth middleware se aayega

    const restaurant = await Restaurant.findOne({ managerId });

    if (!restaurant) {
      return res.status(200).json({
        success: false,
        message: "Restaurant profile not found yet. Please complete your restaurant setup.",
        data: {
          restaurantName: req.user?.fullName || "Restaurant",
          status: "inactive",
          isOpen: false,
          averageRating: 0,
          restaurantType: "Not set",
          location: {
            address: "Not available",
            city: "Not available",
            state: "Not available",
            country: "Not available",
            pinCode: "Not available",
          },
          contact: {
            email: req.user?.email || "Not available",
            phone: req.user?.phone || "Not available",
          },
          servingHours: {
            openingTime: "Not available",
            closingTime: "Not available",
          },
          cuisines: [],
          totalCuisines: 0,
          images: {
            coverImage: null,
            restaurantImages: [],
          },
          documents: {
            gstUploaded: false,
            fssaiUploaded: false,
            panUploaded: false,
          },
          bankDetails: {
            bankName: "Not available",
            accountNumber: "Not available",
            ifscCode: "Not available",
          },
          socialMedia: [],
          createdAt: null,
        },
      });
    }

    const dashboard = {
      restaurantName: restaurant.restaurantName,
      status: restaurant.status,
      isOpen: restaurant.isOpen,
      averageRating: restaurant.averageRating,
      restaurantType: restaurant.restaurantType,

      location: {
        address: restaurant.address,
        city: restaurant.city,
        state: restaurant.state,
        country: restaurant.country,
        pinCode: restaurant.pinCode,
      },

      contact: {
        email: restaurant.contactDetails.email,
        phone: restaurant.contactDetails.phone,
      },

      servingHours: {
        openingTime: restaurant.servingHours.openingTime,
        closingTime: restaurant.servingHours.closingTime,
      },

      cuisines: restaurant.cuisineTypes,
      totalCuisines: restaurant.cuisineTypes.length,

      images: {
        coverImage: restaurant.coverImage,
        restaurantImages: restaurant.restaurantImage,
      },

      documents: {
        gstUploaded: !!restaurant.documents.gstCertificate,
        fssaiUploaded: !!restaurant.documents.fssaiCertificate,
        panUploaded: !!restaurant.documents.panCard,
      },

      bankDetails: {
        bankName: restaurant.financialDetails.bankName,
        accountNumber:
          "XXXXXX" +
          restaurant.financialDetails.accountNumber.slice(-4),
        ifscCode: restaurant.financialDetails.ifscCode,
      },

      socialMedia: restaurant.socialMediaLinks,

      createdAt: restaurant.createdAt,
    };

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};