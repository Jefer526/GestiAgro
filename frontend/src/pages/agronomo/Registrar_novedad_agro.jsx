// src/pages/agronomo/Registrar_novedad_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  IconChevronLeft,
  IconCheck,
  IconDotsVertical,
  IconAlertTriangle,
  IconCircleCheck,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";

import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { equiposApi } from "../../services/apiClient"; // ✅ API equipos

const MENU_WIDTH_PX = 288;
const MENU_MARGIN_PX = 8;

const Registrar_novedad_agro = () => {
  const navigate = useNavigate();

  // === Datos base (desde API) ===
  const columnas = ["codigo_equipo", "maquina", "referencia", "estado"];
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const res = await equiposApi.list();
        setMaquinas(res.data);
      } catch (err) {
        console.error("❌ Error cargando máquinas:", err);
      }
    };
    fetchMaquinas();
  }, []);

  // === Filtros ===
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(maquinas.map((e) => e[campo]?.toString() ?? ""))].filter((v) =>
      (v || "").toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
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

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });
  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  // === Alerta guardar ===
  const [alertaVisible, setAlertaVisible] = useState(false);

  // === Menú contextual ===
  const [menuIndex, setMenuIndex] = useState(null);
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const openMenu = (rowIndex, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const maxLeft =
      window.scrollX +
      document.documentElement.clientWidth -
      MENU_WIDTH_PX -
      MENU_MARGIN_PX;
    const desiredLeft = rect.right + window.scrollX - MENU_WIDTH_PX;
    const safeLeft = Math.max(
      MENU_MARGIN_PX + window.scrollX,
      Math.min(desiredLeft, maxLeft)
    );
    const top = rect.bottom + window.scrollY + MENU_MARGIN_PX;

    setMenuPos({ top, left: safeLeft });
    setMenuIndex(rowIndex);
  };

  const closeMenu = () => setMenuIndex(null);

  // Cerrar menús y filtros
  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  const handleEstadoChange = async (index) => {
    try {
      const maquina = maquinas[index];
      const nuevoEstado = "Averiado"; // ✅ Solo se puede marcar averiado

      await equiposApi.update(maquina.id, { estado: nuevoEstado });

      const nuevas = [...maquinas];
      nuevas[index].estado = nuevoEstado;
      setMaquinas(nuevas);
    } catch (err) {
      console.error("❌ Error actualizando estado:", err);
    }
  };

  const handleGuardar = () => {
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
      navigate("/maquinariaequipos"); // ✅ Ruta del Agrónomo
    }, 2000);
  };

  const EstadoAveriadoBadge = ({ estado }) => {
    if (estado === "Averiado") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 text-sm font-semibold shadow-sm bg-red-50 text-red-700 ring-red-200">
          <IconAlertTriangle className="w-4 h-4 text-red-600" />
          Averiado
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 text-sm font-semibold shadow-sm bg-green-50 text-green-700 ring-green-200">
        <IconCircleCheck className="w-4 h-4 text-green-600" />
        {estado || "Óptimo"}
      </span>
    );
  };

  const datosFiltrados = maquinas
    .filter((item) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes((item[campo] ?? "").toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? (a[campo] ?? "").toString().localeCompare((b[campo] ?? "").toString())
        : (b[campo] ?? "").toString().localeCompare((a[campo] ?? "").toString());
    });

  const MenuOverlay = ({ children }) => createPortal(children, document.body);

  return (
    <LayoutAgronomo>
      {/* Alerta flotante */}
      {alertaVisible && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[1000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold">
          <IconCheck className="w-5 h-5" /> Estados actualizados exitosamente
        </div>
      )}

      <button
        onClick={() => navigate("/maquinariaequipos")}
        className="flex items-center text-green-700 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Título */}
      <h2 className="text-3xl font-bold text-green-700 mb-2">
        Registrar novedad de máquina
      </h2>

      {/* Botón Guardar debajo del título, alineado a la derecha */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleGuardar}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Guardar
        </button>
      </div>

      {/* Tabla con filtros */}
      <div className="overflow-x-auto rounded-lg shadow-lg relative bg-white">
        <table className="min-w-full text-base">
          <thead className="bg-green-600 text-white font-bold text-center">
            <tr>
              {columnas.map((col, idx) => (
                <th key={idx} className="p-4 border">
                  <div className="flex items-center justify-center gap-2">
                    <span>{col.toUpperCase()}</span>
                    <button onClick={(e) => toggleFiltro(col, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-center">
            {datosFiltrados.map((m, index) => (
              <tr key={m.id} className="hover:bg-gray-100">
                <td className="p-4 border">{m.codigo_equipo}</td>
                <td className="p-4 border">{m.maquina}</td>
                <td className="p-4 border">{m.referencia}</td>
                <td className="p-4 border">
                  <div className="inline-flex items-center gap-2">
                    <EstadoAveriadoBadge estado={m.estado} />
                    <button
                      onClick={(e) => openMenu(index, e)}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border shadow-sm transition border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      <IconDotsVertical className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popover de filtros */}
        {filtroActivo && (
          <div
            ref={filtroRef}
            className="fixed bg-white text-black shadow-md border rounded z-[1100] p-3 w-60 text-left text-sm"
            style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
          >
            <div className="font-semibold mb-2">
              Filtrar por{" "}
              {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
            </div>

            <button
              onClick={() => ordenar(filtroActivo, "asc")}
              className="text-green-700 flex items-center gap-1 mb-1 capitalize"
            >
              <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
            </button>
            <button
              onClick={() => ordenar(filtroActivo, "desc")}
              className="text-green-700 flex items-center gap-1 mb-2 capitalize"
            >
              <IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A
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
                <label
                  key={idx}
                  className="flex items-center gap-2 mb-1 capitalize"
                >
                  <input
                    type="checkbox"
                    checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                    onChange={() => toggleValor(filtroActivo, val)}
                    className="accent-green-600"
                  />
                  {val === "" ? "—" : val}
                </label>
              ))}
            </div>

            <button
              onClick={() => limpiarFiltro(filtroActivo)}
              className="text-blue-600 hover:underline text-xs capitalize mt-2"
            >
              Borrar filtro
            </button>
          </div>
        )}
      </div>

      {/* Menú contextual en PORTAL */}
      {menuIndex !== null && (
        <MenuOverlay>
          <div
            ref={menuRef}
            className="fixed w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 z-[1200]"
            style={{ top: menuPos.top, left: menuPos.left }}
          >
            <div className="px-3 pt-2 pb-1 text-xs font-medium text-gray-500">
              Selecciona una opción
            </div>

            {/* ✅ Solo Marcar como AVERIADO */}
            {maquinas[menuIndex]?.estado !== "Averiado" && (
              <button
                onClick={() => {
                  handleEstadoChange(menuIndex);
                  closeMenu();
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition text-left hover:bg-gray-100"
              >
                <div className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border">
                  <IconCircleCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Marcar como averiado</div>
                  <div className="text-xs text-gray-500">
                    El equipo quedará en estado “Averiado”.
                  </div>
                </div>
              </button>
            )}
          </div>
        </MenuOverlay>
      )}
    </LayoutAgronomo>
  );
};

export default Registrar_novedad_agro;
 