import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconBox,
  IconEye,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Labores_agro = () => {
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
    const handleClickOutside = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
            <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
              <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
                <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
      
                <button
                  className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                  onClick={() => navigate("/homeagro")}>
                  <IconHome className="text-white w-11 h-11" />
                </button>
      
                <button
                  className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                  onClick={() => navigate("/laboresagro")}>
                  <IconClipboardList className="text-white w-11 h-11" />
                </button>
      
                <div className="relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />

                  <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                  onClick={() => navigate("/Informesagro")}>
                    <IconChartBar className="text-white w-11 h-11" />
                  </button>
                </div>
      
                 <button
                   className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                   onClick={() => navigate("/Bodegaagro")}>
                   <IconBox className="text-white w-11 h-11" />
                 </button>
      
                <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                  onClick={() => navigate("/variablesclimaticas")}>
                  <IconCloudRain className="text-white w-11 h-11" />
                </button>
      
                <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                onClick={() => navigate("/maquinariaequipos")}>
                  <IconTractor className="text-white w-11 h-11" />
                </button>

                <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                onClick={() => navigate("/manejopersonal")}>
                  <IconUsersGroup className="text-white w-11 h-11" />
                </button>

                <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                 onClick={() => navigate("/crearfinca")}>
                  <IconPlant className="text-white w-11 h-11" />
                </button>

                <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                 onClick={() => navigate("/crearlote")}>
                  <IconFrame className="text-white w-11 h-11" />
                </button>
                
              </div>
              <div className="sticky bottom-6 bg-green-600">
                <button
                  onClick={() => navigate("/ajustes")}
                  className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                >
                  <IconSettings className="text-white w-11 h-11" />
                </button>
              </div>
            </div>

      {/* Contenido principal */}
      <div className="flex-1 p-12">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Seguimiento labores</h1>

        <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-[16px] text-center relative">
            <thead className="bg-green-600 text-white">
              <tr>
                {campos.map((campo, i) => (
                  <th key={i} className="px-3 py-2 font-bold border relative">
                    <div className="flex items-center justify-center gap-2">
                      <span className="uppercase">{campo}</span>
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="px-3 py-2 font-bold border uppercase">avance</th>
                <th className="px-3 py-2 font-bold border uppercase">detalle</th>
              </tr>
            </thead>
            <tbody>
              {laboresFiltradas.map((l, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{l.semana}</td>
                  <td className="px-3 py-2 border">{l.finca}</td>
                  <td className="px-3 py-2 border">{l.labor}</td>
                  <td className="px-3 py-2 border">{l.lote}</td>
                  <td className="px-3 py-2 border">{l.estado}</td>
                  <td className="px-3 py-2 border w-[250px]">
                    <div className="flex items-center justify-center gap-2">
                      <span className="whitespace-nowrap">{l.unidad}</span>
                      <div className="flex-1 bg-gray-200 h-2 rounded overflow-hidden">
                        <div className="bg-green-600 h-2" style={{ width: `${l.avance}%` }} />
                      </div>
                      <span>{l.avance}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 border">
                    <button
                      onClick={() => navigate("/historial", { state: { laborData: l } })}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-200 transition justify-center"
                    >
                      <IconEye className="w-4 h-4" />
                      Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtroActivo && (
          <div
            ref={filtroRef}
            className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
            style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
          >
            <div className="font-semibold mb-2">
              Filtrar por {String(filtroActivo).charAt(0).toUpperCase() + String(filtroActivo).slice(1)}
            </div>
            <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1">
              <IconSortAscending2 className="w-4 h-4" />
              Ordenar A → Z
            </button>
            <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2">
              <IconSortDescending2 className="w-4 h-4" />
              Ordenar Z → A
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
            <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">
              Borrar filtro
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Labores_agro;















