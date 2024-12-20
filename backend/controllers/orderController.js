const asyncHandler = require('express-async-handler');
const orderService = require('../services/orderService');

// Get all orders with filters
const getOrders = asyncHandler(async (req, res) => {
  const filters = req.query;
  const orders = await orderService.getAllOrders(filters);
  res.status(200).json(orders);
});

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.body);
  res.status(201).json(order);
});

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedOrder = await orderService.updateOrderStatus(id, status);
  res.status(200).json(updatedOrder);
});

module.exports = { getOrders, createOrder, updateOrderStatus };
