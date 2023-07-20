import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'services/store';

type AuthType = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  isLoading: boolean;
  isError: boolean;
};

const initialState: AuthType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isLoading: false,
  isError: false,
};

const requestFuncExample = (): void => {
  return;
};

// async thunks
export const signUp = createAsyncThunk('auth/signUp', requestFuncExample);
export const signIn = createAsyncThunk('auth/signIn', requestFuncExample);
export const logout = createAsyncThunk('auth/logout', requestFuncExample);

// slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // signUp
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log(action.payload);
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // signIn
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log(action.payload);
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log(action.payload);
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// selectors
export const selectAuthData = (state: RootState) => state.auth;
