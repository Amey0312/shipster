const Assignment = require('../models/Assignment');
const Order = require('../models/Order');
const DeliveryPartner = require('../models/DeliverPartner');

// Assign an order to a partner
const assignOrder = async (orderId, partnerId) => {
  // Fetch the order and partner by their IDs
  const order = await Order.findById(orderId);
  const partner = await DeliveryPartner.findById(partnerId);

  // Validate inputs
  if (!order) {
    throw new Error('Order not found');
  }
  if (!partner) {
    throw new Error('Partner not found');
  }
  if (partner.currentLoad >= 3) {
    // Create a failed assignment entry
    await Assignment.create({
      orderId,
      partnerId,
      status: 'failed',
      reason: 'Partner is at full capacity',
    });
    throw new Error('Partner is at full capacity');
  }
  if (order.status !== 'pending') {
    throw new Error('Order is not in a pending state');
  }

  // Update partner's load and assign the order
  partner.currentLoad += 1;
  order.status = 'assigned';
  order.assignedTo = partner._id;

  // Save changes
  await partner.save();
  await order.save();

  // Create a successful assignment entry
  const assignment = await Assignment.create({
    orderId,
    partnerId,
    status: 'success',
  });

  return assignment;
};

// Retrieve assignment metrics
const getAssignmentMetrics = async () => {
  // Total assignments
  const totalAssigned = await Assignment.countDocuments();

  // Success rate
  const successfulAssignments = await Assignment.countDocuments({ status: 'success' });
  const successRate = totalAssigned ? ((successfulAssignments / totalAssigned) * 100).toFixed(2) : 0;

  // Failure reasons breakdown
  const failureReasons = await Assignment.aggregate([
    { $match: { status: 'failed' } },
    { $group: { _id: '$reason', count: { $sum: 1 } } },
    { $project: { reason: '$_id', count: 1, _id: 0 } },
  ]);

  return {
    totalAssigned,
    successRate: parseFloat(successRate),
    failureReasons,
  };
};

module.exports = {
  assignOrder,
  getAssignmentMetrics,
};
