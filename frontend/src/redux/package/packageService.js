import axios from 'axios';

// get all packages
const getAllPackages = async () => {
  const response = await axios.get('/api/v1/packages');
  return response.data;
};

// buy a package
const buyPackage = async (packageId) => {
  const response = await axios.post(`/api/v1/buy/package/${packageId}`);
  return response.data;
};

// upgrade a package
const upgradePackage = async (amount) => {
  const response = await axios.post(`/api/v1/upgrade/package`, amount);
  return response.data;
};

const packageService = {
  getAllPackages,
  buyPackage,
  upgradePackage,
};

export default packageService;
