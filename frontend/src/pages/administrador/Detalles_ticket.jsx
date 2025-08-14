// src/pages/admin/Detalles_ticket.jsx
import React, { useEffect, useRef, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";
// 👇 cliente y endpoints igual que en Admin_usuarios / Home_adm / Soporte_adm / Ajustes_adm
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";

const Detalles_ticket = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const letraInicial = "J";

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
      window.location.replace("/"); // usa "/login" si prefieres ir directo al login
    }
  };

  const t =
    state?.ticket || {
      ticket: "TK-????",
      asunto: "—",
      estado: "Abierto",
      solicitadoPor: "—",
      fechaSolicitud: "—",
      descripcion: "—",
      seguimiento: "",
    };

  const [estado, setEstado] = useState(t.estado);
  const [seguimiento, setSeguimiento] = useState(t.seguimiento);

  const handleGuardar = () => {
    console.log("Nuevo estado guardado:", estado);
    console.log("Seguimiento escrito:", seguimiento);

    // TODO: llamada real a la API
    // await api.put(`/api/tickets/${t.ticket}`, { estado, seguimiento });

    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/soporte");
    }, 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeadm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/admuser")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/copias")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button onClick={() => navigate("/soporte")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTool className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

        {/* Perfil — EXACTO al de las otras pantallas */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-2xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50 text-base"
            >
              <button
                onClick={() => navigate("/ajustesadm")}
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

      {/* Contenido */}
      <main className="ml-28 min-h-[100dvh] p-8">
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Estado del ticket actualizado
          </div>
        )}

        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold mb-6">
          <IconChevronLeft className="w-5 h-5" /> Volver
        </button>

        <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-green-600 mb-6">Detalles del ticket</h1>

          <div className="text-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <p className="text-gray-500">Ticket</p>
                <p className="font-semibold text-gray-800">{t.ticket}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-500">Asunto</p>
                <p className="font-semibold text-gray-800">{t.asunto}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-500">Solicitado por</p>
                <p className="font-semibold text-gray-800">{t.solicitadoPor}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-500 mb-2">Estado</p>
                <select
                  className="border rounded-md p-2 w-full"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="Abierto">Abierto</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
              </div>
              <div className="border rounded-lg p-4 md:col-span-2">
                <p className="text-gray-500">Fecha de solicitud</p>
                <p className="font-semibold text-gray-800">{t.fechaSolicitud}</p>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Descripción detallada del ticket</label>
              <textarea
                className="w-full min-h-[160px] border rounded-md p-3 outline-none focus:ring-2 focus:ring-green-400 text-lg"
                value={t.descripcion}
                readOnly
              />
            </div>

            {/* Seguimiento editable */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Seguimiento del ticket</label>
              <textarea
                className="w-full min-h-[160px] border rounded-md p-3 outline-none focus:ring-2 focus:ring-green-400 text-lg"
                value={seguimiento}
                onChange={(e) => setSeguimiento(e.target.value)}
                placeholder="Escribe aquí el seguimiento..."
              />
            </div>

            <button
              onClick={handleGuardar}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
            >
              <IconDeviceFloppy className="w-5 h-5" />
              Guardar cambios
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detalles_ticket;
