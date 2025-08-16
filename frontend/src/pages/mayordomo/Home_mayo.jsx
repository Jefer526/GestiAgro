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
  IconChevronRight,
  IconPlant2,
  IconBook
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

// 🔹 Importa el mismo cliente API y endpoints que usas en Admin_usuarios
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";

const Home_mayo = () => {
  const navigate = useNavigate();

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  // ====== LOGOUT replicado ======
  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const refresh = localStorage.getItem("refresh");
      try {
        if (ENDPOINTS?.logout) {
          await api.post(ENDPOINTS.logout, { refresh });
        } else if (accountsApi?.logout) {
          await accountsApi.logout({ refresh });
        }
      } catch (e) {
        console.warn("Fallo en logout del backend:", e);
      }
    } finally {
      try {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
        localStorage.removeItem("rememberedEmail");
      } catch {}
      try {
        if (api?.defaults?.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
      setMostrarTarjeta(false);
      setIsLoggingOut(false);
      window.location.replace("/login");
    }
  };

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
      route: "/equipos_mayordomo",
      gradient: "from-green-500/20 to-yellow-500/20",
      ring: "ring-green-300/40",
      iconBg: "bg-white/70",
      text: "text-green-700",
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
    <div className="min-h-[100dvh] bg-gray-50 flex">
      {/* Sidebar con scroll */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between z-[200]">
        {/* Favicon fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Zona de iconos con scroll y scrollbar oculto */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          {/* HOME con indicador */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/homemayordomo")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              aria-label="Inicio"
              title="Inicio"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Íconos resto */}
          <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconClipboardList className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconHistory className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/cuaderno_campom")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBook className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/produccion_mayor")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconPlant2 className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconTractor className="text-white w-11 h-11" /></button>
          
        </div>
        {/* Perfil */}
        <div className="relative mb-6 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
            aria-haspopup="true"
            aria-expanded={mostrarTarjeta}
            aria-label="Perfil"
            title="Perfil"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[9999] backdrop-blur text-base"
            >
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"><IconSettings className="w-5 h-5 mr-2 text-green-600" />Ajustes</button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"><IconTool className="w-5 h-5 mr-2 text-green-600" />Soporte</button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  isLoggingOut ? "opacity-60 cursor-not-allowed" : "text-red-600"
                }`}
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido */}
      <main className="ml-28 min-h-[100dvh] p-10">
        <h1 className="text-4xl font-bold text-green-700 mb-6">Panel principal</h1>
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-5 rounded-2xl w-full max-w-3xl mb-10 shadow-lg">
          <p className="text-3xl font-semibold">¡Bienvenido!</p>
          <p className="opacity-90 text-lg">Accede rápidamente a las secciones más usadas.</p>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(({ icon, label, desc, route, gradient, ring, iconBg, text }, i) => (
            <button
              key={i}
              onClick={() => navigate(route)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg px-5 py-8 min-h-[160px] text-left transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${gradient} opacity-70`} />
              <div className={`absolute inset-0 pointer-events-none ${ring}`} />
              <div className="relative flex items-center gap-4">
                <div className={`${iconBg} rounded-2xl p-3 shadow-sm transition-transform group-hover:scale-105`}>
                  <div className={text}>{icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800">{label}</h3>
                  <p className="text-slate-600 text-base">{desc}</p>
                </div>
                <IconChevronRight className="w-5 h-5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home_mayo;
