const express = require('express');
const {
  seedAgent,
  deleteAllAgents,
  getAllAgents,
  createAgent,
} = require('../controllers/agentController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
// seed
router
  .route('/agent')
  .post(isAuthenticatedUser, authorizeRoles('admin'), seedAgent);

// create agent
router.route('/agent/create').post(isAuthenticatedUser, createAgent);

// get all agents
router.route('/agents').get(getAllAgents);

// delete agents
router
  .route('/agent/delete')
  .post(isAuthenticatedUser, authorizeRoles('admin'), deleteAllAgents);

module.exports = router;
