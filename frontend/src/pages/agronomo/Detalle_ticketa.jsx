// src/pages/admin/Detalles_ticket.jsx
import React, { useEffect, useState } from "react";
import {
  IconChevronLeft,
  IconDeviceFloppy,
  IconCheck,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Detalles_ticketa = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [alertaVisible, setAlertaVisible] = useState(false);

  // Ticket recibido 
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

  const handleGuardar = async () => {
    try {
      console.log("Nuevo estado:", estado);
      console.log("Nuevo seguimiento:", seguimiento);

      // TODO: llamada real a la API
      // await api.put(`/api/tickets/${t.ticket}`, { estado, seguimiento });

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/soporte_agro"); // vuelve a listado soporte
      }, 2000);
    } catch (err) {
      console.error("Error guardando cambios:", err);
    }
  };

  return (
    <LayoutAgronomo active="soporte_agro">
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Estado del ticket actualizado
        </div>
      )}

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
              <p className="font-semibold text-gray-800">
                {t.fechaSolicitud}
              </p>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Descripción detallada del ticket
            </label>
            <textarea
              className="w-full min-h-[160px] border rounded-md p-3 outline-none focus:ring-2 focus:ring-green-400 text-lg"
              value={t.descripcion}
              readOnly
            />
          </div>

          {/* Seguimiento editable */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Seguimiento del ticket
            </label>
            <textarea
              className="w-full min-h-[160px] border rounded-md p-3 outline-none focus:ring-2 focus:ring-green-400 text-lg"
              value={seguimiento}
              readOnly
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
    </LayoutAgronomo>
  );
};

export default Detalles_ticketa;
