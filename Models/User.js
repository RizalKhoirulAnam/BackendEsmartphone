const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    cart: [cartItemSchema],
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }],
    avatar: {
      type: String,
      default: '/images/profile/default.png',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
