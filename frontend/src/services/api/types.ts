export type RegisterRequestData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string
};

export type LoginRequestData = {
  email: string,
  password: string
};

export type UserType = {
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  role: string,
  created_at: string,
  update_at: string,
  is_active: boolean,
  user_timezone?: unknown,
  // timetable: [],
  photo: string,
  telephone_number: number,
}

// export type User = {
//   id: number;
//   login: string;
//   firstName: string;
//   secondName: string;
//   displayName: string;
//   avatar: string;
//   phone: string;
//   email: string;
//   fullName: string;
// };

// export type UserDTO = {
//   id: number,
//   login: string,
//   first_name: string,
//   second_name: string,
//   display_name?: string,
//   avatar?: string,
//   phone?: string,
//   email: string,
// };

export type TokenType = {
  access: string;
  refresh: string;
}

export enum URLS {
  AUTH = 'auth',
  LOGOUT = `${URLS.AUTH}/logout`,
  SIGN_IN = `${URLS.AUTH}/signin`,
  SIGN_UP = `${URLS.AUTH}/signup`,
  USER = `${URLS.AUTH}/user`,
}
