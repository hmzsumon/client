import axios from 'axios';

// get tickets with limit and offset
const getTickets = async (limit) => {
  const response = await axios.get(`/api/v1/tickets?limit=${limit}`);
  return response.data;
};

// buy a ticket by id
const buyTicket = async (id) => {
  const response = await axios.post(`/api/v1/ticket/buy/${id}`);
  return response.data;
};

// get logged in user's tickets
const getUserTickets = async () => {
  const response = await axios.get('/api/v1/user/tickets');

  return response.data;
};

// get logged in user lucky box
const getUserLuckyBoxes = async () => {
  const response = await axios.get('/api/v1/user/lucky-boxes');
  return response.data;
};

// open lucky box
const openLuckyBox = async (id) => {
  const response = await axios.get(`/api/v1/lucky-boxes/${id}`);
  return response.data;
};

// get tickets by draw date
const getTicketsByDrawDate = async (date) => {
  const response = await axios.get(`/api/v1/raffle-draw?date=${date}`);
  return response.data;
};

const ticketService = {
  getTickets,
  buyTicket,
  getUserTickets,
  getUserLuckyBoxes,
  openLuckyBox,
  getTicketsByDrawDate,
};

export default ticketService;
