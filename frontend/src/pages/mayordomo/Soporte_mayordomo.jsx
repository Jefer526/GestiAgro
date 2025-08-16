// src/pages/admin/Soporte_mayordomo.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconTool,
  IconLogout,
  IconBook,
  IconPlant2,
  IconEye,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";

const Soporte_mayordomo = () => {
  const navigate = useNavigate();

  // -------- Perfil flotante --------
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const letraInicial = "J";

  useEffect(() => {
    const clickFueraTarjeta = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", clickFueraTarjeta);
    return () => document.removeEventListener("mousedown", clickFueraTarjeta);
  }, []);

  // ====== LOGOUT ======
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
        console.warn("Fallo en logout del backend:", e);
      }
    } finally {
      try {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
        localStorage.removeItem("rememberedEmail");
      } catch {}
      try {
        if (api?.defaults?.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
      setMostrarTarjeta(false);
      setIsLoggingOut(false);
      window.location.replace("/login");
    }
  };

  // --------- Datos tabla ----------
  const tickets = [
    {
      ticket: "TK-0001",
      asunto: "No carga el módulo de usuarios",
      estado: "Abierto",
      solicitadoPor: "Ana Rosas",
      fechaSolicitud: "2025-07-11",
    },
    {
      ticket: "TK-0002",
      asunto: "Error al generar copia de seguridad",
      estado: "En proceso",
      solicitadoPor: "Carlos Soto",
      fechaSolicitud: "2025-07-12",
    },
    {
      ticket: "TK-0003",
      asunto: "Solicitud de nuevo rol",
      estado: "Cerrado",
      solicitadoPor: "Juan Pérez",
      fechaSolicitud: "2025-08-01",
    },
  ];
  // --------------------------------

  return (
    <div className="min-h-[100dvh] bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between z-[200]">
        {/* Favicon */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos navegación */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconHome className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconClipboardList className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconHistory className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/cuaderno_campom")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBook className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/produccion_mayor")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconPlant2 className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconTractor className="text-white w-11 h-11" /></button>
        </div>

        {/* Perfil flotante */}
        <div className="relative mb-6 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[9999] backdrop-blur text-base"
            >
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 ${
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

      {/* Contenido */}
      <main className="ml-28 min-h-[100dvh] p-8 w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Soporte</h1>

        <button
          onClick={() => navigate("/Registrarticketm")}
          className="bg-green-600 text-white px-10 py-5 text-2xl rounded-xl shadow-lg hover:bg-green-700 transition font-bold mb-8"
        >
          Solicitar soporte
        </button>

        {/* Tabla */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-base text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-4 border">Ticket</th>
                <th className="px-4 py-4 border">Asunto</th>
                <th className="px-4 py-4 border">Estado</th>
                <th className="px-4 py-4 border">Solicitado por</th>
                <th className="px-4 py-4 border">Fecha de solicitud</th>
                <th className="px-4 py-4 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.ticket} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{t.ticket}</td>
                  <td className="p-3 border">{t.asunto}</td>
                  <td className="p-3 border">{t.estado}</td>
                  <td className="p-3 border">{t.solicitadoPor}</td>
                  <td className="p-3 border">{t.fechaSolicitud}</td>
                  <td className="p-3 border">
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-200 transition mx-auto">
                      <IconEye className="w-4 h-4" /> Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Soporte_mayordomo;
