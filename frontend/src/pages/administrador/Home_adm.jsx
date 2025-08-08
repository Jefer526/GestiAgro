import React, { useState, useRef, useEffect } from "react";
import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconHome,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Home_adm = () => {
  const navigate = useNavigate();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const letraInicial = "J"; // Reemplaza con la inicial del usuario si tienes el nombre

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

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />

          {/* Icono Home con indicador */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Otros íconos */}
          <button
            onClick={() => navigate("/Admuser")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/copias")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/soporte")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTool className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Botón de perfil con letra */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {/* Tarjeta flotante con íconos */}
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => navigate("/ajustesadm")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => navigate("/soporte")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => alert("Cerrar sesión")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Panel principal
        </h1>

        <div className="bg-gray-200 p-6 rounded-lg w-fit mb-10 font-semibold text-green-700 shadow text-3xl">
          ¡Bienvenido!
        </div>

        {/* Botones principales */}
        <div className="flex justify-center space-x-12">
          {[
            {
              icon: <IconUsers className="w-24 h-24 text-green-700" />,
              label: "Gestionar usuarios",
              route: "/Admuser",
            },
            {
              icon: <IconCloudUpload className="w-24 h-24 text-green-700" />,
              label: "Copias de seguridad",
              route: "/copias",
            },
            {
              icon: <IconTool className="w-24 h-24 text-green-700" />,
              label: "Soporte",
              route: "/soporte",
            },
          ].map(({ icon, label, route }, i) => (
            <button
              key={i}
              onClick={() => navigate(route)}
              className="flex flex-col items-center justify-center w-64 h-64 border border-black p-6 rounded-xl hover:bg-gray-100 shadow-lg transition-all"
            >
              {icon}
              <span className="mt-4 font-medium text-lg">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home_adm;

