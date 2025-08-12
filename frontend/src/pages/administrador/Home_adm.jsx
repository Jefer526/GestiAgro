import React, { useState, useRef, useEffect } from "react";
import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconHome,
  IconSettings,
  IconLogout,
  IconChevronRight,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Home_adm = () => {
  const navigate = useNavigate();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const letraInicial = "J"; // Inicial del usuario

  // Cierra la tarjeta si se hace clic fuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  const cards = [
    {
      icon: <IconUsers className="w-8 h-8" />,
      label: "Gestionar usuarios",
      desc: "Crea, edita y asigna permisos.",
      route: "/Admuser",
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
      desc: "Solicita ayuda y gestiona tickets.",
      route: "/soporte",
      gradient: "from-slate-500/20 to-gray-500/20",
      ring: "ring-slate-300/40",
      iconBg: "bg-white/70",
      text: "text-slate-700",
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Sidebar fijo: ancho 7rem (w-28), alto de viewport dinámico */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between">
        {/* Bloque superior */}
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

          {/* Icono Home con indicador */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              aria-label="Inicio"
              title="Inicio"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Otros íconos */}
          <button
            onClick={() => navigate("/Admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            aria-label="Gestionar usuarios"
            title="Gestionar usuarios"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/copias")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            aria-label="Copias de seguridad"
            title="Copias de seguridad"
          >
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/soporte")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            aria-label="Soporte"
            title="Soporte"
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Botón de perfil con letra */}
        <div className="relative mb-6">
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

          {/* Tarjeta flotante con íconos */}
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-50 backdrop-blur"
            >
              <button
                onClick={() => navigate("/ajustesadm")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido principal desplazado a la derecha del sidebar */}
      <main className="ml-28 min-h-[100dvh] p-10">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Panel principal
        </h1>

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-5 rounded-2xl w-full max-w-3xl mb-10 shadow-lg">
          <p className="text-3xl font-semibold">¡Bienvenido!</p>
          <p className="opacity-90 text-lg">
            Accede rápidamente a las secciones más usadas.
          </p>
        </div>

        {/* Tarjetas principales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(
            ({ icon, label, desc, route, gradient, ring, iconBg, text }, i) => (
              <button
                key={i}
                onClick={() => navigate(route)}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-transparent",
                  "bg-white shadow-lg px-5 py-8 min-h-[160px] text-left transition-all",
                  "hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2",
                  "ring-0 hover:ring-0 focus:ring-emerald-600/40",
                ].join(" ")}
              >
                <div
                  className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${gradient} opacity-70`}
                />
                <div className={`absolute inset-0 pointer-events-none ${ring}`} />

                <div className="relative flex items-center gap-4">
                  <div
                    className={`shrink-0 ${iconBg} rounded-2xl p-3 shadow-sm transition-transform group-hover:scale-105`}
                  >
                    <div className={`${text}`}>{icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800">{label}</h3>
                    <p className="text-slate-600 text-base">{desc}</p>
                  </div>
                  <IconChevronRight className="w-5 h-5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            )
          )}
        </section>
      </main>
    </div>
  );
};

export default Home_adm;
