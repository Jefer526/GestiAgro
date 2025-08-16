// src/components/SidebarAdmin.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconHome,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import faviconBlanco from "../assets/favicon-blanco.png";

const SidebarAdmin = ({ letraInicial = "A", onLogout, isLoggingOut = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  // Cerrar tarjeta si se hace clic fuera
  useEffect(() => {
    const clickFueraTarjeta = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", clickFueraTarjeta);
    return () => document.removeEventListener("mousedown", clickFueraTarjeta);
  }, []);

  // Ahora acepta coincidencias parciales (ej: /admuser y /editar-roluser/:id)
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
      {/* Navegación */}
      <div className="flex flex-col items-center space-y-8">
        <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

        {/* Home */}
        <div className="relative">
          {isActive("/homeadm") && (
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
          )}
          <button
            onClick={() => navigate("/homeadm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Usuarios */}
        <div className="relative">
          {isActive("/admuser") || isActive("/editar-roluser") ? (
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
          ) : null}
          <button
            onClick={() => navigate("/admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Copias */}
        <div className="relative">
          {isActive("/copias") && (
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
          )}
          <button
            onClick={() => navigate("/copias")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Soporte */}
        <div className="relative">
          {isActive("/soporte") && (
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
          )}
          <button
            onClick={() => navigate("/soporte")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Avatar usuario */}
      <div className="relative mb-6">
        <button
          onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
          className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
        >
          {letraInicial}
        </button>
        {mostrarTarjeta && (
          <div
            ref={tarjetaRef}
            className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
          >
            <button
              onClick={() => navigate("/ajustesadm")}
              className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
            </button>
            <button
              onClick={onLogout}
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
    </div>
  );
};

export default SidebarAdmin;
