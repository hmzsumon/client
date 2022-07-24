import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import withdrawService from './withdrawService';

const initialState = {
  isError: false,
  isLoading: false,
  isWithdraw: false,
  withdraw: {},
  message: '',
  withdraws: [],
  pendingWithdraws: [],
  appError: false,
  appMessage: '',
  appLoading: false,
  appSuccess: false,
};

// create withdraw request
export const createWithdraw = createAsyncThunk(
  'withdraw/createWithdraw',
  async (withdraw, thunkAPI) => {
    try {
      return await withdrawService.createWithdraw(withdraw);
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

// get loged in user withdraws
export const getUserWithdraws = createAsyncThunk(
  'withdraw/getUserWithdraws',
  async () => {
    try {
      return await withdrawService.getUserWithdraws();
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

// get agent withdraws
export const getAgentWithdraws = createAsyncThunk(
  'withdraw/getAgentWithdraws',
  async () => {
    try {
      return await withdrawService.getAgentWithdraws();
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

// get a single withdraw
export const getWithdraw = createAsyncThunk(
  'withdraw/getWithdraw',
  async (withdrawId) => {
    try {
      return await withdrawService.getWithdraw(withdrawId);
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

// approve withdraw request by agent
export const approveWithdraw = createAsyncThunk(
  'withdraw/approveWithdraw',
  async (data) => {
    try {
      return await withdrawService.approveWithdraw(data);
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

export const withdrawSlice = createSlice({
  name: 'withdraw',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isWithdraw = false;
      state.appError = false;
      state.appLoading = false;
      state.appSuccess = false;
      state.message = '';
      state.appMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWithdraw.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createWithdraw.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isWithdraw = action.payload.success;
        state.withdraw = action.payload.withdraw;
        state.message = action.payload.message;
      })
      .addCase(createWithdraw.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(getUserWithdraws.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserWithdraws.fulfilled, (state, action) => {
        state.isLoading = false;
        state.withdraws = action.payload.withdraws;
      })
      .addCase(getUserWithdraws.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(getAgentWithdraws.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAgentWithdraws.fulfilled, (state, action) => {
        state.isLoading = false;
        state.withdraws = action.payload.withdraws;
        state.pendingWithdraws = action.payload.pendingWithdraws;
      })
      .addCase(getAgentWithdraws.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(getWithdraw.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWithdraw.fulfilled, (state, action) => {
        state.isLoading = false;
        state.withdraw = action.payload.withdraw;
      })
      .addCase(getWithdraw.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(approveWithdraw.pending, (state, action) => {
        state.appLoading = true;
      })
      .addCase(approveWithdraw.fulfilled, (state, action) => {
        state.appLoading = false;
        state.appSuccess = action.payload.success;
        state.appMessage = action.payload.message;
      })
      .addCase(approveWithdraw.rejected, (state, action) => {
        state.appLoading = false;
        state.appError = action.payload;
      });
  },
});

export const { reset } = withdrawSlice.actions;

export default withdrawSlice.reducer;
