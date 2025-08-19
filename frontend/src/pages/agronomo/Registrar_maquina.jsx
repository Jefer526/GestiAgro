// src/pages/agronomo/Registrar_maquina.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
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
      {/* ✅ Fondo limpio (se quitó bg-gray-50) */}
      <div className="flex-1 px-10 py-6 relative">
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Máquina registrada exitosamente
          </div>
        )}

        {/* Botón volver */}
        <button
          onClick={() => navigate("/maquinariaequipos")}
          className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
        >
          <IconArrowLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

        {/* Formulario */}
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-10 shadow-md">
          <h1 className="text-3xl font-bold text-green-700 mb-10">
            Registrar Nueva Máquina
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Registrar_maquina;

