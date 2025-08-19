// src/pages/agronomo/Registrar_maquina.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Registrar_maquina = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/maquinariaequipos");
    }, 2000);
  };

  return (
    <LayoutAgronomo active="/maquinariaequipos" letraInicial={letraInicial}>
      {/* ✅ Alerta de éxito */}
      {alertaVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[11000] font-semibold text-base">
          <IconCheck className="w-5 h-5" /> Máquina registrada exitosamente
        </div>
      )}

      {/* ✅ Botón volver */}
      <button
        onClick={() => navigate("/maquinariaequipos")}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* ✅ Formulario (mismo estilo que Registrar_clima.jsx) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-md p-10 rounded-xl w-full max-w-2xl space-y-6 text-black mx-auto"
      >
        <h1 className="text-3xl font-bold text-green-700">
          Registrar Nueva Máquina
        </h1>

        <div>
          <label className="block mb-2 font-semibold text-lg">Máquina</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 text-lg"
            placeholder="Ej: Tractor"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-lg">Referencia</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 text-lg"
            placeholder="Ej: JD 5055"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-lg">Ubicación</label>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 text-lg"
            required
          >
            <option>La Esmeralda</option>
            <option>Las Palmas</option>
            <option>La Carolina</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold text-lg">Estado</label>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 text-lg"
            required
          >
            <option>Óptimo</option>
            <option>Mantenimiento</option>
            <option>Averiado</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            Registrar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Registrar_maquina;




