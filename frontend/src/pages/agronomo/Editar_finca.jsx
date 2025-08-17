// src/pages/agronomo/Editar_finca.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Editar_finca = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Estado del formulario de finca
  const [finca, setFinca] = useState({
    nombre: "",
    ubicacion: "",
    coordenadas: "",
    area: "",
  });

  // Usuario (para Layout)
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Manejo de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinca({ ...finca, [name]: value });
  };

  // Guardar cambios
  const handleGuardar = () => {
    console.log("Finca editada:", finca);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/crearfinca");
    }, 2000);
  };

  return (
    <LayoutAgronomo active="/crearfinca" letraInicial={letraInicial}>
      <div className="p-10 overflow-y-auto relative">
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Finca actualizada exitosamente
          </div>
        )}

        {/* Botón volver */}
        <button
          onClick={() => navigate("/crearfinca")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        {/* Formulario de edición */}
        <div className="bg-white shadow-md border border-green-300 p-8 rounded-xl w-full max-w-3xl mx-auto space-y-6 min-h-[34rem] flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-green-700">Editar finca</h2>

          <div>
            <label className="block mb-1 font-semibold text-black">
              Nombre finca
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la finca"
              value={finca.nombre}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">
              Ubicación finca
            </label>
            <input
              type="text"
              name="ubicacion"
              placeholder="Ubicación"
              value={finca.ubicacion}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">
              Coordenadas
            </label>
            <input
              type="text"
              name="coordenadas"
              placeholder="Ej: 2.40,-75.25"
              value={finca.coordenadas}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">
              Área finca
            </label>
            <input
              type="text"
              name="area"
              placeholder="Ej: 12 ha"
              value={finca.area}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-center space-x-6 mt-6">
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
            >
              Guardar cambios
            </button>
            <button
              onClick={() => navigate("/crearfinca")}
              className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Editar_finca;
