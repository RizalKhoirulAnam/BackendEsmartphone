const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUserProfile,
} = require("../Controller/UserController");
const { protect } = require('../middleware/authMiddleware');
const uploadAvatar = require('../utils/UploadAvatar');

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

router.put('/profile', protect, uploadAvatar, updateUserProfile);

// Optional: For test/dev only
router.get("/", getUsers);

module.exports = router;
