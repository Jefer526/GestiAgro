// src/services/apiClient.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${API}/api/token/`, {
      email,
      password,
    });

    // Guarda tokens en localStorage
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

export async function logout() {
  const API = import.meta.env.VITE_API_URL || "";
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  try {
    if (access && refresh) {
      await fetch(`${API}/api/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ refresh }),
      });
    }
  } catch (_) {
    // Silenciar errores de red; igual limpiamos sesión abajo.
  } finally {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
}