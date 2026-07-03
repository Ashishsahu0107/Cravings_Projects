import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import AuthRouter from './src/routers/auth.route.js';
import PublicRouter from './src/routers/public.route.js';
import OrderRouter from './src/routers/order.route.js';
import connectDB from './src/config/dbConnection.config.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/orders", OrderRouter);

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
