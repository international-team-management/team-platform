import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from 'services/api/authAPI';
import type { RootState } from 'services/store';
import type {
  RegisterRequestData,
  LoginRequestData,
  UpdatePasswordData,
  UserType,
} from 'services/api/types';

// Use cases
// 1. register, post new user data > if ok response > login, post credentials > receive tokens, keep in localStorage > get userMe
// 2. login, post credentials > receive tokens, keep in localStorage > get userMe
// 3. logout > if good response > remove tokens from localStorage without any request to backend

// Types

type AuthStateType = {
  user: null | UserType | undefined;
  isLoading: boolean;
  error: null | unknown | string;
};

// State

const initialState: AuthStateType = {
  user: undefined,
  isLoading: false,
  error: null,
};

// Thunks (async action creators)
// They make a request, then wait a response data, then under the hood make a dispatch(action_creator(data))
//   action_creator(data) generates actions like this {type: 'auth/login/pending', payload: data}

export const authThunks = {
  // Info: Error axios interceptor is configured in the project, try-catch is not needed.

  register: createAsyncThunk(
    'auth/register',
    async (userData: RegisterRequestData, { dispatch }) => {
      await authAPI.register(userData);
      dispatch(
        authThunks.login({
          email: userData.email,
          password: userData.password,
        }),
      );
    },
  ),

  login: createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequestData, { dispatch }) => {
      const { access, refresh } = await authAPI.login(credentials);
      localStorage.setItem('tokenAccess', JSON.stringify(access));
      localStorage.setItem('tokenRefresh', JSON.stringify(refresh));
      dispatch(authThunks.userMe());
    },
  ),

  userMe: createAsyncThunk('auth/userMe', async () => await authAPI.getMe()),

  patchMe: createAsyncThunk('auth/patchMe', async (data: UserType) => {
    const patchedMe = await authAPI.patchMe(data);
    return patchedMe;
  }),

  setPassword: createAsyncThunk(
    'auth/setPassword',
    async (passwords: UpdatePasswordData) => {
      await authAPI.setPassword(passwords);
      localStorage.removeItem('tokenAccess');
      localStorage.removeItem('tokenRefresh');
    },
  ),
};

// Slice
// Note: any reducer should work only with the state

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // triggered by sync action creators which implemented under the hood by createSlice via combining authSlice.name/reducers.method
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('tokenAccess');
      localStorage.removeItem('tokenRefresh');
    },
  },
  // triggered by async action creators usualy implemented by thunks
  extraReducers: (builder) => {
    builder
      // register
      .addCase(authThunks.register.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(authThunks.register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(
        authThunks.register.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      // login
      .addCase(authThunks.login.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(authThunks.login.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(
        authThunks.login.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      // get userMe
      .addCase(authThunks.userMe.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        authThunks.userMe.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.isLoading = false;
          state.error = false;
          state.user = action.payload;
        },
      )
      .addCase(
        authThunks.userMe.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.user = null;
        },
      )
      // patch Me
      .addCase(authThunks.patchMe.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        authThunks.patchMe.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.isLoading = false;
          state.error = false;
          state.user = action.payload;
        },
      )
      .addCase(
        authThunks.patchMe.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      // set password
      .addCase(authThunks.setPassword.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(authThunks.setPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
        state.user = null;
      })
      .addCase(
        authThunks.setPassword.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

// Selectors
export const selectAuthData = (state: RootState) => state.auth;
export const selectUserMe = (state: RootState) => state.auth.user;
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Action creator (not async)
export const { logout } = authSlice.actions;
