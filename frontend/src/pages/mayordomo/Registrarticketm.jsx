import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrarticketm = () => {
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const navigate = useNavigate();

  const handleEnviar = () => {
    console.log("Asunto:", asunto);
    console.log("Descripción:", descripcion);
    setMostrarAlerta(true);

    // Oculta la alerta tras 2 segundos y redirige a soporte mayordomo
    setTimeout(() => {
      setMostrarAlerta(false);
      navigate("/soportemayordomo"); // 👈 corregido
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-green-600 text-white p-6 relative flex flex-col items-center">

      {/* Alerta flotante */}
      {mostrarAlerta && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white text-green-700 border border-green-400 px-6 py-4 rounded shadow-md font-medium">
            ✅ Mensaje enviado con éxito
          </div>
        </div>
      )}

      {/* Logo superior izquierdo */}
      <img
        src={faviconBlanco}
        alt="Logo de GestiAgro"
        className="absolute top-4 left-4 w-10 h-10 object-contain"
      />

      {/* Botón cerrar */}
      <button
        onClick={() => navigate("/soportemayordomo")} // 👈 corregido
        className="absolute top-4 right-4 text-white text-3xl font-bold"
      >
        ×
      </button>

      <h1 className="text-3xl md:text-5xl font-bold mb-10 mt-16">Soporte</h1>

      <div className="max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-2">¿Necesitas ayuda?</h2>
        <p className="mb-6 text-xl">
          Por favor contacta a nuestro equipo si necesitas ayuda, detalla tu problema y responderemos lo más pronto posible.
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

export default Registrarticketm;
