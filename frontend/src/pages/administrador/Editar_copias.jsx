// src/pages/administrador/Editar_copias.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconLogout,
  IconChevronLeft,
  IconDeviceFloppy,
  IconCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Editar_copias = () => {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("2025-06-12");
  const [hora, setHora] = useState("14:21");
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Perfil (mock)
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Tarjeta de perfil
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const tarjetaRef = useRef(null);

  // Cerrar tarjeta al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ====== LOGOUT real (backend + limpieza + redirect) ======
  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const refresh = localStorage.getItem("refresh");
      try {
        if (ENDPOINTS?.logout) {
          await api.post(ENDPOINTS.logout, { refresh });
        } else if (accountsApi?.logout) {
          await accountsApi.logout({ refresh });
        }
      } catch (e) {
        console.warn("Fallo en logout del backend, cierre local forzado:", e);
      }
    } finally {
      try {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
      } catch {}
      try {
        if (api?.defaults?.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
      setMostrarTarjeta(false);
      setIsLoggingOut(false);
      window.location.replace("/"); // o "/login" si prefieres
    }
  };

  const handleGuardar = () => {
    console.log("Guardando copia actualizada:", { fecha, hora });
    // TODO: llamada real a tu API
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/copias");
    }, 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Sidebar fijo: ocupa todo el alto visible */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

          <button
            onClick={() => navigate("/homeadm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            aria-label="Inicio"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>

          <button
            onClick={() => navigate("/admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            aria-label="Gestionar usuarios"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>

          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              aria-label="Copias de seguridad"
            >
              <IconCloudUpload className="text-white w-11 h-11" />
            </button>
          </div>

          <button
            onClick={() => navigate("/soporte")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            aria-label="Soporte"
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Botón perfil — EXACTO al de las otras pantallas */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
            aria-haspopup="true"
            aria-expanded={mostrarTarjeta}
            aria-label="Perfil"
          >
            {letraInicial}
          </button>

          {/* Tarjeta flotante */}
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/ajustesadm");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  isLoggingOut ? "opacity-60 cursor-not-allowed" : "text-red-600"
                }`}
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido principal: desplazado a la derecha del sidebar */}
      <main className="ml-28 min-h-[100dvh] p-10 relative">
        {/* Alerta */}
        {alertaVisible && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/copias")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Editar copia de seguridad
          </h1>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Fecha de carga
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Hora de carga
            </label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 font-semibold"
            >
              <IconDeviceFloppy className="w-5 h-5" /> Guardar cambios
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editar_copias;
