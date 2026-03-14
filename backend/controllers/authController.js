const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const { attachCookiesToResponse } = require('../utils/index');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { email, username, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError.BadRequestError('Email already in use');
  }
  const user = await User.create({ email, username, password });

  const tokenUser = { username, userID: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({
    user: tokenUser,
  });
};

const login = async (req, res) => {
  res.send('login user');
};

const logout = async (req, res) => {
  res.send('logout user');
};
module.exports = {
  register,
  login,
  logout,
};
