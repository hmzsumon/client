const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Package = require('../models/packageModel');
const createTransaction = require('../utils/txn');

// create a new package
exports.createPackage = catchAsyncErrors(async (req, res, next) => {
  const { name, price } = req.body;

  const package = await Package.create({
    name,
    price,
    cashback: price * 0.1,
    duration: 12,
    tasksLimit: 20,
    dailyProfit: Number(price * 0.036).toFixed(2),
    packageTaskValue: Number((price * 0.036) / 20).toFixed(2),
  });

  res.status(201).json({
    success: true,
    package,
  });
});

// get all packages
exports.getAllPackages = catchAsyncErrors(async (req, res, next) => {
  const packages = await Package.find();

  res.status(200).json({
    success: true,
    packages,
  });
});

// ======================================================================================
// buy a package
// ======================================================================================
exports.buyPackage = catchAsyncErrors(async (req, res, next) => {
  const { packageId } = req.params;

  const userId = req.user._id;

  // find user
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const package = await Package.findById(packageId);
  if (!package) {
    return next(new ErrorHandler('Package not found', 404));
  }
  // check if user has enough balance
  if (user.creditBalance < package.price) {
    return next(new ErrorHandler('Not enough balance', 400));
  }

  // update user credit balance
  user.creditBalance = user.creditBalance - package.price;
  createTransaction(user._id, 'cashOut', package.price, 'Package purchase');
  user.incomeBalance = user.incomeBalance + package.price + package.cashback;
  createTransaction(
    user._id,
    'cashIn',
    package.price + package.cashback,
    `Cashback for package ${package.name} amount of ${package.price} - 10%`
  );

  // check suer status is inactive
  if (user.status === 'inactive') {
    user.status = 'active';
    user.activeDate = Date.now();
  }

  // update user package
  user.package = packageId;
  user.packageStartDate = new Date();
  user.packageEndDate = new Date(
    new Date().setDate(new Date().getDate() + package.duration)
  );
  user.packageTaskLimit = package.tasksLimit;
  user.usrTaskValue = package.packageTaskValue;
  user.tasksLimit = package.tasksLimit;
  user.packageName = package.name;
  user.packagePrice = package.price;
  user.userHasPackage = true;
  await user.save();

  // find user sponsors
  const sponsor = await User.findById(user.sponsorBy);

  if (sponsor) {
    sponsor.incomeBalance = sponsor.incomeBalance + package.cashback;
    sponsor.referralBonus = sponsor.referralBonus + package.cashback;
    sponsor.firstGenBonus = sponsor.firstGenBonus + package.cashback;

    createTransaction(
      sponsor._id,
      'cashIn',
      package.cashback,
      `1st Gen Bonus of ${user.userName} for package purchase`
    );
    await sponsor.save();
  }

  // // find parent
  // const parent = await User.findById(user.parent);
  // parent.incomeBalance = parent.incomeBalance + package.cashback * 0.25;
  // parent.referralBonus = parent.referralBonus + package.cashback * 0.25;
  // parent.secondGenBonus = parent.secondGenBonus + package.cashback * 0.25;
  // createTransaction(
  //   parent._id,
  //   'cashIn',
  //   package.cashback * 0.25,
  //   `2nd Gen Bonus of ${user.userName} for package purchase`
  // );
  // await parent.save();

  // package update
  package.sold = package.sold + 1;
  package.users.push(userId);
  await package.save();

  res.status(200).json({
    success: true,
    message: 'Package bought successfully',
  });
});

// upgrade logging user package
exports.upgradePackage = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const { amount } = req.body;
  const numAmount = Number(amount);
  const cashback = Number(numAmount * 0.1);
  // find user
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // check if user has enough balance
  if (user.creditBalance < numAmount) {
    return next(new ErrorHandler('Not enough balance', 400));
  }

  // update user credit balance
  user.creditBalance = user.creditBalance - numAmount;
  createTransaction(user._id, 'cashOut', numAmount, 'Package Upgrade');
  user.incomeBalance = user.incomeBalance + numAmount + cashback;

  createTransaction(
    user._id,
    'cashIn',
    amount + cashback,
    `Cashback for upgrade amount of ${numAmount} - 10%`
  );

  const numValue = Number(Math.floor(user.incomeBalance));

  const newValue = Number(
    Math.floor((numValue * 0.036) / user.packageTaskLimit)
  );

  user.usrTaskValue = newValue;

  await user.save();

  // find user sponsors
  const sponsor = await User.findById(user.sponsorBy);

  if (sponsor) {
    sponsor.incomeBalance = sponsor.incomeBalance + cashback;
    sponsor.referralBonus = sponsor.referralBonus + cashback;
    sponsor.firstGenBonus = sponsor.firstGenBonus + cashback;
    createTransaction(
      sponsor._id,
      'cashIn',
      cashback,
      `1st Gen Bonus of ${user.userName} for upgrade`
    );
    await sponsor.save();
  }

  res.status(200).json({
    success: true,
    message: 'Package upgrade successfully',
  });
});
