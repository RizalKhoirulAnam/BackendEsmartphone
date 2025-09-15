const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getProductsByCategory,
} = require("../Controller/CategoryController");

router.post("/", createCategory);
router.get("/", getAllCategories);

module.exports = router;
