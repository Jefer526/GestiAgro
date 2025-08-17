// src/pages/agronomo/Detalles_agrop.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Detalles_agrop = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  // Estado de filtros
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Datos usuario (para Layout)
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

  // Datos tabla
  const columnas = ["fecha", "tipo", "lote", "cantidad", "um", "saldo"];
  const movimientos = [
    { fecha: "2025-06-15", tipo: "Entrada", lote: "1", cantidad: "50", um: "Kg", saldo: "350" },
    { fecha: "2025-06-16", tipo: "Salida", lote: "2", cantidad: "20", um: "Kg", saldo: "330" },
    { fecha: "2025-06-17", tipo: "Entrada", lote: "3", cantidad: "45", um: "Kg", saldo: "375" },
  ];

  // Cierre de filtros flotantes
  useEffect(() => {
    const clickFueraFiltro = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target))
        setFiltroActivo(null);
    };
    document.addEventListener("mousedown", clickFueraFiltro);
    return () => document.removeEventListener("mousedown", clickFueraFiltro);
  }, []);

  // Utilidades filtro y orden
  const getValoresUnicos = (campo) => {
    if (campo === "fecha") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(movimientos.map((e) => e[campo]))].filter((v) =>
      String(v).toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    const filtroWidth = 240;
    const pantallaWidth = window.innerWidth;
    let left = icono.left + window.scrollX;
    if (left + filtroWidth > pantallaWidth)
      left = pantallaWidth - filtroWidth - 10;
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({ top: icono.bottom + window.scrollY + 4, left });
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

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });
  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  const movimientosFiltrados = movimientos
    .filter((item) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo])
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? String(a[campo]).localeCompare(String(b[campo]))
        : String(b[campo]).localeCompare(String(a[campo]));
    });

  return (
    <LayoutAgronomo active="/Bodegaagro" letraInicial={letraInicial}>
      <div className="p-10 w-full">
        <button
          onClick={() => navigate("/Bodegaagro")}
          className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
        >
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        {/* Datos producto */}
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Detalle del producto
        </h1>
        <div className="border border-gray-400 rounded-lg p-6 text-lg grid grid-cols-2 gap-y-2 max-w-3xl mb-10">
          <div>
            <span className="font-bold">Producto:</span> Urea
          </div>
          <div>
            <span className="font-bold">Ingrediente activo:</span> Nitrogeno 46%
          </div>
          <div>
            <span className="font-bold">Finca:</span> La esmeralda
          </div>
          <div>
            <span className="font-bold">Categoría:</span> Fertilizante
          </div>
          <div>
            <span className="font-bold">Saldo:</span> 300
          </div>
        </div>

        {/* Tabla movimientos */}
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Movimiento del producto
        </h2>
        <div className="bg-white border border-gray-300 rounded-xl overflow-auto relative">
          <table className="w-full text-left text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                {columnas.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 border-r border-gray-300 uppercase text-center"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <span>{col.toUpperCase()}</span>
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
                <tr key={i} className="border-b border-gray-200">
                  <td className="px-4 py-2 border-r border-gray-200 text-center">
                    {m.fecha}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">
                    {m.tipo}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">
                    {m.lote}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">
                    {m.cantidad}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">
                    {m.um}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">
                    {m.saldo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtro dinámico */}
          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{
                top: filtroPosicion.top,
                left: filtroPosicion.left,
              }}
            >
              <div className="font-semibold mb-2">
                Filtrar por{" "}
                {filtroActivo.charAt(0).toUpperCase() +
                  filtroActivo.slice(1)}
              </div>
              {filtroActivo !== "fecha" ? (
                <>
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
                    onChange={(e) =>
                      handleBusqueda(filtroActivo, e.target.value)
                    }
                  />
                  <div className="flex flex-col max-h-40 overflow-y-auto">
                    {getValoresUnicos(filtroActivo).map((val, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 mb-1"
                      >
                        <input
                          type="checkbox"
                          checked={(
                            valoresSeleccionados[filtroActivo] || []
                          ).includes(val)}
                          onChange={() => toggleValor(filtroActivo, val)}
                          className="accent-green-600"
                        />
                        {String(val).charAt(0).toUpperCase() +
                          String(val).slice(1).toLowerCase()}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  Filtrado avanzado de fechas aquí...
                </p>
              )}
              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="text-blue-600 hover:underline text-xs lowercase mt-2"
              >
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        {/* Botón exportar */}
        <div className="flex justify-end mt-6">
          <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
            Exportar historial
          </button>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Detalles_agrop;
