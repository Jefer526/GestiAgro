// src/pages/agronomo/Home_agro.jsx
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
  IconChevronRight,
  IconPlant2,
  IconBook,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Home_agro = () => {
  const navigate = useNavigate();

  // Estado tarjeta perfil
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const letraInicial = "J";

  // Cierra tarjeta si se hace click fuera
  useEffect(() => {
    const clickFueraTarjeta = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", clickFueraTarjeta);
    return () => document.removeEventListener("mousedown", clickFueraTarjeta);
  }, []);

<<<<<<< HEAD
  // Opciones de tarjetas del panel
=======
  // 🔹 Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user"); // si guardas datos de usuario
    sessionStorage.clear(); // por si usas sessionStorage
    navigate("/login");
  };

>>>>>>> d3d306c5d4cdd9e62c051796d7aacac87687d14a
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
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Logo */}
        <div className="mb-6">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Navegación */}
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          {/* Activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Menú */}
          <button onClick={() => navigate("/Laboresagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Informesagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearfinca")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/crearlote")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconFrame className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/produccionagro")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant2 className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/cuadernocampo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBook className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Perfil */}
        <div className="relative mb-4 mt-auto">
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
              {/* 🔹 Cerrar sesión con limpieza de datos */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        {/* Título */}
        <h1 className="text-3xl font-bold text-green-700 mb-6">Panel principal</h1>

        {/* Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-5 rounded-2xl w-full max-w-3xl mb-10 shadow-lg">
          <p className="text-3xl font-semibold">¡Bienvenido!</p>
          <p className="opacity-90 text-lg">Accede rápidamente a las secciones.</p>
        </div>

        {/* Tarjetas */}
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
<<<<<<< HEAD


=======
>>>>>>> d3d306c5d4cdd9e62c051796d7aacac87687d14a
