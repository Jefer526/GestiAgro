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
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { produccionApi, lotesApi, getMe } from "../../services/apiClient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const Produccion_mayor = () => {
  const navigate = useNavigate();

  // Filtros
  const [fincaAsignada, setFincaAsignada] = useState(null);
  const [lote, setLote] = useState("");
  const [periodo, setPeriodo] = useState("mes"); // controlado en minúscula

  // Datos
  const [lotes, setLotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  // Función para capitalizar
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Obtener finca asignada al Mayordomo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        if (res.data.finca_asignada) {
          setFincaAsignada(res.data.finca_asignada);
        }
      } catch (err) {
        console.error("❌ Error obteniendo usuario:", err);
      }
    };
    fetchUser();
  }, []);

  // Cargar lotes de la finca asignada
  useEffect(() => {
    const fetchLotes = async () => {
      if (!fincaAsignada) return;
      try {
        const res = await lotesApi.listByFinca(fincaAsignada.id);
        setLotes(res.data);
      } catch (err) {
        console.error("❌ Error cargando lotes:", err);
      }
    };
    fetchLotes();
  }, [fincaAsignada]);

  // Cargar producción (agrupada)
  useEffect(() => {
    const fetchProduccion = async () => {
      if (!fincaAsignada) return;
      try {
        const params = { periodo, finca: fincaAsignada.id }; // ya es "mes" o "año"
        if (lote) params.lote = lote;

        const res = await produccionApi.resumenMensual(params);
        const data = res.data;
        console.log("📊 Datos recibidos del API (agrupados):", data);

        setLabels(
          data.map((item) => {
            if (periodo === "año") {
              return item.periodo; 
            } else {
              // item.periodo viene en formato "YYYY-MM"
              const [year, month] = item.periodo.split("-");
              const fechaNormalizada = new Date(parseInt(year), parseInt(month) - 1, 1);

              return capitalize(
                fechaNormalizada.toLocaleDateString("es-ES", {
                  month: "long",
                  year: "numeric",
                })
              );
            }
          })
        );

        setValues(data.map((item) => item.total));
      } catch (err) {
        console.error("❌ Error cargando producción:", err);
      }
    };
    fetchProduccion();
  }, [fincaAsignada, lote, periodo]);

  // Configurar gráfica
  const data = {
    labels,
    datasets: [
      {
        label: "Producción",
        data: values,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(34,197,94,0.8)");
          gradient.addColorStop(1, "rgba(34,197,94,0.3)");
          return gradient;
        },
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
      tooltip: { enabled: true, mode: "index", intersect: false },
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
      y: { beginAtZero: true, ticks: { color: "#374151" } },
      x: { ticks: { color: "#374151" } },
    },
  };

  return (
    <LayoutMayordomo titulo="Producción agrícola">
      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Finca fija */}
        <div>
          <label className="font-bold text-gray-800 block mb-1">Finca</label>
          <div className="border border-gray-300 rounded px-4 py-1 w-full bg-gray-100">
            {fincaAsignada?.nombre || "Cargando..."}
          </div>
        </div>

        {/* Lote */}
        <div>
          <label className="font-bold text-gray-800 block mb-1">Lote</label>
          <select
            value={lote}
            onChange={(e) => setLote(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1 w-full"
            disabled={!fincaAsignada}
          >
            <option value="">Todos</option>
            {lotes.map((l) => (
              <option key={l.id} value={l.id}>
                {l.lote}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Periodo */}
      <div className="mb-6">
        <label className="font-bold text-gray-800 mr-2">Filtrar por</label>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="border border-gray-300 rounded px-4 py-1 w-60"
        >
          <option value="mes">Mes</option>
          <option value="año">Año</option>
        </select>
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

      {/* Botones de acciones */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => navigate("/registrar_produccionm")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          <IconPlus className="w-5 h-5" />
          Registrar producción
        </button>
      </div>
    </LayoutMayordomo>
  );
};

export default Produccion_mayor;
