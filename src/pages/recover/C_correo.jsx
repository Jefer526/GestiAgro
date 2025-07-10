// src/pages/recover/C_correo.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const C_correo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-600 text-white flex flex-col justify-center items-center px-6 relative">
      {/* Botón de cierre */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-white text-3xl font-bold"
      >
        ×
      </button>

      {/* Logo */}
      <div className="absolute top-4 right-4 font-semibold text-sm">
        Your Logo
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Confirmación de correo electrónico
      </h1>

      {/* Mensaje */}
      <p className="text-lg text-center max-w-xl mb-4">
        Antes de cambiar tu contraseña, necesitamos asegurarnos de que realmente eres tú.
      </p>
      <p className="text-lg text-center max-w-xl mb-4">
        Empezaremos eligiendo dónde se enviará el código de confirmación
      </p>

      <p className="text-lg font-bold mb-2">Enviar email a example@gmail.com</p>

      <p className="text-center text-base mb-10">
        Contacta <span className="text-blue-300 font-semibold underline">proyecto soporte</span> si no tienes acceso.
      </p>

      {/* Botón Confirmar */}
      <button className="bg-white text-black px-10 py-3 rounded-full hover:bg-gray-100 transition">
        Confirmar
      </button>
    </div>
  );
};

export default C_correo;
