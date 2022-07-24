const express = require('express');
const {
  createPackage,
  getAllPackages,
  buyPackage,
  upgradePackage,
} = require('../controllers/packageController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// create a new package
router.post('/create/package', createPackage);
// get all packages
router.get('/packages', getAllPackages);

// buy a package
router.post('/buy/package/:packageId', isAuthenticatedUser, buyPackage);

// upgrade a package
router.post('/upgrade/package/', isAuthenticatedUser, upgradePackage);

module.exports = router;
