import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconBox,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconChevronLeft,
  IconCheck,
  IconTool,
  IconLogout,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_empleado = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false); // Alerta

  // Estado y ref para la tarjeta flotante perfil
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Inicial del usuario para el botón perfil (puedes obtenerlo dinámicamente)
  const nombreUsuario = "Juan Pérez"; // Cambiar por el nombre real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Cerrar tarjeta si clic fuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  const manejarGuardar = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/manejopersonal");
    }, 2000);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Logo fijo con sticky */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Iconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          {/* Icono activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/Homeagro")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconHome className="text-white w-11 h-11" />
            </button>
          </div>

          {/* Navegación */}
          <button
            onClick={() => navigate("/Laboresagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/Informesagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/Bodegaagro")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/variablesclimaticas")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/maquinariaequipos")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconTractor className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/manejopersonal")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconUsersGroup className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/crearfinca")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconPlant className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/crearlote")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconFrame className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Botón perfil con tarjeta flotante */}
        <div className="relative mb-4 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-grey-300 rounded-xl shadow-2xl py-3 z-50"
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
                  navigate("/login");
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
      <div className="flex-1 p-10 overflow-auto relative bg-gray-50">
        {/* Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Empleado registrado exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/manejopersonal")}
          className="flex items-center text-green-700 font-semibold mb-6 hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <div className="bg-white border-2 border-green-200 rounded-lg max-w-4xl mx-auto px-10 py-12 shadow-lg min-h-[700px] flex flex-col">
          <h1 className="text-3xl font-bold text-green-600 mb-8">Registrar empleado</h1>

          <form onSubmit={manejarGuardar} className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-grow">
            <div>
              <label className="block font-bold text-gray-700 mb-2">Nombre completo</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-3"
                placeholder="Juan Pérez"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Cargo</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-3"
                placeholder="Operario de campo"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Estado</label>
              <select className="w-full border rounded px-4 py-3" required>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Finca</label>
              <select className="w-full border rounded px-4 py-3" required>
                <option>La Esmeralda</option>
                <option>La Carolina</option>
                <option>Las Palmas</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Teléfono</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-3"
                placeholder="3124567890"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Acceso</label>
              <select className="w-full border rounded px-4 py-3" required>
                <option>Completo</option>
                <option>Limitado</option>
                <option>Sin acceso</option>
              </select>
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-base font-semibold"
              >
                Guardar empleado
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar_empleado;





