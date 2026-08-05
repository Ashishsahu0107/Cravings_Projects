import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressBook: {
      type: [
        {
          name: { type: String, required: true },
          address: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          pinCode: { type: String, required: true },
          country: { type: String, required: true },
          type: {
            type: String,
            enum: ["home", "work", "other"],
            required: true,
          },
          isDefault: { type: Boolean, default: false },
          geoLocation: {
            type: {
              lat: {
                type: String,
              },
              lon: {
                type: String,
              },
            },
          },
        },
      ],
    },
    cart: {
      restaurantId: { type: String, default: "" },
      restaurantName: { type: String, default: "" },
      items: [
        {
          itemId: { type: String },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          qty: { type: Number, required: true, default: 1 },
          image: { url: String, publicId: String }
        }
      ]
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
      }
    ]
  },
  { timestamps: true },
);

const Customer = mongoose.model("customer", CustomerSchema);

export default Customer;