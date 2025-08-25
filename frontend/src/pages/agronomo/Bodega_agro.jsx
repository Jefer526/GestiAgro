// src/pages/agronomo/Bodega_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconEye,
  IconFilter,
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

  const columnas = ["finca", "categoria", "producto", "ingrediente", "saldo", "unidad"];
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  /* 🔹 Cargar productos y saldos actuales */
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await productosApi.list();

        // 🔹 Para cada producto y finca, calcular saldo desde movimientos
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

  /* 🔹 Filtros */
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

  return (
    <LayoutAgronomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Bodega de insumos</h1>

      <div className="bg-white border border-gray-300 rounded-xl overflow-auto relative">
        {/* 🔹 Botones acción */}
        <div className="flex justify-end gap-4 p-4">
          <button
            onClick={() => navigate("/agregarproducto")}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 text-base font-semibold"
          >
            Agregar producto
          </button>
          <button
            onClick={() => navigate("/registrarmovimiento")}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 text-base font-semibold"
          >
            Registrar movimiento
          </button>
        </div>

        {loading ? (
          <p className="text-center py-6">Cargando insumos...</p>
        ) : (
          <table className="w-full table-fixed text-base text-center">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col) => (
                  <th key={col} className="px-4 py-3 border">
                    <div className="flex items-center gap-2 justify-center">
                      {col.toUpperCase()}
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 border">DETALLE</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((d, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="px-4 py-2 border">{d.finca}</td>
                  <td className="px-4 py-2 border">{d.categoria}</td>
                  <td className="px-4 py-2 border">{d.producto}</td>
                  <td className="px-4 py-2 border">{d.ingrediente}</td>
                  <td className="px-4 py-2 border">
                    {d.saldo} {d.unidad}
                  </td>
                  <td className="px-4 py-2 border">{d.unidad}</td>
                  <td className="px-4 py-2 border text-center">
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
    </LayoutAgronomo>
  );
};

export default Bodega_agro;
