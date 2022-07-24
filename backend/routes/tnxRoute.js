const express = require('express');
const { getLoggedInUserTnxs } = require('../controllers/trnxController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

// get logged in users transactions
router.get('/user/tnx', isAuthenticatedUser, getLoggedInUserTnxs);

module.exports = router;
