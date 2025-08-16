// src/pages/mayordomo/Produccion_mayor.jsx
import React, { useState } from "react";
import {
  IconPlant2,
} from "@tabler/icons-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const Produccion_mayor = () => {
  const [finca, setFinca] = useState("Todas");
  const [periodo, setPeriodo] = useState("Mes");
  const [cultivo, setCultivo] = useState("Todos");
  const [variedad, setVariedad] = useState("Todas");
  const [lote, setLote] = useState("Todos");

  // Datos de ejemplo enero-junio
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Kilogramos",
        data: [8000, 9000, 7500, 10000, 9500, 8700],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(34,197,94,0.8)");
          gradient.addColorStop(1, "rgba(34,197,94,0.3)");
          return gradient;
        },
        borderRadius: 0,
        borderWidth: 1,
        borderColor: "rgba(34,197,94,1)",
      },
    ],
  };

  const opcionesChart = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
      datalabels: {
        color: "#1f2937",
        anchor: "end",
        align: "start",
        offset: -20,
        font: { weight: "bold" },
        formatter: (value) => `${value} kg`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 11000,
        ticks: { color: "#374151" },
      },
      x: { ticks: { color: "#374151" } },
    },
  };

  return (
    <LayoutMayordomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
        <IconPlant2 className="w-8 h-8 text-green-600" /> Producción agrícola
      </h1>

      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="font-semibold mr-2">Finca:</label>
          <select
            value={finca}
            onChange={(e) => setFinca(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1 w-full"
          >
            <option>Todas</option>
            <option>La Esmeralda</option>
            <option>La Carolina</option>
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Cultivo:</label>
          <select
            value={cultivo}
            onChange={(e) => setCultivo(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1 w-full"
          >
            <option>Todos</option>
            <option>Café</option>
            <option>Cacao</option>
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Variedad:</label>
          <select
            value={variedad}
            onChange={(e) => setVariedad(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1 w-full"
          >
            <option>Todas</option>
            <option>Variedad A</option>
            <option>Variedad B</option>
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Lote:</label>
          <select
            value={lote}
            onChange={(e) => setLote(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1 w-full"
          >
            <option>Todos</option>
            <option>Lote 1</option>
            <option>Lote 2</option>
          </select>
        </div>
      </div>

      {/* Periodo */}
      <div className="mb-6">
        <label className="font-semibold mr-2">Filtrar por:</label>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="border border-gray-300 rounded px-4 py-1 w-60"
        >
          <option>Día</option>
          <option>Mes</option>
          <option>Año</option>
        </select>
      </div>

      {/* Fechas */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <label className="font-semibold">Fecha:</label>
        <span>Desde</span>
        <input
          type="date"
          className="border border-gray-300 px-3 py-1 rounded w-48"
        />
        <span>Hasta</span>
        <input
          type="date"
          className="border border-gray-300 px-3 py-1 rounded w-48"
        />
      </div>

      {/* Gráfica */}
      <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center">
          <div
            className="w-5 h-3 mr-2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(34,197,94,0.8), rgba(34,197,94,0.3))",
              border: "1px solid rgba(34,197,94,1)",
            }}
          ></div>
          <span className="text-gray-700 font-medium">Kilogramos</span>
        </div>
        <div className="h-[350px]">
          <Bar data={data} options={opcionesChart} />
        </div>
      </div>
    </LayoutMayordomo>
  );
};

export default Produccion_mayor;

