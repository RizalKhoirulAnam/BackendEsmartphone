const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
const userRoutes = require("./Routes/UserRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const reviewRoutes = require("./Routes/ReviewRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const categoryRoutes = require("./Routes/CategoryRoutes");
const cartRoutes = require('./Routes/CartRoutes');
const favoriteRoutes = require('./Routes/FavoriteRoutes');
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// OPTIONAL: if you use Postman or a frontend (React, etc.)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // your frontend origin
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoriteRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
