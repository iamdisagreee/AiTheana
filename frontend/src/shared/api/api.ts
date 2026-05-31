import axios from "axios";
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from "shared/const/const";

export const $api = axios.create({
  baseURL: __API__,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(
          `${__API__}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );
        localStorage.setItem(
          ACCESS_TOKEN_LOCALSTORAGE_KEY,
          response.data.access_token,
        );
        return $api.request(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        throw refreshError;
      }
    }
    throw error;
  },
);
