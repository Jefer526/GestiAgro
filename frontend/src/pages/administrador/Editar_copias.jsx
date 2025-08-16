// src/pages/administrador/Editar_copias.jsx
import React, { useState } from "react";
import { IconChevronLeft, IconDeviceFloppy, IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../layouts/LayoutAdmin"; // ✅ usamos el layout

const Editar_copias = () => {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("2025-06-12");
  const [hora, setHora] = useState("14:21");
  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleGuardar = () => {
    console.log("Guardando copia actualizada:", { fecha, hora });
    // TODO: llamada real a tu API
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/copias");
    }, 2000);
  };

  return (
    <LayoutAdmin active="copias">
      {/* Alerta */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Cambios guardados exitosamente
        </div>
      )}

      <button
        onClick={() => navigate("/copias")}
        className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Editar copia de seguridad
        </h1>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Fecha de carga
          </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Hora de carga
          </label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 font-semibold"
          >
            <IconDeviceFloppy className="w-5 h-5" /> Guardar cambios
          </button>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Editar_copias;
