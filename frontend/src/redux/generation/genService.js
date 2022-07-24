import axios from 'axios';

// get login user generations length
const getGenerationsLength = async () => {
  const response = await axios.get(`/api/v1/generation-length`);
  return response.data;
};

// first generation
const getFirstGeneration = async () => {
  const response = await axios.get(`/api/v1/placement1`);
  return response.data;
};

// second generation
const getSecondGeneration = async () => {
  const response = await axios.get(`/api/v1/placement2`);
  return response.data;
};

const genService = {
  getGenerationsLength,
  getFirstGeneration,
  getSecondGeneration,
};

export default genService;
