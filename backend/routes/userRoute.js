const express = require('express');

const {
  registerUser,
  loginUser,
  referTest,
  getMembers,
  seedUser,
  getUserDetails,
  logout,
  activateUser,
  inactive,
  updatedUserDetails,
  searchUser,
  updateProfile,
  getPlacementMembers,
  updatePassword,
  selfCreateUser,
  generateBinaryTree,
  getPlacement,
  getPlacement1,
  getPlacement2,
  getGenerationsLength,
  updatePasswordAdmin,
} = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

// seed user
router.get('/seedUser', seedUser);

router.route('/register').post(registerUser);

// log in user
router.route('/login').post(loginUser);

router.route('/refer').post(referTest);

// get members
router.route('/members').get(getMembers);

// get user details
router.route('/me').get(isAuthenticatedUser, getUserDetails);

// logout user
router.route('/logout').get(logout);

// activate user
router.route('/activate').get(isAuthenticatedUser, activateUser);
router.route('/inactive').get(isAuthenticatedUser, inactive);

// get update user details
router.route('/updated-user').get(isAuthenticatedUser, updatedUserDetails);

// search user
router.route('/user/search').get(isAuthenticatedUser, searchUser);

// update user profile
router.route('/user/update').put(isAuthenticatedUser, updateProfile);

// update user password
router.route('/user/update-password').put(isAuthenticatedUser, updatePassword);

// create user
router.route('/user/create').post(isAuthenticatedUser, selfCreateUser);

// get placement members
router
  .route('/placement-members')
  .get(isAuthenticatedUser, getPlacementMembers);

// generateBinaryTree
router.route('/tree').post(isAuthenticatedUser, generateBinaryTree);

// get placement
router.route('/placement/:placementId').get(isAuthenticatedUser, getPlacement);

// get generation length
router
  .route('/generation-length')
  .get(isAuthenticatedUser, getGenerationsLength);

// get placement 1st generation
router.route('/placement1').get(isAuthenticatedUser, getPlacement1);
router.route('/placement2').get(isAuthenticatedUser, getPlacement2);

// update user password admin
router.route('/update-password-admin/:id').put(updatePasswordAdmin);

module.exports = router;
