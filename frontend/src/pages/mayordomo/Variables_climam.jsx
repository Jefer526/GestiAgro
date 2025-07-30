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
  IconDroplet,
  IconTemperature,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Variables_climam = () => {
  const navigate = useNavigate();
  const [desde, setDesde] = useState("2025-06-18");
  const [hasta, setHasta] = useState("2025-06-20");
  const [filtro, setFiltro] = useState("Día");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-full flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconCloudRain className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
        </div>
        <div className="mb-6">
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-2">Variables climáticas</h1>
        <h2 className="text-xl text-green-800 mb-6 font-semibold">
          Hacienda <span className="text-black">La esmeralda</span>
        </h2>

        <div className="flex items-center text-lg gap-4 mb-6">
          <span className="font-medium">Filtrar por:</span>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="border rounded-md p-2">
            <option>Día</option>
            <option>Mes</option>
            <option>Año</option>
          </select>
        </div>

        <div className="flex items-center text-lg gap-4 mb-6">
          <span className="font-semibold">Fecha:</span>
          <span>Desde</span>
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} className="border rounded-md p-2" />
          <span>Hasta</span>
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} className="border rounded-md p-2" />
        </div>

        {/* Botón registrar */}
        <div className="mb-6">
            <button
                onClick={() => navigate("/registrar_climam")}
                className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold"
            >
                Registrar
            </button>
        </div>


        {/* Tarjetas variables */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white border shadow p-4 rounded-xl text-center space-y-2">
            <IconCloudRain className="mx-auto text-green-700 w-8 h-8" />
            <p className="text-3xl font-bold">5 mm</p>
            <p>Precipitaciones</p>
          </div>
          <div className="bg-white border shadow p-4 rounded-xl text-center space-y-2">
            <IconTemperature className="mx-auto text-green-700 w-8 h-8" />
            <p className="text-3xl font-bold">15 °C</p>
            <p>Temperatura Mínima</p>
          </div>
          <div className="bg-white border shadow p-4 rounded-xl text-center space-y-2">
            <IconTemperature className="mx-auto text-green-700 w-8 h-8 rotate-180" />
            <p className="text-3xl font-bold">30 °C</p>
            <p>Temperatura Máxima</p>
          </div>
          <div className="bg-white border shadow p-4 rounded-xl text-center space-y-2">
            <IconDroplet className="mx-auto text-green-700 w-8 h-8" />
            <p className="text-3xl font-bold">90 %</p>
            <p>Humedad Relativa</p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white border shadow rounded-xl p-4">
          <p className="text-lg font-semibold mb-4">Gráfico de datos</p>
          <div className="h-64 bg-gray-100 flex items-end justify-between px-4 overflow-hidden">
            {[150, 280, 380, 250, 180, 30].map((val, idx) => (
              <div key={idx} className="w-8 bg-green-400 rounded-t" style={{ height: `${Math.min(val, 255)}px` }} />
            ))}
          </div>
          <div className="flex justify-between text-sm mt-2 px-4">
            {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"].map((mes) => (
              <span key={mes}>{mes}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variables_climam;

