import React, { useState } from "react";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconSettings,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Variables_climaticas = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("Día");

  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Precipitaciones",
        data: [150, 300, 500, 320, 260, 40],
        backgroundColor: "rgba(34,197,94,0.5)",
        borderColor: "rgba(34,197,94,1)",
        borderWidth: 1,
      },
    ],
  };

  const opcionesChart = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-full flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto pr-1 scrollbar-hide-only">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>

          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>

          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>

          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>

          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />

            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            onClick={() => navigate("/variablesclimaticas")}>
              <IconCloudRain className="text-white w-11 h-11" />
            </button>

          </div>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          onClick={() => navigate("/maquinariaequipos")}>
            <IconTractor className="text-white w-11 h-11" />
          </button>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          onClick={() => navigate("/manejopersonal")}>
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          
          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
           onClick={() => navigate("/crearfinca")}>
            <IconPlant className="text-white w-11 h-11" />
          </button>

          <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
           onClick={() => navigate("/crearlote")}>
            <IconFrame className="text-white w-11 h-11" />
          </button>
          
        </div>
        <div className="sticky bottom-6 bg-green-600">
          <button onClick={() => navigate("/ajustes")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Variables climáticas</h1>
          <span className="text-2xl text-black font-bold">Hacienda La esmeralda</span>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <label className="text-black font-semibold mr-2">Filtrar por:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1"
          >
            <option>Día</option>
            <option>Mes</option>
            <option>Año</option>
          </select>
        </div>

        {/* Fecha */}
        <div className="mb-6 flex items-center gap-2">
          <label className="text-black font-semibold">Fecha:</label>
          <span className="mr-1">Desde</span>
          <input type="date" className="border border-gray-300 px-3 py-1 rounded" />
          <span className="mx-1">Hasta</span>
          <input type="date" className="border border-gray-300 px-3 py-1 rounded" />
        </div>

        {/* Botón Registrar */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/Registrarclima")}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-semibold"
          >
            Registrar
          </button>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border shadow-md shadow-green-400/50 rounded-lg p-6 text-center">
            <div className="text-2xl">🌧️</div>
            <p className="text-lg font-semibold">5 mm</p>
            <p className="text-sm">Precipitaciones</p>
          </div>
          <div className="bg-white border shadow-md shadow-green-400/50 rounded-lg p-6 text-center">
            <div className="text-2xl">🌡️</div>
            <p className="text-lg font-semibold">15 C</p>
            <p className="text-sm">Temperatura Mínima</p>
          </div>
          <div className="bg-white border shadow-md shadow-green-400/50 rounded-lg p-6 text-center">
            <div className="text-2xl">🌡️</div>
            <p className="text-lg font-semibold">30 C</p>
            <p className="text-sm">Temperatura Máxima</p>
          </div>
          <div className="bg-white border shadow-md shadow-green-400/50 rounded-lg p-6 text-center">
            <div className="text-2xl">💧</div>
            <p className="text-lg font-semibold">90 %</p>
            <p className="text-sm">Humedad Relativa</p>
          </div>
        </div>

        {/* Gráfica */}
        <div className="w-full h-[500px]">
          <Bar data={data} options={opcionesChart} />
        </div>
      </div>
    </div>
  );
};

export default Variables_climaticas;



