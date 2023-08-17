import { combineReducers } from 'redux';
import { authSlice } from 'services/slices/authSlice';
import { projectSlice } from './slices/projectSlice';
import { headerSlice } from './slices/headerSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  projects: projectSlice.reducer,
  header: headerSlice.reducer,
});
