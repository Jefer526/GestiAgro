// src/pages/agronomo/Crear_lote_agro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGuardar = () => {
    console.log("Nuevo lote:", formData);
    navigate("/gestionlotes");
  };

  return (
    <LayoutAgronomo>
      {/* 🔙 Botón volver */}
      <button
        onClick={() => navigate("/gestionlotes")}
        className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold mb-6"
      >
        <IconChevronLeft className="w-5 h-5" /> Volver
      </button>

      {/* Título */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
        Crear Lote
      </h1>

      {/* Formulario */}
      <div className="bg-white border border-gray-200 shadow-md p-6 rounded-lg max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold block mb-1">Finca</label>
            <input
              name="finca"
              value={formData.finca}
              onChange={handleChange}
              placeholder="Ej: La Esmeralda"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Número de Lote</label>
            <input
              name="lote"
              value={formData.lote}
              onChange={handleChange}
              placeholder="Ej: 1"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Área neta (ha)</label>
            <input
              name="area_neta"
              value={formData.area_neta}
              onChange={handleChange}
              placeholder="Ej: 2.5"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Área bruta (ha)</label>
            <input
              name="area_bruta"
              value={formData.area_bruta}
              onChange={handleChange}
              placeholder="Ej: 3.0"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Cultivo</label>
            <input
              name="cultivo"
              value={formData.cultivo}
              onChange={handleChange}
              placeholder="Ej: Aguacate"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Variedad</label>
            <input
              name="variedad"
              value={formData.variedad}
              onChange={handleChange}
              placeholder="Ej: Hass"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGuardar}
          className="bg-green-600 text-white mt-6 px-6 py-2 rounded-lg hover:bg-green-700 font-bold"
        >
          Guardar
        </button>
      </div>
    </LayoutAgronomo>
  );
};

export default Crear_lote_agro;
