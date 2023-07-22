import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'services/store';

// Types
type UserMeType = {
  firstName: string;
  lastName: string;
  role?: string;
  imgSrc?: string;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: UserMeType = {
  firstName: 'Джон',
  lastName: 'Доу',
  role: 'Чокнутый проффесоррррррр',
  isLoading: false,
  hasError: false,
};

const requestFuncExample = (): void => {
  return;
};

// async thunks
export const get = createAsyncThunk('userMe/get', requestFuncExample);
export const patch = createAsyncThunk('userMe/patch', requestFuncExample);

// slice object
export const userMeSlice = createSlice({
  name: 'userMe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getUserMe
      .addCase(get.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        console.log(action.payload);
      })
      .addCase(get.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      // patchUserMe
      .addCase(patch.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(patch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        console.log(action.payload);
      })
      .addCase(patch.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
  },
});

// selectors
export const selectUserMe = (state: RootState) => state.userMe;
