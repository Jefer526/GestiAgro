// src/pages/mayordomo/Programacion_labores.jsx
import React, { useState, useEffect } from "react";
import { IconTrash, IconPlus, IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

// ✅ APIs
import { getMe, lotesApi, programacionLaboresApi } from "../../services/apiClient";

const Programacion_labores = () => {
  const navigate = useNavigate();

  // Datos iniciales
  const [finca, setFinca] = useState(null);
  const [lotes, setLotes] = useState([]);

  // Formulario
  const [semana, setSemana] = useState("");
  const [lote, setLote] = useState("");
  const [labor, setLabor] = useState("");
  const [jornales, setJornales] = useState("");

  // Lista temporal
  const [labores, setLabores] = useState([]);

  // Alerta flotante
  const [alertaVisible, setAlertaVisible] = useState(false);

  // === Cargar finca y lotes desde backend ===
  useEffect(() => {
    getMe().then((res) => {
      const fincaAsignada = res.data.finca_asignada;
      setFinca(fincaAsignada);

      // 🔹 Lotes filtrados por finca asignada
      lotesApi.list().then((r) => {
        const filtrados = r.data.filter((l) => l.finca === fincaAsignada.id);
        setLotes(filtrados);
      });
    });
  }, []);

  // === Añadir labor a la tabla ===
  const añadirLabor = () => {
    if (!semana || !lote || !labor || !jornales)
      return alert("Completa todos los campos");

    const loteObj = lotes.find((l) => l.id === parseInt(lote));

    setLabores([
      ...labores,
      {
        semana,
        lote: loteObj?.lote || "Sin nombre",
        lote_id: lote,
        labor,
        jornales,
        estado: "Iniciada",
      },
    ]);

    // Limpiar campos
    setSemana("");
    setLote("");
    setLabor("");
    setJornales("");
  };

  // === Eliminar fila ===
  const eliminarLabor = (idx) =>
    setLabores((prev) => prev.filter((_, i) => i !== idx));

  // === Guardar en backend ===
  const handleGuardar = async () => {
    if (labores.length === 0) return alert("No has añadido labores");

    try {
      for (const l of labores) {
        await programacionLaboresApi.create({
          semana: l.semana,
          lote: l.lote_id, // ID de lote
          labor: l.labor,
          jornales: l.jornales,
          estado: l.estado,
        });
      }

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/seguimiento_laboresm"); // redirige a seguimiento
      }, 2000);
    } catch (err) {
      console.error("❌ Error guardando labores:", err.response?.data || err);
      alert("Hubo un error guardando la programación.");
    }
  };

  return (
    <LayoutMayordomo titulo="Programación de labores semanales">
      {/* Alerta flotante */}
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Programación guardada
        </div>
      )}

      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6 w-full max-w-5xl text-lg">
          {/* --- Formulario --- */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Finca asignada */}
            <div>
              <p className="font-bold mb-1">Finca</p>
              <input
                value={finca?.nombre || ""}
                disabled
                className="border border-gray-300 p-2 rounded-md text-lg w-full bg-gray-100"
              />
            </div>

            {/* Semana manual */}
            <div>
              <p className="font-bold mb-1">Semana</p>
              <input
                type="number"
                value={semana}
                onChange={(e) => setSemana(e.target.value)}
                placeholder="Ej: 22"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>

            {/* Lote desde backend */}
            <div>
              <p className="font-bold mb-1">Lote</p>
              <select
                value={lote}
                onChange={(e) => setLote(e.target.value)}
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              >
                <option value="">Seleccionar lote</option>
                {lotes.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.lote}
                  </option>
                ))}
              </select>
            </div>

            {/* Labor */}
            <div>
              <p className="font-bold mb-1">Labor</p>
              <input
                value={labor}
                onChange={(e) => setLabor(e.target.value)}
                placeholder="Ej: Siembra"
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>

            {/* Jornales */}
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

          {/* Botón añadir */}
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
                    <th className="p-2 border">SEMANA</th>
                    <th className="p-2 border">LOTE</th>
                    <th className="p-2 border">LABOR</th>
                    <th className="p-2 border">JORNALES</th>
                    <th className="p-2 border">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {labores.map((l, i) => (
                    <tr key={i} className="border">
                      <td className="p-2 border">{l.semana}</td>
                      <td className="p-2 border">{l.lote}</td>
                      <td className="p-2 border">{l.labor}</td>
                      <td className="p-2 border">{l.jornales}</td>
                      <td className="p-2 border">
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

          {/* Guardar */}
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
