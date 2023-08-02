import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from 'services/api/authAPI';
import type { RootState } from 'services/store';
import type {
  RegisterRequestData,
  LoginRequestData,
  UserType,
} from 'services/api/types';

// Use cases
// 1. register, post new user data > if ok response > login, post credentials > receive tokens, keep in localStorage > get userMe
// 2. login, post credentials > receive tokens, keep in localStorage > get userMe
// 3. logout > if good response > remove tokens from localStorage

// Types

type AuthStateType = {
  user: null | UserType;
  isLoading: boolean;
  error: null | unknown;
};

// State

const test = {
  id: 4,
  username: 'tm',
  email: 'dfdf@freezeDraftable.ew,',
  first_name: 'Джонни',
  last_name: 'Доу',
  role: 'Чокнутый проффесоррррррр',
  created_at: '',
  update_at: '',
  is_active: true,
  user_timezone: 'wew',
  // timetable: [],
  photo: 'sting',
  telephone_number: 9154804054,
};

const initialState: AuthStateType = {
  user: test,
  isLoading: false,
  error: null,
};

// Thunks (async action creators)

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

  userMe: createAsyncThunk('auth/userMe', async () => await authAPI.me()),

  logout: createAsyncThunk('auth/logout', async () => {
    await authAPI.logout();
    localStorage.removeItem('tokenAccess');
    localStorage.removeItem('tokenRefresh');
  }),
};

// Slice

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
      .addCase(authThunks.login.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      // logout
      .addCase(authThunks.logout.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(authThunks.logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
        state.user = null;
      })
      .addCase(
        authThunks.logout.rejected,
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
