import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum HeaderState {
  PROFILE = 'PROFILE',
  KANBAN = 'KANBAN',
}

export enum VIEWS {
  KANBAN = 'button-kanban',
  LIST = 'button-list',
  TEAM = 'button-team',
}

const initialState = {
  state: HeaderState.KANBAN,
  view: VIEWS.KANBAN,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderState: (state, action: PayloadAction<HeaderState>) => {
      state.state = action.payload;
    },
    setHeaderView: (state, action: PayloadAction<VIEWS>) => {
      state.view = action.payload;
    },
  },
});

export const selectHeaderState = (state: RootState) => {
  return state.header.state;
};
export const selectHeaderView = (state: RootState) => state.header.view;

export const { setHeaderState, setHeaderView } = headerSlice.actions;
