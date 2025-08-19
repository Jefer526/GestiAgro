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
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[11000] font-semibold text-base">
          <IconCheck className="w-5 h-5" /> Máquina registrada exitosamente
        </div>
      )}

      {/* ✅ Botón volver */}
      <button
        onClick={() => navigate("/maquinariaequipos")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* ✅ Formulario (mismo estilo que Agregar_producto.jsx) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-md p-8 rounded-xl w-full max-w-2xl space-y-6 text-black mx-auto"
      >
        <h2 className="text-3xl font-bold text-green-700">
          Registrar nueva máquina
        </h2>

        <div>
          <label className="block mb-1 font-semibold text-black">Máquina</label>
          <input
            type="text"
            className="w-full border p-3 rounded text-base"
            placeholder="Ej: Tractor"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Referencia</label>
          <input
            type="text"
            className="w-full border p-3 rounded text-base"
            placeholder="Ej: JD 5055"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Ubicación</label>
          <select
            className="w-full border p-3 rounded text-base"
            required
          >
            <option>La Esmeralda</option>
            <option>Las Palmas</option>
            <option>La Carolina</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Estado</label>
          <select
            className="w-full border p-3 rounded text-base"
            required
          >
            <option>Óptimo</option>
            <option>Mantenimiento</option>
            <option>Averiado</option>
          </select>
        </div>

        {/* Botones acción */}
        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate("/maquinariaequipos")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Registrar_maquina;





