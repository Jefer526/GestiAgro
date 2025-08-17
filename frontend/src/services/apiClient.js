import axios from "axios";

// ===== Base URL =====
const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ===== Axios instance =====
const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

// ===== Interceptor: adjuntar token =====
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// ===== Interceptor: refresh en 401 =====
let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  queue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) throw new Error("No refresh token");

        const res = await axios.post(`${API}/accounts/token/refresh/`, { refresh });
        const newAccess = res.data.access;

        localStorage.setItem("access", newAccess);
        api.defaults.headers["Authorization"] = "Bearer " + newAccess;
        processQueue(null, newAccess);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ===== ENDPOINTS centralizados =====
export const ENDPOINTS = {
  login: "api/accounts/token/",
  me: "api/accounts/me/",
  logout: "api/accounts/logout/",
};

// ===== Funciones de autenticación =====
export const login = (email, password) =>
  api.post(ENDPOINTS.login, { email, password });

export const getMe = () => api.get(ENDPOINTS.me);

export const logout = () => api.post(ENDPOINTS.logout);

// ===== Alias retrocompatible (usuarios) =====
export const accountsApi = {
  listUsers: () => api.get("/api/accounts/users/"),
  getUser: (id) => api.get(`/api/accounts/users/${id}/`),
  updateUser: (id, data) => api.put(`/api/accounts/users/${id}/`, data),
  toggleActive: (id) => api.post(`/api/accounts/users/${id}/toggle-active/`),
  updateRole: (id, data) => api.put(`/api/accounts/update-role/${id}/`, data),
};

// ===== Nuevo: API Soporte =====
export const soporteApi = {
  listTickets: () => api.get("/soporte/tickets/"),
  getTicket: (id) => api.get(`/soporte/tickets/${id}/`),
  createTicket: (data) => api.post("/soporte/tickets/", data),
  updateTicket: (id, data) => api.patch(`/soporte/tickets/${id}/`, data), // 👈 AHORA PATCH
};

// ===== Export principal =====
export default api;
