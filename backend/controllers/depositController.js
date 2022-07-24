const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Deposit = require('../models/depositModel');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const createTransaction = require('../utils/txn');

// create deposit request
exports.createDeposit = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const { amount, accountNumber, transactionId, method, bdtAmount } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler(404, 'User not found'));
  }
  const newDeposit = await Deposit.create({
    userId,
    userName: user.userName,
    userFullName: user.fullName,
    amount,
    accountNumber,
    transactionId,
    method,
    status: 'PENDING',
    bdtAmount,
  });

  res.status(201).json({
    success: true,
    message: 'Deposit request created',
    newDeposit,
  });
});

// get logged in user's deposit requests
exports.getDeposits = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const deposits = await Deposit.find({ userId });
  res.status(200).json({
    success: true,
    message: 'Deposit requests fetched',
    deposits,
  });
});

// send money to user
exports.sendMoney = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  let senderBalance = 0;
  const { amount, recipientId } = req.body;
  const numAmount = Number(amount);

  // find sender
  const sender = await User.findById(userId);
  if (!sender) {
    return next(new ErrorHandler('User not found', 404));
  }

  // check if sender has sufficient balance
  if (sender.role === 'user') {
    senderBalance = sender.creditBalance;
  }

  if (sender.role === 'agent') {
    senderBalance = sender.agentBalance;
  }

  if (senderBalance < numAmount) {
    return next(new ErrorHandler('Insufficient balance', 400));
  }

  // find recipient
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    return next(new ErrorHandler('Recipient not found', 404));
  }

  //check if recipient role is agent

  if (recipient.role === 'agent') {
    return next(new ErrorHandler('Recipient is an agent', 400));
  }

  // update recipient's balance
  recipient.creditBalance += numAmount;
  createTransaction(
    recipient._id,
    'cashIn',
    numAmount,
    `P2P from ${sender.userName}`
  );
  await recipient.save();

  // check sender role
  if (sender.role === 'user') {
    // update sender's balance
    sender.creditBalance -= numAmount;
    createTransaction(
      sender._id,
      'cashOut',
      numAmount,
      `P2P to ${recipient.userName}`
    );
    await sender.save();
  }
  if (sender.role === 'agent') {
    // update sender's balance
    sender.agentBalance -= numAmount;
    createTransaction(
      sender._id,
      'cashOut',
      numAmount,

      `P2P to ${recipient.userName}`
    );
    await sender.save();
  }

  res.status(200).json({
    success: true,
    message: 'Money sent successfully',
  });
});
