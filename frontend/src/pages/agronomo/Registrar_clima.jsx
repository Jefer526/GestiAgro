// src/pages/agronomo/Registrar_clima.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Registrar_clima = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/variablesclimaticas");
    }, 2000);
  };

  return (
    <LayoutAgronomo>
      {/* ✅ Alerta de guardado exitoso */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Variables registradas exitosamente
        </div>
      )}

      {/* Botón Volver */}
      <button
        type="button"
        onClick={() => navigate("/variablesclimaticas")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-gray-200 p-8 rounded-xl w-full max-w-2xl mx-auto space-y-6 text-black"
      >
        <h2 className="text-3xl font-bold text-green-700">
          Registrar variables climáticas
        </h2>
        <p className="text-green-700 font-semibold text-xl">
          Hacienda La Esmeralda
        </p>

        <div>
          <label className="block mb-1 font-semibold text-black">Fecha</label>
          <input
            type="date"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Precipitación (mm)</label>
          <input
            type="text"
            placeholder="Ej: 10"
            className="w-full border p-3 rounded text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-black">Temperatura mínima (°C)</label>
            <input
              type="text"
              placeholder="Ej: 16°"
              className="w-full border p-3 rounded text-base"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-black">Temperatura máxima (°C)</label>
            <input
              type="text"
              placeholder="Ej: 29°"
              className="w-full border p-3 rounded text-base"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Humedad relativa (%)</label>
          <input
            type="text"
            placeholder="Ej: 85%"
            className="w-full border p-3 rounded text-base"
          />
        </div>

        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate("/variablesclimaticas")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Registrar_clima;


