import React, { useState, useRef, useEffect } from "react";
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
  IconTool,
  IconLogout,
  IconPlant2,
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

const Produccion_agro = () => {
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
        borderRadius: 8,
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
      datalabels: {
        color: "#1f2937",
        anchor: "end",
        align: "end",
        font: { weight: "bold" },
        formatter: (value) => `${value} kg`,
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#374151" } },
      x: { ticks: { color: "#374151" } },
    },
  };

  // Usuario y tarjeta perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Contenedor scrollable del sidebar (para auto-scroll)
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

  // Auto-scroll del contenedor de íconos: en /produccionagro baja al fondo (ícono activo está abajo)
  useEffect(() => {
    if (!iconListRef.current) return;
    if (location.pathname.includes("/produccionagro")) {
      iconListRef.current.scrollTo({
        top: iconListRef.current.scrollHeight,
        behavior: "instant",
      });
    } else {
      iconListRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 bg-green-600 w-28 flex flex-col items-center py-6 justify-between">
        {/* Logo (sticky) */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Navegación (scrollable) */}
        <div
          ref={iconListRef}
          className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only pb-24"
        >
          <button onClick={() => navigate("/Homeagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Inicio">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Labores">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Informes">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Bodega">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Variables climáticas">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Maquinaria y equipos">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Manejo personal">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Gestión finca">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Gestión lote">
            <IconFrame className="text-white w-11 h-11" />
          </button>

          {/* Producción agrícola – ACTIVO en esta vista */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/produccionagro")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              title="Producción agrícola"
            >
              <IconPlant2 className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

        {/* Perfil */}
        <div className="relative mb-4">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button onClick={() => navigate("/ajustesagro")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => navigate("/soporteagro")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => navigate("/login")} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="ml-28 p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Producción agrícola</h1>

        {/* Fila 1: 4 filtros principales */}
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

        {/* Fila 2: Filtrar por */}
        <div className="mb-6">
          <label className="font-semibold mr-2">Filtrar por:</label>
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="border border-gray-300 rounded px-4 py-1 w-60">
            <option>Día</option>
            <option>Mes</option>
            <option>Año</option>
          </select>
        </div>

        {/* Fila 3: Fechas */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <label className="font-semibold">Fecha:</label>
          <span>Desde</span>
          <input type="date" className="border border-gray-300 px-3 py-1 rounded w-48" />
          <span>Hasta</span>
          <input type="date" className="border border-gray-300 px-3 py-1 rounded w-48" />
        </div>

        {/* Gráfica */}
        <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow">
          <Bar data={data} options={opcionesChart} />
        </div>
      </div>
    </div>
  );
};

export default Produccion_agro;


