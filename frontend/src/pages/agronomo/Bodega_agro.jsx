// src/pages/agronomo/Bodega_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome, IconClipboardList, IconChartBar, IconCloudRain,
  IconTractor, IconSettings, IconBox, IconUsersGroup, IconPlant,
  IconFrame, IconEye, IconFilter, IconSortAscending2, IconSortDescending2,
  IconTool, IconLogout
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Bodega_agro = () => {
  const navigate = useNavigate();

  // --- Perfil flotante ---
  const nombreUsuario = "Juan Pérez"; // Cambiar por nombre real
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  // --- Datos y filtros tabla ---
  const datos = [
    { categoria: "Fertilizante", producto: "Urea", ingrediente: "Nitrogeno 46%", cantidad: 300, um: "Kg" },
    { categoria: "Insecticida", producto: "Galeon", ingrediente: "Tiametoxam", cantidad: 5, um: "Lt" },
    { categoria: "Fungicida", producto: "Zellus", ingrediente: "Benomyll", cantidad: 0.2, um: "Lt" },
  ];

  const columnas = ["categoria", "producto", "ingrediente", "cantidad", "um"];
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const filtroRef = useRef(null);

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(datos.map(e => e[campo].toString()))].filter(v =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX
    });
  };

  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor) ? seleccionados.delete(valor) : seleccionados.add(valor);
    setValoresSeleccionados({ ...valoresSeleccionados, [campo]: [...seleccionados] });
  };

  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  const ordenar = (campo, orden) => {
    setOrdenCampo({ campo, orden });
  };

  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  const datosFiltrados = datos
    .filter(item =>
      columnas.every(campo =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo].toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo].toString().localeCompare(b[campo].toString())
        : b[campo].toString().localeCompare(a[campo].toString());
    });

  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
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

        {/* Perfil con tarjeta flotante */}
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
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/ajustesagro"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/soporteagro"); }}
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
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Bodega de insumos</h1>

        <div className="mb-6 max-w-md">
          <label className="block font-semibold mb-2 text-lg">Finca</label>
          <select className="border border-gray-400 rounded-md p-2 w-full text-lg">
            <option>La Esmeralda</option>
            <option>Las Palmas</option>
            <option>La Carolina</option>
          </select>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl overflow-auto relative">
          <table className="w-full text-base text-center">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="px-4 py-3 border border-gray-300">
                    <div className="flex items-center gap-2 justify-center">
                      {col.toUpperCase()}
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 border border-gray-300">DETALLE</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((d, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="px-4 py-2 border">{d.categoria}</td>
                  <td className="px-4 py-2 border">{d.producto}</td>
                  <td className="px-4 py-2 border">{d.ingrediente}</td>
                  <td className="px-4 py-2 border">{d.cantidad}</td>
                  <td className="px-4 py-2 border">{d.um}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => navigate("/Detallesagrop")}
                      className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center mx-auto"
                    >
                      <IconEye className="w-4 h-4" />
                      Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">
                Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
              </div>
              <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1">
                <IconSortAscending2 className="w-4 h-4" />
                Ordenar A → Z
              </button>
              <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2">
                <IconSortDescending2 className="w-4 h-4" />
                Ordenar Z → A
              </button>
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full border border-gray-300 px-2 py-1 rounded mb-2 text-sm"
                value={busquedas[filtroActivo] || ""}
                onChange={(e) => handleBusqueda(filtroActivo, e.target.value)}
              />
              <div className="flex flex-col max-h-40 overflow-y-auto">
                {getValoresUnicos(filtroActivo).map((val, idx) => (
                  <label key={idx} className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                      onChange={() => toggleValor(filtroActivo, val)}
                      className="accent-green-600"
                    />
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-20 mt-10">
          <button
            onClick={() => navigate("/agregarproducto")}
            className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold"
          >
            Agregar producto
          </button>
          <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bodega_agro;



