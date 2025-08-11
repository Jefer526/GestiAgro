import React, { useEffect, useRef, useState } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconLogout,
  IconChevronLeft,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Detalles_ticket = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Sidebar: mismo comportamiento que en Soporte_adm
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
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

  // Ticket recibido por state (simple frontend)
  const t =
    state?.ticket || {
      ticket: "TK-????",
      asunto: "—",
      estado: "—",
      solicitadoPor: "—",
      fechaSolicitud: "—",
      descripcion: "—",
    };

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Sidebar fijo */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button
            onClick={() => navigate("/homeadm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/copias")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/soporte")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconTool className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

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
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido */}
      <main className="ml-28 min-h-[100dvh] p-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold mb-6"
        >
          <IconChevronLeft className="w-5 h-5" /> Volver
        </button>

        <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            Detalles del ticket
          </h1>

          {/* Resumen en recuadro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Ticket</p>
              <p className="font-semibold text-gray-800">{t.ticket}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Asunto</p>
              <p className="font-semibold text-gray-800">{t.asunto}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Solicitado por</p>
              <p className="font-semibold text-gray-800">{t.solicitadoPor}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Estado</p>
              <p className="font-semibold text-gray-800">{t.estado}</p>
            </div>
            <div className="border rounded-lg p-4 md:col-span-2">
              <p className="text-sm text-gray-500">Fecha de solicitud</p>
              <p className="font-semibold text-gray-800">{t.fechaSolicitud}</p>
            </div>
          </div>

          {/* Descripción detallada */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Descripción detallada del ticket
            </label>
            <textarea
              className="w-full min-h-[160px] border rounded-md p-3 outline-none focus:ring-2 focus:ring-green-400"
              value={t.descripcion}
              readOnly
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detalles_ticket;
