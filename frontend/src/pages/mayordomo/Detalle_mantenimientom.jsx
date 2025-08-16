import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  IconChevronLeft,
  IconPlant2,
  IconBook,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Detalle_mantenimientom = () => {
  const navigate = useNavigate();
  const location = useLocation(); // viene desde Hoja_vida -> navigate("/detalle_mantenimiento", { state: item })
  const state = location.state;

  // Fallback si entran directo a la ruta
  const fallback = {
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

  // Si llega state (según tu comentario, es el item directo), lo mezclamos con fallback
  const data = { ...fallback, ...(state && typeof state === "object" ? state : {}) };

  // Si no viene "tipo", lo inferimos a partir de prev/correcc
  const tipoInferido =
    data.tipo ??
    (data.prev && data.correcc
      ? "Preventivo y Correctivo"
      : data.prev
      ? "Preventivo"
      : data.correcc
      ? "Correctivo"
      : "—");

  // Perfil
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
    <div className="min-h-dvh bg-gray-50">
      {/* SIDEBAR FIJO */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between">
        {/* Logo fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          {/* Home */}
          <div className="relative">
            {location.pathname === "/homemayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/homemayordomo")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Registro labores */}
          <div className="relative">
            {location.pathname === "/registrolabores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/registrolabores")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconClipboardList className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Historial labores */}
          <div className="relative">
            {location.pathname === "/historial_labores" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/historial_labores")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconHistory className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Cuaderno de Campo */}
          <div className="relative">
            {location.pathname === "/cuaderno_campom" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/cuaderno_campom")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconBook className="text-white w-11 h-11" />
            </button>
          </div>
          
          {/* Producción */}
          <div className="relative">
            {location.pathname === "/produccion_mayor" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/produccion_mayor")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconPlant2 className="text-white w-11 h-11" />
            </button>
          </div>

          

          {/* Bodega */}
          <div className="relative">
            {location.pathname === "/bodega_insumos" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/bodega_insumos")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconBox className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Variables climáticas */}
          <div className="relative">
            {location.pathname === "/variables_climaticasm" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/variables_climaticasm")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconCloudRain className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Informes */}
          <div className="relative">
            {location.pathname === "/informes_mayordomo" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/informes_mayordomo")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconChartBar className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Maquinaria */}
          <div className="relative">
            {location.pathname === "/detalle_mantenimientom" && (
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            )}
            <button
              onClick={() => navigate("/equipos_mayordomo")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            >
              <IconTractor className="text-white w-11 h-11" />
            </button>
          </div>
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
              className="absolute bottom-16 left-14 w-56 bg-white/95 border border-gray-200 rounded-xl shadow-2xl py-3 z-[10000] backdrop-blur"
            >
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/ajustesmayordomo");
                }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soportemayordomo");
                }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/login");
                }}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido principal (desplazado por sidebar fijo) */}
      <div className="ml-28 px-10 py-8 bg-gray-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-600 font-medium mb-6"
        >
          <IconChevronLeft className="w-5 h-5 mr-2" /> Volver
        </button>

        <div className="bg-white border border-green-300 rounded-xl shadow-md p-8 w-[900px] max-w-full mx-auto">
          <h1 className="text-2xl font-bold text-green-600 mb-6">
            Detalle de Mantenimiento
          </h1>

          <div className="space-y-4 text-base">
            <p>
              <strong>Código equipo:</strong> {data.idMaquina}
            </p>
            <p>
              <strong>Máquina:</strong> {data.maquina}
            </p>
            <p>
              <strong>Referencia:</strong> {data.referencia}
            </p>
            <p>
              <strong>Ubicación:</strong> {data.ubicacion}
            </p>
            <p>
              <strong>Estado:</strong> {data.estado}
            </p>
            <p>
              <strong>Fecha:</strong> {data.fecha}
            </p>
            <p>
              <strong>Tipo de mantenimiento:</strong> {tipoInferido}
            </p>

            <div>
              <strong>Descripción:</strong>
              <p className="mt-1 text-justify">{data.descripcion}</p>
            </div>

            <p>
              <strong>Realizado por:</strong> {data.realizadoPor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle_mantenimientom;
