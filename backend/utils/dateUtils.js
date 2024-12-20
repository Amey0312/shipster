const moment = require('moment');

// Format a date in a readable format
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(format);
};

// Get the start and end times of a given day
const getStartAndEndOfDay = (date) => {
  const start = moment(date).startOf('day').toDate();
  const end = moment(date).endOf('day').toDate();
  return { start, end };
};

// Check if a date is within a given range
const isDateInRange = (date, startDate, endDate) => {
  return moment(date).isBetween(moment(startDate), moment(endDate), undefined, '[]');
};

module.exports = { formatDate, getStartAndEndOfDay, isDateInRange };
