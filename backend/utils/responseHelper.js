const sendResponse = (res, { success = true, message = '', data = null, statusCode = 200 }) => {
    res.status(statusCode).json({
      success,
      message,
      data,
    });
  };
  
  // Common response handlers
  const successResponse = (res, message, data) => sendResponse(res, { success: true, message, data, statusCode: 200 });
  const errorResponse = (res, message, statusCode = 400) => sendResponse(res, { success: false, message, data: null, statusCode });
  
  module.exports = { sendResponse, successResponse, errorResponse };
  