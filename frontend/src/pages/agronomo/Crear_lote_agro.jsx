// src/pages/agronomo/Crear_lote_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconHome, IconClipboardList, IconChartBar, IconCloudRain,
  IconTractor, IconSettings, IconBox, IconUsersGroup, IconPlant,
  IconFrame, IconDotsVertical, IconFilter, IconPencil, IconTrash
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Crear_lote_agro = () => {
  const navigate = useNavigate();
  const [lotes, setLotes] = useState([
    { finca: "La Esmeralda", lote: "1", coordenadas: "2.42,-75.20", area: "3 ha", cultivo: "Macadamia" },
    { finca: "Las Palmas", lote: "2", coordenadas: "2.45,-75.22", area: "2.5 ha", cultivo: "Aguacate" },
  ]);
  const [formData, setFormData] = useState({ finca: "", lote: "", coordenadas: "", area: "", cultivo: "" });
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [posicionTarjeta, setPosicionTarjeta] = useState({});
  const [visibleTarjeta, setVisibleTarjeta] = useState(null);
  const filtroRef = useRef(null);
  const columnas = ["finca", "lote", "coordenadas", "area", "cultivo"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const agregarLote = () => {
    if (!formData.finca || !formData.lote || !formData.coordenadas || !formData.area || !formData.cultivo) return;
    setLotes([...lotes, { ...formData }]);
    setFormData({ finca: "", lote: "", coordenadas: "", area: "", cultivo: "" });
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setPosicionTarjeta({ top: icono.bottom + window.scrollY + 4, left: icono.left + window.scrollX });
  };

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(lotes.map(e => e[campo]?.toString()))].filter(v => v.toLowerCase().includes(search));
  };

  const datosFiltrados = lotes
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

  const mostrarTarjeta = (idx, e) => {
    const boton = e.currentTarget.getBoundingClientRect();
    setVisibleTarjeta(idx);
    setPosicionTarjeta({ top: boton.bottom + window.scrollY + 4, left: boton.left + window.scrollX });
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

      {/* Contenido */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Crear lote</h1>

        {/* Formulario */}
        <div className="bg-white border border-gray-200 shadow-gray-300 p-6 rounded-lg shadow-md mb-10 max-w-5xl">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-bold block mb-1">Finca</label>
              <input name="finca" value={formData.finca} onChange={handleChange} placeholder="Nombre finca" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1">Número de lote</label>
              <input name="lote" value={formData.lote} onChange={handleChange} placeholder="Número" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1">Coordenadas</label>
              <input name="coordenadas" value={formData.coordenadas} onChange={handleChange} placeholder="Coordenadas" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1">Área lote</label>
              <input name="area" value={formData.area} onChange={handleChange} placeholder="Área" className="w-full p-2 border rounded" />
            </div>
            <div className="col-span-1">
              <label className="font-bold block mb-1">Cultivo</label>
              <input name="cultivo" value={formData.cultivo} onChange={handleChange} placeholder="Tipo cultivo" className="w-full p-2 border rounded" />
            </div>
          </div>
          <button onClick={agregarLote} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Crear lote</button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}><IconFilter className="w-4 h-4" /></button>
                    </div>
                  </th>
                ))}
                <th className="p-4 border">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((lote, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 border">{lote.finca}</td>
                  <td className="p-4 border">{lote.lote}</td>
                  <td className="p-4 border">{lote.coordenadas}</td>
                  <td className="p-4 border">{lote.area}</td>
                  <td className="p-4 border">{lote.cultivo}</td>
                  <td className="p-4 border">
                    <button onClick={(e) => mostrarTarjeta(idx, e)}>
                      <IconDotsVertical className="w-5 h-5" />
                    </button>
                    {visibleTarjeta === idx && (
                      <div ref={filtroRef} className="fixed bg-white border shadow-md p-3 rounded z-50 w-40 text-sm" style={{ top: posicionTarjeta.top, left: posicionTarjeta.left }}>
                        <div
                          onClick={() => navigate("/editarlote", { state: lote })}
                          className="flex items-center gap-2 text-blue-600 hover:text-green-600 cursor-pointer mb-2">
                          <IconPencil className="w-4 h-4" />
                          <span>Editar</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer">
                          <IconTrash className="w-4 h-4" />
                          <span>Eliminar</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtro emergente */}
          {filtroActivo && (
            <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm" style={{ top: posicionTarjeta.top, left: posicionTarjeta.left }}>
              <div className="font-semibold mb-2">Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}</div>
              <input type="text" placeholder="Buscar..." className="w-full border px-2 py-1 rounded mb-2" value={busquedas[filtroActivo] || ""} onChange={(e) => setBusquedas({ ...busquedas, [filtroActivo]: e.target.value })} />
              <div className="flex flex-col max-h-40 overflow-y-auto">
                {getValoresUnicos(filtroActivo).map((val, i) => (
                  <label key={i} className="flex items-center gap-2 mb-1 capitalize">
                    <input type="checkbox" className="accent-green-600" checked={(valoresSeleccionados[filtroActivo] || []).includes(val)} onChange={() => toggleValor(filtroActivo, val)} />
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">Borrar filtro</button>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
        <button className="bg-green-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-green-700 font-bold">
            Guardar cambios
        </button>
        </div>
      </div>
    </div>
  );
};

export default Crear_lote_agro;

