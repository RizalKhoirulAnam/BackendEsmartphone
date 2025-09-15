const User = require('../Models/User');

// @desc    Get user's cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'cart.product',
      populate: {
        path: 'category',
        model: 'Category',
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      user.cart[existingItemIndex].qty = qty;
    } else {
      // Add new item to cart
      user.cart.push({ product: productId, qty });
    }

    await user.save();
    const populatedUser = await User.findById(req.user.userId).populate({
      path: 'cart.product',
      populate: {
        path: 'category',
        model: 'Category',
      },
    });
    res.status(200).json(populatedUser.cart);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(item => item.product.toString() !== productId);

    await user.save();
    const populatedUser = await User.findById(req.user.userId).populate({
      path: 'cart.product',
      populate: {
        path: 'category',
        model: 'Category',
      },
    });
    res.json(populatedUser.cart);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
