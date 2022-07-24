const express = require('express');
const router = express.Router();
const {
  createDeposit,
  getDeposits,
  sendMoney,
} = require('../controllers/depositController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
// create deposit request
router.post('/deposit', isAuthenticatedUser, createDeposit);

router.get('/deposits', isAuthenticatedUser, getDeposits);

// send money to user
router.post('/send-money', isAuthenticatedUser, sendMoney);

module.exports = router;
