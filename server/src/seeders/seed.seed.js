import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/dbConnection.config.js";
import adminSeed from "./adminSeed.seed.js";
import userSeed from "./userSeed.seed.js";

const Seed = async () => {
  try {
    await connectDB();

    await adminSeed();
    await userSeed();
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit(0);
  }
};

Seed();