// src/pages/mayordomo/Bodega_insu.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconEye,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconPlus,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { productosApi, movimientosApi, getMe } from "../../services/apiClient";

const Bodega_insu = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finca, setFinca] = useState(null);

  // === Columnas de la tabla ===
  const columnas = ["finca", "categoria", "producto", "ingrediente", "saldo", "unidad"];

  // === Estados de filtros ===
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  /* Obtener finca asignada */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        if (res.data.finca_asignada) {
          setFinca(res.data.finca_asignada);
        }
      } catch (err) {
        console.error("❌ Error cargando finca asignada:", err);
      }
    };
    fetchUser();
  }, []);

  /* Cargar productos SOLO de la finca asignada */
  useEffect(() => {
    if (!finca) return;

    const fetchProductos = async () => {
      try {
        const res = await productosApi.list();

        const rows = await Promise.all(
          res.data.flatMap(async (prod) => {
            return await Promise.all(
              prod.stocks
                .filter((s) => s.finca_nombre === (finca.nombre || finca))
                .map(async (s) => {
                  try {
                    const movRes = await movimientosApi.listByProducto(prod.id);
                    const movs = movRes.data
                      .filter((m) => m.finca_nombre === s.finca_nombre)
                      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

                    let saldo = 0;
                    movs.forEach((m) => {
                      if (m.tipo === "Entrada") saldo += parseFloat(m.cantidad);
                      if (m.tipo === "Salida") saldo -= parseFloat(m.cantidad);
                    });

                    return {
                      id: prod.id,
                      finca: s.finca_nombre,
                      producto: prod.nombre,
                      categoria: prod.categoria,
                      ingrediente: prod.ingrediente,
                      unidad: prod.unidad,
                      saldo: saldo.toFixed(2),
                    };
                  } catch (err) {
                    console.error("❌ Error cargando movimientos:", err);
                    return null;
                  }
                })
            );
          })
        );

        setRegistros(rows.flat().filter(Boolean));
      } catch (err) {
        console.error("❌ Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [finca]);

  /* === Lógica de filtros === */
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(registros.map((e) => e[campo]?.toString() || ""))].filter((v) =>
      v.toLowerCase().includes(search)
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

  const datosFiltrados = registros
    .filter((item) =>
      columnas.every((campo) => {
        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;
        return seleccionados.includes(item[campo]?.toString());
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

  // === Cerrar filtro si se hace click afuera ===
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <LayoutMayordomo titulo="Bodega de insumos">
      {/* Botón acción */}
      <div className="flex justify-end gap-4 p-4">
        <button
          onClick={() => navigate("/registrarmovimientom")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          <IconPlus className="w-5 h-5" />
          Registrar movimiento
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        {loading ? (
          <p className="text-center py-6">Cargando insumos...</p>
        ) : (
          <table className="w-full table-fixed text-base text-center">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col) => (
                  <th key={col} className="p-4 border text-center">
                    <div className="flex items-center gap-2 justify-center">
                      {col.toUpperCase()}
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="p-4 border text-center">DETALLE</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={columnas.length + 1} className="py-6 text-gray-500">
                    No hay insumos registrados
                  </td>
                </tr>
              ) : (
                datosFiltrados.map((d, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="p-4 border">{d.finca}</td>
                    <td className="p-4 border">{d.categoria}</td>
                    <td className="p-4 border">{d.producto}</td>
                    <td className="p-4 border">{d.ingrediente}</td>
                    <td className="p-4 border">{d.saldo}</td>
                    <td className="p-4 border">{d.unidad}</td>
                    <td className="p-4 border text-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/detalle_producto/${d.id}/${encodeURIComponent(
                              finca.nombre || finca
                            )}`
                          )
                        }
                        className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center mx-auto"
                      >
                        <IconEye className="w-4 h-4" /> Detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Filtro flotante */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60"
          style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
        >
          <div className="font-semibold mb-2">
            Filtrar por {filtroActivo.toUpperCase()}
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
            {getValoresUnicos(filtroActivo).map((val) => (
              <label key={val} className="flex items-center gap-2 mb-1">
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

          {/* Botones */}
          <div className="flex justify-between mt-3">
            <button
              onClick={() => limpiarFiltro(filtroActivo)}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-300 transition"
            >
              Borrar
            </button>
            <button
              onClick={() => setFiltroActivo(null)}
              className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </LayoutMayordomo>
  );
};

export default Bodega_insu;
