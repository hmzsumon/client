const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');
const {
  createDailyWorks,
  selectDailyWork,
  removeDailyWork,
  autoGenerateDailyWorks,
  newUserDailyWorks,
  getDailyWorks,
  updateTasksLimit,
  updateTasksLimitByPackage,
} = require('../controllers/dailyWorkController');

// create daily works
router.route('/dailyWorks').post(isAuthenticatedUser, createDailyWorks);

router.route('/dailyWorks/:id').get(isAuthenticatedUser, selectDailyWork);

// remove a daily work from logged in user's dailyTask array
router.route('/dailyWorks/:id').delete(isAuthenticatedUser, removeDailyWork);

// auto generate daily works
router
  .route('/dailyWorks/autoGenerate')
  .post(isAuthenticatedUser, autoGenerateDailyWorks);

// new user daily works
router
  .route('/dailyWorks/newUser')
  .post(isAuthenticatedUser, newUserDailyWorks);

// get daily works
router.route('/dailyWorks').get(isAuthenticatedUser, getDailyWorks);

// update tasks limit
router.put('/dailyWorks/tasksLimit', isAuthenticatedUser, updateTasksLimit);

// update tasks limit by package
router.put(
  '/dailyWorks/tasksLimitByPackage',
  isAuthenticatedUser,
  updateTasksLimitByPackage
);

module.exports = router;
