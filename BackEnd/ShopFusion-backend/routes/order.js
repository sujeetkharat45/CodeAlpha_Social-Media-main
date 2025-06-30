const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const mongoose = require('mongoose');

router.post("/place-order", async (req, res) => {
  try {
    const { userId, isGuest,cartItems, totalAmount, shippingDetails, paymentMethod } = req.body;
    if (!cartItems || !shippingDetails || !paymentMethod || !totalAmount) {
      return res.status(400).json({ error: "Missing required order fields" });
    }
    const orderData = {
      shippingDetails,
      isGuest,
      cartItems,
      totalAmount,
      paymentMethod,
    };
    if (userId) orderData.userId = userId;
    if (!orderData.status) orderData.status = 'pending';
    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order", details: err.message });
  }
});

router.get('/user-orders', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
    let orders;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      orders = await Order.find({ userId }).sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
    }
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.post('/cancel-order', async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  if (order.status === 'shipped' || order.status === 'delivered') {
    return res.status(400).json({ error: 'Cannot cancel shipped/delivered order' });
  }
  order.status = 'cancelled';
  await order.save();
  res.json({ message: 'Order cancelled successfully' });
});

module.exports = router;
