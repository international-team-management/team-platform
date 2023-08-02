import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

// Custom axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
});

// Request axios interceptor (similar to middleware concept)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokenAccess = localStorage.getItem('tokenAccess');
    if (tokenAccess) {
      config.headers['Authorization'] = `Bearer ${tokenAccess.replaceAll(
        '"',
        '',
      )}`;
    }
    return config;
  },
  // Catch all errors in request
  (error: AxiosError | Error) => Promise.reject(error),
);

// Response axios interceptor (similar to middleware concept)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError | Error) => {
    // Catch Api errors in response
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(
        new ApiError(error.response.data.reason, error.response.status),
      );
    }
    // Catch other errors in response
    return Promise.reject(error);
  },
);

// Request methods
export const request = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.get<T, AxiosResponse<T>>(url, config);
    return result.data;
  },

  post: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.post<T, AxiosResponse<T>, D>(
      url,
      data,
      config,
    );
    return result.data;
  },

  put: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.put<T, AxiosResponse<T>, D>(
      url,
      data,
      config,
    );
    return result.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.delete<T, AxiosResponse<T>>(url, config);
    return result;
  },
};

// ApiError, it helps to separate API errors from other errors
export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
  }
}
