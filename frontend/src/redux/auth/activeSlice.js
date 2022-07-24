import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
};

// activate user
export const activate = createAsyncThunk('auth/activate', async (thunkAPI) => {
  try {
    return await authService.activate();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUpdatedUserDetails = createAsyncThunk(
  'auth/getUpdatedUserDetails',
  async (thunkAPI) => {
    try {
      return await authService.getUpdatedUserDetails();
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

export const activeSlice = createSlice({
  name: 'active',
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
      .addCase(activate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(activate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = activeSlice.actions;

export default activeSlice.reducer;
