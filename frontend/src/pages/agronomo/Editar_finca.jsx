import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconEye,
  IconPlus,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Editar_finca = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const filtroRef = useRef(null);

  const [finca, setFinca] = useState(null);
  const [lotes, setLotes] = useState([]);

  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Cargar datos desde API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fincaRes = await api.get(`/api/fincas/${id}/`);
        setFinca(fincaRes.data);

        const lotesRes = await api.get(`/api/lotes/?finca=${id}`);
        setLotes(lotesRes.data);
      } catch (err) {
        console.error("❌ Error cargando finca/lotes:", err);
      }
    };
    fetchData();
  }, [id]);

  const columnas = [
    { campo: "lote", label: "Lote" },
    { campo: "cultivo", label: "Cultivo" },
    { campo: "numero_arboles", label: "N° Árboles" },
    { campo: "variedades", label: "Variedades" },
    { campo: "area_neta", label: "Área Neta" },
    { campo: "area_bruta", label: "Área Bruta" },
    { campo: "estado", label: "Estado" },
    { campo: "detalle", label: "Detalle" },
  ];

  // === Filtros ===
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();

    if (campo === "variedades") {
      const todasVariedades = lotes.flatMap(
        (l) => (l.variedades_detalle || []).map((v) => v.variedad)
      );
      return [...new Set(todasVariedades)].filter((v) =>
        String(v).toLowerCase().includes(search)
      );
    }

    return [...new Set(lotes.map((e) => String(e[campo] || "")))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    if (campo === "detalle") return;
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

  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  const lotesFiltrados = lotes
    .filter((item) =>
      columnas.every(({ campo }) => {
        if (campo === "detalle") return true;

        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;

        if (campo === "variedades") {
          if (seleccionados.length === 1) {
            return (item.variedades_detalle || []).some(
              (v) => v.variedad === seleccionados[0]
            );
          }
          return seleccionados.every((sel) =>
            (item.variedades_detalle || []).some((v) => v.variedad === sel)
          );
        }

        return seleccionados.includes(String(item[campo]));
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;

      const valA =
        campo === "variedades"
          ? (a.variedades_detalle || []).map((v) => v.variedad).join(", ")
          : a[campo];
      const valB =
        campo === "variedades"
          ? (b.variedades_detalle || []).map((v) => v.variedad).join(", ")
          : b[campo];

      return orden === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  // Totales
  const totalArboles = lotesFiltrados.reduce(
    (acc, l) => acc + (Number(l.numero_arboles) || 0),
    0
  );
  const totalAreaNeta = lotesFiltrados.reduce(
    (acc, l) => acc + parseFloat(l.area_neta || 0),
    0
  );
  const totalAreaBruta = lotesFiltrados.reduce(
    (acc, l) => acc + parseFloat(l.area_bruta || 0),
    0
  );

  // Total de variedades
  const seleccionadas = valoresSeleccionados["variedades"] || [];
  const totalVariedades = lotesFiltrados.reduce((acc, lote) => {
    const variedades = lote.variedades_detalle || [];
    const visibles =
      seleccionadas.length > 0
        ? variedades.filter((v) => seleccionadas.includes(v.variedad))
        : variedades;
    return (
      acc + visibles.reduce((sum, v) => sum + (Number(v.cantidad) || 0), 0)
    );
  }, 0);

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
    <LayoutAgronomo active="/gestionfincas">
      {/* Botón volver */}
      <button
        onClick={() => navigate("/gestionfincas")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Hoja de vida de Finca
      </h1>

      {/* Información de la finca */}
      {finca && (
        <div className="bg-white border border-gray-300 rounded-xl shadow-md mb-8 p-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Información de la finca
          </h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <p>
              <strong>Nombre:</strong> {finca.nombre}
            </p>
            <p>
              <strong>Estado:</strong> {finca.estado}
            </p>
            <p>
              <strong>Municipio:</strong> {finca.municipio}
            </p>
            <p>
              <strong>Departamento:</strong> {finca.departamento}
            </p>
            <p>
              <strong>Área Bruta:</strong> {finca.area_bruta} ha
            </p>
            <p>
              <strong>Área Neta:</strong> {finca.area_neta} ha
            </p>
            <p>
              <strong>N° Árboles:</strong> {finca.numero_arboles}
            </p>
          </div>
        </div>
      )}

      {/* Lotes */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-green-700">Lotes de la finca</h2>
        <button
          onClick={() => navigate(`/crearlote/${id}`)}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 font-semibold"
        >
          <IconPlus className="w-5 h-5" /> Crear lote
        </button>
      </div>

      {/* Tabla de lotes */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-x-auto relative">
        <table className="w-full text-base text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {columnas.map(({ campo, label }) => (
                <th key={campo} className="px-4 py-4 font-bold border">
                  <div className="flex justify-center items-center gap-2">
                    <span className="uppercase">{label}</span>
                    {campo !== "detalle" && (
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lotesFiltrados.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 border">{item.lote}</td>
                <td className="px-6 py-4 border">{item.cultivo}</td>
                <td className="px-6 py-4 border">{item.numero_arboles}</td>
                {/* Variedades con cantidad y filtro aplicado */}
                <td className="px-6 py-4 border">
                  {(() => {
                    const seleccionados =
                      valoresSeleccionados["variedades"] || [];
                    const variedades = item.variedades_detalle || [];
                    const visibles =
                      seleccionados.length > 0
                        ? variedades.filter((v) =>
                            seleccionados.includes(v.variedad)
                          )
                        : variedades;
                    return visibles
                      .map((v) => `${v.variedad} (${v.cantidad})`)
                      .join(", ");
                  })()}
                </td>
                <td className="px-6 py-4 border">{item.area_neta} ha</td>
                <td className="px-6 py-4 border">{item.area_bruta} ha</td>
                <td className="px-6 py-4 border">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      item.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.estado}
                  </span>
                </td>
                <td className="px-6 py-4 border">
                  <button
                    onClick={() => navigate(`/Detallelote/${id}/${item.id}`)}
                    className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200 mx-auto"
                  >
                    <IconEye className="w-4 h-4" /> Editar
                  </button>
                  
                </td>
              </tr>
            ))}

            {/* Totales */}
            {lotesFiltrados.length > 0 && (
              <tr className="font-bold bg-gray-100">
                <td colSpan={2} className="p-4 border text-right">
                  TOTAL
                </td>
                <td className="p-4 border text-center">{totalArboles}</td>
                <td className="p-4 border text-center">{totalVariedades}</td>
                <td className="p-4 border text-center">
                  {totalAreaNeta.toFixed(2)} ha
                </td>
                <td className="p-4 border text-center">
                  {totalAreaBruta.toFixed(2)} ha
                </td>
                <td className="p-4 border"></td>
                <td className="p-4 border"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Filtro flotante */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white border rounded shadow-lg p-3 z-50 w-60 text-sm"
          style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
        >
          <h3 className="font-bold mb-2">
            Filtrar por {filtroActivo.toUpperCase()}
          </h3>
          <button
            onClick={() => ordenar(filtroActivo, "asc")}
            className="flex items-center gap-1 text-green-700 mb-1"
          >
            <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
          </button>
          <button
            onClick={() => ordenar(filtroActivo, "desc")}
            className="flex items-center gap-1 text-green-700 mb-2"
          >
            <IconSortDescending2 className="w-4 h-4" /> Ordenar Z → A
          </button>
          <input
            type="text"
            placeholder="Buscar..."
            value={busquedas[filtroActivo] || ""}
            onChange={(e) => handleBusqueda(filtroActivo, e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm mb-2"
          />
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {getValoresUnicos(filtroActivo).map((valor) => (
              <label key={valor} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={valoresSeleccionados[filtroActivo]?.includes(valor)}
                  onChange={() => toggleValor(filtroActivo, valor)}
                  className="accent-green-600"
                />
                {valor}
              </label>
            ))}
          </div>
          {/* Botones Borrar / Aceptar */}
          <div className="flex justify-between mt-3">
            <button
              onClick={() => limpiarFiltro(filtroActivo)}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-300 transition"
            >
              Borrar
            </button>
            <button
              onClick={() => setFiltroActivo(null)}
              className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </LayoutAgronomo>
  );
};

export default Editar_finca;
