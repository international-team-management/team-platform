export type LoginRequestData = {
  login: string,
  password: string
};

export type User = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
  fullName: string;
};

export type UserDTO = {
  id: number,
  login: string,
  first_name: string,
  second_name: string,
  display_name?: string,
  avatar?: string,
  phone?: string,
  email: string,
};

export type RegisterRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export enum URLS {
  AUTH = 'auth',
  LOGOUT = `${URLS.AUTH}/logout`,
  SIGN_IN = `${URLS.AUTH}/signin`,
  SIGN_UP = `${URLS.AUTH}/signup`,
  USER = `${URLS.AUTH}/user`,
}
