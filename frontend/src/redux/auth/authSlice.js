import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  userId: localStorage.getItem('userId')
    ? JSON.parse(localStorage.getItem('userId'))
    : {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  isAuthenticated: localStorage.getItem('userId') ? true : false,
  isGetUserLoading: false,
  updatedUser: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  message: '',
  referId: '62c3020874b18555cc01db10',

  isSearchUserLoading: false,
  isSearchSuccess: false,
  isSearchError: false,
  searchMessage: '',
  searchUser: {},
  isUpdateProfileLoading: false,
  isUpdateProfileSuccess: false,
  isUpdateProfileError: false,
  updateProfileMessage: '',
  isUpdatePasswordLoading: false,
  isUpdatePasswordSuccess: false,
  isUpdatePasswordError: false,
  updatePasswordMessage: '',

  // create user
  isCreateUserLoading: false,
  isCreateUserSuccess: false,
  isCreateUserError: false,
  createUserMessage: '',
};

// register user
export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      return await authService.register(data);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// load user
export const loadUser = createAsyncThunk('auth/loadUser', async (thunkAPI) => {
  try {
    return await authService.loadUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get updated user details
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

// logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// search user by userName
export const searchUser = createAsyncThunk(
  'auth/searchUser',
  async (userName, thunkAPI) => {
    try {
      return await authService.searchUser(userName);
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

// update profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, thunkAPI) => {
    try {
      return await authService.updateProfile(userData);
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

// update password
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (userData, thunkAPI) => {
    try {
      return await authService.updatePassword(userData);
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

// create user
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.createUser(userData);
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

// slice for auth
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
      state.isSearchError = false;
      state.isSearchLoading = false;
      state.isSearchSuccess = false;
      state.searchMessage = '';
      state.isUpdateProfileError = false;
      state.isUpdateProfileLoading = false;
      state.isUpdateProfileSuccess = false;
      state.updateProfileMessage = '';
      state.isUpdatePasswordError = false;
      state.isUpdatePasswordLoading = false;
      state.isUpdatePasswordSuccess = false;
      state.updatePasswordMessage = '';
      state.isCreateUserError = false;
      state.isCreateUserLoading = false;
      state.isCreateUserSuccess = false;
      state.createUserMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.user = action.payload.user;
        state.isError = false;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.user = action.payload.user;
        state.isError = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.isSuccess = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loadUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isError = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.isSuccess = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getUpdatedUserDetails.pending, (state, action) => {
        state.isGetUserLoading = true;
      })
      .addCase(getUpdatedUserDetails.fulfilled, (state, action) => {
        state.isGetUserLoading = false;
        state.isSuccess = action.payload.success;
        state.updatedUser = action.payload.updatedUser;
      })
      .addCase(getUpdatedUserDetails.rejected, (state, action) => {
        state.isGetUserLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(searchUser.pending, (state, action) => {
        state.isSearchUserLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isSearchUserLoading = false;
        state.isSearchSuccess = action.payload.success;
        state.searchUser = action.payload.user;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isSearchUserLoading = false;
        state.isSearchError = action.payload;
        state.searchMessage = action.payload;
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.isUpdateProfileLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdateProfileLoading = false;
        state.isUpdateProfileSuccess = action.payload.success;
        state.updateProfileMessage = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdateProfileLoading = false;
        state.isUpdateProfileError = action.payload;
        state.updateProfileMessage = action.payload;
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.isUpdatePasswordLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isUpdatePasswordLoading = false;
        state.isUpdatePasswordSuccess = action.payload.success;
        state.updatePasswordMessage = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isUpdatePasswordLoading = false;
        state.isUpdatePasswordError = action.payload;
        state.updatePasswordMessage = action.payload;
      })
      .addCase(createUser.pending, (state, action) => {
        state.isCreateUserLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateUserLoading = false;
        state.isCreateUserSuccess = action.payload.success;
        state.createUserMessage = ' User created successfully';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreateUserLoading = false;
        state.isCreateUserError = action.payload;
        state.createUserMessage = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
