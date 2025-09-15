const express = require('express');
const router = express.Router();
const { getFavorites, addToFavorites, removeFromFavorites } = require('../Controller/FavoriteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getFavorites)
  .post(protect, addToFavorites);

router.route('/:productId')
  .delete(protect, removeFromFavorites);

module.exports = router;
