import axios from 'axios';

// create withdraw request
const createWithdraw = async (withdraw) => {
  const response = await axios.post('/api/v1/withdraw', withdraw);
  return response.data;
};

// get loged in user withdraws
const getUserWithdraws = async () => {
  const response = await axios.get('/api/v1/user/withdraws');
  return response.data;
};

// get agent withdraws
const getAgentWithdraws = async () => {
  const response = await axios.get('/api/v1/agent/withdraws');
  return response.data;
};

// get a single withdraw
const getWithdraw = async (withdrawId) => {
  const response = await axios.get(`/api/v1/withdraw/${withdrawId}`);
  return response.data;
};

// approve withdraw request by agent
const approveWithdraw = async (data) => {
  const response = await axios.put(`/api/v1/withdraw/approve`, data);
  return response.data;
};

const withdrawService = {
  createWithdraw,
  getUserWithdraws,
  getAgentWithdraws,
  getWithdraw,
  approveWithdraw,
};

export default withdrawService;
