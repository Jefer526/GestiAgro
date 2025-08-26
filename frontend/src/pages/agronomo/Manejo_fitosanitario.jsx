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
import { IconFileText, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import Select from "react-select";
import { fincasApi, lotesApi, fitosanitarioApi } from "../../services/apiClient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const Fitosanitario_agro = () => {
  const navigate = useNavigate();

  // 📌 Filtros
  const [finca, setFinca] = useState("");
  const [lote, setLote] = useState("");
  const [familia, setFamilia] = useState("");
  const [plaga, setPlaga] = useState("");
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

  // 📌 Cargar lotes cuando cambie la finca
  useEffect(() => {
    if (finca) {
      lotesApi.listByFinca(finca).then((res) => setLotes(res.data)).catch(console.error);
    } else {
      setLotes([]);
    }
  }, [finca]);

  // 📌 Cargar resumen cuando cambien los filtros
  useEffect(() => {
    const params = {};
    if (finca) params.finca = finca;
    if (lote) params.lote = lote;
    if (familia) params.familia = familia;
    if (plaga) params.plaga = plaga;
    if (anio) params.anio = anio;

    fitosanitarioApi
      .resumen(params)
      .then((res) => setResumen(res.data))
      .catch((err) => console.error("Error cargando resumen:", err));
  }, [finca, lote, familia, plaga, anio, meses]);

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
          // ✅ Solo mostrar texto en la leyenda, sin números
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
        align: "end",    // 👈 en vez de "top"
        offset: -7,      // 👈 mueve el número arriba de la barra
        font: { weight: "bold" },
        formatter: (value) => (value > 0 ? value.toFixed(1) : ""),
      },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Promedio de individuos" } },
      x: { title: { display: true, text: meses.length > 1 ? "Meses" : "Familias de plagas" } },
    },
  };

  const generarReporte = () => {
    alert("📄 Reporte generado (simulado)");
  };

  return (
    <LayoutAgronomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Manejo fitosanitario</h1>

      {/* Filtros finca/lote/familia/plaga */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Finca */}
        <div>
          <label className="font-bold block mb-1">Finca</label>
          <select
            value={finca}
            onChange={(e) => {
              setFinca(e.target.value);
              setLote("");
            }}
            className="border rounded px-3 py-1 w-full"
          >
            <option value="">Todas</option>
            {fincas.map((f) => (
              <option key={f.id} value={f.id}>{f.nombre}</option>
            ))}
          </select>
        </div>

        {/* Lote */}
        <div>
          <label className="font-bold block mb-1">Lote</label>
          <select
            value={lote}
            onChange={(e) => setLote(e.target.value)}
            className="border rounded px-3 py-1 w-full"
            disabled={!finca}
          >
            <option value="">Todos</option>
            {lotes.map((l) => (
              <option key={l.id} value={l.id}>{l.lote}</option>
            ))}
          </select>
        </div>

        {/* Familia */}
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

        {/* Plaga */}
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

      {/* Tabla resumen */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Resumen filtrado</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-green-100">
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
              const fincaName = fincas.find((f) => f.id === row.monitoreo__finca_id)?.nombre || "-";
              const loteName = lotes.find((l) => l.id === row.monitoreo__lote_id)?.lote || "-";
              let mesLabel = new Date(row.anio, row.mes - 1).toLocaleDateString("es-ES", { month: "long" });
              mesLabel = mesLabel.charAt(0).toUpperCase() + mesLabel.slice(1);
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{fincaName}</td>
                  <td className="border px-3 py-2">{loteName}</td>
                  <td className="border px-3 py-2">{row.familia}</td>
                  <td className="border px-3 py-2">{row.plaga}</td>
                  <td className="border px-3 py-2">{row.anio}</td>
                  <td className="border px-3 py-2">{mesLabel}</td>
                  <td className="border px-3 py-2 text-center">{row.promedio.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Acciones */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => navigate("/registrarmonitoreo")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          <IconPlus className="w-5 h-5" />
          Registrar Monitoreo
        </button>
        <button
          onClick={generarReporte}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          <IconFileText className="w-5 h-5" />
          Generar reporte
        </button>
      </div>
    </LayoutAgronomo>
  );
};

export default Fitosanitario_agro;
