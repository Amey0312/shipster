const Order = require('../models/Order');

// Fetch all orders
const getAllOrders = async (filters) => {
  const query = {};
  if (filters.status) query.status = { $in: filters.status };
  if (filters.area) query.area = { $in: filters.area };
  if (filters.date) {
    const date = new Date(filters.date);
    query.createdAt = {
      $gte: new Date(date.setHours(0, 0, 0)),
      $lte: new Date(date.setHours(23, 59, 59)),
    };
  }
  return await Order.find(query).populate('assignedTo');
};

// Create a new order
const createOrder = async (data) => {
  const order = new Order(data);
  return await order.save();
};

// Update order status
const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status, updatedAt: new Date() }, { new: true });
};

module.exports = { getAllOrders, createOrder, updateOrderStatus };
