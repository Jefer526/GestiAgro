import React, { useState } from "react";
import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconChevronLeft,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_vclima = () => {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState("");
  const [form, setForm] = useState({
    precipitacion: "",
    tempMin: "",
    tempMax: "",
    humedad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Datos registrados:", { fecha, ...form });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-full flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homemayordomo")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/historial_labores")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
        </div>
        <div className="mb-6">
          <button className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-y-auto bg-gray-50">
        <button onClick={() => navigate("/variables_climaticasm")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <h1 className="text-3xl font-bold text-green-700 mb-2">Registrar variables climáticas</h1>
        <h2 className="text-xl text-gray-800 mb-8 font-semibold">Hacienda Las Palmas</h2>

        <div className="bg-white rounded-xl shadow p-6 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <label className="font-semibold w-20">Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="border rounded px-3 py-2 w-60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <input type="checkbox" />
              <label className="font-medium">Precipitación (mm):</label>
              <input
                type="number"
                name="precipitacion"
                value={form.precipitacion}
                onChange={handleChange}
                className="border rounded px-3 py-1 w-24"
              />
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" />
              <label className="font-medium">Temperatura Máxima:</label>
              <input
                type="number"
                name="tempMax"
                value={form.tempMax}
                onChange={handleChange}
                className="border rounded px-3 py-1 w-24"
              />
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" />
              <label className="font-medium">Temperatura Mínima:</label>
              <input
                type="number"
                name="tempMin"
                value={form.tempMin}
                onChange={handleChange}
                className="border rounded px-3 py-1 w-24"
              />
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" />
              <label className="font-medium">Humedad relativa:</label>
              <input
                type="number"
                name="humedad"
                value={form.humedad}
                onChange={handleChange}
                className="border rounded px-3 py-1 w-24"
              />
            </div>
          </div>

          <div className="pt-4">
            <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold">
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrar_vclima;

