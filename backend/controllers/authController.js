const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/jwtUtils');
const { deleteUser } = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const User = require('../models/User');

// User Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { successResponse } = require('../utils/responseHelper');
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // Use utility to generate JWT
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// User Registration
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password, role });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id), // Use utility to generate JWT
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  // For stateless JWT, clear the token on the client-side
  successResponse(res, 'User logged out successfully');
});

// Delete a user by ID
const removeUser = asyncHandler(async (req, res) => {
  try {
    await deleteUser(req.params.id);
    successResponse(res, 'User deleted successfully');
  } catch (error) {
    errorResponse(res, error.message, 404);
  }
});

module.exports = { login, logoutUser, register, removeUser };
