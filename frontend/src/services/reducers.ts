import { combineReducers } from 'redux';
import { authSlice } from 'services/slices/authSlice';


export const rootReducer = combineReducers({
	auth: authSlice.reducer,

});
