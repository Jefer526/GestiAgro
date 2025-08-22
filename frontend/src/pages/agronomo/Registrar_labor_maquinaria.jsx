// src/pages/mayordomo/Registrar_labor_maquinaria.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { equiposApi, lotesApi } from "../../services/apiClient";

const Registrar_labor_maquinaria = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id de la máquina

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [maquina, setMaquina] = useState(null);
  const [finca, setFinca] = useState(null); // finca asignada a la máquina
  const [lotes, setLotes] = useState([]);

  const [formData, setFormData] = useState({
    fecha: "",
    labor: "",
    horometro_inicio: "",
    horometro_fin: "",
    finca: "",
    lote: "",
  });

  // 📌 Traer info de la máquina y su finca (ubicación)
  useEffect(() => {
    const fetchMaquina = async () => {
      try {
        const res = await equiposApi.get(id);

        setMaquina(res.data);

        if (res.data.ubicacion) {
          // 👈 El backend devuelve "ubicacion" como id y "ubicacion_nombre" como texto
          setFinca({ id: res.data.ubicacion, nombre: res.data.ubicacion_nombre });
          setFormData((prev) => ({ ...prev, finca: res.data.ubicacion }));

          // Traer lotes de esa finca
          const lotesRes = await lotesApi.listByFinca(res.data.ubicacion);

          setLotes(lotesRes.data);
        }
      } catch (err) {
        console.error("❌ Error cargando máquina:", err.response?.data || err);
      }
    };
    fetchMaquina();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { maquina: id, ...formData };
      console.log("📤 Enviando labor maquinaria:", payload);

      // await laboresMaquinariaApi.create(payload);

      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate(`/historialtrabajo/${id}`);
      }, 2000);
    } catch (err) {
      console.error("❌ Error registrando labor:", err.response?.data || err);
    }
  };

  return (
    <LayoutMayordomo>
      {alertaVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold z-[10000]">
          <IconCheck className="w-5 h-5" />
          Labor registrada exitosamente
        </div>
      )}

      <button
        onClick={() => navigate(`/hojadevida/${id}`)}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-[850px] mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Registrar labor maquinaria
        </h1>

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
        <form onSubmit={handleSubmit} className="space-y-4 text-base">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-1">Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Labor:</label>
              <input
                name="labor"
                value={formData.labor}
                onChange={handleChange}
                placeholder="Ej: Siembra"
                required
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Horómetro inicio:</label>
              <input
                type="number"
                name="horometro_inicio"
                value={formData.horometro_inicio}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Horómetro fin:</label>
              <input
                type="number"
                name="horometro_fin"
                value={formData.horometro_fin}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
            </div>

            {/* Finca (solo lectura) */}
            <div>
              <label className="block font-semibold mb-1">Finca:</label>
              <input
                type="text"
                value={finca?.nombre || ""}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-1.5 bg-gray-100"
              />
            </div>
            {/* Lotes de esa finca */}
            <div>
              <label className="block font-semibold mb-1">Lote:</label>
              <select
                name="lote"
                value={formData.lote}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="">Selecciona lote</option>
                {lotes.map((l) => (
                  <option key={l.id} value={l.id}>
                    Lote {l.lote}
                  </option>
                ))}
              </select>
            </div>
                        
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={!maquina}
              className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </LayoutMayordomo>
  );
};

export default Registrar_labor_maquinaria;
