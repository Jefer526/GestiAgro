// src/pages/agronomo/Gestion_lotes_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconFilter,
  IconDotsVertical,
  IconFileText,
  IconBan,
  IconPlus,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Gestion_lotes_agro = () => {
  const navigate = useNavigate();

  const filtroRef = useRef(null);
  const [lotes, setLotes] = useState([
    {
      finca: "La Esmeralda",
      lote: "1",
      area_bruta: "3.0 ha",
      area_neta: "2.5 ha",
      cultivo: "Macadamia",
      variedad: "Integrifolia",
      estado: "Activo",
    },
    {
      finca: "Las Palmas",
      lote: "2",
      area_bruta: "2.5 ha",
      area_neta: "2.0 ha",
      cultivo: "Aguacate",
      variedad: "Hass",
      estado: "Inactivo",
    },
  ]);

  const columnas = [
    { key: "finca", label: "Nombre Finca" },
    { key: "lote", label: "Lote" },
    { key: "area_bruta", label: "Área bruta" },
    { key: "area_neta", label: "Área neta" },
    { key: "cultivo", label: "Cultivo" },
    { key: "variedad", label: "Variedad" },
    { key: "estado", label: "Estado" },
  ];

  const [filtroActivo, setFiltroActivo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [posicionTarjeta, setPosicionTarjeta] = useState({});
  const [visibleTarjeta, setVisibleTarjeta] = useState(null);

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setPosicionTarjeta({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [
      ...new Set(lotes.map((l) => l[campo]?.toString())),
    ].filter((v) => v?.toLowerCase().includes(search));
  };

  const datosFiltrados = lotes
    .filter((item) =>
      columnas.every((col) =>
        !valoresSeleccionados[col.key] ||
        valoresSeleccionados[col.key].length === 0
          ? true
          : valoresSeleccionados[col.key].includes(item[col.key]?.toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

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

  const mostrarTarjeta = (idx, e) => {
    const boton = e.currentTarget.getBoundingClientRect();
    setVisibleTarjeta(idx);
    setPosicionTarjeta({
      top: boton.bottom + window.scrollY + 4,
      left: boton.left + window.scrollX,
    });
  };

  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
        setVisibleTarjeta(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  return (
    <LayoutAgronomo>
      <div className="p-10">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">
            Gestión de Lotes
          </h1>
          <button
            onClick={() => navigate("/crearlote")}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <IconPlus className="w-5 h-5" /> Crear Lote
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col.label}</span>
                      <button onClick={(e) => toggleFiltro(col.key, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="p-4 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((lote, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 border">{lote.finca}</td>
                  <td className="p-4 border">{lote.lote}</td>
                  <td className="p-4 border">{lote.area_bruta}</td>
                  <td className="p-4 border">{lote.area_neta}</td>
                  <td className="p-4 border">{lote.cultivo}</td>
                  <td className="p-4 border">{lote.variedad}</td>
                  {/* ✅ Estado con badge de colores */}
                  <td className="p-4 border">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lote.estado === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lote.estado}
                    </span>
                  </td>
                  <td className="p-4 border">
                    <button onClick={(e) => mostrarTarjeta(idx, e)}>
                      <IconDotsVertical className="w-5 h-5" />
                    </button>
                    {visibleTarjeta === idx && (
                      <div
                        ref={filtroRef}
                        className="fixed bg-white border shadow-lg rounded-md z-50 w-44 py-2"
                        style={{
                          top: posicionTarjeta.top,
                          left: posicionTarjeta.left,
                        }}
                      >
                        {/* 📄 Detalles */}
                        <div
                          onClick={() =>
                            navigate("/detalleslote", { state: { lote } })
                          }
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-blue-600 gap-2"
                        >
                          <IconFileText className="w-4 h-4" />
                          <span>Detalles</span>
                        </div>

                        {/* 🚫 Inactivar */}
                        <div
                          onClick={() =>
                            setLotes((prev) =>
                              prev.map((l, i) =>
                                i === idx ? { ...l, estado: "Inactivo" } : l
                              )
                            )
                          }
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-600 gap-2"
                        >
                          <IconBan className="w-4 h-4" />
                          <span>Inactivar</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtro */}
          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{
                top: posicionTarjeta.top,
                left: posicionTarjeta.left,
              }}
            >
              <div className="font-semibold mb-2 capitalize">
                Filtrar por {filtroActivo}
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                value={busquedas[filtroActivo] || ""}
                onChange={(e) =>
                  setBusquedas({ ...busquedas, [filtroActivo]: e.target.value })
                }
                className="w-full px-2 py-1 border rounded mb-2 text-sm"
              />
              <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
                {getValoresUnicos(filtroActivo).map((val, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-green-600"
                      checked={
                        (valoresSeleccionados[filtroActivo] || []).includes(val)
                      }
                      onChange={() => toggleValor(filtroActivo, val)}
                    />
                    {val}
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
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Gestion_lotes_agro;
