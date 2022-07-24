const express = require('express');
const { createCompany } = require('../controllers/companyController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router
  .route('/company')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createCompany);

module.exports = router;
