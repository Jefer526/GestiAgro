import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconChevronRight,
} from "@tabler/icons-react";
import LayoutAdmin from "../../layouts/LayoutAdmin";

const Home_adm = () => {
  const navigate = useNavigate();

  // Bloquear botón "Atrás" en Home_adm
  useEffect(() => {
    const blockBack = () => {
      window.history.go(1); // fuerza siempre hacia adelante
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockBack);

    return () => {
      window.removeEventListener("popstate", blockBack);
    };
  }, []);

  const cards = [
    {
      icon: <IconUsers className="w-8 h-8" />,
      label: "Gestionar usuarios",
      desc: "Crea, edita y asigna roles.",
      route: "/admuser",
      gradient: "from-purple-500/20 to-indigo-500/20",
      ring: "ring-purple-300/40",
      iconBg: "bg-white/70",
      text: "text-purple-700",
    },
    {
      icon: <IconCloudUpload className="w-8 h-8" />,
      label: "Copias de seguridad",
      desc: "Respalda y restaura tus datos.",
      route: "/copias",
      gradient: "from-sky-500/20 to-blue-500/20",
      ring: "ring-sky-300/40",
      iconBg: "bg-white/70",
      text: "text-sky-700",
    },
    {
      icon: <IconTool className="w-8 h-8" />,
      label: "Soporte",
      desc: "Provee ayuda y gestiona tickets.",
      route: "/soporte",
      gradient: "from-slate-500/20 to-gray-500/20",
      ring: "ring-slate-300/40",
      iconBg: "bg-white/70",
      text: "text-slate-700",
    },
  ];

  return (
    <LayoutAdmin letraInicial="J">
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Panel principal
      </h1>

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-5 rounded-2xl w-full max-w-3xl mb-10 shadow-lg">
        <p className="text-3xl font-semibold">¡Bienvenido!</p>
        <p className="opacity-90 text-lg"></p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map(
          ({ icon, label, desc, route, gradient, ring, iconBg, text }, i) => (
            <button
              key={i}
              onClick={() => navigate(route, { replace: true })} // evitar duplicados en historial
              className={`group relative overflow-hidden rounded-2xl border border-transparent
                bg-white shadow-lg px-5 py-8 min-h-[160px] text-left transition-all
                hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2
                focus:ring-emerald-600/40`}
            >
              <div
                className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${gradient} opacity-70`}
              />
              <div className={`absolute inset-0 pointer-events-none ${ring}`} />

              <div className="relative flex items-center gap-4">
                <div
                  className={`shrink-0 ${iconBg} rounded-2xl p-3 shadow-sm transition-transform group-hover:scale-105`}
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
          )
        )}
      </section>
    </LayoutAdmin>
  );
};

export default Home_adm;
