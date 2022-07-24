import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import genService from './genService';

const initialState = {
  isError: false,
  isLoading: false,
  fistGens: [],
  secondGens: [],
  fistGenCount: 0,
  secondGenCount: 0,
};

// get login user generations length
export const getGenerationsLength = createAsyncThunk(
  'generation/getGenerationsLength',
  async () => {
    try {
      return await genService.getGenerationsLength();
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

// first generation
export const getFirstGeneration = createAsyncThunk(
  'generation/getFirstGeneration',
  async () => {
    try {
      return await genService.getFirstGeneration();
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

// second generation
export const getSecondGeneration = createAsyncThunk(
  'generation/getSecondGeneration',
  async () => {
    try {
      return await genService.getSecondGeneration();
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

// slice
const generationSlice = createSlice({
  name: 'generation',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenerationsLength.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGenerationsLength.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fistGenCount = action.payload.firstGenerationLength;
        state.secondGenCount = action.payload.secondGenerationLength;
      })
      .addCase(getGenerationsLength.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(getFirstGeneration.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFirstGeneration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fistGens = action.payload.firstGens;
      })
      .addCase(getFirstGeneration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(getSecondGeneration.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSecondGeneration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.secondGens = action.payload.secondGens;
      })
      .addCase(getSecondGeneration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { reset } = generationSlice.actions;
export default generationSlice.reducer;
