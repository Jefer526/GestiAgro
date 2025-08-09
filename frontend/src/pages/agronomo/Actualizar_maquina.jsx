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
  IconChevronLeft,
  IconCheck,
  IconTool,
  IconLogout,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Actualizar_maquina = () => {
  const navigate = useNavigate();

  const nombreUsuario = "Juan Pérez"; // Aquí idealmente tu estado o contexto real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [maquinas, setMaquinas] = useState([
    { id: 1, maquina: "Tractor", referencia: "JD 5055", estado: "Óptimo" },
    { id: 2, maquina: "Guadaña", referencia: "Stihl MS 450", estado: "Mantenimiento" },
    { id: 3, maquina: "Podadora", referencia: "Stihl BR 130", estado: "Averiado" },
  ]);

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const handleEstadoChange = (index, nuevoEstado) => {
    const nuevasMaquinas = [...maquinas];
    nuevasMaquinas[index].estado = nuevoEstado;
    setMaquinas(nuevasMaquinas);
  };

  const handleGuardar = () => {
    console.log("Estados actualizados:", maquinas);
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/maquinariaequipos");
    }, 2000);
  };

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

        {/* Perfil abajo */}
        <div className="relative mb-4 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
            aria-label="Menú de perfil"
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
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Estados actualizados exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/maquinariaequipos")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <h2 className="text-3xl font-bold text-green-700 mb-4">Actualizar estado de máquinas</h2>

        <table className="w-full text-center text-lg border-collapse shadow-md bg-white rounded-xl">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 border font-bold">ID</th>
              <th className="p-3 border font-bold">Máquina</th>
              <th className="p-3 border font-bold">Referencia</th>
              <th className="p-3 border font-bold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {maquinas.map((m, index) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{m.id}</td>
                <td className="p-3 border">{m.maquina}</td>
                <td className="p-3 border">{m.referencia}</td>
                <td className="p-3 border">
                  <select
                    value={m.estado}
                    onChange={(e) => handleEstadoChange(index, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="Óptimo">Óptimo</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Averiado">Averiado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botón fuera de la tabla */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleGuardar}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Actualizar_maquina;


