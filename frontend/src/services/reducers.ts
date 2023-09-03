import { combineReducers } from 'redux';
import { authSlice } from 'services/slices/authSlice';
import { projectSlice } from './slices/projectSlice';
import { headerSlice } from './slices/headerSlice';
import { popupSlice } from './slices/popupSlice';
import { sidebarSlice } from './slices/sidebarSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  projects: projectSlice.reducer,
  header: headerSlice.reducer,
  popup: popupSlice.reducer,
  sidebar: sidebarSlice.reducer,
});
