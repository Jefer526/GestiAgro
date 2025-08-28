import axios from "axios";

// ===== Base URL =====
const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ===== ENDPOINTS centralizados =====
export const ENDPOINTS = {
  login: "/api/accounts/token/",
  refresh: "/api/accounts/token/refresh/",
  me: "/api/accounts/me/",
  logout: "/api/accounts/logout/",
  checkEmail: "/api/accounts/check-email/",
  sendCode: "/api/accounts/send-code/",
  verifyCode: "/api/accounts/verify-code/",
  resetPassword: "/api/accounts/reset-password/",
};

// ===== API Auth =====
export const authApi = {
  me: () => api.get(ENDPOINTS.me), // 👈 usa el endpoint que ya definiste
};

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

        const res = await axios.post(`${API}${ENDPOINTS.refresh}`, { refresh });
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

        // ❌ antes: window.location.href = "/login"
        // ✅ ahora: solo rechazamos el error, Login.jsx se encarga de mostrar mensaje
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ===== Funciones de autenticación =====
export const login = (email, password) =>
  api.post(ENDPOINTS.login, { email, password });

export const getMe = () => api.get(ENDPOINTS.me);

export const logout = () => api.post(ENDPOINTS.logout);

export const checkEmail = (email) =>
  api.post(ENDPOINTS.checkEmail, { email });

export const resetPassword = (email, password) =>
  api.post(ENDPOINTS.resetPassword, { email, password });

export const sendCode = (email) =>
  api.post(ENDPOINTS.sendCode, { email });

export const verifyCode = (email, code) =>
  api.post(ENDPOINTS.verifyCode, { email, code });

// ===== Alias retrocompatible (usuarios) =====
export const accountsApi = {
  listUsers: () => api.get("/api/accounts/users/"),
  getUser: (id) => api.get(`/api/accounts/users/${id}/`),
  updateUser: (id, data) => api.patch(`/api/accounts/users/${id}/`, data), // 👈 PATCH
  toggleActive: (id) => api.patch(`/api/accounts/users/${id}/toggle-active/`), // 👈 PATCH
  updateRole: (id, data) => api.patch(`/api/accounts/update-role/${id}/`, data), // 👈 PATCH
};

// ===== API Soporte =====
export const soporteApi = {
  listTickets: () => api.get("/soporte/tickets/"),
  getTicket: (id) => api.get(`/soporte/tickets/${id}/`),
  createTicket: (data) => api.post("/soporte/tickets/", data),
  updateTicket: (id, data) => api.patch(`/soporte/tickets/${id}/`, data),
};

// ===== API Equipos =====
export const equiposApi = {
  list: () => api.get("/api/equipos/maquinas/"),
  get: (id) => api.get(`/api/equipos/maquinas/${id}/`),
  create: (data) => api.post("/api/equipos/maquinas/", data),
  update: (id, data) => api.patch(`/api/equipos/maquinas/${id}/`, data),
  delete: (id) => api.delete(`/api/equipos/maquinas/${id}/`),
};

// ===== API Mantenimientos =====
export const mantenimientosApi = {
  list: () => api.get("/api/equipos/mantenimientos/"),
  get: (id) => api.get(`/api/equipos/mantenimientos/${id}/`),
  create: (data) => api.post("/api/equipos/mantenimientos/", data),
  update: (id, data) => api.patch(`/api/equipos/mantenimientos/${id}/`, data),
  delete: (id) => api.delete(`/api/equipos/mantenimientos/${id}/`),
};

// ===== API Labores Maquinaria =====
export const laboresMaquinariaApi = {
  list: (params = {}) => api.get("/api/equipos/labores-maquinaria/", { params }),
  get: (id) => api.get(`/api/equipos/labores-maquinaria/${id}/`),
  create: (data) => {
    const payload = Array.isArray(data) ? data : [data];
    return api.post("/api/equipos/labores-maquinaria/", payload);
  },
  update: (id, data) => api.patch(`/api/equipos/labores-maquinaria/${id}/`, data),
  delete: (id) => api.delete(`/api/equipos/labores-maquinaria/${id}/`),
};

// ===== API Lotes =====
export const lotesApi = {
  list: () => api.get("/api/lotes/"), // 👈 traer todos los lotes
  listByFinca: (fincaId) => api.get(`/api/lotes/?finca=${fincaId}`),
};

// ===== API Variables Climáticas =====
export const variablesClimaApi = {
  getAll: () => api.get("/api/clima/variablesclimaticas/"),
  get: (id) => api.get(`/api/clima/variablesclimaticas/${id}/`),
  post: (data) => api.post("/api/clima/variablesclimaticas/", data),
  put: (id, data) => api.put(`/api/clima/variablesclimaticas/${id}/`, data),
  delete: (id) => api.delete(`/api/clima/variablesclimaticas/${id}/`),
};

// ===== API Fincas =====
export const fincasApi = {
  list: () => api.get("/api/fincas/"),
  get: (id) => api.get(`/api/fincas/${id}/`),
  create: (data) => api.post("/api/fincas/", data),
  update: (id, data) => api.patch(`/api/fincas/${id}/`, data),
  delete: (id) => api.delete(`/api/fincas/${id}/`),
};

// ===== API Bodega =====
export const productosApi = {
  list: () => api.get("/api/bodega/productos/"),
  get: (id) => api.get(`/api/bodega/productos/${id}/`),
  create: (data) => api.post("/api/bodega/productos/", data),
  update: (id, data) => api.patch(`/api/bodega/productos/${id}/`, data),
  delete: (id) => api.delete(`/api/bodega/productos/${id}/`),
};

export const movimientosApi = {
  list: () => api.get("/api/bodega/movimientos/"),
  get: (id) => api.get(`/api/bodega/movimientos/${id}/`),
  create: (data) => api.post("/api/bodega/movimientos/", data),
  listByProducto: (productoId) =>
    api.get(`/api/bodega/movimientos/?producto=${productoId}`),
};

// ===== API Cuaderno de Campo =====
export const cuadernoCampoApi = {
  list: () => api.get("/api/cuaderno/"),
  get: (id) => api.get(`/api/cuaderno/${id}/`),
  create: (data) =>
    api.post("/api/cuaderno/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) =>
    api.patch(`/api/cuaderno/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/api/cuaderno/${id}/`),
};

// ===== API Arboles =====
export const arbolesApi = {
  list: () => api.get("/api/arboles/"),
  listByLote: (loteId) => api.get(`/api/arboles/?lote=${loteId}`),
  get: (id) => api.get(`/api/arboles/${id}/`),
};

// ===== API Producción =====
export const produccionApi = {
  list: () => api.get("/api/produccion/"),
  get: (id) => api.get(`/api/produccion/${id}/`),
  create: (data) => api.post("/api/produccion/", data),
  update: (id, data) => api.patch(`/api/produccion/${id}/`, data),
  delete: (id) => api.delete(`/api/produccion/${id}/`),

  resumenMensual: (params = {}) =>
    api.get("/api/produccion/resumen_mensual/", { params }),

  resumenFinca: (params = {}) =>
    api.get("/api/produccion/resumen_finca/", { params }),
};

// ===== API Fitosanitario =====
export const fitosanitarioApi = {
  list: (params = {}) => api.get("/api/fitosanitario/monitoreos/", { params }),
  get: (id) => api.get(`/api/fitosanitario/monitoreos/${id}/`),
  create: (data) => api.post("/api/fitosanitario/monitoreos/", data),
  update: (id, data) => api.patch(`/api/fitosanitario/monitoreos/${id}/`, data),
  delete: (id) => api.delete(`/api/fitosanitario/monitoreos/${id}/`),

  resumen: (params = {}) =>
    api.get("/api/fitosanitario/monitoreos/resumen/", { params }),
};

// ===== Export principal =====
export default api;
