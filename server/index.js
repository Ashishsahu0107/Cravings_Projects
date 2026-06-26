import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import AuthRouter from './src/routers/auth.route.js';
import PublicRouter from './src/routers/public.route.js';
import connectDB from './src/config/dbConnection.config.js';

const app = express(); // object

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);

// Default APT
app.get("/", (req, res) => {
    console.log("Server Started");
    res.json({ message: "Welcome to my first backend Projects" });
})

// Default error Handler
app.use((err, req, res, next) => {
    const ErrMessage = err.message || "Internal Server Error";
    const ErrStatusCode = err.ErrStatusCode || 500;
    res.status(ErrStatusCode).json({ message: ErrMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server Started on port : ", port);
    connectDB();
});