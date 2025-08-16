// src/pages/mayordomo/Regis_labores.jsx
import React, { useState } from "react";
import {
  IconTrash,
  IconPlus,
  IconSearch,
  IconCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// ✅ Importa el layout del Mayordomo
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Regis_labores = () => {
  const navigate = useNavigate();

  // Estado de filas
  const [filasLocal, setFilasLocal] = useState([{}]);
  const [filasOtraFinca, setFilasOtraFinca] = useState([]);

  const [alertaVisible, setAlertaVisible] = useState(false);

  // === Funciones tabla ===
  const añadirFilaLocal = () => setFilasLocal((prev) => [...prev, {}]);
  const añadirFilaOtra = () => setFilasOtraFinca((prev) => [...prev, {}]);
  const eliminarFilaLocal = (idx) =>
    setFilasLocal((prev) => prev.filter((_, i) => i !== idx));
  const eliminarFilaOtra = (idx) =>
    setFilasOtraFinca((prev) => prev.filter((_, i) => i !== idx));

  // === Registrar ===
  const handleRegistrar = () => {
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/historial_labores");
    }, 2000);
  };

  return (
    <LayoutMayordomo>
      {/* Alerta flotante */}
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Labor registrada exitosamente
        </div>
      )}

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Registrar labores
      </h1>

      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6 w-full max-w-5xl text-lg">
          {/* Formulario principal */}
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <p className="font-bold mb-1">Finca</p>
              <select className="border border-gray-300 p-2 rounded-md text-lg w-full">
                <option>Seleccionar finca</option>
                <option>La esmeralda</option>
                <option>Las palmas</option>
                <option>Las carolinas</option>
              </select>
            </div>
            <div>
              <p className="font-bold mb-1">Lote</p>
              <select className="border border-gray-300 p-2 rounded-md text-lg w-full">
                <option>Seleccionar lote</option>
              </select>
            </div>
            <div>
              <p className="font-bold mb-1">Labor</p>
              <select className="border border-gray-300 p-2 rounded-md text-lg w-full">
                <option>Seleccionar labor</option>
              </select>
            </div>
            <div>
              <p className="font-bold mb-1">Fecha</p>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>
          </div>

          {/* Tabla de registro */}
          <div className="border border-gray-300 rounded-xl p-4 mt-4 overflow-x-auto">
            <table className="w-full text-left text-lg">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-2">ID</th>
                  <th className="p-2">Trabajador</th>
                  <th className="p-2">Jornal</th>
                  <th className="p-2">Ejecución</th>
                  <th className="p-2">UM</th>
                  <th className="p-2"></th>
                </tr>
              </thead>

              {/* Sección: misma finca */}
              <tbody>
                {filasLocal.map((_, i) => (
                  <tr key={`local-${i}`}>
                    <td className="p-2 flex items-center">
                      <IconSearch className="w-5 h-5 text-gray-600 mr-1" />
                      <input className="border border-gray-300 p-1 w-full rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <input className="border border-gray-300 p-1 w-full rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <button onClick={() => eliminarFilaLocal(i)}>
                        <IconTrash className="w-6 h-6 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Botón debajo de su sección */}
                <tr>
                  <td colSpan={6} className="p-2">
                    <button
                      onClick={añadirFilaLocal}
                      className="flex items-center gap-2 text-green-700 hover:text-green-800 text-lg"
                    >
                      <IconPlus className="w-6 h-6" /> Añadir Trabajador
                    </button>
                  </td>
                </tr>

                {/* Separador visual */}
                <tr>
                  <td colSpan={6} className="pt-4">
                    <div className="h-px bg-gray-200" />
                  </td>
                </tr>

                {/* Título segunda sección */}
                <tr>
                  <td colSpan={6} className="pb-2">
                    <p className="font-semibold text-gray-700">
                      Trabajador de otra finca
                    </p>
                  </td>
                </tr>

                {/* Sección: otra finca */}
                {filasOtraFinca.map((_, i) => (
                  <tr key={`otra-${i}`}>
                    <td className="p-2 flex items-center">
                      <IconSearch className="w-5 h-5 text-gray-600 mr-1" />
                      <input className="border border-gray-300 p-1 w-full rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <input className="border border-gray-300 p-1 w-full rounded-md text-lg" />
                    </td>
                    <td className="p-2">
                      <button onClick={() => eliminarFilaOtra(i)}>
                        <IconTrash className="w-6 h-6 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Botón debajo de su sección */}
                <tr>
                  <td colSpan={6} className="p-2">
                    <button
                      onClick={añadirFilaOtra}
                      className="flex items-center gap-2 text-green-700 hover:text-green-800 text-lg"
                    >
                      <IconPlus className="w-6 h-6" /> Añadir Trabajador de otra
                      finca
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <textarea
            placeholder="Observación"
            className="border border-gray-300 p-2 rounded-md w-full mt-4 text-lg"
            rows={2}
          ></textarea>

          <button
            onClick={handleRegistrar}
            className="bg-green-600 text-white px-8 py-2 rounded-full mt-4 hover:bg-green-700 text-lg"
          >
            Registrar
          </button>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Regis_labores;
