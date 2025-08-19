// src/pages/agronomo/Home_agro.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconCheckupList,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconChevronRight,
  IconPlant2,
  IconBook,
  IconBug,
  IconHistory,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Home_agro = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      icon: <IconCheckupList className="w-8 h-8" />,
      label: "Seguimiento de labores",
      desc: "Monitoreo de labores agrícolas.",
      ruta: "/Laboresagro",
      gradient: "from-emerald-500/20 to-green-500/20",
      ring: "ring-emerald-300/40",
      iconBg: "bg-white/70",
      text: "text-emerald-700",
    },
    {
      icon: <IconHistory className="w-8 h-8" />,
      label: "Historial labores",
      desc: "Consulta trabajos realizados.",
      ruta: "/Historialagro",
      gradient: "from-sky-500/20 to-blue-500/20",
      ring: "ring-sky-300/40",
      iconBg: "bg-white/70",
      text: "text-sky-700",
    },
    {
      icon: <IconBook className="w-8 h-8" />,
      label: "Cuaderno de Campo",
      desc: "Registro y seguimiento de anotaciones y observaciones de campo.",
      ruta: "/Historialcampo",
      gradient: "from-green-700/20 to-amber-600/20",
      ring: "ring-green-400/40",
      iconBg: "bg-white/80",
      text: "text-green-800",
    },
    {
      icon: <IconPlant2 className="w-8 h-8" />,
      label: "Producción",
      desc: "Gestión y registro de producción agrícola.",
      ruta: "/produccionagro",
      gradient: "from-green-500/20 to-yellow-500/20",
      ring: "ring-green-300/40",
      iconBg: "bg-white/70",
      text: "text-green-700",
    },
    {
      icon: <IconChartBar className="w-8 h-8" />,
      label: "Informes",
      desc: "Consulta de reportes y análisis agrícolas.",
      ruta: "/Informesagro",
      gradient: "from-sky-500/20 to-blue-500/20",
      ring: "ring-sky-300/40",
      iconBg: "bg-white/70",
      text: "text-sky-700",
    },
    {
      icon: <IconBug className="w-8 h-8" />,
      label: "Manejo fitosanitario",
      desc: "Manejo de plagas y enfermedades.",
      ruta: "/manejofitosanitario",
      gradient: "from-red-500/20 to-orange-500/20",
      ring: "ring-red-300/40",
      iconBg: "bg-white/70",
      text: "text-red-700",
    },
    {
      icon: <IconBox className="w-8 h-8" />,
      label: "Bodega",
      desc: "Gestión de insumos.",
      ruta: "/Bodegaagro",
      gradient: "from-amber-500/20 to-orange-500/20",
      ring: "ring-amber-300/40",
      iconBg: "bg-white/70",
      text: "text-amber-700",
    },
    {
      icon: <IconCloudRain className="w-8 h-8" />,
      label: "Variables climáticas",
      desc: "Seguimiento y registro de variables climáticas.",
      ruta: "/variablesclimaticas",
      gradient: "from-cyan-500/20 to-sky-500/20",
      ring: "ring-cyan-300/40",
      iconBg: "bg-white/70",
      text: "text-cyan-700",
    },
    {
      icon: <IconTractor className="w-8 h-8" />,
      label: "Maquinaria y equipos",
      desc: "Control de equipos y mantenimientos.",
      ruta: "/maquinariaequipos",
      gradient: "from-lime-500/20 to-green-500/20",
      ring: "ring-lime-300/40",
      iconBg: "bg-white/70",
      text: "text-lime-700",
    },
    {
      icon: <IconUsersGroup className="w-8 h-8" />,
      label: "Manejo personal",
      desc: "Administración de personal.",
      ruta: "/manejopersonal",
      gradient: "from-purple-500/20 to-fuchsia-500/20",
      ring: "ring-purple-300/40",
      iconBg: "bg-white/70",
      text: "text-purple-700",
    },
    {
      icon: <IconPlant className="w-8 h-8" />,
      label: "Gestión finca",
      desc: "Registro y administración de fincas.",
      ruta: "/gestionfincas",
      gradient: "from-teal-500/20 to-emerald-500/20",
      ring: "ring-teal-300/40",
      iconBg: "bg-white/70",
      text: "text-teal-700",
    },
    {
      icon: <IconFrame className="w-8 h-8" />,
      label: "Gestión lote",
      desc: "Registro y administración de lotes.",
      ruta: "/gestionlotes",
      gradient: "from-rose-500/20 to-pink-500/20",
      ring: "ring-rose-300/40",
      iconBg: "bg-white/70",
      text: "text-rose-700",
    },
  ];

  return (
    <LayoutAgronomo>
      <h1 className="text-4xl font-bold text-green-700 mb-6">Panel principal</h1>

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-5 rounded-2xl w-full max-w-3xl mb-10 shadow-lg">
        <p className="text-3xl font-semibold">¡Bienvenido!</p>
        <p className="opacity-90 text-lg">Accede rápidamente a las secciones.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {opciones.map(({ icon, label, desc, ruta, gradient, ring, iconBg, text }, i) => (
          <button
            key={i}
            onClick={() => navigate(ruta)}
            className="group relative overflow-hidden rounded-2xl border border-transparent bg-white shadow-lg px-5 py-8 min-h-[160px] text-left transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 ring-0 hover:ring-0 focus:ring-emerald-600/40"
          >
            <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${gradient} opacity-70`} />
            <div className={`absolute inset-0 pointer-events-none ${ring}`} />

            <div className="relative flex items-center gap-4">
              <div className={`${iconBg} rounded-2xl p-3 shadow-sm transition-transform group-hover:scale-105 shrink-0`}>
                <div className={`${text}`}>{icon}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800">{label}</h3>
                <p className="text-slate-600 text-base">{desc}</p>
              </div>
              <IconChevronRight className="w-5 h-5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </div>
    </LayoutAgronomo>
  );
};

export default Home_agro;
