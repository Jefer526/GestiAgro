// src/layouts/LayoutAdmin.jsx
import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import api, { accountsApi, ENDPOINTS } from "../services/apiClient";

const LayoutAdmin = ({ children }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [letraInicial, setLetraInicial] = useState("U"); // Valor por defecto

  // === Cargar inicial del usuario en sesión ===
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData?.nombre) {
        const inicial = userData.nombre.trim()[0].toUpperCase();
        setLetraInicial(inicial);
      }
    } catch {
      setLetraInicial("U");
    }
  }, []);

  // ==== LOGOUT ====
  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const refresh = localStorage.getItem("refresh");
      if (ENDPOINTS?.logout) {
        await api.post(ENDPOINTS.logout, { refresh });
      } else if (accountsApi?.logout) {
        await accountsApi.logout({ refresh });
      }
    } catch (e) {
      console.warn("Fallo en logout del backend:", e);
    } finally {
      // Limpieza local
      localStorage.clear();
      sessionStorage.clear();
      try {
        if (api?.defaults?.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
      setIsLoggingOut(false);
      // Redirección fuerte para salir de toda sesión
      window.location.replace("/login");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fijo */}
      <SidebarAdmin
        letraInicial={letraInicial}   // 👈 Inicial dinámica según sesión
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />

      {/* Contenido dinámico */}
      <main className="flex-1 p-10 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default LayoutAdmin;
