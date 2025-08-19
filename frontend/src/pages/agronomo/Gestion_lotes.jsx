// src/pages/agronomo/Gestion_lotes_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Gestion_lotes_agro = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const lotes = [
    {
      id: "L01",
      finca: "La Esmeralda",
      lote: "1",
      area_bruta: "3.0 ha",
      area_neta: "2.5 ha",
      cultivo: "Macadamia",
      variedad: "Integrifolia",
      estado: "Activo",
    },
    {
      id: "L02",
      finca: "Las Palmas",
      lote: "2",
      area_bruta: "2.5 ha",
      area_neta: "2.0 ha",
      cultivo: "Aguacate",
      variedad: "Hass",
      estado: "Inactivo",
    },
  ];

  const columnas = [
    "finca",
    "lote",
    "area_bruta",
    "area_neta",
    "cultivo",
    "variedad",
    "estado",
  ];

  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

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
    seleccionados.has(valor) ? seleccionados.delete(valor) : seleccionados.add(valor);
    setValoresSeleccionados({ ...valoresSeleccionados, [campo]: [...seleccionados] });
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
    return [
      ...new Set(lotes.map((d) => d[campo])),
    ].filter((v) => String(v).toLowerCase().includes(search));
  };

  const lotesFiltrados = lotes
    .filter((d) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] ||
        valoresSeleccionados[campo].length === 0
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <LayoutAgronomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Gestión de Lotes
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-center text-base bg-white">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {columnas.map((campo, i) => (
                <th key={i} className="p-4 border text-center">
                  <div className="flex items-center justify-center gap-2">
                    {campo === "area_bruta"
                      ? "ÁREA BRUTA"
                      : campo === "area_neta"
                      ? "ÁREA NETA"
                      : campo.toUpperCase()}
                    <button onClick={(e) => toggleFiltro(campo, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lotesFiltrados.map((lote, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                {columnas.map((campo, j) => (
                  <td key={j} className="p-4 border text-center">
                    {lote[campo]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filtro flotante */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
          style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
        >
          <div className="font-semibold mb-2">
            Filtrar por{" "}
            {String(filtroActivo).charAt(0).toUpperCase() +
              String(filtroActivo).slice(1)}
          </div>
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
      )}

      {/* Botones inferiores */}
      <div className="flex justify-center gap-8 mt-8">
        <button
          onClick={() => navigate("/crearlote")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold"
        >
          Crear lote
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
          Exportar
        </button>
      </div>
    </LayoutAgronomo>
  );
};

export default Gestion_lotes_agro;

