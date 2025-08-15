// src/pages/agronomo/CuadernoCampo_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  IconLogout,
  IconTool,
  IconPlant2,
  IconCamera,
  IconBook,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Cuaderno_campo_agro = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Datos usuario
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Estado de filtros
  const [filtros, setFiltros] = useState({ fecha: "", finca: "", lote: "", anotaciones: "" });

  // Estado para foto
  const [foto, setFoto] = useState(null);
  const fileInputRef = useRef(null);

  // Estado para menú de perfil
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  // Contenedor scroll del sidebar
  const iconListRef = useRef(null);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  // Alternar menú perfil
  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  // Acción para tomar foto
  const handleTomarFoto = () => fileInputRef.current?.click();

  // Guardar foto seleccionada
  const handleFotoSeleccionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFoto(url);
    }
  };

  // Cerrar menú perfil al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll en sidebar si estamos en esta pantalla
  useEffect(() => {
    if (!iconListRef.current) return;
    if (location.pathname.includes("/cuadernocampo")) {
      iconListRef.current.scrollTo({ top: iconListRef.current.scrollHeight, behavior: "instant" });
    }
  }, [location.pathname]);

  // Componente ítem de sidebar
  const SidebarItem = ({ to, title, Icon, active }) => (
    <div className="relative">
      {active && <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />}
      <button
        onClick={() => navigate(to)}
        className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
        title={title}
      >
        <Icon className="text-white w-11 h-11" />
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        {/* Logo */}
        <div className="sticky top-0 mb-6 bg-green-600 z-10">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11 mx-auto" />
        </div>

        {/* Menú navegación */}
        <div ref={iconListRef} className="flex-1 flex flex-col items-center space-y-8 pr-1 overflow-y-auto scrollbar-hide-only pb-24">
          <SidebarItem to="/Homeagro" title="Inicio" Icon={IconHome} />
          <SidebarItem to="/Laboresagro" title="Labores" Icon={IconClipboardList} />
          <SidebarItem to="/Informesagro" title="Informes" Icon={IconChartBar} />
          <SidebarItem to="/Bodegaagro" title="Bodega" Icon={IconBox} />
          <SidebarItem to="/variablesclimaticas" title="Variables climáticas" Icon={IconCloudRain} />
          <SidebarItem to="/maquinariaequipos" title="Maquinaria y equipos" Icon={IconTractor} />
          <SidebarItem to="/manejopersonal" title="Manejo personal" Icon={IconUsersGroup} />
          <SidebarItem to="/crearfinca" title="Gestión finca" Icon={IconPlant} />
          <SidebarItem to="/crearlote" title="Gestión lote" Icon={IconFrame} />
          <SidebarItem to="/produccionagro" title="Producción" Icon={IconPlant2} />
          <SidebarItem to="/cuadernocampo" title="Cuaderno campo" Icon={IconBook} active={true} />
        </div>

        {/* Perfil */}
        <div className="relative mb-4 mt-auto">
          <button
            onClick={toggleMenu}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {menuAbierto && (
            <div ref={menuRef} className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50">
              <button onClick={() => navigate("/ajustesagro")} className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button onClick={() => navigate("/soporteagro")} className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" /> Soporte
              </button>
              <button onClick={() => navigate("/login")} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex justify-center items-center p-8 overflow-auto">
        <div className="bg-white border border-green-300 shadow-md p-10 rounded-xl w-full max-w-3xl space-y-6 text-black">
          <h1 className="text-3xl font-bold text-green-700">Cuaderno de Campo</h1>

          {/* Fecha */}
          <div>
            <label className="font-bold text-lg mb-2 block">Fecha</label>
            <input type="date" name="fecha" value={filtros.fecha} onChange={handleChange} className="border p-3 rounded w-full text-lg" />
          </div>

          {/* Finca */}
          <div>
            <label className="font-bold text-lg mb-2 block">Finca</label>
            <select name="finca" value={filtros.finca} onChange={handleChange} className="w-full border p-4 rounded text-lg">
              <option value="" disabled hidden>Selecciona una finca</option>
              <option value="La Esmeralda">La Esmeralda</option>
              <option value="Las Palmas">Las Palmas</option>
              <option value="La Carolina">La Carolina</option>
            </select>
          </div>

          {/* Lote */}
          <div>
            <label className="font-bold text-lg mb-2 block">Lote</label>
            <select name="lote" value={filtros.lote} onChange={handleChange} className="w-full border p-4 rounded text-lg">
              <option value="" disabled hidden>Selecciona un lote</option>
              <option value="Lote 1">Lote 1</option>
              <option value="Lote 2">Lote 2</option>
              <option value="Lote 3">Lote 3</option>
            </select>
          </div>

          {/* Anotaciones */}
          <div>
            <label className="font-bold text-lg mb-2 block">Anotaciones</label>
            <textarea name="anotaciones" value={filtros.anotaciones} onChange={handleChange} rows="4" placeholder="Escribe aquí las anotaciones..." className="w-full border p-4 rounded text-lg"></textarea>
          </div>

          {/* Tomar foto */}
          <div className="flex flex-col items-center gap-4">
            <button onClick={handleTomarFoto} className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg flex items-center gap-2">
              <IconCamera className="w-5 h-5" /> Tomar Foto
            </button>

            <input type="file" accept="image/*" capture="environment" ref={fileInputRef} className="hidden" onChange={handleFotoSeleccionada} />

            {foto && (
              <div className="mt-4">
                <p className="text-sm font-medium">Vista previa:</p>
                <img src={foto} alt="Foto tomada" className="mt-2 max-h-48 rounded border" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuaderno_campo_agro;




