// src/pages/mayordomo/Historial_labor.jsx
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Historial_labor = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [expandido, setExpandido] = useState(null);

  // 📌 Estados de filtro
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});

  const datos = [
    {
      fecha: "2025-06-19",
      labor: "Siembra",
      finca: "La Esmeralda",
      lote: 1,
      trabajador: "Camilo Restrepo",
      jornal: 1,
      ejecucion: 500,
      um: "Árboles",
      observacion:
        "El trabajador realizó la siembra en condiciones óptimas, cumpliendo con los estándares establecidos y sin contratiempos.",
    },
    {
      fecha: "2025-06-19",
      labor: "Siembra",
      finca: "La Esmeralda",
      lote: 1,
      trabajador: "Laura Méndez",
      jornal: 1,
      ejecucion: 300,
      um: "Árboles",
      observacion: "Se completó la siembra sin novedades importantes.",
    },
    {
      fecha: "2025-06-20",
      labor: "Guadaña Mecánica",
      finca: "La Esmeralda",
      lote: 2,
      trabajador: "Valentina Mora",
      jornal: 0.5,
      ejecucion: 2,
      um: "HAS",
      observacion:
        "El área fue guadañada parcialmente debido a condiciones climáticas.",
    },
    {
      fecha: "2025-06-20",
      labor: "Riego",
      finca: "La Esmeralda",
      lote: 2,
      trabajador: "Pedro Ramírez",
      jornal: 1,
      ejecucion: 3,
      um: "HAS",
      observacion: "El riego se realizó completamente sin fallas técnicas.",
    },
    {
      fecha: "2025-06-21",
      labor: "Fertilización",
      finca: "La Esmeralda",
      lote: 1,
      trabajador: "Sofía Gómez",
      jornal: 1,
      ejecucion: 400,
      um: "Árboles",
      observacion: "Aplicación de fertilizante NPK según recomendación técnica.",
    },
  ];

  const campos = [
    "fecha",
    "labor",
    "finca",
    "lote",
    "trabajador",
    "jornal",
    "ejecucion",
    "um",
  ];

  const toggleExpandido = (index) =>
    setExpandido(expandido === index ? null : index);

  // 📌 Filtros
  const toggleFiltro = (campo, event) => {
    const icono = event.currentTarget.getBoundingClientRect();
    const cardWidth = 260;
    const margen = 12;
    let left = icono.left + window.scrollX;
    if (left + cardWidth + margen > window.innerWidth) {
      left = window.innerWidth - cardWidth - margen;
    }
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

  const ordenar = (campo, orden) => {
    setOrdenCampo({ campo, orden });
  };

  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(datos.map((d) => d[campo].toString()))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const datosFiltrados = datos
    .filter((d) =>
      campos.every((campo) => {
        const filtro = valoresSeleccionados[campo];
        return (
          !filtro ||
          filtro.length === 0 ||
          filtro.includes(String(d[campo]))
        );
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo].toString().localeCompare(b[campo].toString())
        : b[campo].toString().localeCompare(a[campo].toString());
    });

  useEffect(() => {
    const clickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  // === Render filtros ===
  const renderFiltroFecha = () => {
    const estructura = datos.reduce((acc, { fecha }) => {
      const d = new Date(fecha + "T00:00:00");
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();

      if (!acc[y]) acc[y] = {};
      if (!acc[y][m]) acc[y][m] = new Set();
      acc[y][m].add(day);
      return acc;
    }, {});

    const monthName = (m) =>
      new Date(2000, m - 1, 1).toLocaleString("default", { month: "long" });

    return (
      <div
        ref={filtroRef}
        className="fixed bg-white text-black shadow-md border rounded z-[10000] p-3 w-64 text-left text-sm"
        style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
      >
        <div className="font-semibold mb-2">Filtrar por FECHA</div>
        {Object.keys(estructura)
          .sort((a, b) => Number(a) - Number(b))
          .map((yearKey) => {
            const y = Number(yearKey);
            const meses = estructura[y];
            return (
              <div key={y} className="mb-2">
                <div className="font-medium">{y}</div>
                {Object.keys(meses)
                  .map(Number)
                  .sort((a, b) => a - b)
                  .map((m) => (
                    <div key={`${y}-${m}`} className="ml-4">
                      <div className="font-medium">{monthName(m)}</div>
                      {[...meses[m]]
                        .sort((a, b) => a - b)
                        .map((day) => {
                          const fullDate = `${y}-${String(m).padStart(
                            2,
                            "0"
                          )}-${String(day).padStart(2, "0")}`;
                          return (
                            <label
                              key={`${y}-${m}-${day}`}
                              className="ml-6 flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  (valoresSeleccionados["fecha"] || []).includes(
                                    fullDate
                                  )
                                }
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
            );
          })}
        <button
          onClick={() => limpiarFiltro("fecha")}
          className="text-blue-600 hover:underline text-xs mt-2"
        >
          Borrar filtro
        </button>
      </div>
    );
  };

  const renderFiltroAvanzado = (campo) => (
    <div
      ref={filtroRef}
      className="fixed bg-white text-black shadow-md border rounded z-[10000] p-3 w-64 text-left text-sm"
      style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
    >
      <div className="font-semibold mb-2">
        Filtrar por {campo.toUpperCase()}
      </div>
      <button
        onClick={() => ordenar(campo, "asc")}
        className="text-green-700 flex items-center gap-1 mb-1"
      >
        <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
      </button>
      <button
        onClick={() => ordenar(campo, "desc")}
        className="text-green-700 flex items-center gap-1 mb-2"
      >
        <IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A
      </button>
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full border border-gray-300 px-2 py-1 rounded mb-2 text-sm"
        value={busquedas[campo] || ""}
        onChange={(e) => handleBusqueda(campo, e.target.value)}
      />
      <div className="flex flex-col max-h-40 overflow-y-auto">
        {getValoresUnicos(campo).map((val, idx) => (
          <label key={idx} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={(valoresSeleccionados[campo] || []).includes(val)}
              onChange={() => toggleValor(campo, val)}
              className="accent-green-600"
            />
            {val}
          </label>
        ))}
      </div>
      <button
        onClick={() => limpiarFiltro(campo)}
        className="text-blue-600 hover:underline text-xs mt-2"
      >
        Borrar filtro
      </button>
    </div>
  );

  return (
    <LayoutMayordomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Historial labores finca: La Esmeralda
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl overflow-auto relative">
        <table className="w-full text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              {campos.map((campo) => (
                <th key={campo} className="px-4 py-3 border-r text-center">
                  <div className="flex items-center justify-center gap-1">
                    {campo.toUpperCase()}
                    <button onClick={(e) => toggleFiltro(campo, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-center">OBSERVACIÓN</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((d, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 text-center align-middle"
              >
                {campos.map((campo, j) => (
                  <td key={j} className="px-4 py-2 border-r">
                    {d[campo]}
                  </td>
                ))}
                <td className="px-4 py-2 text-blue-500 font-semibold text-left">
                  <span>
                    {expandido === i
                      ? d.observacion
                      : `${d.observacion.substring(0, 50)}...`}
                  </span>
                  <button
                    onClick={() => toggleExpandido(i)}
                    className="ml-2 underline hover:text-green-800"
                  >
                    {expandido === i ? "Ocultar" : "Ver"}
                  </button>
                </td>
              </tr>
            ))}
            {datosFiltrados.length === 0 && (
              <tr>
                <td colSpan={campos.length + 1} className="p-6 text-gray-500">
                  Sin registros
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Panel filtro dinámico */}
        {filtroActivo &&
          (filtroActivo === "fecha"
            ? renderFiltroFecha()
            : renderFiltroAvanzado(filtroActivo))}
      </div>
    </LayoutMayordomo>
  );
};

export default Historial_labor;
