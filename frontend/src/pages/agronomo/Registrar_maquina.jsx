import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  IconCheck,
  IconTool,
  IconLogout,
  IconPlant2,
  IconBook,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Registrar_maquina = () => {
  const navigate = useNavigate();
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Cierra tarjeta de perfil al hacer clic fuera
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/maquinariaequipos");
    }, 2000);
  };

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

        {/* Perfil */}
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
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/login");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-10 py-6 relative bg-gray-50">
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Máquina registrada exitosamente
          </div>
        )}

        {/* Botón volver */}
        <button
          onClick={() => navigate("/maquinariaequipos")}
          className="flex items-center text-green-600 hover:text-green-800 mb-6"
        >
          <IconArrowLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

        {/* Formulario */}
        <div className="max-w-2xl mx-auto bg-white border border-green-300 rounded-xl p-10 shadow-md">
          <h1 className="text-3xl font-bold text-green-600 mb-10 text-center">
            Registrar Nueva Máquina
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-lg">Máquina</label>
              <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 text-lg" placeholder="Ej: Tractor" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-lg">Referencia</label>
              <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 text-lg" placeholder="Ej: JD 5055" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-lg">Ubicación</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2 text-lg" required>
                <option>La Esmeralda</option>
                <option>Las Palmas</option>
                <option>La Carolina</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-lg">Estado</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2 text-lg" required>
                <option>Óptimo</option>
                <option>Mantenimiento</option>
                <option>Averiado</option>
              </select>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar_maquina;



