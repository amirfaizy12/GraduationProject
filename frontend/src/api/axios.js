import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true, // ← required for cookie-based auth; never remove
});

// Response interceptor: surface error messages consistently
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Pass through so callers can inspect err.response
    return Promise.reject(err);
  },
);

export default api;
