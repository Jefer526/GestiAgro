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
  IconPlant2,
  IconBook
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Regis_labores = () => {
  const navigate = useNavigate();

  // Estado de filas
  const [filasLocal, setFilasLocal] = useState([{}]);
  const [filasOtraFinca, setFilasOtraFinca] = useState([]);

  const [alertaVisible, setAlertaVisible] = useState(false);

  // Perfil
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Funciones tabla
  const añadirFilaLocal = () => setFilasLocal((prev) => [...prev, {}]);
  const añadirFilaOtra = () => setFilasOtraFinca((prev) => [...prev, {}]);
  const eliminarFilaLocal = (idx) =>
    setFilasLocal((prev) => prev.filter((_, i) => i !== idx));
  const eliminarFilaOtra = (idx) =>
    setFilasOtraFinca((prev) => prev.filter((_, i) => i !== idx));

  const handleRegistrar = () => {
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/historial_labores");
    }, 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Sidebar fijo */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between z-[200]">
        {/* Favicon fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          {/* HOME */}
          <button
            onClick={() => navigate("/homemayordomo")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
            title="Inicio"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>

          {/* Registrar labores (activo) */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/registrolabores")}
              className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
              title="Registrar labores"
            >
              <IconClipboardList className="text-white w-11 h-11" />
            </button>
          </div>

          <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconHistory className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/cuaderno_campom")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBook className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/produccion_mayor")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconPlant2 className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconTractor className="text-white w-11 h-11" /></button>
          
        </div>

        {/* Perfil fijo abajo */}
        <div className="relative mb-6 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
            title="Perfil"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"><IconSettings className="w-5 h-5 mr-2 text-green-600" />Ajustes</button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"><IconTool className="w-5 h-5 mr-2 text-green-600" />Soporte</button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"><IconLogout className="w-5 h-5 mr-2 text-red-600" />Cerrar sesión</button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido principal a la derecha del sidebar */}
      <main className="ml-28 min-h-[100dvh] p-10">
        {/* Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Labor registrada exitosamente
          </div>
        )}

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Registrar labores
        </h1>

        <div className="flex justify-center">
          <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6 w-full max-w-5xl text-lg">
            {/* Formulario principal */}
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
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded-md text-lg w-full"
                />
              </div>
            </div>

            {/* Tabla de registro */}
            <div className="border border-gray-300 rounded-xl p-4 mt-4 overflow-x-auto">
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

                {/* Sección: misma finca */}
                <tbody>
                  {filasLocal.map((_, i) => (
                    <tr key={`local-${i}`}>
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
                        <button onClick={() => eliminarFilaLocal(i)}>
                          <IconTrash className="w-6 h-6 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Botón debajo de su sección */}
                  <tr>
                    <td colSpan={6} className="p-2">
                      <button
                        onClick={añadirFilaLocal}
                        className="flex items-center gap-2 text-green-700 hover:text-green-800 text-lg"
                      >
                        <IconPlus className="w-6 h-6" /> Añadir Trabajador
                      </button>
                    </td>
                  </tr>

                  {/* Separador visual */}
                  <tr>
                    <td colSpan={6} className="pt-4">
                      <div className="h-px bg-gray-200" />
                    </td>
                  </tr>

                  {/* Título segunda sección */}
                  <tr>
                    <td colSpan={6} className="pb-2">
                      <p className="font-semibold text-gray-700">
                        Trabajador de otra finca
                      </p>
                    </td>
                  </tr>

                  {/* Sección: otra finca */}
                  {filasOtraFinca.map((_, i) => (
                    <tr key={`otra-${i}`}>
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
                        <button onClick={() => eliminarFilaOtra(i)}>
                          <IconTrash className="w-6 h-6 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Botón debajo de su sección */}
                  <tr>
                    <td colSpan={6} className="p-2">
                      <button
                        onClick={añadirFilaOtra}
                        className="flex items-center gap-2 text-green-700 hover:text-green-800 text-lg"
                      >
                        <IconPlus className="w-6 h-6" /> Añadir Trabajador de otra finca
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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
      </main>
    </div>
  );
};

export default Regis_labores;
