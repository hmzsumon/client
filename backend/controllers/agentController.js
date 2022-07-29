const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const createTransaction = require('../utils/txn');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');

// seed agents
exports.seedAgent = catchAsyncErrors(async (req, res, next) => {
  const newUsers = await User.create(
    {
      userName: 'upwork2',
      role: 'agent',
      password: 'Su112200',
      email: 'zakaria@gmail.com',
      phoneNumber: '0123456789',
      firstName: 'Agent2',
      lastName: 'Two',
      fullName: 'Agent2 Two',
      country: 'Bangladesh',
      address: 'Dhaka',
      city: 'Dhaka',
      state: 'Dhaka',
      agentBalance: 0.0,
      agentCommission: 0.0,
      agentWB: 0.0,
      zip: '1234',
    },
    {
      userName: 'upwork3',
      role: 'agent',
      password: 'Su112200',
      email: 'zakaria@gmail.com',
      phoneNumber: '0123456789',
      firstName: 'Agent3',
      lastName: 'Three',
      fullName: 'Agent3 Three',
      country: 'Bangladesh',
      address: 'Dhaka',
      city: 'Dhaka',
      state: 'Dhaka',
      agentBalance: 0.0,
      agentCommission: 0.0,
      agentWB: 0.0,
      zip: '1234',
    },
    {
      userName: 'upwork4',
      role: 'agent',
      password: 'Su112200',
      email: 'zakaria@gmail.com',
      phoneNumber: '0123456789',
      firstName: 'Agent4',
      lastName: 'Four',
      fullName: 'Agent4 Four',
      country: 'Bangladesh',
      address: 'Dhaka',
      city: 'Dhaka',
      state: 'Dhaka',
      agentBalance: 0.0,
      agentCommission: 0.0,
      agentWB: 0.0,
      zip: '1234',
    },
    {
      userName: 'upwork5',
      role: 'agent',
      password: 'Su112200',
      email: 'zakaria@gmail.com',
      phoneNumber: '0123456789',
      firstName: 'Agent5',
      lastName: 'Five',
      fullName: 'Agent5 Five',
      country: 'Bangladesh',
      address: 'Dhaka',
      city: 'Dhaka',
      state: 'Dhaka',
      agentBalance: 0.0,
      agentCommission: 0.0,
      agentWB: 0.0,
      zip: '1234',
    }
  );
  res.status(201).json({
    status: 'success',
    data: {
      users: newUsers,
    },
  });
});

// create agent
exports.createAgent = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  //check if user createdBalance < 500
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  if (user.createdBalance < 500) {
    return next(
      new ErrorHandler(
        400,
        'You need to have 500 createdBalance to create an agent'
      )
    );
  }
  const {
    userName,
    password,
    email,
    phoneNumber,
    address,
    city,
    state,
    zip,
    facebook,
    method,
    methodNumber,
  } = req.body;
  // check if userName already exists
  const userExists = await User.findOne({ userName });
  if (userExists) {
    return next(new ErrorHandler('UserName already exists', 400));
  }
  // paymentMethods
  const paymentMethods = [];
  if (method) {
    paymentMethods.push({ method, methodNumber });
  }

  const newUser = await User.create({
    userName,
    password,
    email,
    phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    agentOwner: user.fullName,
    country: user.country,
    address,
    city,
    state,
    zip,
    facebook,
    role: 'agent',
    agentBalance: 500,
    agentCommission: 0.0,
    agentWB: 0.0,
    paymentMethods,
  });

  // update user createdBalance
  user.creditBalance = user.creditBalance - 500;
  createTransaction(userId, 'cashOut', 500, `Agent  created`);
  user.isAgent = true;
  await user.save();

  sendToken(newUser, 200, res);
});

// get all agents
exports.getAllAgents = catchAsyncErrors(async (req, res, next) => {
  const agents = await User.find({ role: 'agent' });
  res.status(200).json({
    success: true,
    message: 'All agents fetched successfully',
    agents: agents,
  });
});

// delete all agents
exports.deleteAllAgents = catchAsyncErrors(async (req, res, next) => {
  const agents = await User.deleteMany({ role: 'agent' });
  res.status(200).json({
    success: true,
    message: 'All agents deleted successfully',
    length: agents.deletedCount,
    agents: agents,
  });
});
