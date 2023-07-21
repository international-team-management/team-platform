import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// ApiError, чтобы была возможность фильтровать ошибки, если нужно
export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number
  ) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
  }
}

const axiosInstance = axios.create({
  // Это урл для валидации на серваке яндекса, который был на курсе
  // чтобы проверить работает ли код
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if(axios.isAxiosError(error) && error.response) {
        return Promise.reject(new ApiError(error.response.data.reason, error.response.status));
    }

    return Promise.reject(error);
  }
)

export const request = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.get<T, AxiosResponse<T>>(url, config);

    return result.data;
  },

  post: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config);

    return result.data;
  },

  put: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config);

    return result.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.delete<T, AxiosResponse<T>>(url, config);

    return result;
  }
}
