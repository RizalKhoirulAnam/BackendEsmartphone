const Order = require('../Models/Order');
const Product = require('../Models/Product');
const User = require('../Models/User');

// @desc    Create new order
// @route   POST /api/orders
exports.addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod: 'Manual Transfer',
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentStatus: 'pending',
    });

    const createdOrder = await order.save();

    // Decrease stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock -= item.qty;
        await product.save();
      }
    }

    // Clear cart
    req.user.cart = [];
    await req.user.save();


    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.paymentStatus = 'processing';

    order.paymentResult = {
      customerName: req.body.customerName,
      bankName: req.body.bankName,
      bankAccount: req.body.bankAccount,
      transactionId: req.body.transactionId,
      amount: req.body.amount,
      proofOfPayment: req.file ? req.file.path.replace(/\\/g, "/") : null,
    };

    await order.save();

    const updatedOrder = await Order.findById(req.params.id);

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    // Ensure the user is authorized to see this order
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to view this order');
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};
