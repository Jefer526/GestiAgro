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
  IconTemperature,
  IconDroplet,
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
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Variables_climaticas = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("Día");
  const [finca, setFinca] = useState("Todas");

  // Datos para la gráfica
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
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Usuario y estado tarjeta perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Sidebar fijo */}
      <div className="fixed left-0 top-0 bottom-0 bg-green-600 w-28 flex flex-col items-center py-6 justify-between">
        {/* Logo fijo con sticky */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Iconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          {/* Icono activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/Homeagro")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Navegación */}
          <button
            onClick={() => navigate("/Laboresagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/Informesagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/Bodegaagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/variablesclimaticas")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/maquinariaequipos")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/manejopersonal")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/crearfinca")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/crearlote")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconFrame className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Tarjeta perfil flotante abajo */}
        <div className="relative mb-4">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
            aria-label="Menú de perfil"
          >
            {letraInicial}
          </button>

          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/ajustesagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
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

      {/* Contenido principal (desplazado a la derecha del sidebar fijo) */}
      <div className="ml-28 p-10 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Variables climáticas</h1>
          <span className="text-2xl text-black font-bold">Hacienda La esmeralda</span>
        </div>

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
            <label className="text-black font-semibold mr-2">Filtrar por:</label>
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
          <input type="date" className="border border-gray-300 px-3 py-1 rounded" />
          <span className="mx-1">Hasta</span>
          <input type="date" className="border border-gray-300 px-3 py-1 rounded" />
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

        {/* Tarjetas (colores vivos, sin relleno de tarjeta) */}
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
                {/* Ícono */}
                <div className={`${c.iconBg} ${c.iconText} rounded-xl p-3 shadow-sm border`}>
                  {c.icon}
                </div>
                {/* Texto */}
                <div>
                  <p className="text-sm text-slate-500">{c.title}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">{c.value}</span>
                    <span className="text-slate-500 text-base">{c.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Gráfica */}
        <div className="w-full h-[500px]">
          <Bar data={data} options={opcionesChart} />
        </div>
      </div>
    </div>
  );
};

export default Variables_climaticas;






