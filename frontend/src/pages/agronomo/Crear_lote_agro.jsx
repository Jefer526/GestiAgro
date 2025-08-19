// src/pages/agronomo/Crear_lote_agro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconDeviceFloppy } from "@tabler/icons-react";
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

  const handleGuardar = (e) => {
    e.preventDefault();
    console.log("✅ Nuevo lote:", formData);
    navigate("/gestionlotes");
  };

  return (
    <LayoutAgronomo>

        {/* 🔙 Botón volver */}
        <button
          onClick={() => navigate("/gestionlotes")}
          className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
        >
          <IconChevronLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>
        
      <div className="flex-1 px-10 py-6 relative">
        {/* 📌 Formulario */}
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-10 shadow-md">
          <h1 className="text-3xl font-bold text-green-700 mb-10">
            Registrar Nuevo Lote
          </h1>

          <form className="grid grid-cols-2 gap-6" onSubmit={handleGuardar}>
            <div>
              <label className="block mb-2 font-semibold text-lg">Finca</label>
              <input
                name="finca"
                value={formData.finca}
                onChange={handleChange}
                placeholder="Ej: La Esmeralda"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">Número de Lote</label>
              <input
                name="lote"
                value={formData.lote}
                onChange={handleChange}
                placeholder="Ej: 1"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">Área neta (ha)</label>
              <input
                name="area_neta"
                value={formData.area_neta}
                onChange={handleChange}
                placeholder="Ej: 2.5"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">Área bruta (ha)</label>
              <input
                name="area_bruta"
                value={formData.area_bruta}
                onChange={handleChange}
                placeholder="Ej: 3.0"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">Cultivo</label>
              <input
                name="cultivo"
                value={formData.cultivo}
                onChange={handleChange}
                placeholder="Ej: Aguacate"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">Variedad</label>
              <input
                name="variedad"
                value={formData.variedad}
                onChange={handleChange}
                placeholder="Ej: Hass"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            {/* Botón ocupa toda la fila */}
            <div className="col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
              >
              Guardar Lote
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Crear_lote_agro;
