// src/pages/mayordomo/Registrar_vclima.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { variablesClimaApi, getMe } from "../../services/apiClient";

const Registrar_vclima = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [finca, setFinca] = useState(null);

  const [form, setForm] = useState({
    finca: "",
    fecha: "",
    precipitacion: "",
    temp_min: "",
    temp_max: "",
    humedad: "",
  });

  // Obtener finca del usuario logueado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        if (res.data.finca_asignada) {
          setFinca(res.data.finca_asignada);
          setForm((prev) => ({
            ...prev,
            finca: res.data.finca_asignada.id,
          }));
        } else {
          console.warn("⚠️ El usuario logueado no tiene finca asignada");
        }
      } catch (error) {
        console.error("❌ Error obteniendo usuario:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await variablesClimaApi.post(form);
      setAlertaVisible(true);
      setTimeout(() => {
        setAlertaVisible(false);
        navigate("/variables_climaticasm");
      }, 2000);
    } catch (error) {
      alert("⚠️ Ya existe un registro para esta fecha en esta finca.");
    }
  };

  return (
    <LayoutMayordomo ocultarEncabezado>
      {/* Alerta de guardado exitoso */}
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Variables registradas exitosamente
        </div>
      )}

      {/* Botón Volver */}
      <button
        type="button"
        onClick={() => navigate("/variables_climaticasm")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Encabezado: finca afuera, título dentro de la card */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        {finca && (
          <span className="text-2xl font-bold text-green-700">{finca.nombre}</span>
        )}
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-gray-200 p-8 rounded-xl w-full max-w-2xl mx-auto space-y-6 text-black"
      >
        {/* Título dentro de la card */}
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Registrar variables climáticas
        </h2>

        <div>
          <label className="block mb-1 font-semibold text-black">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">
            Precipitación (mm)
          </label>
          <input
            type="number"
            name="precipitacion"
            value={form.precipitacion}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-black">
              Temperatura mínima (°C)
            </label>
            <input
              type="number"
              name="temp_min"
              value={form.temp_min}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-black">
              Temperatura máxima (°C)
            </label>
            <input
              type="number"
              name="temp_max"
              value={form.temp_max}
              onChange={handleChange}
              className="w-full border p-3 rounded text-base"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">
            Humedad relativa (%)
          </label>
          <input
            type="number"
            name="humedad"
            value={form.humedad}
            onChange={handleChange}
            className="w-full border p-3 rounded text-base"
          />
        </div>

        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate("/variables_climaticasm")}
            className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutMayordomo>
  );
};

export default Registrar_vclima;
