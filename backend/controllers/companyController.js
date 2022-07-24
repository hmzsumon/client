const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Company = require('../models/companyModel');

// create company
exports.createCompany = catchAsyncErrors(async (req, res, next) => {
  await Company.create({
    name: 'Up Working',
    address: '123 Main St',
    depositBalance: 0,
    withdrawBalance: 0,
    bonusBalance: 0,
    commissionBalance: 0,
    userCreditBalance: 0,
    usersWB: 0,
    totalLottery: 0,
    lotterySold: 0,
    lotteryPrize: 0,
    lotteryProfit: 0,
    totalDraw: 0,
  });
  res.status(201).json({
    success: true,
    message: 'Company created successfully',
  });
});
