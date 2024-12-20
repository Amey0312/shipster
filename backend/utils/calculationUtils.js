// Calculate the success rate as a percentage
const calculateSuccessRate = (completed, total) => {
    if (total === 0) return 0;
    return ((completed / total) * 100).toFixed(2); // Return percentage
  };
  
  module.exports = { calculateSuccessRate };
  