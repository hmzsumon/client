import axios from 'axios';

// deposit request
const depositRequest = async (depositData) => {
  const response = await axios.post('/api/v1/deposit', depositData);
  return response.data;
};

// get logged in user's deposit requests
const getDeposits = async () => {
  const response = await axios.get(`/api/v1/deposits`);
  return response.data;
};

// send money to user
const sendMoney = async (depositData) => {
  const response = await axios.post('/api/v1/send-money', depositData);
  return response.data;
};

const depositService = {
  depositRequest,
  getDeposits,
  sendMoney,
};

export default depositService;
