import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'services/api/authAPI';
import type { RootState } from 'services/store';
import type { RegisterUserData } from 'services/api/types';


type authType = {
  newUser: RegisterUserData | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: authType = {
  newUser: null,
  isLoading: false,
  hasError: false,
};

// async thunks
// createAsyncThunk simplifies our Redux app by returning an action creator
// that dispatches promise lifecycle actions for us so we don't have to dispatch them ourselves.

export const signUp = createAsyncThunk(
  'auth/signUp', 
  async (newUser: RegisterUserData) => {
    try {
      const data = await authAPI.register(newUser);
      return data  
      // dispatch({type: 'auth/signUp/fulfilled', payload: payload}) <- запускается само под капотом createAsyncThunk
    } catch {
      console.log('Error signUp')
    }
});


// Заглушки, заменить на рабочие thunks
const requestFuncExample = (): void => {
  return
};
export const signIn = createAsyncThunk('auth/signIn', requestFuncExample);
export const logout = createAsyncThunk('auth/logout', requestFuncExample);

// slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      // signUp
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        // state.newUser = action.payload;  // <- ? Не понимаю как из payload достать объект типа RegisterUserData
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // signIn
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        console.log(action.payload);
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        console.log(action.payload);
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

// selectors
export const isRegister = (state: RootState) => state.userMe  // <- ? Из стейта нужно получать инфо, которая указывает на зарегался или нет
export const selectAuthData = (state: RootState) => state.auth;
