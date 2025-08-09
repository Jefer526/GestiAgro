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

const Registrar_mante = () => {
  const navigate = useNavigate();

  const [alertaVisible, setAlertaVisible] = useState(false);

  const [formData, setFormData] = useState({
    idMaquina: "1",
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "Bodega",
    estado: "En operación",
    fecha: "2025-06-20",
    tipo: "Mantenimiento preventivo",
    descripcion: "",
    realizadoPor: "Luis Gómez",
  });

  // Perfil - inicial y control tarjeta
  const nombreUsuario = "Juan Pérez"; // Cambia aquí con nombre real
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
    setAlertaVisible(true);

    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/hoja_vidam");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button
            onClick={() => navigate("/homemayordomo")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/registrolabores")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/historial_labores")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/bodega_insumos")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/variables_climaticasm")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button
            onClick={() => navigate("/informes_mayordomo")}
            className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
          >
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
            aria-label="Menú de usuario"
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
                  navigate("/ajustesmayordomo");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMostrarTarjeta(false);
                  navigate("/soportemayordomo");
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
      <div className="flex-1 p-10">
        {/* Alerta flotante */}
        {alertaVisible && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
            <IconCheck className="w-5 h-5" /> Mantenimiento registrado exitosamente
          </div>
        )}

        <button
          onClick={() => navigate("/hoja_vidam")}
          className="flex items-center text-green-600 font-medium mb-4"
        >
          <IconChevronLeft className="w-5 h-5 mr-2" />
          Volver
        </button>

        <div className="bg-white border border-green-300 rounded-xl shadow-md p-8 w-[800px] mx-auto">
          <h1 className="text-2xl font-bold text-green-600 mb-6">Registro mantenimiento</h1>

          <form onSubmit={handleSubmit} className="space-y-4 text-base">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1">ID Máquina:</label>
                <input
                  name="idMaquina"
                  value={formData.idMaquina}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Referencia:</label>
                <input
                  name="referencia"
                  value={formData.referencia}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Máquina:</label>
                <input
                  name="maquina"
                  value={formData.maquina}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Ubicación:</label>
                <select
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                >
                  <option>Bodega</option>
                  <option>La Esmeralda</option>
                  <option>La Carolina</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Estado:</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                >
                  <option>Óptimo</option>
                  <option>En operación</option>
                  <option>Mantenimiento</option>
                  <option>Averiado</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Fecha:</label>
                <input
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Tipo de mantenimiento:</label>
                <input
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Realizado por:</label>
              <input
                name="realizadoPor"
                value={formData.realizadoPor}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1.5"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 font-semibold"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar_mante;
