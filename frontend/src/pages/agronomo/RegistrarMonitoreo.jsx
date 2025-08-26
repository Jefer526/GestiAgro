// src/pages/agronomo/RegistrarMonitoreo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { IconChevronLeft, IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";
import { fincasApi, lotesApi, fitosanitarioApi } from "../../services/apiClient";

const RegistrarMonitoreo = () => {
  const navigate = useNavigate();

  // 📌 Encabezado del monitoreo
  const [fecha, setFecha] = useState("");
  const [finca, setFinca] = useState("");
  const [lote, setLote] = useState("");
  const [observaciones, setObservaciones] = useState("");

  // 📌 Listados desde backend
  const [fincas, setFincas] = useState([]);
  const [lotes, setLotes] = useState([]);

  // 📌 Registros de plagas dinámicos
  const [registros, setRegistros] = useState([{ familia: "", plaga: "", promedio: "" }]);

  // 📌 Campos fijos
  const familias = ["Hemípteros", "Homópteros", "Curculiónidos", "Tisanópteros"];
  const plagas = {
    Hemípteros: ["Loxa sp.", "Antiteuchus"],
    Homópteros: ["Stictocephala bisonia"],
    Curculiónidos: ["Compsus sp."],
    Tisanópteros: ["Trips"],
  };

  // 📌 Cargar fincas al inicio
  useEffect(() => {
    const fetchFincas = async () => {
      try {
        const res = await fincasApi.list();
        setFincas(res.data);
      } catch (err) {
        console.error("Error cargando fincas:", err);
      }
    };
    fetchFincas();
  }, []);

  // 📌 Cargar lotes cuando cambie la finca
  useEffect(() => {
    const fetchLotes = async () => {
      if (!finca) {
        setLotes([]);
        return;
      }
      try {
        const res = await lotesApi.listByFinca(Number(finca));
        setLotes(res.data);
      } catch (err) {
        console.error("Error cargando lotes:", err);
      }
    };
    fetchLotes();
  }, [finca]);

  // 📌 Funciones para manejar filas
  const addRegistro = () => {
    setRegistros([...registros, { familia: "", plaga: "", promedio: "" }]);
  };

  const removeRegistro = (index) => {
    setRegistros(registros.filter((_, i) => i !== index));
  };

  const updateRegistro = (index, field, value) => {
    const nuevos = [...registros];
    nuevos[index][field] = value;
    if (field === "familia") {
      nuevos[index].plaga = ""; // reset plaga si cambia familia
    }
    setRegistros(nuevos);
  };

  // 📌 Guardar monitoreo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fitosanitarioApi.create({
        fecha,
        finca,
        lote,
        observaciones,
        registros,
      });
      alert("✅ Monitoreo registrado correctamente");
      navigate("/manejofitosanitario");
    } catch (err) {
      console.error("Error guardando monitoreo:", err);
      alert("❌ Error al guardar monitoreo");
    }
  };

  return (
    <LayoutAgronomo>
      {/* Botón volver */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 font-semibold hover:underline text-lg"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" />
          Volver
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-[1050px] mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Registrar Monitoreo</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campos generales */}
          <div className="grid grid-cols-2 gap-5 mb-4">
            {/* Fecha */}
            <div>
              <label className="block font-semibold mb-1">Fecha:</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
                required
              />
            </div>

            {/* Finca */}
            <div>
              <label className="block font-semibold mb-1">Finca:</label>
              <select
                value={finca}
                onChange={(e) => {
                  setFinca(e.target.value);
                  setLote("");
                }}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
                required
              >
                <option value="">Seleccione...</option>
                {fincas.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Lote */}
            <div>
              <label className="block font-semibold mb-1">Lote:</label>
              <select
                value={lote}
                onChange={(e) => setLote(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
                required
                disabled={!finca}
              >
                <option value="">Seleccione...</option>
                {lotes.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.lote} {/* ✅ corregido */}
                  </option>
                ))}
              </select>
            </div>

            {/* Observaciones */}
            <div className="col-span-2">
              <label className="block font-semibold mb-1">Observaciones:</label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Notas adicionales del monitoreo..."
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows="3"
              />
            </div>
          </div>

          {/* Tabla de registros de plagas */}
          {registros.length > 0 && (
            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-gray-400 rounded-xl text-center">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-2 border border-gray-300">FAMILIA</th>
                    <th className="p-2 border border-gray-300">PLAGA</th>
                    <th className="p-2 border border-gray-300">PROMEDIO</th>
                    <th className="p-2 border border-gray-300">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((reg, idx) => (
                    <tr key={idx} className="border border-gray-300">
                      {/* Familia */}
                      <td className="p-2 border border-gray-300">
                        <select
                          value={reg.familia}
                          onChange={(e) => updateRegistro(idx, "familia", e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                          required
                        >
                          <option value="">Seleccione...</option>
                          {familias.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Plaga */}
                      <td className="p-2 border border-gray-300">
                        <select
                          value={reg.plaga}
                          onChange={(e) => updateRegistro(idx, "plaga", e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                          required
                          disabled={!reg.familia}
                        >
                          <option value="">Seleccione...</option>
                          {reg.familia &&
                            plagas[reg.familia].map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                        </select>
                      </td>

                      {/* Promedio */}
                      <td className="p-2 border border-gray-300">
                        <input
                          type="number"
                          value={reg.promedio}
                          onChange={(e) => updateRegistro(idx, "promedio", e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                          min="0"
                          step="0.1"
                          required
                        />
                      </td>

                      {/* Acciones */}
                      <td className="p-2 border border-gray-300">
                        <button
                          type="button"
                          onClick={() => removeRegistro(idx)}
                          disabled={registros.length === 1}
                        >
                          <IconTrash className="w-6 h-6 text-red-500 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Botón añadir plaga */}
          <div className="flex justify-start mb-6">
            <button
              type="button"
              onClick={addRegistro}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              <IconPlus className="w-5 h-5" /> Añadir plaga
            </button>
          </div>

          {/* Botón guardar monitoreo */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-2 rounded-full hover:bg-green-700 text-lg flex items-center gap-2"
            >
              <IconCheck className="w-5 h-5" /> Guardar monitoreo
            </button>
          </div>
        </form>
      </div>
    </LayoutAgronomo>
  );
};

export default RegistrarMonitoreo;
