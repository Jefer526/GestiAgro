import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutMayordomo";


const Registrarticketm = () => {
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const navigate = useNavigate();

  const handleEnviar = () => {
    console.log("Asunto:", asunto);
    console.log("Descripción:", descripcion);
    setMostrarAlerta(true);

    // Oculta la alerta tras 2 segundos y redirige a Soporte
    setTimeout(() => {
      setMostrarAlerta(false);
      navigate("/soportemayordomo"); // 👈 listado de tickets
    }, 2000);
  };

  return (
    <LayoutAgronomo>
      <div className="p-8 relative flex flex-col items-center">
        {/* Alerta flotante */}
        {mostrarAlerta && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-green-600 text-white px-6 py-3 rounded shadow-lg font-medium">
              ✅ Mensaje enviado con éxito
            </div>
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-bold mb-10 mt-6 text-green-700">
          Soporte
        </h1>

        <div className="max-w-xl w-full bg-white border border-green-300 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-2 text-green-700">
            ¿Necesitas ayuda?
          </h2>
          <p className="mb-6 text-lg text-gray-700">
            Por favor contacta a nuestro equipo si necesitas ayuda, detalla tu
            problema y responderemos lo más pronto posible.
          </p>

          <label className="block text-base font-semibold mb-1">Asunto:</label>
          <input
            type="text"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            className="w-full text-base p-3 mb-4 rounded-md border border-gray-300"
          />

          <label className="block text-base font-semibold mb-1">
            Descripción:
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Observación..."
            rows={5}
            className="w-full text-base p-3 rounded-md border border-gray-300 mb-6"
          />

          <div className="flex justify-center gap-6">
            <button
              onClick={handleEnviar}
              className="bg-green-600 text-white px-8 py-2 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Enviar
            </button>
            <button
              onClick={() => navigate("/soportemayordomo")}
              className="bg-gray-300 text-black px-8 py-2 rounded-full hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </LayoutAgronomo>
  );
};
export default Registrarticketm;
