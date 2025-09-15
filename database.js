const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  // If a connection is already established, or in the process of connecting, reuse it.
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // Re-throw the error to be caught by the calling function
    throw new Error("MongoDB connection failed");
  }
};

module.exports = connectDB;
