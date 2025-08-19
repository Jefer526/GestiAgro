// src/pages/agronomo/Crear_finca_agro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
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

  const [alertaVisible, setAlertaVisible] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Finca creada:", formData);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/gestionfincas");
    }, 2000);
  };

  return (
    <LayoutAgronomo>
      {/* ✅ Alerta */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Finca registrada exitosamente
        </div>
      )}

      {/* 🔙 Botón Volver */}
      <button
        onClick={() => navigate("/gestionfincas")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* 📌 Formulario */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-md space-y-6 text-black"
      >
        {/* Título */}
        <h2 className="text-3xl font-bold text-green-700">Registrar nueva finca</h2>

        <div>
          <label className="block mb-1 font-semibold text-black">Nombre de la finca</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: La Esmeralda"
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
            placeholder="Ej: 20"
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
            placeholder="Ej: 18"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Municipio</label>
          <input
            name="municipio"
            value={formData.municipio}
            onChange={handleChange}
            placeholder="Ej: Neiva"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Departamento</label>
          <input
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            placeholder="Ej: Huila"
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        {/* ✅ Botones acción */}
        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Guardar finca
          </button>
          <button
            type="button"
            onClick={() => navigate("/gestionfincas")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Crear_finca_agro;






