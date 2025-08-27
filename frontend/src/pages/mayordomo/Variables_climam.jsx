// src/pages/mayordomo/Variables_climam.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconTemperature,
  IconDroplet,
  IconCloudRain,
} from "@tabler/icons-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { variablesClimaApi, getMe } from "../../services/apiClient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const Variables_climam = () => {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("Día");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [climas, setClimas] = useState([]);
  const [finca, setFinca] = useState(null);

  // variable seleccionada
  const [variableGrafica, setVariableGrafica] = useState("precipitacion");

  // configuración de etiquetas
  const [decimales, setDecimales] = useState(1);
  const [colorEtiquetas, setColorEtiquetas] = useState("#000");
  const [mostrarEtiquetas, setMostrarEtiquetas] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Obtener usuario logueado con finca asignada
        const resUser = await getMe();
        const fincaAsignada = resUser.data.finca_asignada;

        if (!fincaAsignada) {
          console.warn("⚠️ El usuario logueado no tiene finca asignada");
          return;
        }

        setFinca(fincaAsignada);

        // 2️⃣ Traer datos climáticos de esa finca
        const resClima = await variablesClimaApi.getAll();
        const datosFinca = resClima.data.filter(
          (c) => String(c.finca) === String(fincaAsignada.id)
        );
        setClimas(datosFinca);
      } catch (err) {
        console.error("❌ Error cargando datos:", err);
      }
    };
    fetchData();
  }, []);

  // 📌 Filtrar por rango
  const datosFiltrados = climas.filter((c) => {
    if (desde && c.fecha < desde) return false;
    if (hasta && c.fecha > hasta) return false;
    return true;
  });

  // 📌 Agrupación
  const agrupados = {};
  datosFiltrados.forEach((d) => {
    let key = d.fecha;
    if (filtro === "Mes") key = d.fecha.slice(0, 7); // yyyy-mm
    if (filtro === "Año") key = d.fecha.slice(0, 4); // yyyy

    if (!agrupados[key]) agrupados[key] = 0;
    agrupados[key] += Number(d[variableGrafica] || 0);
  });

  const labels = Object.keys(agrupados).sort();
  const data = {
    labels,
    datasets: [
      {
        label:
          variableGrafica === "precipitacion"
            ? "Precipitación (mm)"
            : variableGrafica === "temp_min"
            ? "Temperatura mínima (°C)"
            : variableGrafica === "temp_max"
            ? "Temperatura máxima (°C)"
            : "Humedad relativa (%)",
        data: labels.map((l) => agrupados[l]),
        backgroundColor: "rgba(34,197,94,0.5)",
        borderColor: "rgba(34,197,94,1)",
        borderWidth: 1,
      },
    ],
  };

  const opcionesChart = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: mostrarEtiquetas
        ? {
            color: colorEtiquetas,
            anchor: "end",
            align: "top",
            formatter: (value) => value.toFixed(decimales),
            font: { weight: "bold", size: 12 },
          }
        : false,
    },
    scales: { y: { beginAtZero: true } },
  };

  // 📌 Último registro
  const ultimo = datosFiltrados.sort((a, b) =>
    a.fecha < b.fecha ? 1 : -1
  )[0];

  return (
    <LayoutMayordomo>
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Variables climáticas</h1>
        {finca && (
          <span className="text-2xl text-black font-bold">
            {finca.nombre}
          </span>
        )}
      </div>

      {/* Último registro */}
      {ultimo && (
        <div className="mb-4 text-gray-600">
          Último registro:{" "}
          {new Date(ultimo.fecha).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      )}

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-black font-semibold">Filtrar por:</label>
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

        <div className="flex items-center gap-2">
          <label className="text-black font-semibold">Fecha:</label>
          <span>Desde</span>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded"
          />
          <span>Hasta</span>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded"
          />
        </div>
      </div>

      {/* Botón Registrar + Selector de variable */}
      <div className="mb-4 flex gap-4 items-center">
        <button
          onClick={() => navigate("/registrar_climam")}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-semibold"
        >
          Registrar
        </button>

        <select
          value={variableGrafica}
          onChange={(e) => setVariableGrafica(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="precipitacion">Precipitación (mm)</option>
          <option value="temp_min">Temperatura mínima (°C)</option>
          <option value="temp_max">Temperatura máxima (°C)</option>
          <option value="humedad">Humedad relativa (%)</option>
        </select>
      </div>

      {/* Configuración de etiquetas */}
      <div className="flex gap-6 mb-6 items-center">
        <label className="font-semibold text-sm text-gray-700">
          Decimales:
          <select
            value={decimales}
            onChange={(e) => setDecimales(Number(e.target.value))}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </label>

        <label className="font-semibold text-sm text-gray-700">
          Color etiquetas:
          <select
            value={colorEtiquetas}
            onChange={(e) => setColorEtiquetas(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="#000">Negro</option>
            <option value="#fff">Blanco</option>
            <option value="#333">Gris</option>
          </select>
        </label>

        <label className="font-semibold text-sm text-gray-700">
          Mostrar etiquetas:
          <input
            type="checkbox"
            checked={mostrarEtiquetas}
            onChange={(e) => setMostrarEtiquetas(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>

      {/* Gráfica */}
      <div className="w-full h-[500px]">
        <Bar data={data} options={opcionesChart} />
      </div>
    </LayoutMayordomo>
  );
};

export default Variables_climam;
