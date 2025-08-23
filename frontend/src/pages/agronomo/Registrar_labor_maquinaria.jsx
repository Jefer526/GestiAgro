// src/pages/mayordomo/Registrar_labor_maquinaria.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronLeft, IconCheck, IconPlus, IconTrash } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { equiposApi, lotesApi, laboresMaquinariaApi } from "../../services/apiClient";

const Registrar_labor_maquinaria = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id de la máquina

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [maquina, setMaquina] = useState(null);
  const [finca, setFinca] = useState(null);
  const [lotes, setLotes] = useState([]);
  const [ultimoHorometro, setUltimoHorometro] = useState(0);

  const [formData, setFormData] = useState({
    fecha: "",
    labor: "",
    horometro_inicio: "",
    horometro_fin: "",
    finca: "",
    lote: "",
    observaciones: "",
  });

  const [labores, setLabores] = useState([]);

  // 📌 Traer info de la máquina, finca y último horómetro
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await equiposApi.get(id);
        setMaquina(res.data);

        if (res.data.ubicacion) {
          setFinca({ id: res.data.ubicacion, nombre: res.data.ubicacion_nombre });
          setFormData((prev) => ({ ...prev, finca: res.data.ubicacion }));

          const lotesRes = await lotesApi.listByFinca(res.data.ubicacion);
          setLotes(lotesRes.data);
        }

        // 👇 traer última labor de esta máquina
        const laboresRes = await laboresMaquinariaApi.list(id);
        if (laboresRes.data.length > 0) {
          const ultima = laboresRes.data[0]; // asumimos que viene ordenado
          setUltimoHorometro(ultima.horometro_fin);
          setFormData((prev) => ({
            ...prev,
            horometro_inicio: Number(ultima.horometro_fin).toFixed(1),
          }));
        } else {
          setFormData((prev) => ({ ...prev, horometro_inicio: Number(0).toFixed(1) }));
        }
      } catch (err) {
        console.error("❌ Error cargando datos:", err.response?.data || err);
      }
    };
    fetchData();
  }, [id]);

  // Inputs
  const handleChange = (e) => {
    let value = e.target.value;
    // 👇 permitir escribir números y decimales, sin forzar .toFixed
    if (["horometro_inicio", "horometro_fin"].includes(e.target.name) && value !== "") {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // 📌 función para mostrar fecha en formato DD/MM/YYYY
  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const [y, m, d] = fecha.split("-");
    return `${d}/${m}/${y}`;
  };

  // ➡️ Añadir labor
  const añadirLabor = () => {
    const { fecha, labor, horometro_inicio, horometro_fin, lote } = formData;

    if (!fecha || !labor || horometro_inicio === "" || horometro_fin === "" || !lote) {
      return alert("Completa todos los campos obligatorios");
    }

    if (Number(horometro_fin) < Number(horometro_inicio)) {
      return alert("El horómetro fin no puede ser menor al horómetro inicio");
    }

    const loteObj = lotes.find((lt) => lt.id === Number(lote));

    setLabores([
      ...labores,
      {
        ...formData,
        loteId: Number(lote),
        loteNombre: loteObj ? `Lote ${loteObj.lote}` : "—",
      },
    ]);

    setFormData((prev) => ({
      ...prev,
      labor: "",
      horometro_inicio: Number(horometro_fin).toFixed(1),
      horometro_fin: "",
      lote: "",
      observaciones: "",
    }));
  };

  // ➡️ Eliminar labor
  const eliminarLabor = (idx) => {
    const nuevasLabores = labores.filter((_, i) => i !== idx);
    setLabores(nuevasLabores);

    if (nuevasLabores.length > 0) {
      const ultima = nuevasLabores[nuevasLabores.length - 1];
      setFormData((prev) => ({
        ...prev,
        horometro_inicio: Number(ultima.horometro_fin).toFixed(1),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        horometro_inicio: Number(0).toFixed(1),
      }));
    }
  };

  // ➡️ Guardar todas las labores
  const handleGuardar = async () => {
    if (labores.length === 0) return alert("No has añadido labores");

    try {
      const payload = labores.map((l) => ({
        maquina: Number(id),
        fecha: l.fecha,
        labor: l.labor,
        horometro_inicio: Number(l.horometro_inicio).toFixed(2), // 👈 dos decimales para backend
        horometro_fin: Number(l.horometro_fin).toFixed(2),       // 👈 dos decimales para backend
        finca: Number(l.finca),
        lote: Number(l.loteId),
        observaciones: l.observaciones || "",
      }));

      console.log("📤 Enviando labores maquinaria (en bloque):", payload);

      await laboresMaquinariaApi.create(payload);

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate(`/historialtrabajo/${id}`);
      }, 2000);
    } catch (err) {
      console.error("❌ Error guardando labores:", err.response?.data || err);
    }
  };

  return (
    <LayoutMayordomo>
      {alertaVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold z-[10000]">
          <IconCheck className="w-5 h-5" /> Labores registradas exitosamente
        </div>
      )}

      <button
        onClick={() => navigate(`/historialtrabajo/${id}`)}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-[1050px] mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Registrar labor maquinaria</h1>

        {/* Datos de la máquina */}
        {maquina ? (
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
            <p><strong>Código:</strong> {maquina.codigo_equipo}</p>
            <p><strong>Máquina:</strong> {maquina.maquina}</p>
            <p><strong>Referencia:</strong> {maquina.referencia}</p>
            <p><strong>Ubicación:</strong> {maquina.ubicacion_nombre}</p>
            <p><strong>Estado:</strong> {maquina.estado}</p>
          </div>
        ) : (
          <p className="text-gray-500">Cargando información de la máquina...</p>
        )}

        {/* Formulario */}
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div>
            <label className="block font-semibold mb-1">Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1.5"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Labor:</label>
            <input
              name="labor"
              value={formData.labor}
              onChange={handleChange}
              placeholder="Ej: Siembra"
              className="w-full border border-gray-300 rounded px-3 py-1.5"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Horómetro inicio:</label>
            <input
              type="number"
              name="horometro_inicio"
              value={formData.horometro_inicio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Horómetro fin:</label>
            <input
              type="number"
              name="horometro_fin"
              value={formData.horometro_fin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1.5"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Finca:</label>
            <input
              type="text"
              value={finca?.nombre || ""}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Lote:</label>
            <select
              name="lote"
              value={formData.lote}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1.5"
              required
            >
              <option value="">Selecciona lote</option>
              {lotes.map((l) => (
                <option key={l.id} value={l.id}>
                  Lote {l.lote}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block font-semibold mb-1">Observaciones:</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Notas adicionales sobre la labor realizada..."
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="3"
            />
          </div>
        </div>

        {/* Botón añadir */}
        <div className="flex justify-start mb-6">
          <button
            onClick={añadirLabor}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            <IconPlus className="w-5 h-5" /> Añadir labor
          </button>
        </div>

        {/* Tabla de labores */}
        {labores.length > 0 && (
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-gray-400 rounded-xl text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-2 border border-gray-300">FECHA</th>
                  <th className="p-2 border border-gray-300">LABOR</th>
                  <th className="p-2 border border-gray-300">HORÓMETRO INICIO</th>
                  <th className="p-2 border border-gray-300">HORÓMETRO FIN</th>
                  <th className="p-2 border border-gray-300">LOTE</th>
                  <th className="p-2 border border-gray-300">OBSERVACIONES</th>
                  <th className="p-2 border border-gray-300">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {labores.map((l, i) => (
                  <tr key={i} className="border border-gray-300">
                    <td className="p-2 border border-gray-300">{formatFecha(l.fecha)}</td>
                    <td className="p-2 border border-gray-300">{l.labor}</td>
                    <td className="p-2 border border-gray-300">{Number(l.horometro_inicio).toFixed(1)}</td>
                    <td className="p-2 border border-gray-300">{Number(l.horometro_fin).toFixed(1)}</td>
                    <td className="p-2 border border-gray-300">{l.loteNombre}</td>
                    <td className="p-2 border border-gray-300 text-left">{l.observaciones}</td>
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

        {/* Guardar */}
        <div className="flex justify-start">
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white px-8 py-2 rounded-full hover:bg-green-700 text-lg"
          >
            Guardar labores
          </button>
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Registrar_labor_maquinaria;
