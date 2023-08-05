export type RegisterRequestData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type ProfileRequestData = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type UpdatePasswordData = {
  current_password: string;
  new_password: string;
  confirm_password?: string;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type UserType = {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  created_at?: string;
  update_at?: string;
  is_active?: boolean;
  timezone?: unknown;
  work_start?: number | null;
  work_finish?: number | null;
  // timetable?: unknown;
  photo?: string;
  telephone_number?: string;
};

export type TokenType = {
  access: string;
  refresh: string;
};

export enum URLS {
  AUTH = 'auth',
  SIGN_UP = `${URLS.AUTH}/users/`,
  SIGN_IN = `${URLS.AUTH}/jwt/create/`,
  USER_ME = `${URLS.AUTH}/users/me/`,
  SET_PASSWORD = `${URLS.AUTH}/users/set_password/`,
}
