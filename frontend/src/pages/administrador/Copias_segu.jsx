// src/pages/administrador/Copias_segu.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconHome,
  IconSettings,
  IconFilter,
  IconPencil,
  IconTrash,
  IconEye,
  IconDotsVertical,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Copias_segu = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const columnas = ["id", "fecha", "hora"];

  const copias = [
    { id: 1, fecha: "2025-06-12", hora: "14:21" },
    { id: 2, fecha: "2025-07-11", hora: "10:10" },
    { id: 3, fecha: "2025-07-11", hora: "14:21" },
    { id: 4, fecha: "2025-08-01", hora: "08:00" },
  ];

  const toggleFiltro = (campo, e) => {
    e.stopPropagation();
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({ top: icono.bottom + window.scrollY + 4, left: icono.left + window.scrollX });
  };

  const mesesTexto = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const estructuraJerarquica = (datos) => {
    const estructura = {};
    datos.forEach(fecha => {
      const [a, m, d] = fecha.split("-");
      const mesTexto = mesesTexto[parseInt(m) - 1];
      if (!estructura[a]) estructura[a] = {};
      if (!estructura[a][mesTexto]) estructura[a][mesTexto] = new Set();
      estructura[a][mesTexto].add(d);
    });
    return estructura;
  };

  const estructuraFecha = estructuraJerarquica(copias.map(e => e.fecha));

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

  const datosFiltrados = copias
    .filter(item =>
      columnas.every(campo => {
        if (!valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0) return true;
        return valoresSeleccionados[campo].includes(item[campo]?.toString());
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

  const handleMenuOpen = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const espacioDisponibleDerecha = window.innerWidth - rect.right;
    const menuWidth = 160;
    const left = espacioDisponibleDerecha > menuWidth ? rect.right + 8 : rect.left - menuWidth - 8;
    setTimeout(() => {
      setMenuAbiertoId(id);
      setMenuPosition({ x: left, y: rect.top });
    }, 0);
  };

  useEffect(() => {
    const clickFuera = (e) => {
      if (!e.target.closest("#floating-menu") && !e.target.closest(".menu-trigger")) {
        setMenuAbiertoId(null);
      }
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
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeadm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconHome className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/admuser")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconUsers className="text-white w-11 h-11" /></button>
          <div className="relative">
            <div onClick={() => navigate("/copias")} className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconCloudUpload className="text-white w-11 h-11" /></button>
          </div>
          <button onClick={() => navigate("/soporte")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconTool className="text-white w-11 h-11" /></button>
        </div>
        <button onClick={() => navigate("/ajustes")} className="mb-6 hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconSettings className="text-white w-11 h-11" /></button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8 overflow-auto relative">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Copias de seguridad</h1>
        <div className="overflow-x-auto shadow-md rounded-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                {columnas.map((col) => (
                  <th key={col} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)} className="z-10" onMouseDown={(e) => e.stopPropagation()}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="p-4 border">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((copia) => (
                <tr key={copia.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 border">{copia.id}</td>
                  <td className="p-4 border">{copia.fecha}</td>
                  <td className="p-4 border">{copia.hora}</td>
                  <td className="p-4 border">
                    <button onClick={(e) => handleMenuOpen(copia.id, e)} className="menu-trigger p-1 rounded hover:bg-gray-200">
                      <IconDotsVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tarjeta de filtro jerárquico solo para FECHA */}
          {filtroActivo === "fecha" && (
            <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-[9999] p-3 w-60 text-left text-sm" style={{ top: filtroPosicion.top, left: filtroPosicion.left }}>
              <div className="font-semibold mb-2 capitalize">Filtrar por fecha</div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(estructuraFecha).map(([anio, meses]) => (
                  <div key={anio}>
                    <div className="font-semibold capitalize text-green-700">{anio}</div>
                    {Object.entries(meses).map(([mesTexto, dias]) => (
                      <div key={mesTexto} className="ml-3">
                        <div className="text-green-600 font-medium">{mesTexto}</div>
                        {[...dias].map((dia) => {
                          const fechaStr = `${anio}-${(mesesTexto.indexOf(mesTexto)+1).toString().padStart(2,'0')}-${dia}`;
                          return (
                            <label key={fechaStr} className="ml-5 flex items-center gap-2">
                              <input type="checkbox" checked={(valoresSeleccionados.fecha || []).includes(fechaStr)} onChange={() => toggleValor("fecha", fechaStr)} className="accent-green-600" />
                              {dia}
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <button onClick={() => limpiarFiltro("fecha")} className="text-blue-600 hover:underline text-xs mt-2 capitalize">Borrar filtro</button>
            </div>
          )}

          {/* Tarjeta de filtro normal para ID y HORA */}
          {filtroActivo && filtroActivo !== "fecha" && (
            <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-[9999] p-3 w-60 text-left text-sm" style={{ top: filtroPosicion.top, left: filtroPosicion.left }}>
              <div className="font-semibold mb-2">Filtrar por {filtroActivo.toUpperCase()}</div>
              <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1 capitalize">
                <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
              </button>
              <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2 capitalize">
                <IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A
              </button>
              <input type="text" placeholder="Buscar..." className="w-full border border-gray-300 px-2 py-1 rounded mb-2 text-sm" value={busquedas[filtroActivo] || ""} onChange={(e) => handleBusqueda(filtroActivo, e.target.value)} />
              <div className="flex flex-col max-h-40 overflow-y-auto">
                {[...new Set(copias.map(e => e[filtroActivo]?.toString()))]
                  .filter(v => v.toLowerCase().includes((busquedas[filtroActivo] || "").toLowerCase()))
                  .map((val, idx) => (
                    <label key={idx} className="flex items-center gap-2 mb-1 capitalize">
                      <input type="checkbox" checked={(valoresSeleccionados[filtroActivo] || []).includes(val)} onChange={() => toggleValor(filtroActivo, val)} className="accent-green-600" />
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs capitalize mt-2">Borrar filtro</button>
            </div>
          )}

          {/* Menú de acciones */}
          {menuAbiertoId !== null && (
            <div id="floating-menu" className="fixed bg-white border border-gray-200 rounded shadow-lg w-40 z-[9999]" style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}>
              <button onClick={() => navigate("/editarcopiassegu")} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                <IconPencil className="w-4 h-4 text-green-600" /> Editar
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <IconTrash className="w-4 h-4" /> Eliminar
              </button>
            </div>
          )}
        </div>

        {/* Botón Restaurar */}
        <div className="flex justify-end mt-6">
          <button className="bg-green-600 text-white px-10 py-3 text-lg rounded-md font-semibold hover:bg-green-700 transition-all">
            Restaurar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Copias_segu;





