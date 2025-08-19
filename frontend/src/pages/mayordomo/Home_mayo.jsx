// src/pages/mayordomo/Home_mayo.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconChevronRight,
  IconClipboardList,
  IconHistory,
  IconBook,
  IconPlant2,
  IconBox,
  IconCloudRain,
  IconChartBar,
  IconTractor,
  IconBug,
  IconCalendarClock,
} from "@tabler/icons-react";

// Importa el layout del Mayordomo
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Home_mayo = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <IconClipboardList className="w-8 h-8" />,
      label: "Registro Labores",
      desc: "Registra actividades y mano de obra.",
      route: "/registrolabores",
      gradient: "from-emerald-500/20 to-green-500/20",
      ring: "ring-emerald-300/40",
      iconBg: "bg-white/70",
      text: "text-emerald-700",
    },
    {
      icon: <IconHistory className="w-8 h-8" />,
      label: "Historial labores",
      desc: "Consulta trabajos realizados.",
      route: "/historial_labores",
      gradient: "from-sky-500/20 to-blue-500/20",
      ring: "ring-sky-300/40",
      iconBg: "bg-white/70",
      text: "text-sky-700",
    },
    {
      icon: <IconBook className="w-8 h-8" />,
      label: "Cuaderno de Campo",
      desc: "Registro de anotaciones, observaciones y fotos de campo.",
      route: "/cuaderno_campom",
      gradient: "from-green-700/20 to-amber-600/20",
      ring: "ring-green-400/40",
      iconBg: "bg-white/80",
      text: "text-green-800",
    },
    {
      icon: <IconPlant2 className="w-8 h-8" />,
      label: "Producción",
      desc: "Gestión y registro de producción agrícola (En desarrollo).",
      route: "/produccion_mayor",
      gradient: "from-green-500/20 to-yellow-500/20",
      ring: "ring-green-300/40",
      iconBg: "bg-white/70",
      text: "text-green-700",
    },
    {
      icon: <IconCalendarClock className="w-8 h-8" />, 
      label: "Programación de labores",
      desc: "Programación de labores semanales.",
      route: "/programacion_labores",
      gradient: "from-green-500/20 to-emerald-500/20",
      ring: "ring-green-300/40",
      iconBg: "bg-white/70",
      text: "text-green-700",
    },
    {
      icon: <IconBug className="w-8 h-8" />,
      label: "Manejo fitosanitario",
      desc: "Manejo de plagas y enfermedades.",
      ruta: "/manejo_fitosanitariom",
      gradient: "from-red-500/20 to-orange-500/20",
      ring: "ring-red-300/40",
      iconBg: "bg-white/70",
      text: "text-red-700",
    },
    {
      icon: <IconBox className="w-8 h-8" />,
      label: "Bodega",
      desc: "Insumos y existencias.",
      route: "/bodega_insumos",
      gradient: "from-amber-500/20 to-orange-500/20",
      ring: "ring-amber-300/40",
      iconBg: "bg-white/70",
      text: "text-amber-700",
    },
    {
      icon: <IconCloudRain className="w-8 h-8" />,
      label: "Variables climáticas",
      desc: "Lluvia, temperatura y más.",
      route: "/variables_climaticasm",
      gradient: "from-indigo-500/20 to-violet-500/20",
      ring: "ring-indigo-300/40",
      iconBg: "bg-white/70",
      text: "text-indigo-700",
    },
    {
      icon: <IconChartBar className="w-8 h-8" />,
      label: "Informes",
      desc: "Rendimiento y reportes.",
      route: "/informes_mayordomo",
      gradient: "from-fuchsia-500/20 to-pink-500/20",
      ring: "ring-fuchsia-300/40",
      iconBg: "bg-white/70",
      text: "text-fuchsia-700",
    },
    {
      icon: <IconTractor className="w-8 h-8" />,
      label: "Maquinaria",
      desc: "Equipos y mantenimiento.",
      route: "/equipos_mayordomo",
      gradient: "from-slate-500/20 to-gray-500/20",
      ring: "ring-slate-300/40",
      iconBg: "bg-white/70",
      text: "text-slate-700",
    },
  ];

  return (
    <LayoutMayordomo>
      <h1 className="text-4xl font-bold text-green-700 mb-6">Panel principal</h1>

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-5 rounded-2xl w-full max-w-3xl mb-10 shadow-lg">
        <p className="text-3xl font-semibold">¡Bienvenido!</p>
        <p className="opacity-90 text-lg">
          Accede rápidamente a las secciones más usadas.
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map(({ icon, label, desc, route, gradient, ring, iconBg, text }, i) => (
          <button
            key={i}
            onClick={() => navigate(route)}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg px-5 py-8 min-h-[160px] text-left transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div
              className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${gradient} opacity-70`}
            />
            <div className={`absolute inset-0 pointer-events-none ${ring}`} />
            <div className="relative flex items-center gap-4">
              <div
                className={`${iconBg} rounded-2xl p-3 shadow-sm transition-transform group-hover:scale-105`}
              >
                <div className={text}>{icon}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800">
                  {label}
                </h3>
                <p className="text-slate-600 text-base">{desc}</p>
              </div>
              <IconChevronRight className="w-5 h-5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </section>
    </LayoutMayordomo>
  );
};

export default Home_mayo;
