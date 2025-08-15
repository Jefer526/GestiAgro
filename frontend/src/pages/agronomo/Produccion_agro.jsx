// src/pages/agronomo/Produccion_agro.jsx
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
  IconBook,
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

  // Filtros
  const [finca, setFinca] = useState("Todas");
  const [periodo, setPeriodo] = useState("Mes");
  const [cultivo, setCultivo] = useState("Todos");
  const [variedad, setVariedad] = useState("Todas");
  const [lote, setLote] = useState("Todos");

  // Datos de producción
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

  // Perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjetaPerfil, setMostrarTarjetaPerfil] = useState(false);
  const tarjetaPerfilRef = useRef(null);

  // Ref para scroll automático
  const iconListRef = useRef(null);

  // Cierra tarjeta de perfil al hacer clic fuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaPerfilRef.current && !tarjetaPerfilRef.current.contains(e.target)) {
        setMostrarTarjetaPerfil(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  // Auto-scroll del sidebar
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
        {/* Logo */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Navegación */}
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
          <button
            onClick={() => navigate("/produccionagro")}
            className={`hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition ${
              location.pathname.includes("/produccionagro") ? "relative" : ""
            }`}
            title="Producción agrícola"
          >
            {location.pathname.includes("/produccionagro") && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <IconPlant2 className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/cuadernocampo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition" title="Cuaderno de campo">
            <IconBook className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Perfil */}
        <div className="relative mb-4 mt-auto">
          <button
            onClick={() => setMostrarTarjetaPerfil(!mostrarTarjetaPerfil)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {mostrarTarjetaPerfil && (
            <div
              ref={tarjetaPerfilRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-grey-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => {
                  setMostrarTarjetaPerfil(false);
                  navigate("/ajustesagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjetaPerfil(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjetaPerfil(false);
                  navigate("/login");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="ml-28 p-10 overflow-auto bg-gray-50 min-h-screen">
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

        {/* Filtrar por */}
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
        <div className="w-full h-[400px] bg-white p-6 rounded-xl shadow-md mt-6">
          {/* Leyenda */}
          <div className="mb-4 flex items-center justify-center">
            <div
              className="w-5 h-3 mr-2"
              style={{
                background: "linear-gradient(to bottom, rgba(34,197,94,0.8), rgba(34,197,94,0.3))",
                border: "1px solid rgba(34,197,94,1)",
              }}
            ></div>
            <span className="text-gray-700 font-medium">Kilogramos</span>
          </div>
          {/* Chart */}
          <div className="h-[320px]">
            <Bar data={data} options={opcionesChart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produccion_agro;



