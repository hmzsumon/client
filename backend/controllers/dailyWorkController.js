const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const DailyWork = require('../models/dailyWorkModel');
const User = require('../models/userModel');
const createTransaction = require('../utils/txn');

// daliy work list
const dailyWorks = [
  // {
  //   url: 'https://i.ibb.co/pjc6SmB/Oppo-Reno5-image.png',
  //   title: 'Oppo Reno5 Full Specifications',
  //   description: '90Hz refresh rate, 600 nits max. brightness',
  //   price: '30,990',
  //   earning: 0,
  //   isVisited: false,
  //   isCompleted: false,
  //   isSelected: false,
  // },
  // {
  //   url: 'https://i.ibb.co/CQP3pP4/Oppo-F21-Pro-5-G.png',
  //   title: 'Oppo F21 Pro Full Specifications',
  //   description: 'Gorilla Glass 5 front, Fiberglass-Leather back',
  //   price: '28,990',
  //   earning: 0,
  //   isVisited: false,
  //   isCompleted: false,
  //   isSelected: false,
  // },
  // {
  //   url: 'https://i.ibb.co/1fK6x6r/Oppo-F19-Pro-image.png',
  //   title: 'Oppo F19 Pro Full Specifications',
  //   description: '60Hz refresh rate, 800 nits max. brightness',
  //   price: '24,990',
  //   earning: 0,
  //   isVisited: false,
  //   isCompleted: false,
  //   isSelected: false,
  // },
  // {
  //   url: 'https://i.ibb.co/Zcyr616/Oppo-A76.png',
  //   title: 'Oppo A76 Full Specifications',
  //   description: 'DAF, LED flash, depth, 1/3.06″, 1.12µm, f/2.2 & more',
  //   price: '22,990',
  //   earning: 0,
  //   isVisited: false,
  //   isCompleted: false,
  //   isSelected: false,
  // },
  // {
  //   url: 'https://i.ibb.co/9Y4wY97/Oppo-A95-4-G-image.png',
  //   title: 'Oppo A95 Full Specifications',
  //   description: 'PDAF, LED flash, f/1.7, 1/2.0″, 0.8µm, depth, macro & more',
  //   price: '24,990',
  //   earning: 0,
  //   isVisited: false,
  //   isCompleted: false,
  //   isSelected: false,
  // },
  {
    url: 'https://i.ibb.co/0G28h3m/Sonya-Daily-Skincare-Large.png',
    title: 'Sonya Daily Skincare Full Specifications',
    description: '60Hz refresh rate, 800 nits max. brightness',
    price: '1,990',
    earning: 0,
    isVisited: false,
    isCompleted: false,
    isSelected: false,
  },
  {
    url: 'https://i.ibb.co/zFRvptw/argi200.png',
    title: 'Argi 200 Full Specifications',
    description: '60Hz refresh rate, 800 nits max. brightness',
    price: '1,990',
    earning: 0,
    isVisited: false,
    isCompleted: false,
    isSelected: false,
  },
  {
    url: 'https://i.ibb.co/BHpZkjR/Aloe-First-Large.png',
    title: 'Aloe First Full Specifications',
    description: 'Aloe First® is an excellent addition to any first aid kit',
    price: '6,569',
    earning: 0,
    isVisited: false,
    isCompleted: false,
    isSelected: false,
  },
  {
    url: 'https://i.ibb.co/g6wCYTn/Sonya-soothing-gel-moisturizer-Large.png',
    title: 'Sonya soothing gel moisturizer Full Specifications',
    description:
      'You’ve never felt a lotion like this before. Soothing gel moisturizer looks like a lotion, but this gel based formula melts into your skin.',
    price: '7,426',
    earning: 0,
    isVisited: false,
    isCompleted: false,
    isSelected: false,
  },
  {
    url: 'https://i.ibb.co/Fq0Wfny/Sonya-Cleanser-Large.png',
    title: 'Sonya Cleanser Full Specifications',
    description:
      'The first step in the Sonya Skin Care regime, this remarkable cleanser with aloe and fruit extracts is designed to gently remove makeup and debris without overdrying.',
    price: '2,046',
    earning: 0,
    isVisited: false,
    isCompleted: false,
    isSelected: false,
  },
  {
    url: 'https://i.ibb.co/hD0N6ZL/Bee-Honey-Large.png',
    title: 'Bee Honey Full Specifications',
    description:
      'Bee Honey is a honey-based moisturizer that is made with beeswax and beeswax honey.',
    price: '1,169',
    earning: 0,
    isVisited: false,
    isCompleted: false,
    isSelected: false,
  },
  {
    url: 'https://i.ibb.co/xstvJH9/Ultra-Vanilla-Large.png',
    title: 'Ultra Vanilla Full Specifications',
    description:
      'Forever Lite Ultra® with Aminotein® is the perfect addition to your healthy Forever Living lifestyle.',
    price: '2,400',
    earning: 0,
    isVisited: false,
    isCompleted: false,
    isSelected: false,
  },
  {
    url: 'https://i.ibb.co/31RSBKH/Aloe-Berry-Nectar-Large.png',
    title: 'Aloe Berry Nectar Full Specifications',
    description:
      'Forever Aloe Berry Nectar™ contains all of the goodness found in our Forever Aloe Vera Gel™, plus the added benefits of cranberry and apple',
    price: '1,758',
    earning: 0,
    isVisited: false,
    isCompleted: false,
    isSelected: false,
  },
];

// const User = require('../models/userModel');

// create some daily works
module.exports.createDailyWorks = catchAsyncErrors(async (req, res, next) => {
  const dailyWorksCreated = await DailyWork.create([
    ...dailyWorks,
    ...dailyWorks,
    ...dailyWorks,
    ...dailyWorks,
    ...dailyWorks,
  ]);
  res.status(201).json({
    success: true,
    data: dailyWorksCreated,
    message: 'Daily Works created successfully',
  });
});

//select a daily work and push it for every user's dailyTask
module.exports.selectDailyWork = catchAsyncErrors(async (req, res, next) => {
  const dailyWorkId = req.params.id;
  const dailyWork = await DailyWork.findById(dailyWorkId);
  if (!dailyWork) {
    return next(new ErrorHandler('Daily Work not found', 404));
  }
  const users = await User.find();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    user.dailyTask.push(dailyWork);
    await user.save();
  }
  res.status(201).json({
    success: true,
    data: dailyWork,
  });
});

// find logged in user's daily works
module.exports.findDailyWorks = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  //find dailyTask from user
  const dailyWorks = user.dailyTask;
  res.status(200).json({
    success: true,
    data: dailyWorks,
  });
});

// remove a daily work from logged in user's dailyTask array
module.exports.removeDailyWork = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  const dailyWorkId = req.params.id;
  const dailyWork = await user.dailyTask.find(
    (dailyWork) => dailyWork._id.toString() === dailyWorkId
  );
  if (!dailyWork) {
    return next(new ErrorHandler('Daily Work not found', 404));
  }

  //remove dailyWork from user's dailyTask array
  user.dailyTask.pull(dailyWork);

  user.dailyIncomeBalance += 5;
  user.incomeBalance += 5;
  createTransaction(user._id, 'cashIn', 5, 'Daily Work');
  await user.save();
  res.status(200).json({
    success: true,
    message: 'Daily Work Submit successfully',
  });
});

// auto generate daily works for every user at 12:00 AM everyday
module.exports.autoGenerateDailyWorks2 = catchAsyncErrors(
  async (req, res, next) => {
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const dailyWorks = await DailyWork.find();
      for (let j = 0; j < dailyWorks.length; j++) {
        const dailyWork = dailyWorks[j];
        user.dailyTask.push(dailyWork);
        await user.save();
      }
    }
    res.status(201).json({
      success: true,
      message: 'Daily Works generated successfully',
    });
  }
);

// auto generate daily works for logedin user at 12:00 AM everyday
module.exports.autoGenerateDailyWorks = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    // check user dailyIncomeBalance == 0
    if (user.dailyIncomeBalance === 0) {
      const dailyWorks = await DailyWork.find();
      for (let i = 0; i < dailyWorks.length; i++) {
        const dailyWork = dailyWorks[i];
        user.dailyTask.push(dailyWork);
        await user.save();
      }
    }

    //check is time is 12:00 AM
    const today = new Date();
    const hour = today.getHours();
    if (hour === 0) {
      const dailyWorks = await DailyWork.find();
      for (let i = 0; i < dailyWorks.length; i++) {
        const dailyWork = dailyWorks[i];
        user.dailyTask.push(dailyWork);
        await user.save();
      }
    }

    if (hour > 0) {
      console.log('hour', hour);
    }

    res.status(201).json({
      success: true,
      message: 'Daily Works generated successfully',
    });
  }
);

// generate daily works for new user for the first time
module.exports.newUserDailyWorks = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // check user isNewUser false
  if (user.isNewUser === false) {
    return next(new ErrorHandler('User is not new user', 400));
  }

  // check user dailyIncomeBalance == 0 && dailyTask is empty
  if (user.isNewUser) {
    const dailyWorks = await DailyWork.find();
    for (let i = 0; i < dailyWorks.length; i++) {
      const dailyWork = dailyWorks[i];
      user.dailyTask.push(dailyWork);
    }
    user.isNewUser = false; //set user isNewUser to false
    await user.save();
  }

  res.status(201).json({
    success: true,
    message: 'Daily Works generated successfully',
  });
});

// get daily works by user tasksLimit with shuffle
module.exports.getDailyWorks = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  // chack user userHasPackage is true
  if (user.userHasPackage === false) {
    return next(new ErrorHandler('User has no package', 400));
  }

  // check users dailyTask length
  if (user.tasksLimit === 0) {
    return next(new ErrorHandler('User has no daily works', 400));
  }
  // find dailyworks with shuffle with limit
  const dailyWorks = await DailyWork.find().limit(user.tasksLimit);
  const dailyWorksShuffle = dailyWorks.sort(() => Math.random() - 0.5);

  res.status(200).json({
    success: true,
    dailyWorksShuffle,
  });
});

//====================================================================================
//=================== update logged in user's tasksLimit by daily works ==============
//====================================================================================

module.exports.updateTasksLimit = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // check user tasksLimit is not 0
  // if (user.tasksLimit === 0) {
  //   return next(new ErrorHandler('User has no daily works', 400));
  // }

  // const numValue = Number(Math.floor(user.incomeBalance));
  // const newValue = Number(
  //   Math.ceil((numValue * 0.036) / user.packageTaskLimit)
  // );
  // console.log('newValue', newValue);

  if (user.tasksLimit === 1) {
    // update user taskValue

    user.isCompleted = true;
    user.totalWorkingDays += 1;
    // console.log(
    //   'days',

    //   user.totalWorkingDays
    // );
  }

  if (user.tasksLimit > 0) {
    user.tasksLimit = user.tasksLimit - 1;
    // update user's dailyIncomeBalance
    user.dailyIncomeBalance += user.usrTaskValue;
    user.incomeBalance += user.usrTaskValue;
    createTransaction(
      user._id,
      'cashIn',
      user.usrTaskValue,
      `Daily Work ${new Date().toLocaleDateString()}`,
      'daily_work'
    );
  }
  await user.save();

  // check user isCompleted is true
  if (user.isCompleted) {
    // find sponsor of user
    const sponsor = await User.findById(user.sponsorBy);
    // update sponsor's dailyIncomeBalance
    sponsor.dailyIncomeBalance +=
      user.usrTaskValue * 0.05 * user.packageTaskLimit;
    sponsor.incomeBalance += user.usrTaskValue * 0.05 * user.packageTaskLimit;
    sponsor.firstGenBonus += user.usrTaskValue * 0.05 * user.packageTaskLimit;
    createTransaction(
      sponsor._id,
      'cashIn',
      user.usrTaskValue * 0.05 * user.packageTaskLimit,
      `Daily Work by 1st Gen 5% ${user.userName} `,
      '1st_gen'
    );
    await sponsor.save();

    // find parent of user
    const parent = await User.findById(user.parent);
    console.log('parent', parent.userName);
    // update parent's dailyIncomeBalance
    parent.dailyIncomeBalance +=
      user.usrTaskValue * 0.025 * user.packageTaskLimit;
    parent.incomeBalance += user.usrTaskValue * 0.025 * user.packageTaskLimit;
    parent.secondGenBonus += user.usrTaskValue * 0.025 * user.packageTaskLimit;

    createTransaction(
      parent._id,
      'cashIn',
      user.usrTaskValue * 0.025 * user.packageTaskLimit,
      `Daily Work by 2nd Gen 2.5% ${user.userName} `,
      '2nd_gen'
    );
    await parent.save();

    console.log('sponsor', sponsor.userName, 'parent', parent.userName);
  }

  res.status(200).json({
    success: true,
    message: 'Task Completed Successfully',
  });
});

// update user's tasksLimit by package tasksLimit
module.exports.updateTasksLimitByPackage = catchAsyncErrors(
  async (req, res, next) => {
    console.log('Hello');
    // find all users tasksLimit === 0
    const users = await User.find({ tasksLimit: 0 });
    console.log(users.length);
    if (!users) {
      return next(new ErrorHandler('User not found', 404));
    }
    // update users tasksLimit by package tasksLimit
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      user.tasksLimit = user.packageTaskLimit;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Task Completed Successfully',
      users: users.length,
    });
  }
);

// get user's today transaction
module.exports.getTodayTransaction = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }
    // check user userHasPackage is true
    if (user.userHasPackage === false) {
      return next(new ErrorHandler('User has no package', 400));
    }

    // check users dailyTask length
    if (user.tasksLimit === 0) {
      return next(new ErrorHandler('User has no daily works', 400));
    }
    // find dailyworks with shuffle with limit
    const todayTransaction = await Transaction.find({
      userId: user._id,
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    // today total income
    let todayTotalIncome = 0;
    for (let i = 0; i < todayTransaction.length; i++) {
      todayTotalIncome += todayTransaction[i].amount;
    }

    res.status(200).json({
      success: true,
      todayTransaction,
    });
  }
);
