import { request } from "./apiRequest";
import { LoginRequestData, RegisterUserData, URLS, UserDTO } from "./types";

export const authAPI = {
  login: (data: LoginRequestData):Promise<"OK"> => {
    return request.post<"OK", LoginRequestData>(URLS.SIGN_IN, data)
  },

  me: async (): Promise<UserDTO> => {
    const result = await request.get<UserDTO>(URLS.USER);

    return result;
  },

  logout: (): Promise<"OK"> => request.post<"OK", null>(URLS.LOGOUT),

  register: (data: RegisterUserData): Promise<"OK"> => {
    return request.post<"OK", RegisterUserData>(URLS.SIGN_UP, data);
  }
}
