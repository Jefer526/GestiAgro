import {
  IconFilter,
} from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { laboresApi, getMe } from "../../services/apiClient";

const Historial_labor = () => {
  const filtroRef = useRef(null);
  const [expandido, setExpandido] = useState(null);

  // Estados
  const [labores, setLabores] = useState([]);
  const [finca, setFinca] = useState(null);

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

  // === Fetch inicial ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getMe();
        setFinca(userRes.data.finca_asignada);

        const res = await laboresApi.list();

        // Adaptar datos: 1 fila por cada detalle
        const adaptados = res.data.flatMap((l) =>
          l.detalles.map((det) => {
            const d = new Date(l.fecha + "T00:00:00");
            const fechaFormateada = `${d.getDate()}/${
              d.getMonth() + 1
            }/${d.getFullYear()}`;

            return {
              fecha: fechaFormateada,
              fechaRaw: l.fecha,
              labor: l.descripcion,
              finca: userRes.data.finca_asignada?.nombre || "",
              lote: l.lote,
              trabajador:
                det.trabajador_nombre || det.trabajador_externo || "—",
              jornal: Number(det.jornal) || 0,
              ejecucion: Number(det.ejecucion) || 0,
              um: det.um || "",
              observacion: l.observaciones || "",
            };
          })
        );

        setLabores(adaptados);
      } catch (err) {
        console.error("❌ Error cargando historial:", err);
      }
    };
    fetchData();
  }, []);

  const toggleExpandido = (index) =>
    setExpandido(expandido === index ? null : index);

  // Filtros
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
        return (
          !filtro ||
          filtro.length === 0 ||
          filtro.includes(campo === "fecha" ? d.fechaRaw : String(d[campo]))
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

  // === Totales
  const totalJornales = datosFiltrados.reduce(
    (acc, d) => acc + (Number(d.jornal) || 0),
    0
  );
  const totalEjecucion = datosFiltrados.reduce(
    (acc, d) => acc + (Number(d.ejecucion) || 0),
    0
  );

  return (
    <LayoutMayordomo titulo="Historial de labores">
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
                <td className="px-4 py-2 text-center">
                  {totalJornales.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-center">
                  {totalEjecucion.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-center"></td>
                <td className="px-4 py-2 text-center"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Panel filtro dinámico */}
      {filtroActivo &&
        (filtroActivo === "fecha"
          ? null 
          : null
        )}
    </LayoutMayordomo>
  );
};

export default Historial_labor;
