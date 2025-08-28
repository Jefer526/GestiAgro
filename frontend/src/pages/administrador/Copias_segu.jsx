// src/pages/administrador/Copias_segu.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconPencil,
  IconTrash,
  IconDotsVertical,
  IconSortAscending2,
  IconSortDescending2,
  IconRefresh,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../layouts/LayoutAdmin";

const Copias_segu = () => {
  const navigate = useNavigate();

  // Refs
  const filtroRef = useRef(null);

  // Estado UI
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Modal confirmación
  const [confirmarRestaurar, setConfirmarRestaurar] = useState(false);
  const [copiaSeleccionada, setCopiaSeleccionada] = useState(null);

  const columnas = ["id", "fecha", "hora"];

  const copias = [
    { id: 1, fecha: "2025-06-12", hora: "14:21" },
    { id: 2, fecha: "2025-07-11", hora: "10:10" },
    { id: 3, fecha: "2025-07-11", hora: "14:21" },
    { id: 4, fecha: "2025-08-01", hora: "08:00" },
  ];

  // ====== Filtros / orden ======
  const toggleFiltro = (campo, e) => {
    e.stopPropagation();
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  const mesesTexto = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre",
  ];

  const estructuraJerarquica = (fechas) => {
    const estructura = {};
    fechas.forEach((fecha) => {
      const [a, m, d] = fecha.split("-");
      const mesTexto = mesesTexto[parseInt(m) - 1];
      if (!estructura[a]) estructura[a] = {};
      if (!estructura[a][mesTexto]) estructura[a][mesTexto] = new Set();
      estructura[a][mesTexto].add(d);
    });
    return estructura;
  };
  const estructuraFecha = estructuraJerarquica(copias.map((e) => e.fecha));

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

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  const datosFiltrados = copias
    .filter((item) =>
      columnas.every((campo) => {
        if (!valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0) return true;
        return valoresSeleccionados[campo].includes(item[campo]?.toString());
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const av = a[campo]?.toString() ?? "";
      const bv = b[campo]?.toString() ?? "";
      return orden === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  // ====== Menú por fila ======
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

  // ====== Outside click ======
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

  // ====== Confirmar restauración ======
  const confirmarAccionRestaurar = () => {
    alert(`✅ Copia con ID ${copiaSeleccionada} restaurada correctamente.`);
    setConfirmarRestaurar(false);
    setCopiaSeleccionada(null);
  };

  return (
    <LayoutAdmin letraInicial="J">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Copias de seguridad</h1>

      <div className="overflow-x-auto shadow-md rounded-lg relative bg-white">
        <table className="min-w-full text-base bg-white text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {columnas.map((col) => (
                <th key={col} className="p-4 border">
                  <div className="flex items-center justify-center gap-2">
                    <span>{col.toUpperCase()}</span>
                    <button
                      onClick={(e) => toggleFiltro(col, e)}
                      className="z-10"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
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
                  <button
                    onClick={(e) => handleMenuOpen(copia.id, e)}
                    className="menu-trigger p-1 rounded hover:bg-gray-200"
                  >
                    <IconDotsVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Menú de acciones */}
        {menuAbiertoId !== null && (
          <div
            id="floating-menu"
            className="fixed bg-white border border-gray-200 rounded shadow-lg w-44 z-[9999]"
            style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
          >
            <button
              onClick={() => navigate("/editarcopiassegu")}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              <IconPencil className="w-4 h-4 text-green-600" /> Ver Copia
            </button>
            <button
              onClick={() => {
                setCopiaSeleccionada(menuAbiertoId);
                setConfirmarRestaurar(true);
                setMenuAbiertoId(null);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
            >
              <IconRefresh className="w-4 h-4" /> Restaurar
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <IconTrash className="w-4 h-4" /> Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Modal Confirmación */}
      {confirmarRestaurar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[99999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Confirmar Restauración</h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro que deseas restaurar la copia con ID{" "}
              <span className="font-semibold text-green-700">{copiaSeleccionada}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmarRestaurar(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarAccionRestaurar}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Restaurar
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default Copias_segu;
