// src/pages/mayordomo/Soporte_mayordomo.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Soporte_mayordomo = () => {
  const navigate = useNavigate();

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
    <LayoutMayordomo>
      <h1 className="text-4xl font-bold text-green-600 mb-4">Soporte</h1>

      <button
        onClick={() => navigate("/registrarticketm")}
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
                  <button 
                    onClick={() => navigate("/detallesticketm")}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-200 transition mx-auto">
                    <IconEye className="w-4 h-4" /> Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutMayordomo>
  );
};

export default Soporte_mayordomo;
