import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  agents: [],
  agent: {},
};

// get all agents
export const getAllAgents = createAsyncThunk(
  'auth/getAllAgents',
  async (thunkAPI) => {
    try {
      return await authService.getAllAgents();
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

// create agent
export const agentCreate = createAsyncThunk(
  'auth/agentCreate',
  async (agentData, thunkAPI) => {
    try {
      return await authService.agentCreate(agentData);
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

// slice for agent
export const agentsSlice = createSlice({
  name: 'agents',
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
      .addCase(getAllAgents.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllAgents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.message = action.payload.message;
        state.agents = action.payload.agents;
      })
      .addCase(getAllAgents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      })
      .addCase(agentCreate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(agentCreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.message = 'Agent created successfully';
        state.agent = action.payload.agent;
      })
      .addCase(agentCreate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
      });
  },
});

export const { reset } = agentsSlice.actions;

export default agentsSlice.reducer;
