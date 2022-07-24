import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import workService from './workService';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  dailyWorks: [],
};

// delete a daily work from logged in user's dailyTask array
export const deleteDailyWork = createAsyncThunk(
  'dailyWork/deleteDailyWork',
  async (dailyWorkId) => {
    try {
      return await workService.removeDailyWork(dailyWorkId);
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

// generate daily works for new user for the first time
export const newUserDailyWorks = createAsyncThunk(
  'dailyWork/newUserDailyWorks',
  async () => {
    try {
      return await workService.newUserDailyWorks();
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

// get daily works
export const getDailyWorks = createAsyncThunk(
  'dailyWork/getDailyWorks',
  async () => {
    try {
      return await workService.getDailyWorks();
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

// update tasks limit
export const updateTasksLimit = createAsyncThunk(
  'dailyWork/updateTasksLimit',
  async () => {
    try {
      return await workService.updateTasksLimit();
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

// slice for daily work
export const dailyWorkSlice = createSlice({
  name: 'dailyWork',
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
      .addCase(deleteDailyWork.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteDailyWork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.isError = false;
      })
      .addCase(deleteDailyWork.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(newUserDailyWorks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(newUserDailyWorks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.isError = false;
      })
      .addCase(newUserDailyWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(getDailyWorks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDailyWorks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.dailyWorks = action.payload.dailyWorksShuffle;
        state.isError = false;
      })
      .addCase(getDailyWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(updateTasksLimit.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateTasksLimit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.isError = false;
      })
      .addCase(updateTasksLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});

export const { reset } = dailyWorkSlice.actions;
export default dailyWorkSlice.reducer;
