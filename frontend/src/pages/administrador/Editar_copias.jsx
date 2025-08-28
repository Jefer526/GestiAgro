// src/pages/administrador/Editar_copias.jsx
import React, { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../layouts/LayoutAdmin";

const Detalle_copias = () => {
  const navigate = useNavigate();

  // Simulamos los datos recibidos (pueden venir por props, state o API)
  const [fecha] = useState("2025-06-12");
  const [hora] = useState("14:21");

  return (
    <LayoutAdmin active="copias">
      <button
        onClick={() => navigate("/copias")}
        className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Detalles de la copia de seguridad
        </h1>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">
            Fecha de carga
          </label>
          <p className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800">
            {fecha}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">
            Hora de carga
          </label>
          <p className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800">
            {hora}
          </p>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Detalle_copias;
