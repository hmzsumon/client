import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
  isError: false,
  isLoading: false,
  isBuyLoading: false,
  isSuccess: false,
  isBuy: false,
  message: '',
  tickets: [],
  ticket: {},
  userTickets: [],
  luckyBoxes: [],
};

// get tickets with limit
export const getTickets = createAsyncThunk(
  'ticket/getTickets',
  async (limit, thunkAPI) => {
    try {
      return await ticketService.getTickets(limit);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// byd a ticket by id
export const buyTicket = createAsyncThunk(
  'ticket/buyTicket',
  async (id, thunkAPI) => {
    try {
      return await ticketService.buyTicket(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get logged in user's tickets
export const getUserTickets = createAsyncThunk(
  'ticket/getUserTickets',
  async (thunkAPI) => {
    try {
      return await ticketService.getUserTickets();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get logged in user lucky box
export const getUserLuckyBoxes = createAsyncThunk(
  'ticket/getUserLuckyBoxes',
  async (thunkAPI) => {
    try {
      return await ticketService.getUserLuckyBoxes();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// open lucky box
export const openLuckyBox = createAsyncThunk(
  'ticket/openLuckyBox',
  async (id, thunkAPI) => {
    try {
      return await ticketService.openLuckyBox(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// slice for ticket
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isBuy = false;
      state.isBuyLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.tickets = action.payload.tickets;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(buyTicket.pending, (state, action) => {
        state.isBuyLoading = true;
      })
      .addCase(buyTicket.fulfilled, (state, action) => {
        state.isBuyLoading = false;
        state.isBuy = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(buyTicket.rejected, (state, action) => {
        state.isBuyLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(getUserTickets.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.userTickets = action.payload.tickets;
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(getUserLuckyBoxes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserLuckyBoxes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.luckyBoxes = action.payload.luckyBoxes;
      })
      .addCase(getUserLuckyBoxes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(openLuckyBox.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(openLuckyBox.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(openLuckyBox.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
