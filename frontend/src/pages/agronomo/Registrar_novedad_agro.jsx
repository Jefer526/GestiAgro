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
  IconTool,
  IconLogout,
  IconChevronLeft,
  IconCheck,
  IconDotsVertical,
  IconAlertTriangle,
  IconCircleCheck,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const RegistrarNovedadAgro = () => {
  const navigate = useNavigate();

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [maquinas, setMaquinas] = useState([
    { id: 1, maquina: "Tractor", referencia: "JD 5055", estado: "Averiado" },
    { id: 2, maquina: "Guadaña", referencia: "Stihl MS 450", estado: "Averiado" },
    { id: 3, maquina: "Podadora", referencia: "Stihl BR 130", estado: "Averiado" },
  ]);

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const [menuIndex, setMenuIndex] = useState(null);
  const opcionesRef = useRef(null);

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

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  useEffect(() => {
    const clickFuera = (e) => {
      if (opcionesRef.current && !opcionesRef.current.contains(e.target)) {
        setMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  // (Opcional) estilos del chip por estado
  const estadoChip = (estado) => {
    if (estado === "Averiado") {
      return {
        wrap: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 text-sm font-semibold shadow-sm bg-red-50 text-red-700 ring-red-200",
        icon: <IconAlertTriangle className="w-4 h-4" />,
        label: "Averiado",
      };
    }
    return {
      wrap: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 text-sm font-semibold shadow-sm bg-gray-50 text-gray-700 ring-gray-200",
      icon: null,
      label: estado,
    };
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        <div className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only">
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button
              onClick={() => navigate("/Homeagro")}
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
        </div>

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
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soporteagro"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
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

        <button onClick={() => navigate("/maquinariaequipos")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <h2 className="text-3xl font-bold text-green-700 mb-4">Registrar novedad de máquina</h2>

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
            {maquinas.map((m, index) => {
              const chip = estadoChip(m.estado);
              return (
                <tr key={m.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">{m.id}</td>
                  <td className="p-3 border">{m.maquina}</td>
                  <td className="p-3 border">{m.referencia}</td>
                  <td className="p-3 border">
                    <div className="relative inline-flex items-center gap-2">
                      <span className={chip.wrap}>
                        {chip.icon} {chip.label}
                      </span>
                      <button
                        onClick={() => setMenuIndex(menuIndex === index ? null : index)}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm transition"
                      >
                        <IconDotsVertical className="w-5 h-5" />
                      </button>
                      {menuIndex === index && (
                        <div
                          ref={opcionesRef}
                          className="absolute top-11 right-0 w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-50"
                        >
                          <div className="px-3 pt-2 pb-1 text-xs font-medium text-gray-500">
                            Selecciona una opción
                          </div>
                          <button
                            onClick={() => {
                              handleEstadoChange(index, "Averiado");
                              setMenuIndex(null);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition text-left bg-red-50"
                          >
                            <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-red-200">
                              <IconCircleCheck className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-red-700">
                                Marcar como averiado
                              </div>
                              <div className="text-xs text-gray-500">
                                El equipo quedará en estado “Averiado”.
                              </div>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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

export default RegistrarNovedadAgro;







