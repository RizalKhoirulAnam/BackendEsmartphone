const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET; // make sure to store in .env

// @desc    Register new user
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Return user without password
    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, // Include role in JWT payload
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userObject = user.toObject();
    // Remove password from the object before sending
    delete userObject.password;

    res.status(200).json({
      message: "Login successful",
      user: userObject,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Optional: Get all users (for testing)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.file) {
        const oldAvatarPath = user.avatar;
        user.avatar = req.file.path.replace(/\\/g, "/");

        // Delete old avatar if it's not the default one
        if (oldAvatarPath && oldAvatarPath !== '/images/profile/default.png') {
          const fullPath = path.join(__dirname, '..', 'public', oldAvatarPath);
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error("Failed to delete old avatar:", err);
            }
          });
        }
      }

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      const userObject = updatedUser.toObject();
      delete userObject.password;

      res.json(userObject);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
