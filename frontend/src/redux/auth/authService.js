import axios from 'axios';

// register user
const register = async (userData) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const response = await axios.post(
    `/api/v1/register?refer_id=${params.refer_id}&place=${params.place}`,
    userData
  );
  if (response.data) {
    localStorage.setItem('userId', JSON.stringify(response.data));
  }
  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post('/api/v1/login', userData);
  if (response.data) {
    localStorage.setItem('userId', JSON.stringify(response.data));
  }
  return response.data;
};

// load user
const loadUser = async () => {
  const response = await axios.get('/api/v1/me');
  return response.data;
};

// logout user
const logout = async () => {
  const response = await axios.get('/api/v1/logout');
  localStorage.removeItem('user');
  return response.data;
};

// activate user
const activate = async () => {
  const response = await axios.get('/api/v1/activate');
  // console.log(response.data);
  return response.data;
};

// get updated user details
const getUpdatedUserDetails = async () => {
  const response = await axios.get('/api/v1/updated-user');
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//get all agents
const getAllAgents = async () => {
  const response = await axios.get('/api/v1/agents');
  return response.data;
};

// search user by userName
const searchUser = async (userName) => {
  const response = await axios.get(`/api/v1/user/search?userName=${userName}`);
  return response.data;
};

// update profile
const updateProfile = async (userData) => {
  const response = await axios.put('/api/v1/user/update', userData);
  return response.data;
};

// update user password
const updatePassword = async (password) => {
  const response = await axios.put('/api/v1/user/update-password', password);
  return response.data;
};

// agent create
const agentCreate = async (agentData) => {
  const response = await axios.post('/api/v1/agent/create', agentData);
  return response.data;
};

// create user
const createUser = async (userData) => {
  const response = await axios.post('/api/v1/user/create', userData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  loadUser,
  activate,
  getUpdatedUserDetails,
  getAllAgents,
  searchUser,
  updateProfile,
  updatePassword,
  agentCreate,
  createUser,
};

export default authService;
