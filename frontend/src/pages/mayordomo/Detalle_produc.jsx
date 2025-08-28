// src/pages/mayordomo/Detalle_produc.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { productosApi, movimientosApi, getMe } from "../../services/apiClient";

const Detalle_produc = () => {
  const navigate = useNavigate();
  const { id, finca } = useParams();
  const filtroRef = useRef(null);

  const [fincaAsignada, setFincaAsignada] = useState(null);
  const [producto, setProducto] = useState(null);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const columnas = ["fecha", "finca", "lote", "tipo", "movimiento", "saldo", "unidad"];

  // 🔹 Cargar datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, movRes, userRes] = await Promise.all([
          productosApi.get(id),
          movimientosApi.listByProducto(id),
          getMe(),
        ]);

        setProducto(prodRes.data);
        if (userRes.data.finca_asignada) {
          setFincaAsignada(userRes.data.finca_asignada);
        }

        const fincaDecodificada = decodeURIComponent(finca);
        const movsOrdenados = movRes.data
          .filter((m) => m.finca_nombre === fincaDecodificada)
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        let saldo = 0;
        const movimientosConSaldo = movsOrdenados
          .slice()
          .reverse()
          .map((m) => {
            if (m.tipo === "Entrada") saldo += parseFloat(m.cantidad);
            else if (m.tipo === "Salida") saldo -= parseFloat(m.cantidad);
            return { ...m, movimiento: m.cantidad, saldo: saldo.toFixed(2) };
          })
          .reverse();

        setMovimientos(movimientosConSaldo);
      } catch (err) {
        console.error("❌ Error cargando detalles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, finca]);

  // 🔹 Filtros
  const getValoresUnicos = (campo) => {
    if (campo === "fecha") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(movimientos.map((e) => e[campo]?.toString() || ""))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    const filtroWidth = 260;
    let left = icono.left + window.scrollX;
    if (left + filtroWidth > window.innerWidth) left = window.innerWidth - filtroWidth - 10;
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({ top: icono.bottom + window.scrollY + 4, left });
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
  const handleBusqueda = (campo, texto) => setBusquedas({ ...busquedas, [campo]: texto });

  const movimientosFiltrados = movimientos
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
        ? String(a[campo]).localeCompare(String(b[campo]))
        : String(b[campo]).localeCompare(String(a[campo]));
    });

  // 🔹 Cerrar filtro al hacer click fuera
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) setFiltroActivo(null);
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  return (
    <LayoutMayordomo active="/bodega_insumos" ocultarEncabezado>
      {/* Botón volver */}
      <button
        onClick={() => navigate("/bodega_insumos")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Encabezado: título + finca al mismo nivel */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Detalle del producto</h1>
        {fincaAsignada && (
          <span className="text-3xl font-bold text-green-700">{fincaAsignada.nombre}</span>
        )}
      </div>

      {loading ? (
        <p className="text-center py-6">Cargando detalles...</p>
      ) : (
        <>
          {/* Card producto */}
          <div className="bg-white border border-gray-300 rounded-xl shadow-md mb-8 p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-[17px] leading-relaxed max-w-3xl">
            <div><strong>Producto:</strong> {producto?.nombre}</div>
            <div><strong>Ingrediente activo:</strong> {producto?.ingrediente || "-"}</div>
            <div><strong>Categoría:</strong> {producto?.categoria}</div>
            <div><strong>Unidad:</strong> {producto?.unidad}</div>
            <div className="sm:col-span-2"><strong>Finca:</strong> {decodeURIComponent(finca)}</div>
            <div className="sm:col-span-2">
              <strong>Saldo actual:</strong>{" "}
              {movimientos.length > 0
                ? `${movimientos[0].saldo} ${movimientos[0].unidad}`
                : `0 ${producto?.unidad}`}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-green-700 mb-6">Movimientos del producto</h2>

          {/* Tabla movimientos */}
          <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-x-auto relative">
            <table className="w-full text-base text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  {columnas.map((col, idx) => (
                    <th key={idx} className="px-4 py-4 font-bold border">
                      <div className="flex justify-center items-center gap-2">
                        <span className="uppercase">{col}</span>
                        <button onClick={(e) => toggleFiltro(col, e)}>
                          <IconFilter className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {movimientosFiltrados.map((m, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50 transition">
                    <td className="px-6 py-4 border border-gray-200">{m.fecha}</td>
                    <td className="px-6 py-4 border border-gray-200">{m.finca_nombre}</td>
                    <td className="px-6 py-4 border border-gray-200">{m.lote_nombre || "-"}</td>
                    <td className="px-6 py-4 border border-gray-200">{m.tipo}</td>
                    <td className="px-6 py-4 border border-gray-200">{m.movimiento}</td>
                    <td className="px-6 py-4 border border-gray-200">{m.saldo}</td>
                    <td className="px-6 py-4 border border-gray-200">{m.unidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </LayoutMayordomo>
  );
};

export default Detalle_produc;
