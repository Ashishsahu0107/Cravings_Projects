import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import AuthRouter from './src/routers/auth.route.js';
import PublicRouter from './src/routers/public.route.js';
import OrderRouter from './src/routers/order.route.js';
import RestaurantRouter from './src/routers/restaurant.route.js';
import CustomerRouter from './src/routers/customer.route.js';
import RiderRouter from './src/routers/rider.route.js';
import connectDB from './src/config/dbConnection.config.js';
import dashboardRoutes from "./src/routers/dashboard.route.js";
import adminRoutes from "./src/routers/admin.route.js";
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/orders", OrderRouter);
app.use("/restaurant", RestaurantRouter);
app.use("/restaurants", RestaurantRouter);
app.use("/customer", CustomerRouter);
app.use("/rider", RiderRouter);
app.use("/dashboard", dashboardRoutes);
app.use("/admin", adminRoutes);


// Default API
app.get("/", (req, res) => {
    console.log("Server Started");
    res.json({ message: "Welcome to my first backend Projects" });
});

// Default error Handler
app.use((err, req, res, next) => {
    const ErrMessage = err.message || "Internal Server Error";
    const ErrStatusCode = err.statusCode || 500;
    res.status(ErrStatusCode).json({ message: ErrMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server Started on port : ", port);
    connectDB();
});
