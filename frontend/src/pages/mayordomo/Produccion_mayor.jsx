import React, { useState, useRef, useEffect } from "react";
import {
    IconHome,
    IconClipboardList,
    IconHistory,
    IconChartBar,
    IconBox,
    IconCloudRain,
    IconTractor,
    IconSettings,
    IconTool,
    IconLogout,
    IconBook,
    IconCamera,
    IconPlant2
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useNavigate, useLocation } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const Produccion_mayor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [finca, setFinca] = useState("Todas");
  const [periodo, setPeriodo] = useState("Mes");
  const [cultivo, setCultivo] = useState("Todos");
  const [variedad, setVariedad] = useState("Todas");
  const [lote, setLote] = useState("Todos");

  // Datos de enero a junio
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
        formatter: (value) => `${value} kg`, // ✅ Corregido template literal
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

  // Usuario y tarjeta perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Auto-scroll del contenedor de íconos
  const iconListRef = useRef(null);

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  useEffect(() => {
    if (!iconListRef.current) return;
    if (location.pathname.includes("/produccionagro")) {
      iconListRef.current.scrollTo({
        top: iconListRef.current.scrollHeight,
        behavior: "auto", // ✅ Cambiado "instant" → "auto"
      });
    } else {
      iconListRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] bg-[#f6f6f6] flex">
      {/* Sidebar fijo */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between">
        {/* Logo fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          {/* Home */}
          <div className="relative">
            {location.pathname === "/homemayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Registro labores */}
          <div className="relative">
            {location.pathname === "/registrolabores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconClipboardList className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Historial labores */}
          <div className="relative">
            {location.pathname === "/historial_labores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHistory className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Bodega */}
          <div className="relative">
            {location.pathname === "/bodega_insumos" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconBox className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Variables climáticas */}
          <div className="relative">
            {location.pathname === "/variables_climaticasm" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconCloudRain className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Informes */}
          <div className="relative">
            {location.pathname === "/informes_mayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconChartBar className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Maquinaria */}
          <div className="relative">
            {location.pathname === "/registrar_novedadm" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTractor className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Producción */}
          <div className="relative">
            {location.pathname === "/produccion_mayor" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/produccion_mayor")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconPlant2 className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Cuaderno de Campo */}
          <div className="relative">
            {location.pathname === "/cuaderno_campom" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button onClick={() => navigate("/cuaderno_campom")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconBook className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

        {/* Perfil */}
        <div className="relative mb-6 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[10000] backdrop-blur"
            >
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-red-50 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>


      {/* Contenido principal */}
      <main className="ml-28 p-10 overflow-auto w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Producción agrícola</h1>

        {/* Filtros */}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="font-semibold mr-2">Finca:</label>
            <select value={finca} onChange={(e) => setFinca(e.target.value)} className="border border-gray-300 rounded px-4 py-1 w-full">
              <option>Todas</option>
              <option>La Esmeralda</option>
              <option>La Carolina</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Cultivo:</label>
            <select value={cultivo} onChange={(e) => setCultivo(e.target.value)} className="border border-gray-300 rounded px-4 py-1 w-full">
              <option>Todos</option>
              <option>Café</option>
              <option>Cacao</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Variedad:</label>
            <select value={variedad} onChange={(e) => setVariedad(e.target.value)} className="border border-gray-300 rounded px-4 py-1 w-full">
              <option>Todas</option>
              <option>Variedad A</option>
              <option>Variedad B</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Lote:</label>
            <select value={lote} onChange={(e) => setLote(e.target.value)} className="border border-gray-300 rounded px-4 py-1 w-full">
              <option>Todos</option>
              <option>Lote 1</option>
              <option>Lote 2</option>
            </select>
          </div>
        </div>

        {/* Periodo */}
        <div className="mb-6">
          <label className="font-semibold mr-2">Filtrar por:</label>
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="border border-gray-300 rounded px-4 py-1 w-60">
            <option>Día</option>
            <option>Mes</option>
            <option>Año</option>
          </select>
        </div>

        {/* Fechas */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <label className="font-semibold">Fecha:</label>
          <span>Desde</span>
          <input type="date" className="border border-gray-300 px-3 py-1 rounded w-48" />
          <span>Hasta</span>
          <input type="date" className="border border-gray-300 px-3 py-1 rounded w-48" />
        </div>

        {/* Gráfica */}
        <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center">
            <div
              className="w-5 h-3 mr-2"
              style={{
                background: "linear-gradient(to bottom, rgba(34,197,94,0.8), rgba(34,197,94,0.3))",
                border: "1px solid rgba(34,197,94,1)",
              }}
            ></div>
            <span className="text-gray-700 font-medium">Kilogramos</span>
          </div>
          <div className="h-[350px]">
            <Bar data={data} options={opcionesChart} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Produccion_mayor;
