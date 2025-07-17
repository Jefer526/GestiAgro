import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Soporte = () => {
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const handleEnviar = () => {
    // Aquí puedes implementar el envío del formulario a un backend
    console.log("Asunto:", asunto);
    console.log("Descripción:", descripcion);
    alert("Mensaje enviado con éxito.");
    navigate("/"); // Regresa a pantalla anterior
  };

  return (
    <div className="min-h-screen bg-green-600 text-white p-6 relative flex flex-col items-center">
      {/* Botón cerrar */}
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

      <h1 className="text-4xl font-bold mb-8 mt-16">Soporte</h1>

      <div className="max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-2">¿No puedes acceder?</h2>
        <p className="mb-6">
          Por favor contacta a nuestro equipo si necesitas ayuda con el acceso a este software.
        </p>

        <label className="block font-semibold mb-1">Asunto:</label>
        <input
          type="text"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          className="w-full p-3 mb-4 rounded-md text-black"
        />

        <label className="block font-semibold mb-1">Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Observación..."
          rows={5}
          className="w-full p-3 rounded-md text-black mb-8"
        />

        <button
          onClick={handleEnviar}
          className="bg-white text-black w-full py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Soporte;

