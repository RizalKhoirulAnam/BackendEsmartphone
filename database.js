const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
    cachedDb = db;
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw new Error("MongoDB connection failed");
  }
};

module.exports = connectDB;
