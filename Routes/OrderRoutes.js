const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, updateOrderToPaid, getOrderById } = require('../Controller/OrderController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/Uploads');

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, upload.single('proof'), updateOrderToPaid);

module.exports = router;
