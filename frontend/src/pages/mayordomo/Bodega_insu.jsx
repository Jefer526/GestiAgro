// src/pages/mayordomo/Bodega_insu.jsx
import {
    IconHome,
    IconClipboardList,
    IconHistory,
    IconChartBar,
    IconBox,
    IconCloudRain,
    IconTractor,
    IconSettings,
    IconEye,
    IconFilter,
    IconSortAscending2,
    IconSortDescending2,
  } from "@tabler/icons-react";
  import { useNavigate } from "react-router-dom";
  import faviconBlanco from "../../assets/favicon-blanco.png";
  import { useRef, useEffect, useState } from "react";
  
  const Bodega_insu = () => {
    const navigate = useNavigate();
    const filtroRef = useRef(null);
    const [filtroActivo, setFiltroActivo] = useState(null);
    const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
    const [busquedas, setBusquedas] = useState({});
    const [valoresSeleccionados, setValoresSeleccionados] = useState({});
    const [ordenCampo, setOrdenCampo] = useState(null);
  
    const datos = [
      { categoria: "Fertilizante", producto: "Urea", ingrediente: "Nitrogeno 46%", cantidad: 300, um: "Kg" },
      { categoria: "Insecticida", producto: "Galeon", ingrediente: "Tiametoxam", cantidad: 5, um: "Lt" },
      { categoria: "Fungicida", producto: "Zellus", ingrediente: "Benomyll", cantidad: 0.2, um: "Lt" },
    ];
  
    const campos = ["categoria", "producto", "ingrediente", "cantidad", "um"];
  
    const getValoresUnicos = (campo) => {
      const search = (busquedas[campo] || "").toLowerCase();
      return [...new Set(datos.map((d) => d[campo]))].filter((v) =>
        String(v).toLowerCase().includes(search)
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
          <div className="flex flex-col items-center space-y-8">
            <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
            <button onClick={() => navigate("/homemayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconHome className="text-white w-11 h-11" /></button>
            <button onClick={() => navigate("/registrolabores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconClipboardList className="text-white w-11 h-11" /></button>
            <button onClick={() => navigate("/historial_labores")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconHistory className="text-white w-11 h-11" /></button>
            <div className="relative w-full flex justify-center">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
              <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconBox className="text-white w-11 h-11" /></button>
            </div>
            <button onClick={() => navigate("/variables_climaticasm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconCloudRain className="text-white w-11 h-11" /></button>
            <button onClick={() => navigate("/informes_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconChartBar className="text-white w-11 h-11" /></button>
            <button onClick={() => navigate("/equipos_mayordomo")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"><IconTractor className="text-white w-11 h-11" /></button>
          </div>
          <div className="mb-6">
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconSettings className="text-white w-11 h-11" />
            </button>
          </div>
        </div>
  
        {/* Contenido */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Bodega de insumos</h1>
  
          <div className="bg-white border border-gray-300 rounded-xl overflow-auto">
            <table className="w-full text-center text-base">
              <thead className="bg-green-600 text-white">
                <tr>
                  {campos.map((campo, i) => (
                    <th key={i} className="px-4 py-3 border-r text-center">
                      <div className="flex items-center justify-center gap-2">
                        {campo.toUpperCase()}
                        <button onClick={(e) => toggleFiltro(campo, e)}>
                          <IconFilter className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center">DETALLE</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.map((d, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    {campos.map((campo, j) => (
                      <td key={j} className="px-4 py-2 border-r text-center">{d[campo]}</td>
                    ))}
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => navigate("/detalle_producto")}
                        className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center"
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
  
          <div className="flex justify-center gap-20 mt-10">
            <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
              Exportar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Bodega_insu;
  