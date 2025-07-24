import React from "react";
import { useNavigate } from "react-router-dom";

const Seleccion_rol = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-10">Selecciona tu rol</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button
          onClick={() => navigate("/homeadm")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition"
        >
          Administrador
        </button>
        <button
          onClick={() => navigate("/homeagro")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition"
        >
          Agrónomo
        </button>
        <button
          onClick={() => navigate("/homemayordomo")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition"
        >
          Mayordomo
        </button>
      </div>
    </div>
  );
};

export default Seleccion_rol;
