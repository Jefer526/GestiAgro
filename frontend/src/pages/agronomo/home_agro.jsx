// src/pages/agronomo/Home_agro.jsx
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
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
  IconChevronRight,
  IconPlant2,
  IconBook,
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";

const Home_agro = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const nombreUsuario = "José Agrónomo"; // Cambia por el real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 🔹 Ref para manejar el scroll del contenedor
  const scrollRef = useRef(null);

  // 🔹 Restaurar scroll guardado ANTES del render visual (sin parpadeo)
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem("sidebarScrollAgro");
    if (saved && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(saved, 10);
    }
  }, []);

  // ====== LOGOUT ======
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

  // ====== Saber qué ruta está activa ======
  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some((p) => location.pathname.startsWith(p));
    }
    return location.pathname === paths;
  };

  // ====== Opciones del dashboard (tarjetas) ======
  const opciones = [
    {
      icon: <IconClipboardList className="w-8 h-8" />,
      label: "Seguimiento de labores",
      desc: "Monitorea y registra las labores agrícolas.",
      ruta: "/Laboresagro",
      gradient: "from-emerald-500/20 to-green-500/20",
      ring: "ring-emerald-300/40",
      iconBg: "bg-white/70",
      text: "text-emerald-700",
    },
    {
      icon: <IconChartBar className="w-8 h-8" />,
      label: "Informes",
      desc: "Consulta reportes y análisis de producción.",
      ruta: "/Informesagro",
      gradient: "from-sky-500/20 to-blue-500/20",
      ring: "ring-sky-300/40",
      iconBg: "bg-white/70",
      text: "text-sky-700",
    },
    {
      icon: <IconBox className="w-8 h-8" />,
      label: "Bodega",
      desc: "Gestiona insumos y existencias.",
      ruta: "/Bodegaagro",
      gradient: "from-amber-500/20 to-orange-500/20",
      ring: "ring-amber-300/40",
      iconBg: "bg-white/70",
      text: "text-amber-700",
    },
    {
      icon: <IconCloudRain className="w-8 h-8" />,
      label: "Variables climáticas",
      desc: "Registra lluvia, temperatura y más.",
      ruta: "/variablesclimaticas",
      gradient: "from-cyan-500/20 to-sky-500/20",
      ring: "ring-cyan-300/40",
      iconBg: "bg-white/70",
      text: "text-cyan-700",
    },
    {
      icon: <IconTractor className="w-8 h-8" />,
      label: "Maquinaria y equipos",
      desc: "Controla equipos y mantenimientos.",
      ruta: "/maquinariaequipos",
      gradient: "from-lime-500/20 to-green-500/20",
      ring: "ring-lime-300/40",
      iconBg: "bg-white/70",
      text: "text-lime-700",
    },
    {
      icon: <IconUsersGroup className="w-8 h-8" />,
      label: "Manejo personal",
      desc: "Administra personal y roles.",
      ruta: "/manejopersonal",
      gradient: "from-purple-500/20 to-fuchsia-500/20",
      ring: "ring-purple-300/40",
      iconBg: "bg-white/70",
      text: "text-purple-700",
    },
    {
      icon: <IconPlant className="w-8 h-8" />,
      label: "Gestión finca",
      desc: "Registra y administra fincas.",
      ruta: "/crearfinca",
      gradient: "from-teal-500/20 to-emerald-500/20",
      ring: "ring-teal-300/40",
      iconBg: "bg-white/70",
      text: "text-teal-700",
    },
    {
      icon: <IconFrame className="w-8 h-8" />,
      label: "Gestión lote",
      desc: "Control y registro de lotes agrícolas.",
      ruta: "/crearlote",
      gradient: "from-rose-500/20 to-pink-500/20",
      ring: "ring-rose-300/40",
      iconBg: "bg-white/70",
      text: "text-rose-700",
    },
    {
      icon: <IconPlant2 className="w-8 h-8" />,
      label: "Producción",
      desc: "Gestión y registro de producción agrícola",
      ruta: "/produccionagro",
      gradient: "from-green-500/20 to-yellow-500/20",
      ring: "ring-green-300/40",
      iconBg: "bg-white/70",
      text: "text-green-700",
    },
    {
      icon: <IconBook className="w-8 h-8" />,
      label: "Cuaderno de Campo",
      desc: "Registro de anotaciones, observaciones y fotos de campo.",
      ruta: "/cuadernocampo",
      gradient: "from-green-700/20 to-amber-600/20",
      ring: "ring-green-400/40",
      iconBg: "bg-white/80",
      text: "text-green-800",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar replicado */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between z-[200]">
        {/* Logo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Zona de iconos con scroll persistente */}
        <div
          ref={scrollRef}
          className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only"
        >
          {[
            { icon: <IconHome />, route: "/homeagro" },
            { icon: <IconClipboardList />, route: "/Laboresagro" },
            { icon: <IconChartBar />, route: "/Informesagro" },
            { icon: <IconBox />, route: "/Bodegaagro" },
            { icon: <IconCloudRain />, route: "/variablesclimaticas" },
            { icon: <IconTractor />, route: "/maquinariaequipos" },
            { icon: <IconUsersGroup />, route: "/manejopersonal" },
            { icon: <IconPlant />, route: "/crearfinca" },
            { icon: <IconFrame />, route: "/crearlote" },
            { icon: <IconPlant2 />, route: "/produccionagro" },
            { icon: <IconBook />, route: "/cuadernocampo" },
          ].map(({ icon, route }, i) => (
            <div key={i} className="relative">
              {isActive(route) && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
              )}
              <button
                onClick={() => {
                  if (scrollRef.current) {
                    sessionStorage.setItem(
                      "sidebarScrollAgro",
                      scrollRef.current.scrollTop.toString()
                    );
                  }
                  navigate(route);
                }}
                className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              >
                {React.cloneElement(icon, { className: "text-white w-11 h-11" })}
              </button>
            </div>
          ))}
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
              className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[9999] backdrop-blur text-base"
            >
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/ajustesagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
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

      {/* Contenido principal */}
      <div className="flex-1 p-10 ml-28">
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
      </div>
    </div>
  );
};

export default Home_agro;
