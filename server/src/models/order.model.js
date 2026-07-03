import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        restaurantId: {
            type: String,
            required: true,
        },
        restaurantName: {
            type: String,
            required: true,
        },
        items: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true, default: 0 },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            default: "Pending",
            enum: [
                "Pending",
                "Confirmed",
                "Preparing",
                "Out for Delivery",
                "Delivered",
                "Cancelled",
            ],
        },
        deliveryAddress: {
            type: String,
            default: "Home address",
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
