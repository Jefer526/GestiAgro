import React, { useState, useRef, useEffect } from "react";
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
import faviconBlanco from "../../assets/favicon-blanco.png";

const Equipos_mayor = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const tarjetaRef = useRef(null);

  const maquinas = [
    { id: 1, maquina: "Tractor", referencia: "JD 5055", ubicacion: "La Esmeralda", estado: "Óptimo" },
    { id: 2, maquina: "Guadaña", referencia: "Stihl MS 450", ubicacion: "Las Palmas", estado: "Mantenimiento" },
    { id: 3, maquina: "Podadora", referencia: "Stihl BR 130", ubicacion: "La Carolina", estado: "Averiado" },
  ];

  const campos = ["id", "maquina", "referencia", "ubicacion", "estado"];

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
    return [...new Set(maquinas.map((d) => d[campo]))].filter((v) =>
      String(v).toLowerCase().includes(search)
    );
  };

  const maquinasFiltradas = maquinas
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

  useEffect(() => {
    const handler = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#f6f6f6]">
      {/* Sidebar con favicon fijo y scroll en íconos */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col justify-between">
        
        {/* Favicon fijo */}
        <div className="pt-6 flex justify-center">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
        </div>

        {/* Íconos con scroll */}
        <div className="flex-1 flex flex-col items-center space-y-8 mt-6 overflow-y-auto scrollbar-hide-only">
          <button onClick={() => navigate("/homemayordomo")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/historial_labores")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/bodega_insumos")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconBox className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/variables_climaticasm")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/informes_mayordomo")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          {/* Icono activo */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button className="hover:bg-white/10 p-2 rounded-lg transition">
              <IconTractor className="text-white w-11 h-11" />
            </button>
          </div>

          

          {/* Nuevos iconos */}
          <button onClick={() => navigate("/produccion_mayor")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconPlant2 className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/cuaderno_campom")} className="hover:bg-white/10 p-2 rounded-lg transition">
            <IconBook className="text-white w-11 h-11" />
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
              className="absolute bottom-16 left-14 w-52 bg-white/95 backdrop-blur border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-[10000]"
            >
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/ajustesmayordomo"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" />
                Ajustes
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/soportemayordomo"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconTool className="w-5 h-5 mr-2 text-green-600" />
                Soporte
              </button>
              <button
                onClick={() => { setMostrarTarjeta(false); navigate("/login"); }}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido principal desplazado (evita quedar debajo del sidebar) */}
      <main className="ml-28 min-h-[100dvh] p-10 overflow-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Maquinaria y Equipos</h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-center text-base bg-white">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {campos.map((campo, i) => (
                  <th key={i} className="p-4 border text-center">
                    <div className="flex items-center justify-center gap-2">
                      {campo.toUpperCase()}
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="p-4 border text-center">HOJA DE VIDA</th>
                <th className="p-4 border text-center">HISTORIAL DE TRABAJO</th>
              </tr>
            </thead>
            <tbody>
              {maquinasFiltradas.map((m) => (
                <tr key={m.id} className="hover:bg-gray-100">
                  {campos.map((campo, j) => (
                    <td key={j} className="p-4 border text-center">{m[campo]}</td>
                  ))}
                  <td className="p-4 border text-center">
                    <button
                      onClick={() => navigate("/hoja_vidam", { state: { maquina: m } })}
                      className="bg-blue-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
                    >
                      Ver
                    </button>
                  </td>
                  <td className="p-4 border text-center">
                    <button
                      onClick={() => navigate("/historial_trabajom")}
                      className="bg-blue-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
                    >
                      Ver
                    </button>
                  </td>
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
              Filtrar por {String(filtroActivo).charAt(0).toUpperCase() + String(filtroActivo).slice(1)}
            </div>
            <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1">
              <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
            </button>
            <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2">
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
            <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">
              Borrar filtro
            </button>
          </div>
        )}

        <div className="flex justify-center gap-8 mt-8">
          <button onClick={() => navigate("/registrar_novedadm")} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Registrar novedad
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Exportar
          </button>
        </div>
      </main>
    </div>
  );
};

export default Equipos_mayor;


