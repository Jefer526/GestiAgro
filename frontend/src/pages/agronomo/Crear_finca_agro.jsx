// src/pages/agronomo/Crear_finca_agro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
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

  const handleSubmit = () => {
    console.log("✅ Finca creada:", formData);
    navigate("/gestionfincas");
  };

  return (
    <LayoutAgronomo>
      {/* 🔙 Botón Volver → igual que Detalles_ticketa */}
      <button
        onClick={() => navigate("/gestionfincas")}
        className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold mb-6"
      >
        <IconChevronLeft className="w-5 h-5" /> Volver
      </button>

      {/* Contenido centrado */}
      <div className="p-10 max-w-3xl mx-auto">
        {/* Título */}
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
          Crear Finca
        </h1>

        {/* 📌 Formulario */}
        <div className="bg-white border border-gray-200 shadow-md p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Nombre finca</label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre de la finca"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Área bruta (ha)</label>
              <input
                name="area_bruta"
                value={formData.area_bruta}
                onChange={handleChange}
                placeholder="Ej: 20 ha"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Área neta (ha)</label>
              <input
                name="area_neta"
                value={formData.area_neta}
                onChange={handleChange}
                placeholder="Ej: 18 ha"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Municipio</label>
              <input
                name="municipio"
                value={formData.municipio}
                onChange={handleChange}
                placeholder="Ej: Neiva"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Departamento</label>
              <input
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                placeholder="Ej: Huila"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Guardar */}
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white mt-6 px-6 py-2 rounded-lg hover:bg-green-700 font-bold"
          >
            Crear finca
          </button>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Crear_finca_agro;
