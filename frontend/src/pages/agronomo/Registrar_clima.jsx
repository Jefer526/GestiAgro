import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconCheck } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { variablesClimaApi, fincasApi } from "../../services/apiClient";

const Registrar_clima = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [fincas, setFincas] = useState([]);

  const [form, setForm] = useState({
    finca: "",
    fecha: "",
    precipitacion: "",
    temp_min: "",
    temp_max: "",
    humedad: "",
  });

  // Cargar fincas al iniciar
  useEffect(() => {
    const fetchFincas = async () => {
      try {
        const res = await fincasApi.list();
        setFincas(res.data);
      } catch (error) {
        console.error("Error cargando fincas:", error);
      }
    };
    fetchFincas();
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
        navigate("/variablesclimaticas");
      }, 2000);
    } catch (error) {
      alert("⚠️ Ya existe un registro para esta fecha en la finca.");
    }
  };

  return (
    <LayoutAgronomo>
      {alertaVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Variables registradas exitosamente
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate("/variablesclimaticas")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-gray-200 p-8 rounded-xl w-full max-w-2xl mx-auto space-y-6 text-black"
      >
        <h2 className="text-3xl font-bold text-green-700">
          Registrar variables climáticas
        </h2>

        {/* Selección de finca */}
        <div>
          <label className="block mb-1 font-semibold">Finca</label>
          <select
            name="finca"
            value={form.finca}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Seleccione una finca</option>
            {fincas.map((finca) => (
              <option key={finca.id} value={finca.id}>
                {finca.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Precipitación (mm)</label>
          <input
            type="number"
            name="precipitacion"
            value={form.precipitacion}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Temp. mínima (°C)</label>
            <input
              type="number"
              name="temp_min"
              value={form.temp_min}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Temp. máxima (°C)</label>
            <input
              type="number"
              name="temp_max"
              value={form.temp_max}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Humedad (%)</label>
          <input
            type="number"
            name="humedad"
            value={form.humedad}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        <div className="flex justify-center space-x-6">
          <button type="submit" className="bg-green-600 text-white px-8 py-2 rounded">
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate("/variablesclimaticas")}
            className="bg-gray-300 text-black px-8 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </LayoutAgronomo>
  );
};

export default Registrar_clima;
