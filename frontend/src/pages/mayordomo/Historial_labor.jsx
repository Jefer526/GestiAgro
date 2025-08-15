import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconTool,
  IconLogout,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconPlant2,
  IconBook
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Historial_labor = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [expandido, setExpandido] = useState(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const datos = [
    { fecha: "19/06/2025", labor: "Siembra", finca: "La Esmeralda", lote: 1, trabajador: "Camilo Restrepo", jornal: 1, ejecucion: 500, um: "Árboles", observacion: "El trabajador realizó la siembra en condiciones óptimas, cumpliendo con los estándares establecidos y sin contratiempos." },
    { fecha: "19/06/2025", labor: "Siembra", finca: "La Esmeralda", lote: 1, trabajador: "Laura Méndez", jornal: 1, ejecucion: 300, um: "Árboles", observacion: "Se completó la siembra sin novedades importantes." },
    { fecha: "20/06/2025", labor: "Guadaña Mecánica", finca: "La Esmeralda", lote: 2, trabajador: "Valentina Mora", jornal: 0.5, ejecucion: 2, um: "HAS", observacion: "El área fue guadañada parcialmente debido a condiciones climáticas." },
    { fecha: "20/06/2025", labor: "Riego", finca: "La Esmeralda", lote: 2, trabajador: "Pedro Ramírez", jornal: 1, ejecucion: 3, um: "HAS", observacion: "El riego se realizó completamente sin fallas técnicas." },
    { fecha: "21/06/2025", labor: "Fertilización", finca: "La Esmeralda", lote: 1, trabajador: "Sofía Gómez", jornal: 1, ejecucion: 400, um: "Árboles", observacion: "Aplicación de fertilizante NPK según recomendación técnica." },
  ];

  const campos = ["fecha", "labor", "finca", "lote", "trabajador", "jornal", "ejecucion", "um"];

  const toggleExpandido = (index) => setExpandido(expandido === index ? null : index);

  const toggleFiltro = (campo, event) => {
    const icono = event.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({ top: icono.bottom + window.scrollY + 4, left: icono.left + window.scrollX });
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

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  const handleBusqueda = (campo, texto) => setBusquedas({ ...busquedas, [campo]: texto });

  const datosFiltrados = datos
    .filter((d) => campos.every((campo) =>
      !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
        ? true
        : valoresSeleccionados[campo].includes(d[campo])
    ))
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? String(a[campo]).localeCompare(String(b[campo]))
        : String(b[campo]).localeCompare(String(a[campo]));
    });

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Sidebar con favicon fijo y scroll en iconos */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between">
        {/* Favicon fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos con scroll y scrollbar oculto */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          <button onClick={() => navigate("/homemayordomo")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>

          {/* Icono activo con indicador */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:bg-white/10 p-2 rounded-lg">
              <IconHistory className="text-white w-11 h-11" />
            </button>
          </div>
          <button onClick={() => navigate("/cuaderno_campom")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconBook className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/produccion_mayor")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant2 className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variables_climaticasm")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/equipos_mayordomo")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconTractor className="text-white w-11 h-11" />
          </button>
          
        </div>


        {/* Perfil fijo abajo */}
        <div className="relative mb-6 flex justify-center">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>

          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button onClick={() => { setMostrarTarjeta(false); navigate("/login"); }} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="ml-28 p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Historial labores finca: La Esmeralda</h1>
        <div className="bg-white border border-gray-300 rounded-xl overflow-auto">
          <table className="w-full text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                {campos.map((campo, i) => (
                  <th key={i} className="px-4 py-3 border-r text-center align-middle">
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
                <tr key={i} className="border-b border-gray-200 text-center align-middle">
                  {campos.map((campo, j) => (
                    <td key={j} className="px-4 py-2 border-r text-center align-middle">{d[campo]}</td>
                  ))}
                  <td className="px-4 py-2 text-blue-500 font-semibold text-left align-middle">
                    <span>{expandido === i ? d.observacion : `${d.observacion.substring(0, 50)}...`}</span>
                    <button onClick={() => toggleExpandido(i)} className="ml-2 underline hover:text-green-800">
                      {expandido === i ? "Ocultar" : "Ver"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Historial_labor;

