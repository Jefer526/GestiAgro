import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconLogout,
  IconEye,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Soporte_adm = () => {
  const navigate = useNavigate();
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
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

  const tickets = [
    {
      ticket: "TK-0001",
      asunto: "No carga el módulo de usuarios",
      estado: "Abierto",
      solicitadoPor: "Екатерина Лукшецкая",
      fechaSolicitud: "2025-07-11",
      descripcion:
        "Al intentar ingresar al módulo de usuarios aparece pantalla en blanco. Probado en Chrome y Edge. Sucede desde ayer en la tarde.",
    },
    {
      ticket: "TK-0002",
      asunto: "Error al generar copia de seguridad",
      estado: "En proceso",
      solicitadoPor: "Armen Sargsyan",
      fechaSolicitud: "2025-07-12",
      descripcion:
        "El botón ‘Generar copia’ muestra error 500. Se adjunta captura en el correo enviado al soporte.",
    },
    {
      ticket: "TK-0003",
      asunto: "Solicitud de nuevo rol",
      estado: "Cerrado",
      solicitadoPor: "Juan Pérez",
      fechaSolicitud: "2025-08-01",
      descripcion:
        "Se requiere crear un rol ‘Supervisor de campo’ con acceso de solo lectura a reportes y clima.",
    },
  ];

  const verDetalle = (row) => {
    navigate("/detallesticket", { state: { ticket: row } });
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
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTool className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

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
              <button onClick={() => navigate("/ajustesadm")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => navigate("/")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido */}
      <main className="ml-28 min-h-[100dvh] p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Soporte</h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-base text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                {["Ticket", "Asunto", "Estado", "Solicitado por", "Fecha de solicitud", "Acciones"].map((h) => (
                  <th key={h} className="p-4 border uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.ticket} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{t.ticket}</td>
                  <td className="p-3 border text-left">{t.asunto}</td>
                  <td className="p-3 border">{t.estado}</td>
                  <td className="p-3 border">{t.solicitadoPor}</td>
                  <td className="p-3 border">{t.fechaSolicitud}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => verDetalle(t)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      title="Ver detalle"
                    >
                      <IconEye className="w-4 h-4" /> Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-gray-500">Sin tickets</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Soporte_adm;
