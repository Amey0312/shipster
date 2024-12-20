const { calculateSuccessRate } = require('../utils/calculationUtils');
const Assignment = require('../models/Assignment');

// Get partner success rate
const getPartnerSuccessRate = async (partnerId) => {
  const totalAssignments = await Assignment.countDocuments({ partnerId });
  const completedAssignments = await Assignment.countDocuments({ partnerId, status: 'success' });

  return calculateSuccessRate(completedAssignments, totalAssignments);
};

module.exports = { getPartnerSuccessRate };
