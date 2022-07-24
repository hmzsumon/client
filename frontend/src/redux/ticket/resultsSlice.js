import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  tickets: [],
  draw: {},
};

//  get tickets by draw date
export const getTicketsByDrawDate = createAsyncThunk(
  'ticket/getTicketsByDrawDate',
  async (date, thunkAPI) => {
    try {
      return await ticketService.getTicketsByDrawDate(date);
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

// slice for result
const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsByDrawDate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTicketsByDrawDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.tickets = action.payload.tickets;
        state.draw = action.payload.draw;
      })
      .addCase(getTicketsByDrawDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});

export const { reset } = resultsSlice.actions;
export default resultsSlice.reducer;
