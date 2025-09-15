const User = require('../Models/User');

// @desc    Get user's favorites
// @route   GET /api/favorites
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add item to favorites
// @route   POST /api/favorites
exports.addToFavorites = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }
    
    const populatedUser = await User.findById(req.user.userId).populate('favorites');
    res.status(200).json(populatedUser.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove item from favorites
// @route   DELETE /api/favorites/:productId
exports.removeFromFavorites = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(favId => favId.toString() !== productId);
    
    await user.save();
    const populatedUser = await User.findById(req.user.userId).populate('favorites');
    res.json(populatedUser.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
