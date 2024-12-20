const logMessage = (level, message) => {
    const levels = {
      info: '\x1b[34mINFO\x1b[0m', // Blue
      warn: '\x1b[33mWARN\x1b[0m', // Yellow
      error: '\x1b[31mERROR\x1b[0m', // Red
    };
  
    console.log(`${levels[level]}: ${message}`);
  };
  
  // Logger shortcuts
  const logInfo = (message) => logMessage('info', message);
  const logWarn = (message) => logMessage('warn', message);
  const logError = (message) => logMessage('error', message);
  
  module.exports = { logInfo, logWarn, logError };
  