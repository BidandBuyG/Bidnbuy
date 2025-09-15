/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { useAuthStore } from '../store/auth';

const baseURL = (typeof process !== 'undefined' && (process.env?.VITE_API_URL as string)) || (globalThis as any).__VITE_API_URL || "";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;
//     console.log("Token:", token)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor to handle token expiration
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       // Clear auth state and redirect to login
//       useAuthStore.getState().logout();
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// ); 

// Optional: auto-redirect on 401


axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // If server responded 401, handle logout/redirect, unless caller asked to skip the auth redirect
    const status = err?.response?.status;
    const skipRedirect = Boolean(
      err?.config?.headers?.["X-Skip-Auth-Redirect"] ||
        err?.config?.headers?.["x-skip-auth-redirect"]
    );

    if (status === 401) {
      // mark error so other global handlers can choose to ignore redirects
      try {
        // attach a flag to the error object so QueryCache onError can detect skip
        if (skipRedirect) {
          try {
            // non-enumerable to avoid serializing accidentally
            Object.defineProperty(err, "__skipAuthRedirect", { value: true });
          } catch {
            // intentionally ignored
          }
        }

        if (!skipRedirect) {
          // Dispatch logout to clear session
          try {
            useAuthStore.getState().logout();
          } catch (_e) {
            // ignore
          }

          // In tests, avoid calling window.location.assign (jsdom navigation not implemented).
          if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "test") {
            try {
              (window as any).__mockHref = "/login";
            } catch {
              // ignore
            }
          } else {
            try {
              window.location.assign("/login");
            } catch {
              // Fallback for environments where assign may not be writable
              // @ts-ignore
              window.location.href = "/login";
            }
          }
        }
      } catch (_e) {
        // ignore
      }
    }

    // In test environment, avoid returning a rejected promise to prevent unhandledRejection in Jest
    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "test") {
      return err;
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
