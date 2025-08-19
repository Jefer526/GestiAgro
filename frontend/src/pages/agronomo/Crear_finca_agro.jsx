// src/pages/agronomo/Crear_finca_agro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconDeviceFloppy } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Crear_finca_agro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    area_bruta: "",
    area_neta: "",
    municipio: "",
    departamento: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Finca creada:", formData);
    navigate("/gestionfincas");
  };

  return (
    <LayoutAgronomo>
      <div className="flex-1 px-10 py-6 relative">
        {/* 🔙 Botón Volver */}
        <button
          onClick={() => navigate("/gestionfincas")}
          className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
        >
          <IconChevronLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

        {/* 📌 Formulario */}
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-10 shadow-md">
          {/* Título */}
          <h1 className="text-3xl font-bold text-green-700 mb-10">
            Registrar Nueva Finca
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-lg">Nombre de la finca</label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: La Esmeralda"
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
                placeholder="Ej: 20"
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
                placeholder="Ej: 18"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">Municipio</label>
              <input
                name="municipio"
                value={formData.municipio}
                onChange={handleChange}
                placeholder="Ej: Neiva"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-lg">Departamento</label>
              <input
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                placeholder="Ej: Huila"
                className="w-full border border-gray-300 rounded px-4 py-2 text-lg text-black placeholder-gray-400"
                required
              />
            </div>

            {/* Botón Guardar */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
              >
              Guardar Finca
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Crear_finca_agro;





