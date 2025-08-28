// src/pages/agronomo/Variables_climaticas.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";

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

import Select from "react-select";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { variablesClimaApi, fincasApi } from "../../services/apiClient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const Variables_climaticas = () => {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("Día");
  const [fincas, setFincas] = useState([]);
  const [fincasSeleccionadas, setFincasSeleccionadas] = useState([]);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [climas, setClimas] = useState([]);

  // 🔹 variable a graficar
  const [variableGrafica, setVariableGrafica] = useState("precipitacion");

  // 🔹 configuración de etiquetas
  const [decimales, setDecimales] = useState(1);
  const [colorEtiquetas, setColorEtiquetas] = useState("#000");
  const [mostrarEtiquetas, setMostrarEtiquetas] = useState(true);

  // 🔹 modo de rango
  const [modoRango, setModoRango] = useState("por_dia");

  // 📌 Traer fincas y datos de clima
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resFincas = await fincasApi.list();
        setFincas(resFincas.data);

        const resClima = await variablesClimaApi.getAll();
        setClimas(resClima.data);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    fetchData();
  }, []);

  // 📌 Filtrar datos base
  const datosFiltrados = climas.filter((c) => {
    if (
      fincasSeleccionadas.length > 0 &&
      !fincasSeleccionadas.includes(String(c.finca))
    ) {
      return false;
    }
    if (desde && c.fecha < desde) return false;
    if (hasta && c.fecha > hasta) return false;
    return true;
  });

  // 📌 Agrupación con prioridad en el rango
  const agrupados = {};
  datosFiltrados.forEach((d) => {
    let key;

    if (modoRango === "junto" && desde && hasta) {
      key = `${desde} a ${hasta}`;
    } else if (modoRango === "por_dia" && desde && hasta) {
      key = d.fecha;
    } else {
      key = d.fecha;
      if (filtro === "Mes") key = d.fecha.slice(0, 7);
      if (filtro === "Año") key = d.fecha.slice(0, 4);
    }

    if (!agrupados[key]) agrupados[key] = {};
    if (!agrupados[key][d.finca_nombre]) agrupados[key][d.finca_nombre] = 0;

    agrupados[key][d.finca_nombre] += Number(d[variableGrafica] || 0);
  });

  // 📌 Formatear etiquetas
  const formatearLabel = (key) => {
    if (key.includes(" a ")) {
      const [d1, d2] = key.split(" a ");
      return `Del ${d1} al ${d2}`;
    }
    if (filtro === "Mes") {
      const [year, month] = key.split("-");
      const fecha = new Date(year, month - 1);
      let mes = fecha.toLocaleDateString("es-ES", { month: "long" });
      mes = mes.charAt(0).toUpperCase() + mes.slice(1);
      return `${mes} ${year}`;
    }
    if (filtro === "Día") {
      const [year, month, day] = key.split("-");
      return `${day}-${month}-${year}`;
    }
    return key;
  };

  const labelsRaw = Object.keys(agrupados).sort();
  const labels = labelsRaw.map((key) => formatearLabel(key));

  const fincasUnicas = [...new Set(datosFiltrados.map((d) => d.finca_nombre))];

  // 📌 Un dataset por finca
  const datasets = fincasUnicas.map((fincaNombre, i) => ({
    label: fincaNombre,
    data: labelsRaw.map((label) => agrupados[label][fincaNombre] || 0),
    backgroundColor: `hsl(${(i * 60) % 360}, 70%, 50%)`,
  }));

  const data = { labels, datasets };

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
    <LayoutAgronomo>
      {/* Título */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Variables climáticas
        </h1>
        {ultimo && (
          <span className="text-base text-gray-600">
            Último registro:{" "}
            {new Date(ultimo.fecha).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            ({ultimo.finca_nombre})
          </span>
        )}
      </div>

      {/* 🔹 Filtro por finca */}
      <div className="mb-6 w-80">
        <label className="text-black font-semibold block mb-1">Fincas:</label>
        <Select
          isMulti
          closeMenuOnSelect={false}
          placeholder="Todas"
          value={
            fincasSeleccionadas.length === 0
              ? []
              : fincas
                  .filter((f) => fincasSeleccionadas.includes(String(f.id)))
                  .map((f) => ({ value: f.id, label: f.nombre }))
          }
          options={fincas.map((f) => ({ value: f.id, label: f.nombre }))}
          onChange={(selected) => {
            if (!selected || selected.length === 0) {
              setFincasSeleccionadas([]);
            } else {
              setFincasSeleccionadas(selected.map((s) => String(s.value)));
            }
          }}
        />
      </div>

      {/* 🔹 Filtros en una sola fila */}
      <div className="mb-6 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-black font-semibold">Filtrar por:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1"
            disabled={modoRango === "junto"}
          >
            <option>Día</option>
            <option>Mes</option>
            <option>Año</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-black font-semibold">Modo de rango:</label>
          <select
            value={modoRango}
            onChange={(e) => setModoRango(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1"
          >
            <option value="por_dia">Por día</option>
            <option value="junto">Junto (totalizado)</option>
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

      {/* 🔹 Selector de variable + Botón Registrar en la misma fila */}
      <div className="mb-4 flex justify-between items-center">
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

        <button
          onClick={() => navigate("/Registrarclima")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          <IconPlus className="w-5 h-5" />
          Registrar
        </button>
      </div>

      {/* 🔹 Panel configuración etiquetas */}
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

      {/* 🔹 Gráfica */}
      <div className="w-full h-[500px]">
        <Bar data={data} options={opcionesChart} />
      </div>
    </LayoutAgronomo>
  );
};

export default Variables_climaticas;
