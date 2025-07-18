import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../../assets/favicon-blanco.png";

const Soporte = () => {
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const handleEnviar = () => {
    console.log("Asunto:", asunto);
    console.log("Descripción:", descripcion);
    alert("Mensaje enviado con éxito.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-600 text-white p-6 relative flex flex-col items-center">
      {/* Logo arriba a la izquierda */}
      <img
        src={faviconBlanco}
        alt="Logo de GestiAgro"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />

      {/* Botón cerrar arriba a la derecha */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 text-white text-3xl font-bold"
      >
        ×
      </button>

      <h1 className="text-3xl md:text-5xl font-bold mb-10 mt-16">Soporte</h1>

      <div className="max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-2">¿No puedes acceder?</h2>
        <p className="mb-6 text-xl">
          Por favor contacta a nuestro equipo si necesitas ayuda con el acceso a este software.
        </p>

        <label className="block text-lg font-semibold mb-1">Asunto:</label>
        <input
          type="text"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          className="w-full text-lg p-3 mb-4 rounded-md text-black"
        />

        <label className="block text-lg font-semibold mb-1">Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Observación..."
          rows={5}
          className="w-full text-lg p-3 rounded-md text-black mb-8"
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
