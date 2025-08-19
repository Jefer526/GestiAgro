import React, { useEffect, useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { soporteApi } from "../../services/apiClient";

const Detalles_ticketm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (state?.ticket) {
      setTicket(state.ticket);
    } else {
      // igual que en agrónomo, si recarga sin state se puede pedir con soporteApi.getTicket(id)
    }
  }, [state]);

  if (!ticket) {
    return <p className="text-center text-gray-500 mt-10">Cargando ticket...</p>;
  }

  return (
    <LayoutMayordomo active="soporte_mayordomo">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5" /> Volver
      </button>

      <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          Detalles del ticket
        </h1>

        <div className="text-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <p className="text-gray-500">Ticket</p>
              <p className="font-semibold text-gray-800">{ticket.numero}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-gray-500">Asunto</p>
              <p className="font-semibold text-gray-800">{ticket.asunto}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-gray-500">Solicitado por</p>
              <p className="font-semibold text-gray-800">
                {ticket.solicitado_por_nombre}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-gray-500">Estado</p>
              <p className="font-semibold text-gray-800">{ticket.estado_display}</p>
            </div>
            <div className="border rounded-lg p-4 md:col-span-2">
              <p className="text-gray-500">Fecha de solicitud</p>
              <p className="font-semibold text-gray-800">{ticket.fecha_solicitud}</p>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Descripción detallada del ticket
            </label>
            <textarea
              className="w-full min-h-[160px] border rounded-md p-3 text-lg"
              value={ticket.descripcion}
              readOnly
            />
          </div>

          {/* Seguimiento */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Seguimiento del ticket
            </label>
            <textarea
              className="w-full min-h-[160px] border rounded-md p-3 text-lg"
              value={ticket.seguimiento || ""}
              readOnly
            />
          </div>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Detalles_ticketm;
