import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from 'services/api/authAPI';
import type { RootState } from 'services/store';
import type { RegisterRequestData, LoginRequestData, TokenType, UserTest } from 'services/api/types';

// Сценарии

// 1. Регистрация, onSubmit form
//  (?)сохранить форму в redux обычным action (или держать данные в useState на случай отказа сервера)
//  dispatch(register(...)) - из компонента отправить post-запрос, результат сохранить в store
//    принять ответ сервера
//      если auth/register/fulfilled
//        state.user = action.payload
//        в компонентах смотрим useSelect, запускаем переадресацию на login или попап об успешной регистрации
//      если auth/register/rejected
//        state.user = null
//        в компонентах смотрим useSelect, запускаем попап о неудачной регистрации, и возможно передаем те данные в форму
//
// 2. Вход, onSubmit form
//  (?)сохранить форму в redux обычным action (или держать данные в useState на случай отказа сервера)
//  dispatch(login(...)) - из компонента отправить post-запрос, результат сохранить в store
//    принять ответ сервера
//      если auth/login/fulfilled
//        ...
//        action.payload.token сохранить в LocalStorage
//      если auth/register/rejected
//        ...
//
// 3. Выход, onClick btn
//  dispatch(logout(...)) - из компонента отправить post-запрос, результат сохранить в store
//    принять ответ сервера
//      если auth/logout/fulfilled
//        state.user = null
//        удалить токен из LocalStorage
//      если auth/logout/rejected
//        в компонентах смотрим useSelect, сообщаем об ошибке выхода


// Types

type AuthStateType = {
  user: null | UserTest; // два типа должен переваривать (4 поля прирегистрации, вcе поля при userMe) - как правильно типизировать?
  isLoading: boolean;
  error: null | boolean | string;
}


// State

const initialState: AuthStateType = {
  user: null,
  isLoading: false,
  error: null,
}

// Thunks (async action creators)
// createAsyncThunk simplifies our Redux app by returning an action creator
// that dispatches promise lifecycle actions for us so we don't have to dispatch them ourselves.

export const register = createAsyncThunk(
  'auth/register', 
  async (userData: RegisterRequestData) => {
    try {
      const responseData = await authAPI.register(userData);
      return responseData                                               //  <- ? promise, 'OK', или объект типа RegisterRequestData
      // dispatch({type: 'auth/register/fulfilled', payload: responseData}) <- createAsyncThunk сам отправляет результат в store
    } catch(error) {
      console.log('Error register')
    }
});

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequestData, thunkApi) => {
    try {
      const token = await authAPI.login(credentials);
      // (?) здесь нужен thunkApi.dispatch(userMe()) - проверка токенов и загрузка данных юзера для лого и личного кабинета
      return token  // в reducer сохраним token'ы localStorage
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
        state.isLoading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {  // PayloadAction<RegisterRequestData> не срабатывает
        state.isLoading = false;
        state.error = false;
        state.user = action.payload;  // <- ? Не понимаю как из payload достать объект типа RegisterRequestData
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {  // узнать тип данных ошибки (string?)
        state.isLoading = false;
        state.error = action.payload;
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {  // PayloadAction<TokenType> не срабатывает
        state.isLoading = false;
        state.error = false;
        localStorage.setItem("token", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
        localStorage.removeItem("token");
        state.user = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {  // узнать тип данных ошибки (string?)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


// Selectors
export const selectAuthData = (state: RootState) => state.auth;
