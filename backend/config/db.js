const mongoose = require('mongoose');
const { logInfo, logError } = require('../utils/logger'); // Import the logger utility

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logInfo(`MongoDB Connected: ${conn.connection.host}`); // Use logInfo to display connection success
  } catch (error) {
    logError(`Error: ${error.message}`); // Use logError to display failure message
    process.exit(1);
  }
};

module.exports = connectDB;
