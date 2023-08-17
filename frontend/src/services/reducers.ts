import { combineReducers } from 'redux';
import { authSlice } from 'services/slices/authSlice';
import { projectSlice } from './slices/projectSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  projects: projectSlice.reducer,
});
