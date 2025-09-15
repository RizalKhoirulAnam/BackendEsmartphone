const express = require("express");
const router = express.Router();
const upload = require("../utils/uploads");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../Controller/ProductController");
const reviewRouter = require("./ReviewRoutes");

router.use("/:id/reviews", reviewRouter);

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
