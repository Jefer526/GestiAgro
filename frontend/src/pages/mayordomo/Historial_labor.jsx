// src/pages/mayordomo/Historial_labor.jsx
import {
  IconFilter,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// 📌 Importa el Layout con el sidebar ya integrado
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Historial_labor = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [expandido, setExpandido] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const datos = [
    {
      fecha: "19/06/2025",
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
      fecha: "19/06/2025",
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
      fecha: "20/06/2025",
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
      fecha: "20/06/2025",
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
      fecha: "21/06/2025",
      labor: "Fertilización",
      finca: "La Esmeralda",
      lote: 1,
      trabajador: "Sofía Gómez",
      jornal: 1,
      ejecucion: 400,
      um: "Árboles",
      observacion:
        "Aplicación de fertilizante NPK según recomendación técnica.",
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

  const toggleFiltro = (campo, event) => {
    const icono = event.currentTarget.getBoundingClientRect();
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

  const datosFiltrados = datos
    .filter((d) =>
      campos.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(d[campo])
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
    <LayoutMayordomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Historial labores finca: La Esmeralda
      </h1>

      <div className="bg-white border border-gray-300 rounded-xl overflow-auto">
        <table className="w-full text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              {campos.map((campo, i) => (
                <th
                  key={i}
                  className="px-4 py-3 border-r text-center align-middle"
                >
                  <div className="flex items-center justify-center gap-1">
                    {campo.toUpperCase()}
                    <button onClick={(e) => toggleFiltro(campo, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-center align-middle">OBSERVACIÓN</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((d, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 text-center align-middle"
              >
                {campos.map((campo, j) => (
                  <td
                    key={j}
                    className="px-4 py-2 border-r text-center align-middle"
                  >
                    {d[campo]}
                  </td>
                ))}
                <td className="px-4 py-2 text-blue-500 font-semibold text-left align-middle">
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
          </tbody>
        </table>
      </div>
    </LayoutMayordomo>
  );
};

export default Historial_labor;
