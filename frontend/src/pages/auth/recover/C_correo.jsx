import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import faviconBlanco from "../../../assets/favicon-blanco.png";
import { sendCode } from "../../../services/apiClient"; // función API

const C_correo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "correo no disponible"; // Recupera el email

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleConfirmar = async () => {
    setError("");
    setCargando(true);
    try {
      await sendCode(email); // llama al backend para enviar el código
      navigate("/confirmar-codigo", { state: { email } });
    } catch (err) {
      console.error("Error enviando código:", err);

      // Captura el mensaje del backend si existe
      const backendMsg =
        err.response?.data?.detail || "No se pudo enviar el código. Intenta más tarde.";

      setError(backendMsg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-600 text-white flex flex-col justify-center items-center px-6 relative">
      
      {/* Botón cerrar */}
      <button
        onClick={() => navigate("/login")}
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
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Confirmación de correo electrónico
      </h1>

      {/* Contenido */}
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        <p className="text-lg md:text-xl mb-6 font-medium">
          Antes de cambiar tu contraseña, necesitamos asegurarnos de que realmente eres tú.
        </p>

        <p className="text-lg md:text-xl mb-4">
          Empezaremos enviando un código de confirmación al correo registrado.
        </p>

        <p className="text-lg md:text-xl font-bold mb-8">
          Enviar email a: <span className="underline">{email}</span>
        </p>

        {/* Alerta de error */}
        {error && (
          <div className="bg-red-500/90 text-white px-4 py-2 rounded-md mb-4 text-sm shadow">
            {error}
          </div>
        )}

        {/* Botón Confirmar */}
        <button
          onClick={handleConfirmar}
          disabled={cargando}
          className="bg-white text-black px-10 py-3 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
        >
          {cargando ? "Enviando..." : "Confirmar"}
        </button>
      </div>
    </div>
  );
};

export default C_correo;
