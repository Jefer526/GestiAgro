// src/pages/agronomo/Crear_lote_agro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Crear_lote_agro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    finca: "",
    lote: "",
    area_neta: "",
    area_bruta: "",
    cultivo: "",
    variedad: "",
    estado: "Activo",
  });

  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGuardar = (e) => {
    e.preventDefault();
    console.log("✅ Nuevo lote:", formData);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/gestionlotes");
    }, 2000);
  };

  return (
    <LayoutAgronomo>
      {/* ✅ Alerta */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Lote registrado exitosamente
        </div>
      )}

      {/* 🔙 Botón volver */}
      <button
        onClick={() => navigate("/gestionlotes")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* 📌 Formulario */}
      <form
        onSubmit={handleGuardar}
        className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
      >
        {/* Título */}
        <h2 className="col-span-2 text-3xl font-bold text-green-700">
          Registrar nuevo lote
        </h2>

        <div>
          <label className="block mb-1 font-semibold text-black">Finca</label>
          <input
            name="finca"
            value={formData.finca}
            onChange={handleChange}
            placeholder="Ej: La Esmeralda"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Número de lote</label>
          <input
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            placeholder="Ej: 1"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Área neta (ha)</label>
          <input
            name="area_neta"
            value={formData.area_neta}
            onChange={handleChange}
            placeholder="Ej: 2.5"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Área bruta (ha)</label>
          <input
            name="area_bruta"
            value={formData.area_bruta}
            onChange={handleChange}
            placeholder="Ej: 3.0"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Cultivo</label>
          <input
            name="cultivo"
            value={formData.cultivo}
            onChange={handleChange}
            placeholder="Ej: Aguacate"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Variedad</label>
          <input
            name="variedad"
            value={formData.variedad}
            onChange={handleChange}
            placeholder="Ej: Hass"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* ✅ Botones acción */}
        <div className="col-span-2 flex justify-center space-x-6 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Guardar lote
          </button>
          <button
            type="button"
            onClick={() => navigate("/gestionlotes")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Crear_lote_agro;

