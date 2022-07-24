import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import packageService from './packageService';

const initialState = {
  isError: false,
  isLoading: false,
  isBuying: false,
  isBuyLoading: false,
  isBuyError: false,
  isSuccess: false,
  isUpgrade: false,
  message: '',
  packages: [],
};

// get all packages
export const getAllPackages = createAsyncThunk(
  'package/getAllPackages',
  async () => {
    try {
      return await packageService.getAllPackages();
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

// buy a package
export const buyPackage = createAsyncThunk(
  'package/buyPackage',
  async (packageId) => {
    try {
      return await packageService.buyPackage(packageId);
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

// upgrade a package
export const upgradePackage = createAsyncThunk(
  'package/upgradePackage',
  async (amount) => {
    try {
      return await packageService.upgradePackage(amount);
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

// slice for package
const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
      state.isBuying = false;
      state.isBuyLoading = false;
      state.isBuyError = false;
      state.isUpgrade = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPackages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.packages = action.payload.packages;
      })
      .addCase(getAllPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(buyPackage.pending, (state, action) => {
        state.isBuyLoading = true;
      })
      .addCase(buyPackage.fulfilled, (state, action) => {
        state.isBuyLoading = false;
        state.isBuying = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(buyPackage.rejected, (state, action) => {
        state.isBuyLoading = false;
        state.isBuyError = action.payload;
        state.message = action.payload;
      })
      .addCase(upgradePackage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(upgradePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpgrade = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(upgradePackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});

export const { reset } = packageSlice.actions;
export default packageSlice.reducer;
