const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

const createTransaction = require('../utils/txn');
const Placement = require('../models/PlacementModel');

const seedUsers = [
  {
    userName: 'admin',
    role: 'admin',
    status: 'active',
    password: '@@363636@@',
    creditBalance: 1000,
    email: 'egroupwork1@gmail.com',
    firstName: 'E-Group',
    lastName: 'Work',
    fullName: 'E-Group Work',
    country: 'Bangladesh',
    address: 'Dhaka',
    city: 'Dhaka',
    state: 'Gulshan',
    zip: '391710',
    phoneNumber: '01843634929',
  },
  {
    userName: 'euser',
    role: 'user',
    status: 'active',
    password: '@@363636@@',
    creditBalance: 100000,
    incomeBalance: 1000,
    email: 'egroupwork1@gmail.com',
    firstName: 'E-Group',
    lastName: 'User',
    fullName: 'E-Group User',
    country: 'Russia',
    address: '63467 8th Place',
    city: 'Zavitinsk',
    state: 'Rhône-Alpes',
    zip: '391710',
    phoneNumber: '01843634929',
    referCode: '01843634929',
  },
];

// seed user
exports.seedUser = catchAsyncErrors(async (req, res, next) => {
  // create seed users
  const users = await User.create(seedUsers);
  // create placements for each user
  const placements = seedUsers.map((user) => {
    Placement.create({
      userId: user._id,
      userName: user.userName,
      firstGen: [],
      secondGen: [],
    });
  });

  res.status(201).json({
    status: 'success',
    users,
  });
});

// test
exports.registerUser2 = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 200, res);
});

// ==========================================================
// ===================== register user ========================
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { userName, password, phoneNumber, fullName, referCode } = req.body;

  // check if userName already exists
  const user = await User.findOne({ userName });
  if (user) {
    return next(new ErrorHandler('User already exists', 400));
  }

  // check phoneNumber already exists
  const phone = await User.findOne({ phoneNumber });
  if (phone) {
    return next(new ErrorHandler('Phone number already exists', 400));
  }

  // find sponsor by referCode
  const sponsor = await User.findById(referCode);
  if (!sponsor) {
    return next(new ErrorHandler('Invalid refer code', 400));
  }

  const parentId = sponsor.sponsorBy ? sponsor.sponsorBy : sponsor._id;

  // find parent
  const parent = await User.findById(parentId);
  if (!parent) {
    return next(new ErrorHandler('Parent not found', 400));
  }

  // find sponsor's placement
  const sponsorPlacement = await Placement.findOne({
    userName: sponsor.userName,
  });
  if (!sponsorPlacement) {
    return next(new ErrorHandler('Sponsor not found', 400));
  }

  //find parent's placement
  const parentPlacement = await Placement.findOne({
    userName: parent.userName,
  });
  if (!parentPlacement) {
    return next(new ErrorHandler('Parent not found', 400));
  }

  // generate unique refer code by phoneNumber remove + and spaces
  const referCode2 = phoneNumber.replace(/\D/g, '');

  const newUser = await User.create({
    userName,
    password,
    phoneNumber,
    fullName,
    sponsorName: sponsor.userName,
    referCode: referCode2,
    sponsorBy: sponsor._id,
    parent: parent._id,
  });

  // create placement
  await Placement.create({
    userName: userName,
    firstGen: [],
    secondGen: [],
  });

  // placement firstGen
  sponsorPlacement.firstGen.push(userName);
  await sponsorPlacement.save();

  parentPlacement.secondGen.push(userName);
  await parentPlacement.save();

  // save new user to sponsor member

  sponsor.totalMembers += 1;
  await sponsor.save();

  // save new user to parent member
  parent.totalMembers += 1;
  await parent.save();

  sendToken(newUser, 200, res);
});

// create user
exports.selfCreateUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const refer_id = userId;

  const { userName, placement, password } = req.body;

  const place = placement;

  // check if userName already exists
  const existUser = await User.findOne({ userName });
  if (existUser) {
    return next(new ErrorHandler('User already exists', 400));
  }

  // create placement for new user
  await Placement.create({
    userId,
    userName,
    placements: [
      { placement: 'a', members: [] },
      { placement: 'b', members: [] },
      { placement: 'c', members: [] },
      { placement: 'd', members: [] },
      { placement: 'e', members: [] },
    ],
  });

  // sponsor
  const sponsor = await User.findOne({ _id: refer_id });
  if (!sponsor) {
    return next(new ErrorHandler('Sponsor not found', 400));
  }

  // check sponsor credit balance less than 15
  if (sponsor.creditBalance < 1000) {
    return next(new ErrorHandler('Sponsor credit balance less than 15', 400));
  }

  sponsor.totalMembers += 1;
  sponsor.creditBalance -= 1000;
  createTransaction(
    sponsor,
    'cashOut',
    15,
    `Create New Member ${userName} placed in ${place}`
  );

  // update bonus balance
  sponsor.referralBonus += 1000 * 0.1;
  sponsor.bonusBalance += 1000 * 0.1;
  sponsor.incomeBalance += 1000 * 0.1;
  createTransaction(sponsor._id, 'cashIn', 1000 * 0.1, 'Referral bonus');

  await sponsor.save();

  // check if userName already exists
  const user = await User.findOne({ userName });
  if (user) {
    return next(new ErrorHandler('User already exists', 400));
  }

  const newUser = await User.create({
    userName,
    password,
    email: sponsor.email,
    phoneNumber: sponsor.phoneNumber,
    firstName: sponsor.firstName,
    lastName: sponsor.lastName,
    fullName: sponsor.fullName,
    country: sponsor.country,
    city: sponsor.city,
    address: sponsor.address,
    state: sponsor.state,
    zip: sponsor.zip,
    facebook: sponsor.facebook,
    sponsorBy: refer_id,
    status: 'active',
  });

  // find parent placement
  const parentNode = await Placement.findOne({
    userName: sponsor.userName,
  });

  console.log('parentNode', parentNode);

  // find placement by place
  const placementNode = parentNode.placements.find((placement) => {
    return placement.placement === place;
  });

  // update placementNode members
  placementNode.members.push(newUser.userName);
  await parentNode.save();

  res.status(201).json({
    success: true,
    message: 'User created successfully',
  });
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { userName, password } = req.body;

  // checking if user has password and email
  if (!userName || !password) {
    return next(new ErrorHandler('Please provide email and password', 400));
  }
  const user = await User.findOne({ userName }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid credentials', 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Incorrect userName or password', 401));
  }

  sendToken(user, 200, res);
});

// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json({
    status: 'success',
    user: user._id,
  });
});

// updated user details
exports.updatedUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  res.status(200).json({
    status: 'success',
    updatedUser: user,
  });
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

// refer test
exports.referTest = catchAsyncErrors(async (req, res, next) => {
  const refer_id = req.query.refer_id;
  const placement = req.query.placement;
  console.log(refer_id);
  res.status(200).json({
    status: 'success',
    refer_id,
    placement,
  });
});

// get logged in users members
exports.getMembers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: '62879208cf464505c47cedcf' });
  const placement = 'e';

  const memberDetails = User.findOne({ userName: 'refertes' });
  console.log(memberDetails);

  res.status(200).json({
    status: 'success',

    memberDetails,
  });
});

// activate a user
exports.activateUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }

  //check status
  if (user.status === 'active') {
    return next(new ErrorHandler('User already activated', 400));
  }
  // check user balance
  if (user.creditBalance < 1000) {
    return next(new ErrorHandler('Insufficient balance', 400));
  }
  user.creditBalance -= 1000;
  user.status = 'active';
  createTransaction(userId, 'cashOut', 1000, 'Activation fee');
  await user.save();

  // find sponsor
  const sponsor = await User.findById(user.sponsorBy);
  if (!sponsor) {
    return next(new ErrorHandler('Sponsor not found', 400));
  }
  sponsor.referralBonus += 1000 * 0.1;
  sponsor.bonusBalance += 1000 * 0.1;
  sponsor.incomeBalance += 1000 * 0.1;
  createTransaction(sponsor._id, 'cashIn', 1000 * 0.1, 'Referral bonus');
  await sponsor.save();

  res.status(200).json({
    success: true,
    message: 'User activated successfully',
  });
});

// invite user
exports.inactive = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }

  user.status = 'inactive';
  await user.save();
  res.status(200).json({
    success: true,
    message: 'User inactive successfully',
  });
});

// search user by userName
exports.searchUser = catchAsyncErrors(async (req, res, next) => {
  const userName = req.query.userName;

  const user = await User.findOne({ userName });
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }

  res.status(200).json({
    success: true,
    user: user,
  });
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { email, phoneNumber, country, city, address, state, zip } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }

  user.email = email;
  user.phoneNumber = phoneNumber;
  user.city = city;
  user.address = address;
  user.state = state;
  user.zip = zip;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User profile updated successfully',
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('password does not match', 400));
  }

  // check password same as old password
  if (req.body.newPassword === req.body.oldPassword) {
    return next(new ErrorHandler('New password is same as old password', 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});

// find logged in user all placement members
exports.getPlacementMembers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }

  // find placement
  const placement = user.members;

  const members = [];
  for (const key in placement) {
    if (placement.hasOwnProperty(key)) {
      const element = placement[key];
      for (const item of element) {
        const member = await User.findOne({ userName: item });
        members.push(member);
      }
    }
  }

  // get a single member
  const member = members[0];

  res.status(200).json({
    success: true,
    member,
  });
});

// get placement by placement id
exports.getPlacement = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }
  const placementId = req.params.placementId;
  const placement = user.members[placementId];
  const members = [];
  for (const item of placement) {
    const member = await User.findOne({ userName: item });
    members.push(member);
  }

  const totalMembers = members.length;

  res.status(200).json({
    success: true,
    placement,
    members,
    totalMembers,
  });
});

// generate binary tree
exports.generateBinaryTree1 = catchAsyncErrors(async (req, res, next) => {
  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  const a = new TreeNode({
    userName: 'rajU',
  });
  const b = new TreeNode({
    userName: 'nil',
  });
  const c = new TreeNode({
    userName: 'zakir',
  });
  const d = new TreeNode('d');
  const e = new TreeNode('e');
  const f = new TreeNode('f');
  const g = new TreeNode('g');
  const h = new TreeNode('h');
  const i = new TreeNode('i');
  const j = new TreeNode('j');
  const k = new TreeNode('k');

  a.left = b;
  a.right = c;

  b.left = d;
  b.right = e;

  c.left = f;

  d.left = g;
  d.right = h;

  e.left = i;
  e.right = k;

  f.left = j;

  // get all nodes list
  const nodes = [];
  const getNodes = (node) => {
    if (node) {
      nodes.push(node);
      getNodes(node.left);
      getNodes(node.right);
    }
  };
  getNodes(a);

  // get all nodes value
  const values = [];
  const getValues = (node) => {
    if (node) {
      values.push(node.value);
      getValues(node.left);
      getValues(node.right);
    }
  };
  getValues(a);

  // get all nodes level
  const levels = [];
  const getLevels = (node, level) => {
    if (node) {
      if (!levels[level]) {
        levels[level] = [];
      }
      levels[level].push(node.value);
      getLevels(node.left, level + 1);
      getLevels(node.right, level + 1);
    }
  };

  getLevels(a, 0);

  // get node length
  const nodeLength = nodes.length;

  // get length of each level
  const levelLength = [];
  const getLevelLength = (node, level) => {
    if (node) {
      if (!levelLength[level]) {
        levelLength[level] = 0;
      }
      levelLength[level]++;
      getLevelLength(node.left, level + 1);
      getLevelLength(node.right, level + 1);
    }
  };
  getLevelLength(a, 0);

  // get length of b node
  const bLength = [];
  const getBLength = (node, level) => {
    if (node) {
      if (node.value === 'b') {
        bLength.push(level);
      }
      getBLength(node.left, level + 1);
      getBLength(node.right, level + 1);
    }
  };
  getBLength(a, 3);

  // find root node
  const rootNode = nodes[0];

  res.status(200).json({
    success: true,
    message: 'Binary tree generated successfully',
    rootNode,
  });
});

exports.generateBinaryTree = catchAsyncErrors(async (req, res, next) => {
  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  const a = new TreeNode({
    userName: 'user_a',
  });

  const b = new TreeNode({
    userName: 'user_B',
  });

  const c = new TreeNode({
    userName: 'user_C',
  });

  const d = new TreeNode({
    userName: 'user_D',
  });

  const e = new TreeNode({
    userName: 'user_E',
  });

  const f = new TreeNode({
    userName: 'user_F',
  });

  const g = new TreeNode({
    userName: 'user_G',
  });

  const h = new TreeNode({
    userName: 'user_H',
  });

  a.left = b;
  a.right = c;

  b.left = d;
  b.right = e;

  c.right = f;

  d.left = g;
  d.right = h;

  // get all nodes list
  const nodes = [];
  const getNodes = (node) => {
    if (node) {
      nodes.push(node);
      getNodes(node.left);
      getNodes(node.right);
    }
  };

  getNodes(e);

  // get node length
  const nodeLength = nodes.length;

  res.status(200).json({
    success: true,
    message: 'Binary tree generated successfully',
    nodes,
    nodeLength,
  });
});

// ==========================================================================================
// =======================get logged in user generations length=============================
exports.getGenerationsLength = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }
  const placement = await Placement.findOne({ userName: user.userName });
  if (!placement) {
    return next(new ErrorHandler('Placement not found', 400));
  }

  // 1st generation
  const firstGeneration = placement.firstGen;
  const firstGenerationLength = firstGeneration.length;

  //2nd generation
  const secondGeneration = placement.secondGen;
  const secondGenerationLength = secondGeneration.length;

  res.status(200).json({
    success: true,
    firstGenerationLength,
    secondGenerationLength,
  });
});

// ==========================================================================================
// =======================get logged in user placement 1st generation========================
exports.getPlacement1 = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }
  const placement = await Placement.findOne({ userName: user.userName });
  if (!placement) {
    return next(new ErrorHandler('Placement not found', 400));
  }

  // 1st generation
  const firstGens = [];
  for (const item of placement.firstGen) {
    const member = await User.findOne({ userName: item }).populate('userName');
    if (!member) {
      continue;
    }
    firstGens.push(member);
  }

  res.status(200).json({
    success: true,
    firstGens,
  });
});

// ==========================================================================================
// =======================get logged in user placement 2st generation========================
exports.getPlacement2 = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }
  const placement = await Placement.findOne({ userName: user.userName });
  if (!placement) {
    return next(new ErrorHandler('Placement not found', 400));
  }

  // 1st generation
  const secondGens = [];
  for (const item of placement.secondGen) {
    const member = await User.findOne({ userName: item }).populate('userName');
    if (!member) {
      continue;
    }
    secondGens.push(member);
  }

  res.status(200).json({
    success: true,
    secondGens,
  });
});

// ==========================================================================================
// =======================Forgot Password========================

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander('User not found', 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// update User password
exports.updatePasswordAdmin = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId).select('+password');
  if (!user) {
    return next(new ErrorHandler('User not found', 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});
