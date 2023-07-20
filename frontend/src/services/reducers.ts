import { combineReducers } from 'redux';
import { userMeSlice } from 'services/slices/userMeSlice';
import { authSlice } from 'services/slices/authSlice';


export const rootReducer = combineReducers({
	userMe: userMeSlice.reducer,
	auth: authSlice.reducer,

});
