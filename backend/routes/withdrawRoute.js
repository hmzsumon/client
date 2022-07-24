const express = require('express');

const { isAuthenticatedUser } = require('../middleware/auth');
const {
  withdrawRequest,
  getAgentWithdraws,
  getUserWithdraws,
  getWithdraw,
  approveWithdraw,
} = require('../controllers/withdrawController');
const router = express.Router();

// create withdraw request
router.route('/withdraw').post(isAuthenticatedUser, withdrawRequest);

// get withdraws by agentId
router.route('/agent/withdraws').get(isAuthenticatedUser, getAgentWithdraws);

// get users withdraws
router.route('/user/withdraws').get(isAuthenticatedUser, getUserWithdraws);

// get a single withdraw
router.route('/withdraw/:id').get(isAuthenticatedUser, getWithdraw);

// approve withdraw request by agent
router.route('/withdraw/approve').put(isAuthenticatedUser, approveWithdraw);

module.exports = router;
