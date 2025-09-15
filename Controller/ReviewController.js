const Review = require('../Models/Review');
const Product = require('../Models/Product');

// @desc    Create a review
// @route   POST /api/products/:id/reviews
exports.createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = await Review.findOne({
      product: req.params.id,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = new Review({
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      product: req.params.id,
    });

    await review.save();

    const reviews = await Review.find({ product: req.params.id });
    product.numReviews = reviews.length;
    product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// @desc    Get reviews for a product
// @route   GET /api/products/:id/reviews
exports.getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.id });
  res.json(reviews);
};

