// src/pages/agronomo/Fitosanitario_agro.jsx
import React, { useState, useEffect } from "react";
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
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import Select from "react-select";
import { fincasApi, lotesApi, fitosanitarioApi } from "../../services/apiClient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const Fitosanitario_agro = () => {
  const navigate = useNavigate();

  // 📌 Filtros
  const [fincasSel, setFincasSel] = useState([]); // múltiple
  const [lote, setLote] = useState("");           // único
  const [familia, setFamilia] = useState("");     // único
  const [plaga, setPlaga] = useState("");         // único
  const [anio, setAnio] = useState(new Date().getFullYear().toString());
  const [meses, setMeses] = useState([]);

  // 📌 Datos backend
  const [fincas, setFincas] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [resumen, setResumen] = useState([]);

  // 📌 Cargar fincas al inicio
  useEffect(() => {
    fincasApi.list().then((res) => setFincas(res.data)).catch(console.error);
  }, []);

  // 📌 Cargar lotes según finca
  useEffect(() => {
    if (fincasSel.length === 1) {
      // si hay solo una finca seleccionada, cargar sus lotes
      lotesApi.listByFinca(fincasSel[0])
        .then((res) => setLotes(res.data))
        .catch(console.error);
    } else {
      setLotes([]); // varias fincas → no mostramos lotes
      setLote("");
    }
  }, [fincasSel]);

  // 📌 Cargar resumen cuando cambien los filtros
  useEffect(() => {
    const params = {};
    if (fincasSel.length > 0) params.finca = fincasSel.join(",");
    if (lote) params.lote = lote;
    if (familia) params.familia = familia;
    if (plaga) params.plaga = plaga;
    if (anio) params.anio = anio;

    fitosanitarioApi
      .resumen(params)
      .then((res) => setResumen(res.data))
      .catch((err) => console.error("Error cargando resumen:", err));
  }, [fincasSel, lote, familia, plaga, anio, meses]);

  // 📌 Años disponibles
  const aniosDisponibles = [...new Set(resumen.map((r) => r.anio))].sort((a, b) => b - a);

  // 📌 Meses disponibles (según año)
  const mesesDisponibles = [
    ...new Set(resumen.filter((r) => r.anio === Number(anio)).map((r) => r.mes)),
  ].map((m) => {
    const fecha = new Date(Number(anio), m - 1);
    let nombreMes = fecha.toLocaleDateString("es-ES", { month: "long" });
    nombreMes = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    return { value: String(m), label: nombreMes };
  });

  // 📌 Filtrado en memoria (para meses múltiple)
  const resumenFiltrado = resumen.filter((row) => {
    if (meses.length > 0 && !meses.includes(String(row.mes))) return false;
    return true;
  });

  // 📌 Configuración gráfica
  let labels = [];
  let datasets = [];

  if (meses.length > 1) {
    const mesesNumericos = [...new Set(resumenFiltrado.map((i) => i.mes))].sort((a, b) => a - b);

    labels = mesesNumericos.map((m) =>
      new Date(Number(anio), m - 1).toLocaleDateString("es-ES", { month: "long" })
    );

    const plagasUnicas = [...new Set(resumenFiltrado.map((i) => i.plaga))];

    datasets = plagasUnicas.map((p, i) => ({
      label: p,
      data: mesesNumericos.map((mNum) => {
        const filas = resumenFiltrado.filter((r) => r.plaga === p && r.mes === mNum);
        if (filas.length === 0) return 0;
        return filas.reduce((acc, f) => acc + f.promedio, 0) / filas.length;
      }),
      backgroundColor: `hsla(${i * 70}, 70%, 50%, 0.7)`,
      borderColor: `hsla(${i * 70}, 70%, 40%, 1)`,
      borderWidth: 1,
    }));
  } else {
    labels = [...new Set(resumenFiltrado.map((i) => i.familia))];
    const plagasUnicas = [...new Set(resumenFiltrado.map((i) => i.plaga))];

    datasets = plagasUnicas.map((p, i) => ({
      label: p,
      data: labels.map((fam) => {
        const filas = resumenFiltrado.filter((r) => r.familia === fam && r.plaga === p);
        if (filas.length === 0) return 0;
        return filas.reduce((acc, f) => acc + f.promedio, 0) / filas.length;
      }),
      backgroundColor: `hsla(${i * 70}, 70%, 50%, 0.7)`,
      borderColor: `hsla(${i * 70}, 70%, 40%, 1)`,
      borderWidth: 1,
    }));
  }

  const data = { labels, datasets };

  const opcionesChart = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          generateLabels: (chart) => {
            const labels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            labels.forEach((l) => {
              l.text = l.text.replace(/[0-9.,]+/g, "").trim();
            });
            return labels;
          },
        },
      },
      datalabels: {
        color: "#1f2937",
        anchor: "end",
        align: "end",
        offset: -7,
        font: { weight: "bold" },
        formatter: (value) => (value > 0 ? value.toFixed(1) : ""),
      },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Promedio de individuos" } },
      x: { title: { display: true, text: meses.length > 1 ? "Meses" : "Familias de plagas" } },
    },
  };

  return (
    <LayoutAgronomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Manejo fitosanitario</h1>

      {/* Filtros finca/lote/familia/plaga */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Finca (múltiple) */}
        <div>
          <label className="font-bold block mb-1">Finca</label>
          <Select
            isMulti
            options={fincas.map((f) => ({ value: f.id, label: f.nombre }))}
            value={fincas.filter((f) => fincasSel.includes(f.id)).map((f) => ({ value: f.id, label: f.nombre }))}
            onChange={(selected) => setFincasSel(selected.map((s) => s.value))}
            placeholder="Todas"
          />
        </div>

        {/* Lote (único) */}
        <div>
          <label className="font-bold block mb-1">Lote</label>
          <select
            value={lote}
            onChange={(e) => setLote(e.target.value)}
            className="border rounded px-3 py-1 w-full"
            disabled={fincasSel.length !== 1}
          >
            <option value="">Todos</option>
            {lotes.map((l) => (
              <option key={l.id} value={l.id}>{l.lote}</option>
            ))}
          </select>
        </div>

        {/* Familia (único) */}
        <div>
          <label className="font-bold block mb-1">Familia</label>
          <select
            value={familia}
            onChange={(e) => setFamilia(e.target.value)}
            className="border rounded px-3 py-1 w-full"
          >
            <option value="">Todas</option>
            {[...new Set(resumen.map((r) => r.familia))].map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Plaga (único) */}
        <div>
          <label className="font-bold block mb-1">Plaga</label>
          <select
            value={plaga}
            onChange={(e) => setPlaga(e.target.value)}
            className="border rounded px-3 py-1 w-full"
          >
            <option value="">Todas</option>
            {[...new Set(resumen.map((r) => r.plaga))].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Año y Mes */}
      <div className="mb-6 flex gap-6 flex-wrap">
        <div>
          <label className="font-bold block mb-1">Año</label>
          <select
            value={anio}
            onChange={(e) => {
              setAnio(e.target.value);
              setMeses([]);
            }}
            className="border rounded px-3 py-1 w-40"
          >
            {aniosDisponibles.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold block mb-1">Mes</label>
          <Select
            isMulti
            options={mesesDisponibles}
            value={mesesDisponibles.filter((m) => meses.includes(m.value))}
            onChange={(selected) => setMeses(selected.map((s) => s.value))}
            className="w-80"
            placeholder="Selecciona mes(es)..."
            noOptionsMessage={() => "No hay meses disponibles"}
          />
        </div>
      </div>

      {/* Gráfica */}
      <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow mb-8">
        <Bar data={data} options={opcionesChart} />
      </div>

      {/* Tabla resumen con botón en el header */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-700">Resumen filtrado</h2>
          <button
            onClick={() => navigate("/registrarmonitoreo")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            <IconPlus className="w-5 h-5" />
            Registrar Monitoreo
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300 text-sm text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border px-3 py-2">Finca</th>
              <th className="border px-3 py-2">Lote</th>
              <th className="border px-3 py-2">Familia</th>
              <th className="border px-3 py-2">Plaga</th>
              <th className="border px-3 py-2">Año</th>
              <th className="border px-3 py-2">Mes</th>
              <th className="border px-3 py-2">Promedio</th>
            </tr>
          </thead>
          <tbody>
            {resumenFiltrado.map((row, idx) => {
              let mesLabel = new Date(row.anio, row.mes - 1).toLocaleDateString("es-ES", {
                month: "long",
              });
              mesLabel = mesLabel.charAt(0).toUpperCase() + mesLabel.slice(1);

              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{row["monitoreo__finca__nombre"]}</td>
                  <td className="border px-3 py-2">{row["monitoreo__lote__lote"] || "-"}</td>
                  <td className="border px-3 py-2">{row.familia}</td>
                  <td className="border px-3 py-2">{row.plaga}</td>
                  <td className="border px-3 py-2">{row.anio}</td>
                  <td className="border px-3 py-2">{mesLabel}</td>
                  <td className="border px-3 py-2">{row.promedio.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
          
        </table>
      </div>
    </LayoutAgronomo>
  );
};

export default Fitosanitario_agro;
