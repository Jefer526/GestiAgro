// src/pages/agronomo/Maquinaria_equipos.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconSettings,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Maquinaria_equipos = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const columnas = ["id", "maquina", "referencia", "ubicacion", "estado"];

  const maquinas = [
    { id: 1, maquina: "Tractor", referencia: "JD 5055", ubicacion: "La Esmeralda", estado: "Óptimo" },
    { id: 2, maquina: "Guadaña", referencia: "Stihl MS 450", ubicacion: "Las Palmas", estado: "Mantenimiento" },
    { id: 3, maquina: "Podadora", referencia: "Stihl BR 130", ubicacion: "La Carolina", estado: "Averiado" },
  ];

  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(maquinas.map(e => e[campo]?.toString()))].filter(v =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX
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

  const datosFiltrados = maquinas
    .filter(item =>
      columnas.every(campo =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo]?.toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
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

   return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconHome className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Laboresagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconClipboardList className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Informesagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:bg-white/10 p-2 rounded-lg"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:bg-white/10 p-2 rounded-lg"><IconTractor className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:bg-white/10 p-2 rounded-lg"><IconUsersGroup className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearfinca")} className="hover:bg-white/10 p-2 rounded-lg"><IconPlant className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearlote")} className="hover:bg-white/10 p-2 rounded-lg"><IconFrame className="text-white w-11 h-11" /></button>
        </div>
        <div className="sticky bottom-6">
          <button onClick={() => navigate("/ajustes")} className="hover:bg-white/10 p-2 rounded-lg"><IconSettings className="text-white w-11 h-11" /></button>
        </div>
      </div>

      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Maquinaria y Equipos</h1>

        {/* CONTENEDOR DE LA TABLA */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative">
          <table className="min-w-full text-base bg-white">
            <thead className="bg-green-600 text-white font-bold text-center">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="p-4 border">HOJA DE VIDA</th>
                <th className="p-4 border">HISTORIAL DE TRABAJO</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {datosFiltrados.map((m) => (
                <tr key={m.id} className="hover:bg-gray-100">
                  <td className="p-4 border">{m.id}</td>
                  <td className="p-4 border">{m.maquina}</td>
                  <td className="p-4 border">{m.referencia}</td>
                  <td className="p-4 border">{m.ubicacion}</td>
                  <td className="p-4 border">{m.estado}</td>
                  <td className="p-4 border">
                    <button onClick={() => navigate("/hojadevida", { state: { maquina: m } })}
                      className="bg-blue-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
                      Ver
                    </button>
                  </td>
                  <td className="p-4 border">
                    <button onClick={() => navigate("/historialtrabajo")}
                      className="bg-blue-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}</div>
              <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1 capitalize">
                <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
              </button>
              <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2 capitalize">
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
                  <label key={idx} className="flex items-center gap-2 mb-1 capitalize">
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
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs capitalize mt-2">
                Borrar filtro
              </button>
            </div>
          )}
        </div> 

        <div className="flex justify-center gap-6 mt-10 mb-8">
          <button
            onClick={() => navigate("/registrarmaquina")}
            className="bg-green-600 text-white px-7 py-2.5 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            Registrar nueva máquina
          </button>
          <button
            className="bg-green-600 text-white px-7 py-2.5 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            Exportar
          </button>
          <button
            onClick={() => navigate("/actualizarmaquina")}
            className="bg-green-600 text-white px-7 py-2.5 rounded-lg hover:bg-green-700 text-lg font-semibold"
          >
            Actualizar estado
          </button>
        </div>
      </div>
    </div>
  );
};

export default Maquinaria_equipos;


