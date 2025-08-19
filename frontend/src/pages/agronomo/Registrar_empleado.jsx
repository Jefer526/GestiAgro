// src/pages/agronomo/Registrar_empleado.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Registrar_empleado = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const manejarGuardar = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/manejopersonal");
    }, 2000);
  };

  return (
    <LayoutAgronomo active="/manejopersonal" letraInicial={letraInicial}>
      {/* ✅ Alerta */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Empleado registrado exitosamente
        </div>
      )}

      {/* ✅ Botón volver */}
      <button
        onClick={() => navigate("/manejopersonal")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* ✅ Contenedor principal */}
      <form
        onSubmit={manejarGuardar}
        className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-full max-w-2xl mx-auto space-y-6 text-black"
      >
        <h2 className="text-3xl font-bold text-green-700">
          Registrar empleado
        </h2>

        <div>
          <label className="block mb-1 font-semibold text-black">Nombre completo</label>
          <input
            type="text"
            className="w-full border p-3 rounded text-base"
            placeholder="Juan Pérez"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Cargo</label>
          <input
            type="text"
            className="w-full border p-3 rounded text-base"
            placeholder="Operario de campo"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Estado</label>
          <select
            className="w-full border p-3 rounded text-base"
            required
          >
            <option>Activo</option>
            <option>Inactivo</option>
            <option>Vacaciones</option>
            <option>Suspendido</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Finca</label>
          <select
            className="w-full border p-3 rounded text-base"
            required
          >
            <option>La Esmeralda</option>
            <option>La Carolina</option>
            <option>Las Palmas</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Teléfono</label>
          <input
            type="text"
            className="w-full border p-3 rounded text-base"
            placeholder="3124567890"
            required
          />
        </div>

        {/* ✅ Botones acción */}
        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate("/manejopersonal")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Registrar_empleado;

