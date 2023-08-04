import { request } from './apiRequest';
import {
  LoginRequestData,
  RegisterRequestData,
  TokenType,
  URLS,
  UserType,
} from './types';

export const authAPI = {
  register: (data: RegisterRequestData): Promise<RegisterRequestData> => {
    return request.post<RegisterRequestData, RegisterRequestData>(
      URLS.SIGN_UP,
      data,
    );
  },

  login: (data: LoginRequestData): Promise<TokenType> => {
    return request.post<TokenType, LoginRequestData>(URLS.SIGN_IN, data);
  },

  getMe: async (): Promise<UserType> => {
    return request.get<UserType>(URLS.USER_ME);
  },

  patchMe: async (data: UserType): Promise<UserType> => {
    return request.patch<UserType, UserType>(URLS.USER_ME, data);
  },

  // logout: (): Promise<'OK'> => request.post<'OK', null>(URLS.LOGOUT),
};
