import React, { useState, useEffect } from "react";
import { IconTrash, IconPlus, IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

// APIs
import { getMe, lotesApi, trabajadoresApi, laboresApi } from "../../services/apiClient";

const Regis_labores = () => {
  const navigate = useNavigate();

  // Datos iniciales
  const [finca, setFinca] = useState(null);
  const [lotes, setLotes] = useState([]);
  const [trabajadoresLocales, setTrabajadoresLocales] = useState([]);
  const [trabajadoresExternos, setTrabajadoresExternos] = useState([]);

  // Formulario principal
  const [form, setForm] = useState({
    fecha: "",
    lote: "",
    labor: "",
    observaciones: "",
  });

  // Filas de trabajadores
  const [filasLocal, setFilasLocal] = useState([
    { trabajador: "", jornal: "", ejecucion: "", um: "" },
  ]);
  const [filasOtraFinca, setFilasOtraFinca] = useState([]);

  const [alertaVisible, setAlertaVisible] = useState(false);

  // === Cargar datos de backend ===
  useEffect(() => {
    getMe().then((res) => {
      const fincaAsignada = res.data.finca_asignada;
      setFinca(fincaAsignada);

      // Lotes filtrados por finca asignada
      lotesApi.list().then((r) => {
        const filtrados = r.data.filter((l) => l.finca === fincaAsignada.id);
        setLotes(filtrados);
      });

      // Trabajadores activos, internos vs externos
      trabajadoresApi.list().then((r) => {
        const internos = r.data.filter(
          (t) => t.finca === fincaAsignada.id && t.estado === "activo"
        );
        const externos = r.data.filter(
          (t) => t.finca && t.finca !== fincaAsignada.id && t.estado === "activo"
        );
        setTrabajadoresLocales(internos);
        setTrabajadoresExternos(externos);
      });
    });
  }, []);

  // === Manejo de cambios ===
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeFila = (tipo, idx, field, value) => {
    if (tipo === "local") {
      const nuevas = [...filasLocal];
      nuevas[idx][field] = value;
      setFilasLocal(nuevas);
    } else {
      const nuevas = [...filasOtraFinca];
      nuevas[idx][field] = value;
      setFilasOtraFinca(nuevas);
    }
  };

  // === Funciones tabla ===
  const añadirFilaLocal = () =>
    setFilasLocal((prev) => [...prev, { trabajador: "", jornal: "", ejecucion: "", um: "" }]);
  const añadirFilaOtra = () =>
    setFilasOtraFinca((prev) => [...prev, { trabajador: "", jornal: "", ejecucion: "", um: "" }]);
  const eliminarFilaLocal = (idx) => setFilasLocal((prev) => prev.filter((_, i) => i !== idx));
  const eliminarFilaOtra = (idx) => setFilasOtraFinca((prev) => prev.filter((_, i) => i !== idx));

  // === Registrar ===
  const handleRegistrar = async () => {
    try {
      // Mapear internos y externos a "detalles"
      const detalles = [
        ...filasLocal
          .filter((f) => f.trabajador || f.trabajador_externo) // evitar vacíos
          .map((f) => ({
            trabajador: f.trabajador || null, // id del trabajador
            trabajador_externo: null,
            jornal: f.jornal,
            ejecucion: f.ejecucion,
            um: f.um,
          })),
        ...filasOtraFinca
          .filter((f) => f.trabajador) // externos llevan nombre
          .map((f) => ({
            trabajador: null,
            trabajador_externo: f.trabajador, // nombre manual del externo
            jornal: f.jornal,
            ejecucion: f.ejecucion,
            um: f.um,
          })),
      ];

      const payload = {
        fecha: form.fecha,
        lote: form.lote,
        descripcion: form.labor,
        observaciones: form.observaciones,
        detalles,
      };

      await laboresApi.create(payload);

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/historial_labores");
      }, 2000);
    } catch (err) {
      console.error("❌ Error registrando labor:", err.response?.data || err);
      alert("Hubo un error al registrar la labor.");
    }
  };

  return (
    <LayoutMayordomo titulo = "Registrar labores">
      {/* Alerta flotante */}
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Labor registrada exitosamente
        </div>
      )}



      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6 w-full max-w-5xl text-lg">
          {/* Formulario principal */}
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <p className="font-bold mb-1">Finca</p>
              <input
                value={finca?.nombre || ""}
                disabled
                className="border border-gray-300 p-2 rounded-md text-lg w-full bg-gray-100"
              />
            </div>
            <div>
              <p className="font-bold mb-1">Lote</p>
              <select
                name="lote"
                value={form.lote}
                onChange={handleChange}
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
            <div>
              <p className="font-bold mb-1">Labor</p>
              <input
                name="labor"
                value={form.labor}
                onChange={handleChange}
                placeholder="Ej: Podar, Fertilizar..."
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>
            <div>
              <p className="font-bold mb-1">Fecha</p>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md text-lg w-full"
              />
            </div>
          </div>

          {/* Tabla de registro */}
          <div className="border border-gray-300 rounded-xl p-4 mt-4 overflow-x-auto">
            <table className="w-full text-left text-lg">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-2">Trabajador</th>
                  <th className="p-2">Jornal</th>
                  <th className="p-2">Ejecución</th>
                  <th className="p-2">UM</th>
                  <th className="p-2"></th>
                </tr>
              </thead>

              <tbody>
                {/* Sección: misma finca */}
                {filasLocal.map((fila, i) => (
                  <tr key={`local-${i}`}>
                    <td className="p-2">
                      <select
                        value={fila.trabajador}
                        onChange={(e) =>
                          handleChangeFila("local", i, "trabajador", e.target.value)
                        }
                        className="border border-gray-300 p-2 rounded-md text-lg w-full"
                      >
                        <option value="">Seleccione</option>
                        {trabajadoresLocales.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.nombre}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        value={fila.jornal}
                        onChange={(e) => handleChangeFila("local", i, "jornal", e.target.value)}
                        className="border border-gray-300 p-1 w-full rounded-md text-lg"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={fila.ejecucion}
                        onChange={(e) => handleChangeFila("local", i, "ejecucion", e.target.value)}
                        className="border border-gray-300 p-1 w-full rounded-md text-lg"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={fila.um}
                        onChange={(e) => handleChangeFila("local", i, "um", e.target.value)}
                        className="border border-gray-300 p-1 w-full rounded-md text-lg"
                      />
                    </td>
                    <td className="p-2">
                      <button onClick={() => eliminarFilaLocal(i)}>
                        <IconTrash className="w-6 h-6 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={5} className="p-2">
                    <button
                      onClick={añadirFilaLocal}
                      className="flex items-center gap-2 text-green-700 hover:text-green-800 text-lg"
                    >
                      <IconPlus className="w-6 h-6" /> Añadir Trabajador
                    </button>
                  </td>
                </tr>

                {/* Sección: otra finca */}
                <tr>
                  <td colSpan={5} className="pt-4">
                    <p className="font-semibold text-gray-700">Trabajador de otra finca</p>
                  </td>
                </tr>

                {filasOtraFinca.map((fila, i) => (
                  <tr key={`otra-${i}`}>
                    <td className="p-2">
                      <select
                        value={fila.trabajador}
                        onChange={(e) => handleChangeFila("otra", i, "trabajador", e.target.value)}
                        className="border border-gray-300 p-2 rounded-md text-lg w-full"
                      >
                        <option value="">Seleccione</option>
                        {trabajadoresExternos.map((t) => (
                          <option key={t.id} value={t.nombre}>
                            {t.nombre}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        value={fila.jornal}
                        onChange={(e) => handleChangeFila("otra", i, "jornal", e.target.value)}
                        className="border border-gray-300 p-1 w-full rounded-md text-lg"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={fila.ejecucion}
                        onChange={(e) => handleChangeFila("otra", i, "ejecucion", e.target.value)}
                        className="border border-gray-300 p-1 w-full rounded-md text-lg"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={fila.um}
                        onChange={(e) => handleChangeFila("otra", i, "um", e.target.value)}
                        className="border border-gray-300 p-1 w-full rounded-md text-lg"
                      />
                    </td>
                    <td className="p-2">
                      <button onClick={() => eliminarFilaOtra(i)}>
                        <IconTrash className="w-6 h-6 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={5} className="p-2">
                    <button
                      onClick={añadirFilaOtra}
                      className="flex items-center gap-2 text-green-700 hover:text-green-800 text-lg"
                    >
                      <IconPlus className="w-6 h-6" /> Añadir Trabajador de otra finca
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Observaciones */}
          <textarea
            name="observaciones"
            placeholder="Observación adicional"
            value={form.observaciones}
            onChange={handleChange}
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
