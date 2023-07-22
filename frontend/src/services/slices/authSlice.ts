import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'services/api/authAPI';
import type { RootState } from 'services/store';
import type { RegisterRequestData, LoginRequestData } from 'services/api/types';

// Сценарии

// 1. Регистрация, onSubmit form
//  (?)сохранить форму в redux обычным action (или держать данные в useState на случай отказа сервера)
//  dispatch(register(...)) - из компонента отправить post-запрос, результат сохранить в store
//    принять ответ сервера
//      если auth/register/fulfilled
//        в state.register... ставим метку об успехе регистрации
//        в компонентах через useSelect, запускаем переадресацию на login или попап об успешной регистрации
//      если auth/register/rejected
//        в state.register... ставим метку об неудаче регистрации
//        в компонентах через useSelect, запускаем попап о неудачной регистрации, и возможно передаем те данные в форму
//
// 2. Вход, onSubmit form
//  (?)сохранить форму в redux обычным action (или держать данные в useState на случай отказа сервера)
//  dispatch(login(...)) - из компонента отправить post-запрос, результат сохранить в store
//    принять ответ сервера
//      если auth/login/fulfilled
//        в state.login... ставим isLoggedIn равным true
//        action.payload.token сохранить в LocalStorage
//      если auth/register/rejected
//        в state.login... ставим isLoggedIn равным false
//
// 3. Выход, onClick btn
//  dispatch(logout(...)) - из компонента отправить post-запрос, результат сохранить в store
//    принять ответ сервера
//      если auth/logout/fulfilled
//        в state.login... ставим isLoggedIn равным false
//        удалить токен из LocalStorage
//      если auth/logout/rejected
//        в компонентах через useSelect, сообщаем об ошибке выхода


// Types
type RegisterType = {
  user: RegisterRequestData | null;
  isLoading: boolean;
  hasError: boolean;
}

type LoginType = {
  credentials: LoginRequestData | null;
  isLoading: boolean;
  hasError: boolean;
}

type TokenType = {
  access: string;
  refresh: string;
}

type AuthStateType = {
  register: RegisterType;
  login: LoginType;
  token: TokenType;

}


// State
const initialState: AuthStateType = {
  register: {
    user: null,
    isLoading: false,
    hasError: false,
  },
  login: {
    credentials: null,
    isLoading: false,
    hasError: false,
  },
  token: {
    access: '',
    refresh: '',
  }
};


// Thunks (async action creators)
// createAsyncThunk simplifies our Redux app by returning an action creator
// that dispatches promise lifecycle actions for us so we don't have to dispatch them ourselves.

export const register = createAsyncThunk(
  'auth/register', 
  async (user: RegisterRequestData) => {
    try {
      const responseData = await authAPI.register(user);
      return responseData                                               //  <- ? promise, 'OK', или объект типа RegisterRequestData
      // dispatch({type: 'auth/register/fulfilled', payload: responseData}) <- createAsyncThunk сам отправляет результат в store
    } catch {
      console.log('Error register')
    }
});

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequestData) => {
    try {
      const token = await authAPI.login(credentials);
      return token
    } catch {
      console.log('Error login')
    }
  });

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await authAPI.logout()
    } catch {
      console.log('Error logout')
    }
  });


// Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      // register
      .addCase(register.pending, (state) => {
        state.register.isLoading = true;
        state.register.hasError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register.isLoading = false;
        state.register.hasError = false;
        // state.register.user = action.payload;  // <- ? Не понимаю как из payload достать объект типа RegisterRequestData
      })
      .addCase(register.rejected, (state) => {
        state.register.isLoading = false;
        state.register.hasError = true;
      })

      // login
      .addCase(login.pending, (state) => {
        state.login.isLoading = true;
        state.login.hasError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.hasError = false;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state) => {
        state.login.isLoading = false;
        state.login.hasError = true;
      })

      // logout
      .addCase(logout.pending, (state) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.hasError = false;
        // console.log(action.payload);
      })
      .addCase(logout.rejected, (state) => {
        // state.isLoading = false;
        // state.hasError = true;
      });
  },
});


// Selectors
export const selectRegisterStatus = (state: RootState) => state.auth.register.user // <- ? Из стейта нужно получать инфо, которая указывает на зарегался или нет
export const selectAuthData = (state: RootState) => state.auth;
