const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Deposit = require('../models/depositModel');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const Withdraw = require('../models/WithdrawModel');
const createTransaction = require('../utils/txn');

const companyId = process.env.COMPANY_ID;

// withdraw request from user
module.exports.withdrawRequest = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // // check user active date
  // const today = new Date();
  // const userActiveDate = new Date(user.activeDate);
  // const diff = today.getTime() - userActiveDate.getTime();
  // const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  // if (days < 15) {
  //   return next(
  //     new ErrorHandler('User must be active for at least 15 days', 400)
  //   );
  // }

  const { amount, method, accountNumber } = req.body;

  // // check user incomeBalance is greater than 1000
  // if (user.incomeBalance < 1000) {
  //   return next(
  //     new ErrorHandler('User incomeBalance must be greater than 1000', 400)
  //   );
  // }

  // const minIncomeBalance = 1000;
  // if (user.incomeBalance - amount < minIncomeBalance) {
  //   return next(
  //     new ErrorHandler('User incomeBalance must be greater than 1000', 400)
  //   );
  // }

  // check user minimum withdraw amount is 1000
  // if (amount < 500) {
  //   return next(new ErrorHandler('User minimum withdraw amount is 500', 400));
  // }

  // check user incomeBalance is greater than amount
  if (user.incomeBalance < amount) {
    return next(
      new ErrorHandler('User incomeBalance must be greater than amount', 400)
    );
  }

  const withdrawCharge = Number(amount) * 0.05;

  const netAmount = Number(amount) - withdrawCharge;
  const totalAmount = netAmount + withdrawCharge;

  // check if user has sufficient balance
  if (user.incomeBalance < amount) {
    return next(new ErrorHandler('Insufficient balance', 400));
  }

  // create withdraw request
  const withdraw = await Withdraw.create({
    userId,
    userName: user.userName,
    userFullName: user.fullName,
    accountNumber,
    amount,
    withdrawCharge,
    netAmount,
    totalAmount,
    method,
    status: 'pending',
  });
  // update user balance
  user.incomeBalance -= amount;
  user.usrTaskValue = Number(
    (user.incomeBalance * 0.036) / user.packageTaskLimit
  ).toFixed(2);
  user.save();

  res.status(201).json({
    success: true,
    message: 'Withdraw request created',
    data: withdraw,
  });
});

// get withdraws by agentId
module.exports.getAgentWithdraws = catchAsyncErrors(async (req, res, next) => {
  const agentId = req.user._id;
  const withdraws = await Withdraw.find({ agentId });
  if (!withdraws) {
    return next(new ErrorHandler('No withdraws found', 404));
  }
  // filter pending withdraws
  const pendingWithdraws = withdraws.filter(
    (withdraw) => withdraw.status === 'pending'
  );
  res.status(200).json({
    success: true,
    message: 'Withdraws fetched',
    withdraws,
    pendingWithdraws,
  });
});

// get loged in user withdraws
module.exports.getUserWithdraws = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const withdraws = await Withdraw.find({ userId });
  if (!withdraws) {
    return next(new ErrorHandler('No withdraws found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Withdraws fetched',
    withdraws,
  });
});

// get a single withdraw
module.exports.getWithdraw = catchAsyncErrors(async (req, res, next) => {
  const withdrawId = req.params.id;
  const withdraw = await Withdraw.findById(withdrawId);

  if (!withdraw) {
    return next(new ErrorHandler('Withdraw not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Withdraw fetched',
    withdraw,
  });
});

// approve withdraw request by agent
module.exports.approveWithdraw = catchAsyncErrors(async (req, res, next) => {
  // const withdrawId = req.params.id;
  const { withdrawId, approvedAccountNumber, approveTnxId } = req.body;

  //check user role admin and agent
  const agentId = req.user._id;
  const agent = await User.findById(agentId);
  if (!agent) {
    return next(new ErrorHandler('User not found', 404));
  }

  if (agent.role !== 'agent') {
    return next(new ErrorHandler('Unauthorized', 401));
  }

  const withdraw = await Withdraw.findById(withdrawId);
  if (!withdraw) {
    return next(new ErrorHandler('Withdraw not found', 404));
  }

  // update agent balance
  agent.agentBalance += withdraw.netAmount;
  agent.agentCommission += withdraw.withdrawCharge * 0.5;
  await agent.save();
  createTransaction(
    agent._id,
    'cashIn',
    withdraw.netAmount,
    `Approved Withdraw fro ${withdraw.userName} `
  );
  createTransaction(
    agent._id,
    'cashIn',
    withdraw.withdrawCharge * 0.5,
    ` Withdraw Commission`
  );
  withdraw.agentId = agentId;
  withdraw.status = 'approved';
  withdraw.approvedAt = Date.now();
  withdraw.approvedBy = agent._id;
  withdraw.approvedByName = agent.userName;
  withdraw.approvedAccountNumber = approvedAccountNumber;
  withdraw.approveTnxId = approveTnxId;
  await withdraw.save();

  // find user
  const user = await User.findById(withdraw.userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // find sponsor
  const sponsor = await User.findById(user.sponsorBy);
  if (!sponsor) {
    return next(new ErrorHandler('Sponsor not found', 404));
  }

  // update sponsor balance
  sponsor.incomeBalance += withdraw.netAmount * 0.05;
  sponsor.royaltyBonus += withdraw.netAmount * 0.05;
  createTransaction(
    sponsor._id,
    'cashIn',
    withdraw.netAmount * 0.05,
    `Royalty Bonus`
  );
  await sponsor.save();
  // console.log('sponsor', sponsor.userName);

  res.status(200).json({
    success: true,
    message: 'Withdraw approved',
    withdraw,
  });
});
