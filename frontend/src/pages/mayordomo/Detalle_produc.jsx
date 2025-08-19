// src/pages/mayordomo/Detalle_produc.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Detalle_produc = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  // Estados de filtros
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Columnas y datos
  const columnas = ["fecha", "tipo", "lote", "cantidad", "um", "saldo"];
  const movimientos = [
    { fecha: "2025-06-15", tipo: "Entrada", lote: "1", cantidad: "50", um: "Kg", saldo: "350" },
    { fecha: "2025-06-16", tipo: "Salida", lote: "2", cantidad: "10", um: "Kg", saldo: "340" },
    { fecha: "2025-06-17", tipo: "Salida", lote: "3", cantidad: "25", um: "Kg", saldo: "315" },
  ];

  // Cierre filtros flotantes
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) setFiltroActivo(null);
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  // Funciones de filtros
  const getValoresUnicos = (campo) => {
    if (campo === "fecha") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(movimientos.map((e) => e[campo]))].filter((v) =>
      String(v).toLowerCase().includes(search)
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
    <LayoutMayordomo active="/bodega_insumos">
      {/* Botón volver */}
      <button
        onClick={() => navigate("/bodega_insumos")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      {/* Título */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">Detalle del producto</h1>

      {/* Card info */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md mb-8 p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-[17px] leading-relaxed max-w-3xl">
        <div><strong>Producto:</strong> Urea</div>
        <div><strong>Ingrediente activo:</strong> Nitrógeno 46%</div>
        <div><strong>Finca:</strong> La Esmeralda</div>
        <div><strong>Categoría:</strong> Fertilizante</div>
        <div><strong>Saldo:</strong> 315 Kg</div>
      </div>

      <h2 className="text-3xl font-bold text-green-700 mb-6">Movimiento del producto</h2>

      {/* === TABLA IGUAL A AGRO === */}
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
                <td className="px-6 py-4 border border-gray-200">{m.tipo}</td>
                <td className="px-6 py-4 border border-gray-200">{m.lote}</td>
                <td className="px-6 py-4 border border-gray-200">{m.cantidad}</td>
                <td className="px-6 py-4 border border-gray-200">{m.um}</td>
                <td className="px-6 py-4 border border-gray-200">{m.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Filtros popover */}
        {filtroActivo === "fecha" ? (
          <div
            ref={filtroRef}
            className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
            style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
          >
            <div className="font-semibold mb-2">Filtrar por Fecha</div>
            {Object.entries(
              movimientos.reduce((acc, { fecha }) => {
                const [year, month, day] = fecha.split("-");
                const monthName = new Date(fecha).toLocaleString("default", { month: "long" });
                acc[year] = acc[year] || {};
                acc[year][monthName] = acc[year][monthName] || { days: new Set(), monthNum: month };
                acc[year][monthName].days.add(day);
                return acc;
              }, {})
            ).map(([year, months]) => (
              <div key={year} className="mb-2">
                <div className="font-medium">{year}</div>
                {Object.entries(months).map(([monthName, info]) => (
                  <div key={monthName} className="ml-4">
                    <div className="font-medium">{monthName}</div>
                    {[...info.days].map((day) => {
                      const fullDate = `${year}-${String(info.monthNum).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      return (
                        <label key={fullDate} className="ml-6 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={(valoresSeleccionados["fecha"] || []).includes(fullDate)}
                            onChange={() => toggleValor("fecha", fullDate)}
                            className="accent-green-600"
                          />
                          {String(day).padStart(2, "0")}
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => limpiarFiltro("fecha")}
              className="text-blue-600 hover:underline text-xs lowercase mt-2"
            >
              borrar filtro
            </button>
          </div>
        ) : (
          filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">
                Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
              </div>

              <button
                onClick={() => ordenar(filtroActivo, "asc")}
                className="text-green-700 flex items-center gap-1 mb-1"
              >
                <IconSortAscending2 className="w-4 h-4" />Ordenar A → Z
              </button>
              <button
                onClick={() => ordenar(filtroActivo, "desc")}
                className="text-green-700 flex items-center gap-1 mb-2"
              >
                <IconSortDescending2 className="w-4 h-4" />Ordenar Z → A
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
                    {String(val).charAt(0).toUpperCase() + String(val).slice(1)}
                  </label>
                ))}
              </div>

              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="text-blue-600 hover:underline text-xs mt-2"
              >
                Borrar filtro
              </button>
            </div>
          )
        )}
      </div>

      {/* Botón exportar */}
      <div className="mt-4 flex justify-end">
        <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
          Exportar historial
        </button>
      </div>
    </LayoutMayordomo>
  );
};

export default Detalle_produc;


