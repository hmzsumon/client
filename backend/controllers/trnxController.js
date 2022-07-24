const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

// get logged in users transactions
exports.getLoggedInUserTnxs = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const transactions = await Transaction.find({ userId: userId });
  if (!transactions) {
    return next(new ErrorHandler('No transactions found', 404));
  }
  const tnxCount = transactions.length;

  res.status(200).json({
    success: true,
    tnxCount,
    transactions,
  });
});
