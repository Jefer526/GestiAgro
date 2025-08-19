// src/pages/mayordomo/Manejo_fitosanitariom.jsx
import React, { useState } from "react";
import { IconTrash, IconPlus, IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Manejo_fitosanitariom = () => {
  const navigate = useNavigate();

  // Estados de formulario
  const [fecha, setFecha] = useState("");
  const [lote, setLote] = useState("");
  const [plaga, setPlaga] = useState("");
  const [producto, setProducto] = useState("");
  const [dosis, setDosis] = useState("");
  const [observacion, setObservacion] = useState("");

  // Lista de aplicaciones registradas
  const [aplicaciones, setAplicaciones] = useState([]);
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Agregar aplicación
  const añadirAplicacion = () => {
    if (!fecha || !lote || !plaga || !producto || !dosis) {
      return alert("Completa todos los campos obligatorios");
    }
    setAplicaciones([
      ...aplicaciones,
      { fecha, lote, plaga, producto, dosis, observacion },
    ]);
    // limpiar
    setFecha("");
    setLote("");
    setPlaga("");
    setProducto("");
    setDosis("");
    setObservacion("");
  };

  const eliminarAplicacion = (idx) =>
    setAplicaciones((prev) => prev.filter((_, i) => i !== idx));

  // Guardar
  const handleGuardar = () => {
    if (aplicaciones.length === 0) return alert("No has añadido aplicaciones");

    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/historial_fitosanitario"); // 👉 redirige a historial
    }, 2000);
  };

  return (
    <LayoutMayordomo>
      {/* ✅ Alerta */}
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Registro guardado
        </div>
      )}

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Manejo de Fitosanitarios
      </h1>

      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6 w-full max-w-5xl text-lg">
          {/* --- Formulario --- */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold mb-1">Fecha de aplicación</p>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
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
              <p className="font-bold mb-1">Plaga o enfermedad</p>
              <input
                value={plaga}
                onChange={(e) => setPlaga(e.target.value)}
                placeholder="Ej: Roya, Trips"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>

            <div>
              <p className="font-bold mb-1">Producto aplicado</p>
              <input
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                placeholder="Ej: Fungicida X"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>

            <div>
              <p className="font-bold mb-1">Dosis (UM)</p>
              <input
                value={dosis}
                onChange={(e) => setDosis(e.target.value)}
                placeholder="Ej: 1.5 L/ha"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>

            <div className="md:col-span-2">
              <p className="font-bold mb-1">Observación</p>
              <textarea
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                placeholder="Detalles adicionales"
                className="border border-gray-300 p-2 rounded-md w-full text-lg"
                rows={2}
              />
            </div>
          </div>

          {/* Botón añadir */}
          <button
            onClick={añadirAplicacion}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            <IconPlus className="w-5 h-5" /> Añadir aplicación
          </button>

          {/* --- Tabla de aplicaciones --- */}
          {aplicaciones.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-2">FECHA</th>
                    <th className="p-2">LOTE</th>
                    <th className="p-2">PLAGA / ENFERMEDAD</th>
                    <th className="p-2">PRODUCTO</th>
                    <th className="p-2">DOSIS</th>
                    <th className="p-2">OBSERVACIÓN</th>
                    <th className="p-2">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {aplicaciones.map((a, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{a.fecha}</td>
                      <td className="p-2">{a.lote}</td>
                      <td className="p-2">{a.plaga}</td>
                      <td className="p-2">{a.producto}</td>
                      <td className="p-2">{a.dosis}</td>
                      <td className="p-2">{a.observacion}</td>
                      <td className="p-2">
                        <button onClick={() => eliminarAplicacion(i)}>
                          <IconTrash className="w-6 h-6 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Guardar */}
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white px-8 py-2 rounded-full mt-4 hover:bg-green-700 text-lg"
          >
            Guardar registro
          </button>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Manejo_fitosanitariom;
