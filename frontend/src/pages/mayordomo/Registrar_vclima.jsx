// src/pages/mayordomo/Registrar_vclima.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconCheck,
} from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Registrar_vclima = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/variables_climaticasm");
    }, 2000);
  };

  return (
    <LayoutMayordomo>
      {/* ✅ Alerta de guardado exitoso */}
      {alertaVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-[11000] font-semibold text-base">
          <IconCheck className="w-5 h-5" /> Variables registradas exitosamente
        </div>
      )}

      {/* Botón Volver */}
      <button
        type="button"
        onClick={() => navigate("/variables_climaticasm")}
        className="flex items-center text-green-600 text-lg mb-6 self-start hover:underline"
      >
        <IconArrowLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-2xl space-y-6 text-black mx-auto"
      >
        <h2 className="text-3xl font-bold text-green-700 text-center">
          Registrar variables climáticas
        </h2>
        <p className="text-center text-green-700 font-semibold text-lg">
          Hacienda La Esmeralda
        </p>

        <div>
          <label className="block font-bold mb-1">Fecha</label>
          <input
            type="date"
            className="border px-4 py-2 rounded w-full text-lg"
            required
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Precipitación (mm)</label>
          <input
            type="text"
            placeholder="Ej: 10"
            className="border px-4 py-2 rounded w-full text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1">Temperatura mínima (°C)</label>
            <input
              type="text"
              placeholder="Ej: 16°"
              className="border px-4 py-2 rounded w-full text-lg"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Temperatura máxima (°C)</label>
            <input
              type="text"
              placeholder="Ej: 29°"
              className="border px-4 py-2 rounded w-full text-lg"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1">Humedad relativa (%)</label>
          <input
            type="text"
            placeholder="Ej: 85%"
            className="border px-4 py-2 rounded w-full text-lg"
          />
        </div>

        <div className="text-center">
          <button className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg">
            Registrar
          </button>
        </div>
      </form>
    </LayoutMayordomo>
  );
};

export default Registrar_vclima;


