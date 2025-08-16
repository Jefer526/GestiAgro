// src/pages/mayordomo/Detalle_produc.jsx
import {
  IconChevronLeft,
  IconFilter,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react";

// Importa el layout reutilizable del Mayordomo
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Detalle_produc = () => {
  const navigate = useNavigate();

  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  // Movimientos (mock)
  const movimientos = [
    { fecha: "2025-06-15", tipo: "Entrada", lote: "El Vaquero", cantidad: 50, um: "Kg" },
    { fecha: "2025-06-16", tipo: "Salida", lote: 1, cantidad: 10, um: "Kg" },
    { fecha: "2025-06-17", tipo: "Salida", lote: 2, cantidad: 25, um: "Kg" },
  ];

  // Ordenar por fecha asc y calcular saldo acumulado
  const movimientosConSaldo = useMemo(() => {
    const copia = [...movimientos].sort((a, b) => a.fecha.localeCompare(b.fecha));
    let saldo = 0;
    return copia.map((m) => {
      saldo += m.tipo.toLowerCase() === "entrada" ? m.cantidad : -m.cantidad;
      return { ...m, saldo };
    });
  }, [movimientos]);

  const toggleFiltro = (campo, event) => {
    const icono = event.currentTarget.getBoundingClientRect();
    const cardWidth = 260;
    const margen = 12;
    let left = icono.left + window.scrollX;
    if (left + cardWidth + margen > window.innerWidth) left = window.innerWidth - cardWidth - margen;
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

  const camposFiltro = ["fecha", "tipo", "lote", "cantidad", "um", "saldo"];

  const datosFiltrados = movimientosConSaldo.filter((d) =>
    camposFiltro.every((campo) => {
      const filtro = valoresSeleccionados[campo];
      return !filtro || filtro.includes(String(d[campo]));
    })
  );

  useEffect(() => {
    const clickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) setFiltroActivo(null);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const renderFiltroSimple = (campo) => {
    const opcionesUnicas = [...new Set(movimientosConSaldo.map((d) => String(d[campo])))];
    return (
      <div
        ref={filtroRef}
        className="fixed bg-white text-black shadow-md border rounded z-[10000] p-3 w-64 text-left text-sm"
        style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
      >
        <div className="font-semibold mb-2">
          Filtrar por {campo.charAt(0).toUpperCase() + campo.slice(1)}
        </div>
        <div className="max-h-64 overflow-auto pr-1">
          {opcionesUnicas.map((valor) => (
            <label key={valor} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={(valoresSeleccionados[campo] || []).includes(valor)}
                onChange={() => toggleValor(campo, valor)}
                className="accent-green-600"
              />
              {valor}
            </label>
          ))}
        </div>
        <button onClick={() => limpiarFiltro(campo)} className="text-blue-600 hover:underline text-xs mt-2">
          Borrar filtro
        </button>
      </div>
    );
  };

  const saldoActual = movimientosConSaldo.length
    ? movimientosConSaldo[movimientosConSaldo.length - 1].saldo
    : 0;

  return (
    <LayoutMayordomo>
      <button
        onClick={() => navigate("/bodega_insumos")}
        className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-6">Detalle del producto</h1>

      {/* Recuadro de info */}
      <div className="border border-gray-400 rounded-lg p-6 text-lg grid grid-cols-2 gap-y-2 max-w-3xl mb-10">
        <div><span className="font-bold">Producto:</span> Urea</div>
        <div><span className="font-bold">Ingrediente activo:</span> Nitrógeno 46%</div>
        <div><span className="font-bold">Finca:</span> La Esmeralda</div>
        <div><span className="font-bold">Categoría:</span> Fertilizante</div>
        <div className="col-span-2">
          <span className="font-bold">Saldo actual:</span> {saldoActual} Kg
        </div>
      </div>

      <h2 className="text-2xl font-bold text-green-700 mb-4">Movimiento del producto</h2>

      {/* Tabla */}
      <div className="relative bg-white border border-gray-300 rounded-xl overflow-auto">
        <table className="w-full text-base text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {["fecha", "tipo", "lote", "cantidad", "um", "saldo"].map((campo) => (
                <th key={campo} className="px-4 py-3 border-r border-gray-300 text-center">
                  <div className="flex justify-center items-center gap-1">
                    {campo.toUpperCase()}
                    <button onClick={(e) => toggleFiltro(campo, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((m, i) => (
              <tr key={i} className="border-b border-gray-200 text-center">
                <td className="px-4 py-2 border-r border-gray-200">{m.fecha}</td>
                <td className="px-4 py-2 border-r border-gray-200">{m.tipo}</td>
                <td className="px-4 py-2 border-r border-gray-200">{m.lote}</td>
                <td className="px-4 py-2 border-r border-gray-200">{m.cantidad}</td>
                <td className="px-4 py-2 border-r border-gray-200">{m.um}</td>
                <td className="px-4 py-2">{m.saldo}</td>
              </tr>
            ))}
            {datosFiltrados.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-gray-500">Sin movimientos</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Filtros */}
        {filtroActivo && (
          filtroActivo === "fecha"
            ? /* Filtro por fecha más detallado */
              <div
                ref={filtroRef}
                className="fixed bg-white text-black shadow-md border rounded z-[10000] p-3 w-64 text-left text-sm"
                style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
              >
                <div className="font-semibold mb-2">Filtrar por Fecha</div>
                {Object.entries(
                  movimientosConSaldo.reduce((acc, { fecha }) => {
                    const [y, m, d] = fecha.split("-");
                    const monthName = new Date(`${y}-${m}-01`).toLocaleString("default", { month: "long" });
                    acc[y] = acc[y] || {};
                    acc[y][monthName] = acc[y][monthName] || new Set();
                    acc[y][monthName].add(d);
                    return acc;
                  }, {})
                ).map(([year, months]) => (
                  <div key={year} className="mb-2">
                    <div className="font-medium">{year}</div>
                    {Object.entries(months).map(([month, days]) => (
                      <div key={month} className="ml-4">
                        <div className="font-medium">{month}</div>
                        {[...days].map((day) => {
                          const fullDate = `${year}-${String(new Date(`${month} 1, ${year}`).getMonth() + 1).padStart(2, "0")}-${day}`;
                          return (
                            <label key={day} className="ml-6 flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={(valoresSeleccionados["fecha"] || []).includes(fullDate)}
                                onChange={() => toggleValor("fecha", fullDate)}
                                className="accent-green-600"
                              />
                              {day}
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ))}
                <button onClick={() => limpiarFiltro("fecha")} className="text-blue-600 hover:underline text-xs mt-2">
                  Borrar filtro
                </button>
              </div>
            : renderFiltroSimple(filtroActivo)
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
          Exportar historial
        </button>
      </div>
    </LayoutMayordomo>
  );
};

export default Detalle_produc;
