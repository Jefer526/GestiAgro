// src/pages/mayordomo/Bodega_insu.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconEye,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";

const Bodega_insu = () => {
  const navigate = useNavigate();

  /* ----------------------------------
     📌 DATOS Y FILTROS TABLA
  ---------------------------------- */
  const datos = [
    { categoria: "Fertilizante", producto: "Urea", ingrediente: "Nitrogeno 46%", cantidad: 300, um: "Kg" },
    { categoria: "Insecticida", producto: "Galeon", ingrediente: "Tiametoxam", cantidad: 5, um: "Lt" },
    { categoria: "Fungicida", producto: "Zellus", ingrediente: "Benomyll", cantidad: 0.2, um: "Lt" },
  ];

  const columnas = ["categoria", "producto", "ingrediente", "cantidad", "um"];
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const filtroRef = useRef(null);

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(datos.map((e) => e[campo].toString()))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

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

  const datosFiltrados = datos
    .filter((item) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo].toString())
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
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  /* ----------------------------------
     📌 RENDER
  ---------------------------------- */
  return (
    <LayoutMayordomo titulo="Bodega de insumos">
      {/* Selector de finca */}
      <div className="mb-6 max-w-md">
        <label className="block font-semibold mb-2 text-lg">Finca</label>
        <select className="border border-gray-400 rounded-md p-2 w-full text-lg">
          <option>La Esmeralda</option>
          <option>Las Palmas</option>
          <option>La Carolina</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gray-300 rounded-xl overflow-auto relative">
        <table className="w-full text-base text-center">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {columnas.map((col, idx) => (
                <th key={idx} className="px-4 py-3 border border-gray-300">
                  <div className="flex items-center gap-2 justify-center">
                    {col.toUpperCase()}
                    <button onClick={(e) => toggleFiltro(col, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 border border-gray-300">DETALLE</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((d, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="px-4 py-2 border">{d.categoria}</td>
                <td className="px-4 py-2 border">{d.producto}</td>
                <td className="px-4 py-2 border">{d.ingrediente}</td>
                <td className="px-4 py-2 border">{d.cantidad}</td>
                <td className="px-4 py-2 border">{d.um}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => navigate("/detalle_producto")}
                    className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center mx-auto"
                  >
                    <IconEye className="w-4 h-4" /> Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Panel de filtro */}
        {filtroActivo && (
          <div
            ref={filtroRef}
            className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
            style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
          >
            <div className="font-semibold mb-2">
              Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
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
                  {val.charAt(0).toUpperCase() + val.slice(1)}
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

      {/* Botones acción */}
      <div className="flex justify-center gap-20 mt-10">
        <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
          Exportar
        </button>
      </div>
    </LayoutMayordomo>
  );
};

export default Bodega_insu;
