// src/pages/mayordomo/Registrar_novedad_hoja.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { equiposApi, mantenimientosApi } from "../../services/apiClient";

const Registrar_novedad_hoja = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id de la máquina

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [maquina, setMaquina] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    tipo: "",
    descripcion: "",
    realizado_por: "",
    estado: "",
  });

  // 📌 Traer info de la máquina
  useEffect(() => {
    const fetchMaquina = async () => {
      try {
        const res = await equiposApi.get(id);
        setMaquina(res.data);
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
      console.log("📤 Enviando mantenimiento:", payload);

      // 1️⃣ Crear mantenimiento
      await mantenimientosApi.create(payload);

      // 2️⃣ Actualizar estado de la máquina si fue cambiado
      if (formData.estado && formData.estado !== maquina.estado) {
        await equiposApi.update(id, { estado: formData.estado });
      }

      // 3️⃣ Mostrar alerta y redirigir
      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate(`/hoja_vidam/${id}`);
      }, 2000);
    } catch (err) {
      console.error("❌ Error registrando mantenimiento:", err.response?.data || err);
    }
  };

  return (
    <LayoutMayordomo>
      {alertaVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold z-[10000]">
          <IconCheck className="w-5 h-5" />
          Mantenimiento registrado exitosamente
        </div>
      )}

      <button
        onClick={() => navigate(`/hoja_vidam/${id}`)}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 w-[850px] mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Registrar mantenimiento
        </h1>

        {maquina ? (
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
            <p><strong>Código:</strong> {maquina.codigo_equipo}</p>
            <p><strong>Máquina:</strong> {maquina.maquina}</p>
            <p><strong>Referencia:</strong> {maquina.referencia}</p>
            <p><strong>Ubicación:</strong> {maquina.ubicacion_nombre}</p>
            <p><strong>Estado actual:</strong> {maquina.estado}</p>
          </div>
        ) : (
          <p className="text-gray-500">Cargando información de la máquina...</p>
        )}

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
              <label className="block font-semibold mb-1">Estado:</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="">Selecciona</option>
                <option value="Óptimo">Óptimo</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Averiado">Averiado</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block font-semibold mb-1">
                Tipo de mantenimiento:
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              >
                <option value="">Selecciona</option>
                <option value="preventivo">Preventivo</option>
                <option value="correctivo">Correctivo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Realizado por:</label>
            <input
              name="realizado_por"
              value={formData.realizado_por}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-1.5"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 font-semibold"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </LayoutMayordomo>
  );
};

export default Registrar_novedad_hoja;
