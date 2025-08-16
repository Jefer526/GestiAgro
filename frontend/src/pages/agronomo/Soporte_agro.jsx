// src/pages/admin/Soporte_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconSettings,
  IconTool,
  IconLogout,
  IconPlant2,
  IconBook,
  IconEye,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";

const Soporte_agro = () => {
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

  // ====== LOGOUT real ======
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
        console.warn("Fallo en logout del backend, se cierra sesión localmente igual:", e);
      }
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      sessionStorage.clear();
      try {
        if (api?.defaults?.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
      setMostrarTarjeta(false);
      setIsLoggingOut(false);
      window.location.replace("/");
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
      descripcion:
        "Al intentar ingresar al módulo de usuarios aparece pantalla en blanco. Probado en Chrome y Edge.",
    },
    {
      ticket: "TK-0002",
      asunto: "Error al generar copia de seguridad",
      estado: "En proceso",
      solicitadoPor: "Carlos Soto",
      fechaSolicitud: "2025-07-12",
      descripcion:
        "El botón ‘Generar copia’ muestra error 500. Se adjunta captura en el correo enviado al soporte.",
    },
  ];

  const verDetalle = (row) => {
    navigate("/detallesticket", { state: { ticket: row } });
  };

  return (
    <div className="flex">
      {/* Sidebar idéntico al de Home_agro */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Logo */}
        <div className="mb-6">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Navegación */}
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          <button onClick={() => navigate("/homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconFrame className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/produccionagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant2 className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/cuadernocampo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBook className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Perfil (con soporte en burbuja) */}
        <div className="relative mb-4 mt-auto">
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
              <button onClick={() => navigate("/ajustesagro")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => navigate("/soporteagro")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Soporte</h1>

        <button
          onClick={() => navigate("/registrarticketag")}
          className="bg-green-600 text-white px-10 py-5 text-2xl rounded-xl shadow-lg hover:bg-green-700 transition font-bold mb-8"
        >
          Solicitar soporte
        </button>

        {/* Tabla */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg relative">
          <table className="min-w-full text-base text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                {["Ticket", "Asunto", "Estado", "Solicitado por", "Fecha de solicitud", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-4 border uppercase">{h}</th>
                ))}
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
                    <button onClick={() => verDetalle(t)} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-200 transition justify-center mx-auto">
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

export default Soporte_agro;
