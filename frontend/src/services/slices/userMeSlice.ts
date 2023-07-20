import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'services/store';

// Types
type UserMeType = {
  firstName: string;
  lastName: string;
  role?: string;
  imgSrc?: string;
  isLoading: boolean;
  isError: boolean;
};

const initialState: UserMeType = {
  firstName: 'Джон',
  lastName: 'Доу',
  role: 'Чокнутый проффесоррррррр',
  isLoading: false,
  isError: false,
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
        state.isError = false;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log(action.payload);
      })
      .addCase(get.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // patchUserMe
      .addCase(patch.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(patch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log(action.payload);
      })
      .addCase(patch.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

// selectors
export const selectUserMe = (state: RootState) => state.userMe;
