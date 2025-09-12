// src/pages/agronomo/Bodega_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconEye,
  IconFilter,
  IconPlus,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { productosApi, movimientosApi } from "../../services/apiClient";

const Bodega_agro = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  // === Columnas visibles en la tabla ===
  const columnas = ["finca", "categoria", "producto", "ingrediente", "saldo", "unidad"];

  // === Estados de filtros ===
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  /* Cargar productos y saldos actuales */
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await productosApi.list();

        // Para cada producto y finca, calcular saldo desde movimientos
        const rows = await Promise.all(
          res.data.flatMap(async (prod) => {
            return await Promise.all(
              prod.stocks.map(async (s) => {
                try {
                  const movRes = await movimientosApi.listByProducto(prod.id);
                  const movs = movRes.data
                    .filter((m) => m.finca_nombre === s.finca_nombre)
                    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

                  // calcular saldo acumulado
                  let saldo = 0;
                  movs.forEach((m) => {
                    if (m.tipo === "Entrada") saldo += parseFloat(m.cantidad);
                    if (m.tipo === "Salida") saldo -= parseFloat(m.cantidad);
                  });

                  return {
                    id: prod.id,
                    producto: prod.nombre,
                    categoria: prod.categoria,
                    ingrediente: prod.ingrediente,
                    unidad: prod.unidad,
                    finca: s.finca_nombre,
                    saldo: saldo.toFixed(2),
                  };
                } catch (err) {
                  console.error("❌ Error cargando movimientos:", err);
                  return {
                    id: prod.id,
                    producto: prod.nombre,
                    categoria: prod.categoria,
                    ingrediente: prod.ingrediente,
                    unidad: prod.unidad,
                    finca: s.finca_nombre,
                    saldo: "0.00",
                  };
                }
              })
            );
          })
        );

        setRegistros(rows.flat());
      } catch (err) {
        console.error("❌ Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

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
    <LayoutAgronomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Bodega de insumos</h1>

      {/* Botones acción */}
      <div className="flex justify-end gap-4 p-4">
        <button
          onClick={() => navigate("/agregarproducto")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          <IconPlus className="w-5 h-5" />
          Agregar producto
        </button>
        <button
          onClick={() => navigate("/registrarmovimiento")}
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
              {datosFiltrados.map((d, i) => (
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
                        navigate(`/detallesagrop/${d.id}/${encodeURIComponent(d.finca)}`)
                      }
                      className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center mx-auto"
                    >
                      <IconEye className="w-4 h-4" /> Detalle
                    </button>
                  </td>
                </tr>
              ))}
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
    </LayoutAgronomo>
  );
};

export default Bodega_agro;
