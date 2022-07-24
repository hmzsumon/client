import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import depositService from './depositService';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  deposits: [],
};

// create deposit request
export const depositRequest = createAsyncThunk(
  'deposit/depositRequest',
  async (depositData, thunkAPI) => {
    try {
      return await depositService.depositRequest(depositData);
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

// get logged in user's deposit requests
export const getDeposits = createAsyncThunk(
  'deposit/getDeposits',
  async (thunkAPI) => {
    try {
      return await depositService.getDeposits();
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

// send money to user
export const sendMoney = createAsyncThunk(
  'deposit/sendMoney',
  async (depositData, thunkAPI) => {
    try {
      return await depositService.sendMoney(depositData);
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

// slice
export const depositSlice = createSlice({
  name: 'deposit',
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
      .addCase(depositRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(depositRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        console.log(action.payload);
        state.message = 'Deposit request has been sent successfully';
      })
      .addCase(depositRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getDeposits.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDeposits.fulfilled, (state, action) => {
        state.isLoading = false;

        state.deposits = action.payload.deposits;
      })
      .addCase(getDeposits.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.isSuccess = false;
        state.deposits = [];
      })
      .addCase(sendMoney.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendMoney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = 'Money has been sent successfully';
      })
      .addCase(sendMoney.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = depositSlice.actions;
export default depositSlice.reducer;
