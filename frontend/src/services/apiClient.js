// src/services/apiClient.js
import axios from "axios";

// ===== Base URL =====
const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Asegúrate de NO poner / al final en VITE_API_URL
// Ej: VITE_API_URL=http://localhost:8000

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
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;

    if (status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) throw new Error("No refresh token");

      const { data } = await axios.post(`${API}/api/token/refresh/`, { refresh });
      const newAccess = data.access;

      localStorage.setItem("access", newAccess);
      api.defaults.headers.Authorization = `Bearer ${newAccess}`;
      processQueue(null, newAccess);

      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    } catch (err) {
      processQueue(err, null);
      // Limpia sesión y (opcional) redirige
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      // window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

// ===== Endpoints canónicos (según tus logs) =====
export const ENDPOINTS = {
  login: "/api/token/",             // SimpleJWT
  refresh: "/api/token/refresh/",   // SimpleJWT
  me: "/api/auth/me/",              // tu vista 'Me'
  logout: "/api/auth/logout/",      // tu logout (blacklist refresh)
  users: "/api/accounts/users/",    // lista de usuarios (requiere auth)
};

// ===== Métodos de autenticación =====
export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${API}${ENDPOINTS.login}`, { email, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    return data;
  } catch (error) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Error de conexión con el servidor.");
  }
};

export const me = async () => {
  const { data } = await api.get(ENDPOINTS.me);
  return data;
};

export const logout = async () => {
  try {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      await api.post(ENDPOINTS.logout, { refresh_token: refresh });
    }
  } catch (_) {
    // Silenciar errores de red; igual limpiamos sesión abajo
  } finally {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
};

// ===== Módulo accounts =====
export const accountsApi = {
  listUsers: () => api.get(ENDPOINTS.users),
};

export default api;
