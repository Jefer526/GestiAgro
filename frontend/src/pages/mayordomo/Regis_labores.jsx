import React, { useState, useRef, useEffect } from "react";
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
  IconTrash,
  IconPlus,
  IconSearch,
  IconCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Regis_labores = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([{}]);
  const [alertaVisible, setAlertaVisible] = useState(false);

  // Datos perfil
  const nombreUsuario = "Juan Pérez"; // reemplazar con nombre real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  // Cerrar tarjeta al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const añadirFila = () => setFilas([...filas, {}]);
  const eliminarFila = (index) => {
    const nuevas = [...filas];
    nuevas.splice(index, 1);
    setFilas(nuevas);
  };

  const handleRegistrar = () => {
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/historial_labores");
    }, 2000);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconClipboardList className="text-white w-11 h-11" />
            </button>
          </div>
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
          <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconTractor className="text-white w-11 h-11" />
          </button>
        </div>

        {/* Botón perfil */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {/* Tarjeta flotante */}
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/login"); }}
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
        {/* Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Labor registrada exitosamente
          </div>
        )}

        <h1 className="text-3xl font-bold text-green-700 mb-6">Registrar labores</h1>

        <div className="flex justify-center">
          <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6 w-full max-w-5xl text-lg">
            {/* Formulario */}
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <p className="font-bold mb-1">Finca</p>
                <select className="border border-gray-300 p-2 rounded-md text-lg w-full">
                  <option>Seleccionar finca</option>
                  <option>La esmeralda</option>
                  <option>Las palmas</option>
                  <option>Las carolinas</option>
                </select>
              </div>
              <div>
                <p className="font-bold mb-1">Lote</p>
                <select className="border border-gray-300 p-2 rounded-md text-lg w-full">
                  <option>Seleccionar lote</option>
                </select>
              </div>
              <div>
                <p className="font-bold mb-1">Labor</p>
                <select className="border border-gray-300 p-2 rounded-md text-lg w-full">
                  <option>Seleccionar labor</option>
                </select>
              </div>
              <div>
                <p className="font-bold mb-1">Fecha</p>
                <input type="date" className="border border-gray-300 p-2 rounded-md text-lg w-full" />
              </div>
            </div>

            {/* Tabla */}
            <div className="border border-gray-300 rounded-xl p-4 mt-4">
              <table className="w-full text-left text-lg">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="p-2">ID</th>
                    <th className="p-2">Trabajador</th>
                    <th className="p-2">Jornal</th>
                    <th className="p-2">Ejecución</th>
                    <th className="p-2">UM</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((_, i) => (
                    <tr key={i}>
                      <td className="p-2 flex items-center">
                        <IconSearch className="w-5 h-5 text-gray-600 mr-1" />
                        <input className="border border-gray-300 p-1 w-full rounded-md text-lg" />
                      </td>
                      <td className="p-2">
                        <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                      </td>
                      <td className="p-2">
                        <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                      </td>
                      <td className="p-2">
                        <input className="border border-gray-300 p-1 w-56 rounded-md text-lg" />
                      </td>
                      <td className="p-2">
                        <input className="border border-gray-300 p-1 w-full rounded-md text-lg" />
                      </td>
                      <td className="p-2">
                        <button onClick={() => eliminarFila(i)}>
                          <IconTrash className="w-6 h-6 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={añadirFila} className="flex items-center gap-2 text-green-700 hover:text-green-800 text-lg">
              <IconPlus className="w-6 h-6" /> Añadir Trabajador
            </button>

            <textarea
              placeholder="Observación"
              className="border border-gray-300 p-2 rounded-md w-full mt-4 text-lg"
              rows={2}
            ></textarea>

            <button
              onClick={handleRegistrar}
              className="bg-green-600 text-white px-8 py-2 rounded-full mt-4 hover:bg-green-700 text-lg"
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regis_labores;
