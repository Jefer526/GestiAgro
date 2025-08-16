// src/layouts/LayoutAdmin.jsx
import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import api, { accountsApi, ENDPOINTS } from "../services/apiClient";

const LayoutAdmin = ({ children, active }) => {
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fijo */}
      <SidebarAdmin
        letraInicial={letraInicial}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
        active={active} // 👈 para resaltar ícono actual
      />

      {/* Contenido dinámico */}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-10">
        {children}
      </main>
    </div>
  );
};

export default LayoutAdmin;
