// src/pages/agronomo/Registrar_empleado.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Registrar_empleado = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const manejarGuardar = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/manejopersonal");
    }, 2000);
  };

  return (
    <LayoutAgronomo active="/manejopersonal" letraInicial={letraInicial}>
      <div className="flex-1 p-10 overflow-auto relative">
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Empleado registrado exitosamente
          </div>
        )}

        {/* Botón volver */}
        <button
          onClick={() => navigate("/manejopersonal")}
          className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        {/* Formulario */}
        <div className="bg-white border-2 border-gray-200 rounded-lg w-full max-w-4xl md:max-w-[56rem] mx-auto px-8 py-8 shadow-lg">
          <h1 className="text-3xl font-bold text-green-700 mb-6">
            Registrar empleado
          </h1>

          <form
            onSubmit={manejarGuardar}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block font-bold text-gray-700 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                className="w-full border rounded px-4 py-3"
                placeholder="Juan Pérez"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Cargo</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-3"
                placeholder="Operario de campo"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">
                Estado
              </label>
              <select className="w-full border rounded px-4 py-3" required>
                <option>Activo</option>
                <option>Inactivo</option>
                <option>Vacaciones</option>
                <option>Suspendido</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Finca</label>
              <select className="w-full border rounded px-4 py-3" required>
                <option>La Esmeralda</option>
                <option>La Carolina</option>
                <option>Las Palmas</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="text"
                className="w-full border rounded px-4 py-3"
                placeholder="3124567890"
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg font-semibold"
              >
                Guardar empleado
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Registrar_empleado;
