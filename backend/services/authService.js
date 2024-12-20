const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
// const token = generateToken(user.id);


// User login
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return { id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) };
  } else {
    throw new Error('Invalid email or password');
  }
};

// User registration
const registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await User.create(data);
  return { id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) };
};

module.exports = { loginUser, registerUser };
