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

  // 🔹 Ahora agregamos "finca" como primera columna
  const columnas = ["finca", "categoria", "producto", "ingrediente activo", "saldo", "unidad"];
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  /* 🔹 Obtener finca asignada */
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

  /* 🔹 Cargar productos SOLO de la finca asignada */
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
                      finca: s.finca_nombre, // 👈 Nueva propiedad para la columna
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
    <LayoutMayordomo titulo="Bodega de insumos">
       {/* 🔹 Botones acción */}
        <div className="flex justify-end gap-4 p-4">

          <button
            onClick={() => navigate("/registrarmovimientom")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            <IconPlus className="w-5 h-5" />
            Registrar movimiento
          </button>
        </div>

      {/* 🔹 Tabla con mismo estilo que Equipos_mayor */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
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
                    <td className="p-4 border">
                      {d.saldo} {d.unidad}
                    </td>
                    <td className="p-4 border">{d.unidad}</td>
                    <td className="p-4 border text-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/detalleprodmay/${d.id}/${encodeURIComponent(finca.nombre || finca)}`
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
    </LayoutMayordomo>
  );
};

export default Bodega_insu;
