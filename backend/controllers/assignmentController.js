const asyncHandler = require('express-async-handler');
const assignmentService = require('../services/assignmentService');
const { successResponse, errorResponse } = require('../utils/responseHelper');

// Assign an order to a delivery partner
const assignOrder = asyncHandler(async (req, res) => {
  const { orderId, partnerId } = req.body;

  if (!orderId || !partnerId) {
    return errorResponse(res, 'Order ID and Partner ID are required', 400);
  }

  try {
    const assignment = await assignmentService.assignOrder(orderId, partnerId);
    successResponse(res, 'Order successfully assigned to partner', assignment);
  } catch (error) {
    errorResponse(res, error.message, 400);
  }
});

// Retrieve assignment metrics
const getMetrics = asyncHandler(async (req, res) => {
  try {
    const metrics = await assignmentService.getAssignmentMetrics();
    successResponse(res, 'Assignment metrics retrieved successfully', metrics);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
});

module.exports = { assignOrder, getMetrics };
