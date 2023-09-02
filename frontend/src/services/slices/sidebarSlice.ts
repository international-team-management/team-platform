import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isOpenSidebar: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isOpenSidebar = true;
    },
    closeSidebar: (state) => {
      state.isOpenSidebar = false;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
