import React from "react";
import { useNavigate } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Soporte_agro = () => {
  const navigate = useNavigate();

  // 🔹 Datos mock (luego conectarás a tu API)
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
    <LayoutAgronomo>
      <main className="p-10">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Soporte</h1>

        {/* Botón crear ticket */}
        <button
          onClick={() => navigate("/registrarticketag")}
          className="bg-green-600 text-white px-8 py-4 text-xl rounded-xl shadow-lg hover:bg-green-700 transition font-bold mb-8"
        >
          Solicitar soporte
        </button>

        {/* Tabla de tickets */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-base text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                {[
                  "Ticket",
                  "Asunto",
                  "Estado",
                  "Solicitado por",
                  "Fecha de solicitud",
                  "Acciones",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 border uppercase">
                    {h}
                  </th>
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
                    <button
                      onClick={() => verDetalle(t)}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-200 transition justify-center mx-auto"
                    >
                      <IconEye className="w-4 h-4" /> Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </LayoutAgronomo>
  );
};

export default Soporte_agro;
