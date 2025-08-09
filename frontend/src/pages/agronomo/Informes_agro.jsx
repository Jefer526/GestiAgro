import React, { useState, useRef, useEffect } from "react";
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
  IconFileDownload,
  IconLogout,
  IconHelp,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Informes_agro = () => {
  const navigate = useNavigate();

  // Nombre usuario para inicial
  const nombreUsuario = "Juan Pérez"; // Cambiar por nombre real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    finca: "",
    lote: "",
    tipo: "",
    labor: "",
  });

  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarSesion = () => {
    console.log("Cerrando sesión...");
    // Aquí puedes agregar lógica real
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

        {/* Botón de perfil con tarjeta flotante */}
        <div className="relative mb-4">
          <button
            onClick={toggleMenu}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {menuAbierto && (
            <div
              ref={menuRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => {
                  setMenuAbierto(false);
                  navigate("/ajustesagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => {
                  setMenuAbierto(false);
                  navigate("/soporteagro");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconHelp className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => {
                  setMenuAbierto(false);
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

      {/* Contenido */}
      <div className="flex-1 flex justify-center items-center bg-[#f6f6f6] p-8 overflow-auto">
        <div className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black">
          <h1 className="text-3xl font-bold text-green-700">Informes</h1>

          <div>
            <p className="font-bold text-lg mb-2">Fecha</p>
            <div className="flex items-center gap-3">
              <input
                type="date"
                name="fechaInicio"
                value={filtros.fechaInicio}
                onChange={handleChange}
                className="border p-3 rounded w-full text-lg"
              />
              <span className="font-semibold text-xl">a</span>
              <input
                type="date"
                name="fechaFin"
                value={filtros.fechaFin}
                onChange={handleChange}
                className="border p-3 rounded w-full text-lg"
              />
            </div>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Finca</p>
            <select
              name="finca"
              value={filtros.finca}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>
                Selecciona una finca
              </option>
              <option value="La Esmeralda">La Esmeralda</option>
              <option value="Las Palmas">Las Palmas</option>
              <option value="La Carolina">La Carolina</option>
            </select>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Lote</p>
            <select
              name="lote"
              value={filtros.lote}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>
                Selecciona un lote
              </option>
              <option value="Lote 1">Lote 1</option>
              <option value="Lote 2">Lote 2</option>
              <option value="Lote 3">Lote 3</option>
            </select>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Tipo de reporte</p>
            <select
              name="tipo"
              value={filtros.tipo}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>
                Selecciona un tipo
              </option>
              <option value="Fertilización">Fertilización</option>
              <option value="Siembra">Siembra</option>
            </select>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Labor</p>
            <select
              name="labor"
              value={filtros.labor}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
            >
              <option value="" disabled hidden>
                Selecciona una labor
              </option>
              <option value="Siembra">Siembra</option>
              <option value="Desyerba guadaña">Desyerba guadaña</option>
              <option value="Recolección">Recolección</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg">
              Generar
            </button>
          </div>

          <div className="flex justify-center space-x-6 text-base">
            <button className="text-green-600 hover:underline flex items-center gap-1">
              <IconFileDownload className="w-5 h-5" />
              Exportar PDF
            </button>
            <button className="text-green-600 hover:underline flex items-center gap-1">
              <IconFileDownload className="w-5 h-5" />
              Exportar Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informes_agro;



