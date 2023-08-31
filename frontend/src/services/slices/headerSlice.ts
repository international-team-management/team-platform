import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
const currentPath = window.location.pathname;
let currentState;
let currentView;

export enum HeaderState {
  PROFILE = 'PROFILE',
  KANBAN = 'KANBAN',
}

export enum VIEWS {
  KANBAN = 'button-kanban',
  LIST = 'button-list',
  TEAM = 'button-team',
}

if (currentPath === '/profile') {
  currentState = HeaderState.PROFILE;
} else if (currentPath.includes('/team')) {
  currentState = HeaderState.KANBAN;
  currentView = VIEWS.TEAM;
} else {
  currentState = HeaderState.KANBAN;
  currentView = VIEWS.KANBAN;
}

const initialState = {
  state: currentState || '',
  view: currentView || VIEWS.KANBAN,
  path: '',
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
