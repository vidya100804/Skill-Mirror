/* eslint-disable no-undef */
/* eslint-env node */

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("❌ MongoDB connection failed: MONGO_URI is missing from environment variables!");
      return;
    }
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Do not call process.exit(1) so the server can start and pass health checks on Render
  }
};

export default connectDB;
