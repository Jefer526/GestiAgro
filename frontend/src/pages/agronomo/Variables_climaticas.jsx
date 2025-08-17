import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  IconCloudRain,
  IconTemperature,
  IconDroplet,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Variables_climaticas = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("Día");
  const [finca, setFinca] = useState("Todas");

  // 📊 Datos de prueba
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
    scales: { y: { beginAtZero: true } },
  };

  return (
    <LayoutAgronomo>
      <div className="p-10">
        {/* Título */}
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Variables climáticas
        </h1>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div>
            <label className="text-black font-semibold mr-2">Finca:</label>
            <select
              value={finca}
              onChange={(e) => setFinca(e.target.value)}
              className="border border-gray-300 rounded px-4 py-1"
            >
              <option>Todas</option>
              <option>La esmeralda</option>
              <option>La Carolina</option>
              <option>Las Palmas</option>
            </select>
          </div>

          <div>
            <label className="text-black font-semibold mr-2">
              Filtrar por:
            </label>
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
        </div>

        {/* Fecha */}
        <div className="mb-6 flex items-center gap-2">
          <label className="text-black font-semibold">Fecha:</label>
          <span className="mr-1">Desde</span>
          <input
            type="date"
            className="border border-gray-300 px-3 py-1 rounded"
          />
          <span className="mx-1">Hasta</span>
          <input
            type="date"
            className="border border-gray-300 px-3 py-1 rounded"
          />
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
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Precipitaciones",
              value: "5",
              unit: "mm",
              icon: <IconCloudRain className="w-6 h-6" />,
              ring: "ring-sky-500/50",
              iconBg: "bg-sky-100",
              iconText: "text-sky-700",
            },
            {
              title: "Temperatura mínima",
              value: "15",
              unit: "°C",
              icon: <IconTemperature className="w-6 h-6" />,
              ring: "ring-indigo-500/50",
              iconBg: "bg-indigo-100",
              iconText: "text-indigo-700",
            },
            {
              title: "Temperatura máxima",
              value: "30",
              unit: "°C",
              icon: <IconTemperature className="w-6 h-6" />,
              ring: "ring-amber-500/50",
              iconBg: "bg-amber-100",
              iconText: "text-amber-700",
            },
            {
              title: "Humedad relativa",
              value: "90",
              unit: "%",
              icon: <IconDroplet className="w-6 h-6" />,
              ring: "ring-emerald-500/50",
              iconBg: "bg-emerald-100",
              iconText: "text-emerald-700",
            },
          ].map((c, i) => (
            <div
              key={i}
              className={[
                "relative overflow-hidden rounded-2xl bg-white border",
                "shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5",
                "px-6 py-5 ring-1",
                c.ring,
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${c.iconBg} ${c.iconText} rounded-xl p-3 shadow-sm border`}
                >
                  {c.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-500">{c.title}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">
                      {c.value}
                    </span>
                    <span className="text-slate-500 text-base">{c.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Gráfica */}
        <div className="w-full h-[500px] bg-white p-6 rounded-xl shadow-md mt-6">
          <Bar data={data} options={opcionesChart} />
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Variables_climaticas;




