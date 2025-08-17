// src/pages/Detalle_mantenimiento.jsx
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  IconArrowLeft,
  IconTool,
  IconLogout,
  IconPlant2,
  IconBook,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Detalle_mantenimiento = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Datos recibidos desde Hoja_vida

  // Datos por defecto si no vienen desde navegación
  const data = {
    idMaquina: "1",
    prev: true,
    correcc: false,
    maquina: "Tractor John Deere",
    referencia: "JD 5055E",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
    fecha: "2025-08-01",
    tipo: "Mantenimiento Preventivo",
    descripcion: `Se realizó un mantenimiento preventivo completo que incluyó el cambio de aceite del motor, filtros de aire y combustible, revisión del sistema hidráulico y lubricación de todas las articulaciones. También se inspeccionó el sistema eléctrico, se verificó la presión de neumáticos y se realizó una limpieza general para evitar acumulación de suciedad en partes móviles. 

El mantenimiento correctivo no fue necesario, ya que no se detectaron fallas críticas durante la revisión.`,
    realizadoPor: "Carlos Rodríguez",
  };

  // Determinar tipo de mantenimiento
  const tipoInferido =
    data.tipo ||
    (data.prev && data.correcc
      ? "Preventivo y Correctivo"
      : data.prev
      ? "Preventivo"
      : data.correcc
      ? "Correctivo"
      : "—");

  // Estado y refs para tarjeta de perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Cerrar tarjeta al hacer click fuera
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
        {/* Logo */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Navegación */}
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          {/* Activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/homeagro")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>
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

        {/* Perfil con tarjeta */}
        <div className="relative mb-4">
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
                  navigate("/");
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

      {/* Contenido principal */}
      <div className="flex-1 px-10 py-8 bg-gray-50">
        {/* Botón volver */}
        <button onClick={() => navigate(-1)} className="flex items-center text-green-600 font-medium mb-6">
          <IconArrowLeft className="w-5 h-5 mr-2" /> Volver
        </button>

        {/* Detalle */}
        <div className="bg-white border border-green-300 rounded-xl shadow-md p-8 w-[900px] mx-auto">
          <h1 className="text-2xl font-bold text-green-600 mb-6">Detalle de Mantenimiento</h1>

          <div className="space-y-4 text-base">
            <p><strong>Código equipo:</strong> {data.idMaquina}</p>
            <p><strong>Máquina:</strong> {data.maquina}</p>
            <p><strong>Referencia:</strong> {data.referencia}</p>
            <p><strong>Ubicación:</strong> {data.ubicacion}</p>
            <p><strong>Estado:</strong> {data.estado}</p>
            <p><strong>Fecha:</strong> {data.fecha}</p>
            <p><strong>Tipo de mantenimiento:</strong> {tipoInferido}</p>

            <div>
              <strong>Descripción:</strong>
              <p className="mt-1 text-justify">{data.descripcion}</p>
            </div>

            <p><strong>Realizado por:</strong> {data.realizadoPor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle_mantenimiento;




