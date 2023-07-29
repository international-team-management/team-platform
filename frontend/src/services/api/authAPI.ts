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

  me: async (): Promise<UserType> => {
    const result = await request.get<UserType>(URLS.USER);

    return result;
  },

  logout: (): Promise<'OK'> => request.post<'OK', null>(URLS.LOGOUT),
};
