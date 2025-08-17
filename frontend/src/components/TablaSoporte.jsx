// src/components/TablaSoporte.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  IconEye,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";

const TablaSoporte = ({ tickets, onDetalle, hiddenColumns = [] }) => {
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // 🔹 Definición columnas
  const todasLasColumnas = [
    { key: "numero", label: "Ticket", width: "w-32" },
    { key: "asunto", label: "Asunto", width: "w-64" },
    { key: "estado_display", label: "Estado", width: "w-40" },
    { key: "solicitado_por_nombre", label: "Solicitado por", width: "w-48" },
    { key: "solicitado_por_rol", label: "Rol", width: "w-40" }, // 👈 dinámico
    { key: "fecha_solicitud", label: "Fecha solicitud", width: "w-40" },
  ];

  // 🔹 Solo mostramos columnas que no estén ocultas
  const columnas = todasLasColumnas.filter(
    (col) => !hiddenColumns.includes(col.key)
  );

  // --- Filtros ---
  const toggleFiltro = (campo, e) => {
    e.stopPropagation();
    const icono = e.currentTarget.getBoundingClientRect();
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

  const aceptarFiltro = () => setFiltroActivo(null);
  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });
  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  const datosFiltrados = tickets
    .filter((item) =>
      columnas.every((c) => {
        const campo = c.key;
        if (
          !valoresSeleccionados[campo] ||
          valoresSeleccionados[campo].length === 0
        )
          return true;
        return valoresSeleccionados[campo].includes(
          item[campo]?.toString() ?? ""
        );
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const av = a[campo]?.toString() ?? "";
      const bv = b[campo]?.toString() ?? "";
      return orden === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  // --- Outside click ---
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg relative">
      <table className="min-w-full text-base text-center table-fixed">
        <thead className="bg-green-600 text-white">
          <tr>
            {columnas.map((col) => (
              <th key={col.key} className={`px-4 py-4 border ${col.width}`}>
                <div className="flex items-center justify-center gap-2">
                  <span>{col.label}</span>
                  <button
                    onClick={(e) => toggleFiltro(col.key, e)}
                    className="z-10"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <IconFilter className="w-4 h-4" />
                  </button>
                </div>
              </th>
            ))}
            <th className="px-4 py-4 border w-32">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.length > 0 ? (
            datosFiltrados.map((t) => (
              <tr key={t.id} className="border-t hover:bg-gray-50">
                {columnas.map((col) => (
                  <td key={col.key} className={`p-3 border ${col.width}`}>
                    {t[col.key]}
                  </td>
                ))}
                <td className="p-3 border w-32">
                  <button
                    onClick={() => onDetalle(t)}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-200 transition mx-auto"
                  >
                    <IconEye className="w-4 h-4" /> Detalle
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length + 1} className="p-6 text-gray-500">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* --- Filtros Popup --- */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-[9999] p-3 w-60 text-left text-sm"
          style={{
            top: filtroPosicion.top,
            left: filtroPosicion.left,
          }}
        >
          <div className="font-semibold mb-2">
            Filtrar por {filtroActivo.replace("_", " ").toUpperCase()}
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
            {[...new Set(tickets.map((e) => e[filtroActivo]?.toString()))]
              .filter((v) =>
                v
                  ?.toLowerCase()
                  .includes((busquedas[filtroActivo] || "").toLowerCase())
              )
              .map((val, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 mb-1 capitalize"
                >
                  <input
                    type="checkbox"
                    checked={
                      (valoresSeleccionados[filtroActivo] || []).includes(val)
                    }
                    onChange={() => toggleValor(filtroActivo, val)}
                    className="accent-green-600"
                  />
                  {val}
                </label>
              ))}

            <div className="flex justify-between mt-3">
              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-300 transition"
              >
                Borrar
              </button>
              <button
                onClick={aceptarFiltro}
                className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700 transition"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaSoporte;
