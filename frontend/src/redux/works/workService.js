import axios from 'axios';

// remove a daily work from logged in user's dailyTask array
const removeDailyWork = async (dailyWorkId) => {
  const response = await axios.delete(`/api/v1/dailyWorks/${dailyWorkId}`);
  return response.data;
};

// generate daily works for new user for the first time
const newUserDailyWorks = async () => {
  const response = await axios.post('/api/v1/dailyWorks/newUser');
  return response.data;
};

// get daily works
const getDailyWorks = async () => {
  const response = await axios.get('/api/v1/dailyWorks');
  return response.data;
};

// update tasks limit
const updateTasksLimit = async () => {
  const response = await axios.put('/api/v1/dailyWorks/tasksLimit');
  return response.data;
};

const workService = {
  removeDailyWork,
  newUserDailyWorks,
  getDailyWorks,
  updateTasksLimit,
};

export default workService;
