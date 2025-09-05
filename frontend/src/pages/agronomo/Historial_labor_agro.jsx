import { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { laboresApi } from "../../services/apiClient";

const Historial_labor_agro = () => {
  const filtroRef = useRef(null);
  const [expandido, setExpandido] = useState(null);

  // Estados
  const [labores, setLabores] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});

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

  // === Cargar datos desde backend ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await laboresApi.list();

        // Adaptar API → tabla
        const adaptados = res.data.flatMap((l) =>
          l.detalles.map((det) => {
            const d = new Date(l.fecha + "T00:00:00");
            const fechaFormateada = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

            return {
              fecha: fechaFormateada,
              labor: l.descripcion,
              finca: l.finca_nombre || "—",
              lote: l.lote || "—",
              trabajador: det.trabajador_nombre || det.trabajador_externo || "—",
              jornal: det.jornal || 0,
              ejecucion: det.ejecucion || 0,
              um: det.um || "",
              observacion: l.observaciones || "",
            };
          })
        );

        setLabores(adaptados);
      } catch (err) {
        console.error("❌ Error cargando labores:", err);
      }
    };
    fetchData();
  }, []);

  const toggleExpandido = (index) =>
    setExpandido((prev) => (prev === index ? null : index));

  // Filtros
  const toggleFiltro = (campo, event) => {
    const icono = event.currentTarget.getBoundingClientRect();
    const cardWidth = 260;
    const margen = 12;
    let left = icono.left + window.scrollX;

    if (left + cardWidth + margen > window.innerWidth) {
      left = window.innerWidth - cardWidth - margen;
    }

    setFiltroActivo((prev) => (prev === campo ? null : campo));
    setFiltroPosicion({ top: icono.bottom + window.scrollY + 4, left });
  };

  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor)
      ? seleccionados.delete(valor)
      : seleccionados.add(valor);

    setValoresSeleccionados((prev) => ({
      ...prev,
      [campo]: [...seleccionados],
    }));
  };

  const limpiarFiltro = (campo) => {
    setValoresSeleccionados((prev) => {
      const actualizado = { ...prev };
      delete actualizado[campo];
      return actualizado;
    });
  };

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });
  const handleBusqueda = (campo, texto) =>
    setBusquedas((prev) => ({ ...prev, [campo]: texto }));

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(labores.map((d) => String(d[campo] || "")))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const datosFiltrados = labores
    .filter((d) =>
      campos.every((campo) => {
        const filtro = valoresSeleccionados[campo];
        return !filtro || filtro.length === 0 || filtro.includes(String(d[campo]));
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo].toString().localeCompare(b[campo].toString())
        : b[campo].toString().localeCompare(a[campo].toString());
    });

  // Totales
  const totalJornales = datosFiltrados.reduce(
    (acc, d) => acc + (Number(d.jornal) || 0),
    0
  );
  const totalEjecucion = datosFiltrados.reduce(
    (acc, d) => acc + (Number(d.ejecucion) || 0),
    0
  );

  // Cerrar filtro 
  useEffect(() => {
    const clickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  // === Render filtro fecha ===
  const renderFiltroFecha = () => {
    const estructura = labores.reduce((acc, { fecha }) => {
      const [day, month, year] = fecha.split("/");
      const y = parseInt(year);
      const m = parseInt(month);
      const d = parseInt(day);

      if (!acc[y]) acc[y] = {};
      if (!acc[y][m]) acc[y][m] = new Set();
      acc[y][m].add(d);

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
                          const fullDate = `${day}/${m}/${y}`;
                          return (
                            <label
                              key={`${y}-${m}-${day}`}
                              className="ml-6 flex items-center gap-2"
                            >
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
      <div className="font-semibold mb-2">Filtrar por {campo.toUpperCase()}</div>
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
    <LayoutAgronomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Historial de labores 
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
                    {campo === "jornal" || campo === "ejecucion"
                      ? Number(d[campo]).toFixed(1)
                      : d[campo]}
                  </td>
                ))}
                <td className="px-4 py-2 text-blue-500 font-semibold text-left">
                  <span>
                    {expandido === i
                      ? d.observacion
                      : `${d.observacion?.substring(0, 50)}...`}
                  </span>
                  {d.observacion && (
                    <button
                      onClick={() => toggleExpandido(i)}
                      className="ml-2 underline hover:text-green-800"
                    >
                      {expandido === i ? "Ocultar" : "Ver"}
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {/* Totales */}
            {datosFiltrados.length > 0 && (
              <tr className="font-bold bg-gray-100">
                <td colSpan={5} className="p-4 border text-right">
                  TOTAL
                </td>
                <td className="px-4 py-2 text-center">{totalJornales.toFixed(1)}</td>
                <td className="px-4 py-2 text-center">{totalEjecucion.toFixed(1)}</td>
                <td className="px-4 py-2 text-center"></td>
                <td className="px-4 py-2 text-center"></td>
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
    </LayoutAgronomo>
  );
};

export default Historial_labor_agro;
