// src/pages/agronomo/Hoja_vida_agro.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  IconChevronLeft,
  IconEye,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconPlus,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { equiposApi } from "../../services/apiClient";

const Hoja_vida_agro = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const filtroRef = useRef(null);

  const [maquina, setMaquina] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mantenimientos, setMantenimientos] = useState([]);

  // --- Filtros y orden ---
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // === 📌 Obtener máquina y mantenimientos ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await equiposApi.get(id);
        setMaquina(res.data);
        setMantenimientos(res.data.mantenimientos || []);
      } catch (err) {
        console.error("❌ Error al cargar máquina:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const columnas = ["fecha", "tipo", "descripcion", "realizado_por", "estado", "detalle"];

  // === 🔎 Manejo de filtros ===
  const toggleFiltro = (campo, event) => {
    const icono = event.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor)
      ? seleccionados.delete(valor)
      : seleccionados.add(valor);
    setValoresSeleccionados({
      ...valoresSeleccionados,
      [campo]: [...seleccionados],
    });
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

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(mantenimientos.map((d) => d[campo]))].filter((v) =>
      String(v).toLowerCase().includes(search)
    );
  };

  // === 🔎 Filtrado y ordenamiento ===
  const mantenimientosFiltrados = mantenimientos
    .filter((d) =>
      columnas.every((campo) => {
        if (campo === "detalle") return true;
        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;
        return seleccionados.includes(d[campo]);
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      if (campo === "detalle") return 0;
      const valA = a[campo];
      const valB = b[campo];
      return orden === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  // === Cerrar filtro al hacer click fuera ===
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading)
    return (
      <LayoutAgronomo>
        <p>Cargando hoja de vida...</p>
      </LayoutAgronomo>
    );

  if (!maquina)
    return (
      <LayoutAgronomo>
        <p>No se encontró la máquina.</p>
      </LayoutAgronomo>
    );

  return (
    <LayoutAgronomo active="/maquinariaequipos">
      {/* Botón volver */}
      <button
        onClick={() => navigate("/maquinariaequipos")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-6">Hoja de vida</h1>

      {/* Info general */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md mb-8 p-6 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Información general</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
          <p><strong>Código Equipo:</strong> {maquina.codigo_equipo}</p>
          <p><strong>Ubicación:</strong> {maquina.ubicacion_nombre}</p>
          <p><strong>Máquina:</strong> {maquina.maquina}</p>
          <p><strong>Estado:</strong> {maquina.estado}</p>
          <p><strong>Referencia:</strong> {maquina.referencia}</p>
        </div>
      </div>

      {/* Subtítulo */}
      <h2 className="text-3xl font-bold text-green-700 mb-2">
        Historial de mantenimiento
      </h2>

      {/* Botón Registrar debajo del subtítulo, alineado a la derecha */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(`/registrarnovedadhv/${id}`)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700"
        >
          <IconPlus className="w-5 h-5" />
          Registrar mantenimiento
        </button>
      </div>

      {/* Tabla mantenimientos */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-center text-base">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {columnas.map((campo, i) => (
                <th key={i} className="p-4 border text-center">
                  <div className="flex items-center justify-center gap-2">
                    {campo === "realizado_por"
                      ? "REALIZADO POR"
                      : campo === "detalle"
                      ? "DETALLE"
                      : campo.toUpperCase()}
                    {campo !== "detalle" && (
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mantenimientosFiltrados.length > 0 ? (
              mantenimientosFiltrados.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 border">
                    {item.fecha
                      ? new Date(item.fecha).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : ""}
                  </td>
                  <td className="p-4 border">
                    {item.tipo
                      ? item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1).toLowerCase()
                      : ""}
                  </td>
                  <td className="p-4 border">{item.descripcion}</td>
                  <td className="p-4 border">{item.realizado_por}</td>
                  <td className="p-4 border">{item.estado}</td>
                  <td className="p-4 border">
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate(`/detallemantenimiento/${item.id}`)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <IconEye className="w-5 h-5" /> Ver
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnas.length} className="p-4 border text-gray-500">
                  No hay mantenimientos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Filtro flotante */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60"
          style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
        >
          <div className="font-semibold mb-2">
            Filtrar por {String(filtroActivo).toUpperCase()}
          </div>
          <button
            onClick={() => ordenar(filtroActivo, "asc")}
            className="text-green-700 flex items-center gap-1 mb-1"
          >
            <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
          </button>
          <button
            onClick={() => ordenar(filtroActivo, "desc")}
            className="text-green-700 flex items-center gap-1 mb-2"
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
              <label key={idx} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                  onChange={() => toggleValor(filtroActivo, val)}
                  className="accent-green-600"
                />
                {String(val)}
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => limpiarFiltro(filtroActivo)}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-300"
            >
              Borrar
            </button>
            <button
              onClick={() => setFiltroActivo(null)}
              className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </LayoutAgronomo>
  );
};

export default Hoja_vida_agro;
