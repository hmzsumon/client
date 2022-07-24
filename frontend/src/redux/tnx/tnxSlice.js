import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tnxService from './tnxService';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  tnxs: [],
  tnx: {},
  tnxCount: 0,
};

// get logged in users transactions
export const getLoggedInUserTnxs = createAsyncThunk(
  'tnx/getLoggedInUserTnxs',
  async () => {
    try {
      const response = await tnxService.getLoggedInUserTnxs();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  }
);

// tnx slice
export const tnxSlice = createSlice({
  name: 'tnx',
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
      .addCase(getLoggedInUserTnxs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInUserTnxs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.tnxs = action.payload.transactions;
        state.tnxCount = action.payload.tnxCount;
      })
      .addCase(getLoggedInUserTnxs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});

export const { reset } = tnxSlice.actions;

export default tnxSlice.reducer;
