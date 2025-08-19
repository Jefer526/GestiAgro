// src/pages/mayordomo/Programacion_labores.jsx
import React, { useState } from "react";
import { IconTrash, IconPlus, IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Programacion_labores = () => {
  const navigate = useNavigate();

  const [semana, setSemana] = useState("");
  const [lote, setLote] = useState("");
  const [labor, setLabor] = useState("");
  const [jornales, setJornales] = useState("");

  const [labores, setLabores] = useState([]);
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Añadir labor a la tabla
  const añadirLabor = () => {
    if (!semana || !lote || !labor || !jornales) return alert("Completa todos los campos");
    setLabores([...labores, { semana, lote, labor, jornales }]);
    setLote("");
    setLabor("");
    setJornales("");
  };

  const eliminarLabor = (idx) =>
    setLabores((prev) => prev.filter((_, i) => i !== idx));

  const handleGuardar = () => {
    if (labores.length === 0) return alert("No has añadido labores");

    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/historial_labores"); // 👉 redirige al historial
    }, 2000);
  };

  return (
    <LayoutMayordomo>
      {/* ✅ Alerta */}
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Programación guardada
        </div>
      )}

      <h1 className="text-3xl font-bold text-green-700 mb-6 text-left">
        Programación de labores semanales
      </h1>

      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6 w-full max-w-5xl text-lg">
          {/* --- Formulario --- */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold mb-1">Semana</p>
              <select
                value={semana}
                onChange={(e) => setSemana(e.target.value)}
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              >
                <option value="">Seleccionar semana</option>
                <option value="21">Semana 21</option>
                <option value="22">Semana 22</option>
                <option value="23">Semana 23</option>
                <option value="24">Semana 24</option>
                <option value="25">Semana 25</option>
              </select>
            </div>

            <div>
              <p className="font-bold mb-1">Lote</p>
              <input
                value={lote}
                onChange={(e) => setLote(e.target.value)}
                placeholder="Ej: T2"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>

            <div>
              <p className="font-bold mb-1">Labor</p>
              <input
                value={labor}
                onChange={(e) => setLabor(e.target.value)}
                placeholder="Ej: Siembra"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>

            <div>
              <p className="font-bold mb-1">Jornales</p>
              <input
                type="number"
                value={jornales}
                onChange={(e) => setJornales(e.target.value)}
                placeholder="Ej: 7"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>
          </div>

          {/* Botón añadir - alineado a la izquierda */}
          <div className="flex justify-start">
            <button
              onClick={añadirLabor}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              <IconPlus className="w-5 h-5" /> Añadir labor
            </button>
          </div>

          {/* --- Tabla de labores añadidas --- */}
          {labores.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full border border-gray-400 rounded-xl text-center">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-2 border border-gray-300">SEMANA</th>
                    <th className="p-2 border border-gray-300">LOTE</th>
                    <th className="p-2 border border-gray-300">LABOR</th>
                    <th className="p-2 border border-gray-300">JORNALES</th>
                    <th className="p-2 border border-gray-300">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {labores.map((l, i) => (
                    <tr key={i} className="border border-gray-300">
                      <td className="p-2 border border-gray-300">{l.semana}</td>
                      <td className="p-2 border border-gray-300">{l.lote}</td>
                      <td className="p-2 border border-gray-300">{l.labor}</td>
                      <td className="p-2 border border-gray-300">{l.jornales}</td>
                      <td className="p-2 border border-gray-300">
                        <button onClick={() => eliminarLabor(i)}>
                          <IconTrash className="w-6 h-6 text-red-500 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Guardar - alineado a la izquierda */}
          <div className="flex justify-start">
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-8 py-2 rounded-full mt-4 hover:bg-green-700 text-lg"
            >
              Guardar programación
            </button>
          </div>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Programacion_labores;
