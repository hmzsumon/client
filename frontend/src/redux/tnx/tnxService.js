import axios from 'axios';

// get logged in users transactions
const getLoggedInUserTnxs = async () => {
  const response = await axios.get('/api/v1/user/tnx');
  return response.data;
};

const tnxService = {
  getLoggedInUserTnxs,
};

export default tnxService;
