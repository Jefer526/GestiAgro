import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import faviconBlanco from "../../../assets/favicon-blanco.png";

const C_correo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "correo@desconocido.com"; // Recupera el email

  return (
    <div className="min-h-screen bg-green-600 text-white flex flex-col justify-center items-center px-6 relative">
      
      {/* Botón cerrar */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 text-white text-5xl font-bold"
      >
        ×
      </button>

      {/* Logo */}
      <img
        src={faviconBlanco}
        alt="Logo GestiAgro"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />

      {/* Título */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-20">
        Confirmación de correo electrónico
      </h1>

      {/* Contenido */}
      <div className="w-full max-w-xl flex flex-col items-start">
        <p className="text-xl text-center mb-7 font-semibold">
          Antes de cambiar tu contraseña, necesitamos asegurarnos de que realmente eres tú.
        </p>

        <p className="text-xl text-left mb-4">
          Empezaremos eligiendo dónde se enviará el código de confirmación.
        </p>

        <p className="text-xl font-bold text-left mb-2">
          Enviar email a: {email}
        </p>

        <p className="text-left text-xl mb-10">
          Contacta{" "}
          <span
            className="text-blue-300 font-semibold underline cursor-pointer"
            onClick={() => navigate("/soporte_user")}
          >
            proyecto soporte
          </span>
        </p>

        {/* Botón Confirmar */}
        <button
          onClick={() => navigate("/confirmar-codigo")}
          className="bg-white text-black px-10 py-3 rounded-full hover:bg-gray-100 transition self-center"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default C_correo;
