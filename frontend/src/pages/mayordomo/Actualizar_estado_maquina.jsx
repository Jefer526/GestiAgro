import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  IconCheck,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Actualizar_estado_maquina = () => {
  const navigate = useNavigate();

  const [maquinas, setMaquinas] = useState([
    { id: 1, maquina: "Tractor", referencia: "JD 5055", estado: "Óptimo" },
    { id: 2, maquina: "Guadaña", referencia: "Stihl MS 450", estado: "Mantenimiento" },
    { id: 3, maquina: "Podadora", referencia: "Stihl BR 130", estado: "Averiado" },
  ]);

  const [alertaVisible, setAlertaVisible] = useState(false);

  const nombreUsuario = "Juan Pérez"; // Cambiar por el nombre real del usuario
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

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
      navigate("/equipos_mayordomo");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTractor className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

        {/* Botón perfil con tarjeta */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-green-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/ajustes");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soporte");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  alert("Cerrar sesión");
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
      <div className="flex-1 p-10 overflow-auto">
        {/* Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Estados actualizados exitosamente
          </div>
        )}

        <button onClick={() => navigate("/equipos_mayordomo")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <h2 className="text-3xl font-bold text-green-700 mb-6">Actualizar estado de máquinas</h2>

        <table className="w-full text-center text-lg border-collapse">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 border text-center">ID</th>
              <th className="p-3 border text-center">Máquina</th>
              <th className="p-3 border text-center">Referencia</th>
              <th className="p-3 border text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {maquinas.map((m, index) => (
              <tr key={m.id} className="border-b">
                <td className="p-3 border text-center">{m.id}</td>
                <td className="p-3 border text-center">{m.maquina}</td>
                <td className="p-3 border text-center">{m.referencia}</td>
                <td className="p-3 border text-center">
                  <select
                    value={m.estado}
                    onChange={(e) => handleEstadoChange(index, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-center"
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

        <div className="flex justify-end mt-6">
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

export default Actualizar_estado_maquina;
