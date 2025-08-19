// src/pages/mayordomo/Seguimiento_laboresm.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconEye,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Seguimiento_laboresm = () => {
  const navigate = useNavigate();

  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const filtroRef = useRef(null);

  const labores = [
    { semana: 22, finca: "La Esmeralda", labor: "Siembra", lote: "Lote 1", estado: "En progreso", avance: 50, unidad: "220 Árboles" },
    { semana: 22, finca: "Las Palmas", labor: "Desyerba guadaña", lote: "Lote 2", estado: "Completada", avance: 100, unidad: "3 Has" },
    { semana: 22, finca: "La Carolina", labor: "Recolección", lote: "Lote 3", estado: "Programada", avance: 0, unidad: "0 Kg" },
    { semana: 22, finca: "El Paraíso", labor: "Siembra", lote: "Lote 1", estado: "En revisión", avance: 20, unidad: "50 Árboles" },
  ];

  const campos = ["semana", "finca", "labor", "lote", "estado"];

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(labores.map(l => l[campo]))].filter(v =>
      v.toString().toLowerCase().includes(search)
    );
  };

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

  const laboresFiltradas = labores
    .filter((l) =>
      campos.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(l[campo])
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo].toString().localeCompare(b[campo].toString())
        : b[campo].toString().localeCompare(a[campo].toString());
    });

  useEffect(() => {
    const handleClickOutsideFiltro = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideFiltro);
    return () => document.removeEventListener("mousedown", handleClickOutsideFiltro);
  }, []);

  return (
      <LayoutMayordomo>
        {/* ✅ Título */}
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Seguimiento de Labores
        </h1>
    
        {/* ✅ Tabla */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-auto relative">
          <table className="w-full text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                {campos.map((campo, i) => (
                  <th key={i} className="px-4 py-3 border text-center uppercase">
                    <div className="flex items-center justify-center gap-2">
                      <span>{campo}</span>
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 border text-center uppercase">Avance</th>
                <th className="px-4 py-3 border text-center uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {laboresFiltradas.map((l, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 text-center align-middle hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 border">{l.semana}</td>
                  <td className="px-4 py-2 border">{l.finca}</td>
                  <td className="px-4 py-2 border">{l.labor}</td>
                  <td className="px-4 py-2 border">{l.lote}</td>
                  <td className="px-4 py-2 border">{l.estado}</td>
                  <td className="px-4 py-2 border w-[280px]">
                    <div className="flex items-center justify-center gap-2">
                      <span className="whitespace-nowrap text-sm">{l.unidad}</span>
                      <div className="flex-1 bg-gray-200 h-2 rounded overflow-hidden">
                        <div
                          className="bg-green-600 h-2"
                          style={{ width: `${l.avance}%` }}
                        />
                      </div>
                      <span className="text-sm">{l.avance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() =>
                        navigate("/detalle_registrolaborm", { state: { laborData: l } })
                      }
                      className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center mx-auto hover:bg-blue-200 transition"
                    >
                      <IconEye className="w-4 h-4" /> Detalle
                    </button>
                  </td>
                </tr>
              ))}
              {laboresFiltradas.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-gray-500 text-center">
                    Sin registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </LayoutMayordomo>
    );
    
};

export default Seguimiento_laboresm;
