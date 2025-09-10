import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconChevronLeft,
  IconFilter,
  IconPlus,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { equiposApi, laboresMaquinariaApi, getMe } from "../../services/apiClient";

const Historial_trabajom = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id de la máquina
  const filtroRef = useRef(null);

  const [maquina, setMaquina] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [finca, setFinca] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la máquina actual
        const resMaquina = await equiposApi.get(id);
        setMaquina(resMaquina.data);

        // Traer SOLO las labores de esta máquina
        const resLabores = await laboresMaquinariaApi.list({ maquina: id });

        const mapped = resLabores.data.map((l) => {
          const horasMaquina = Math.abs(l.horometro_fin - l.horometro_inicio);
          return {
            fecha: new Date(l.fecha).toISOString().split("T")[0],
            labor: l.labor,
            "horómetro inicio": l.horometro_inicio,
            "horómetro fin": l.horometro_fin,
            "horas máquina": `${horasMaquina} horas`,
            observaciones: l.observaciones || "—",
          };
        });
        setHistorial(mapped);
      } catch (err) {
        console.error("❌ Error cargando datos:", err.response?.data || err);
      }
    };
    fetchData();
  }, [id]);

  // Obtener finca asignada
  useEffect(() => {
    const fetchFinca = async () => {
      try {
        const resUser = await getMe();
        setFinca(resUser.data.finca_asignada || null);
      } catch (err) {
        console.error("❌ Error cargando finca asignada:", err);
      }
    };
    fetchFinca();
  }, []);

  const columnas = [
    "fecha",
    "labor",
    "horómetro inicio",
    "horómetro fin",
    "horas máquina",
    "observaciones",
  ];

  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState({ campo: "fecha", orden: "desc" });

  const getValoresUnicos = (campo) => {
    if (campo === "observaciones") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historial.map((e) => String(e[campo] || "")))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    if (campo === "observaciones") return;
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  const toggleValor = (campo, valor, hijos = []) => {
    let seleccionados = new Set(valoresSeleccionados[campo] || []);
    if (hijos.length > 0) {
      const todosIncluidos = hijos.every((h) => seleccionados.has(h));
      if (todosIncluidos) {
        hijos.forEach((h) => seleccionados.delete(h));
      } else {
        hijos.forEach((h) => seleccionados.add(h));
      }
    } else if (valor) {
      if (seleccionados.has(valor)) seleccionados.delete(valor);
      else seleccionados.add(valor);
    }
    setValoresSeleccionados({ ...valoresSeleccionados, [campo]: [...seleccionados] });
  };

  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  const historialFiltrado = historial
    .filter((item) =>
      columnas.every((campo) => {
        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;
        return seleccionados.includes(String(item[campo]));
      })
    )
    .sort((a, b) => {
      const { campo, orden } = ordenCampo || {};
      if (!campo) return 0;
      if (campo === "fecha") {
        const fechaA = new Date(a[campo]);
        const fechaB = new Date(b[campo]);
        return orden === "asc" ? fechaA - fechaB : fechaB - fechaA;
      }
      return orden === "asc"
        ? String(a[campo]).localeCompare(String(b[campo]))
        : String(b[campo]).localeCompare(String(a[campo]));
    });

  // Formato DD/MM/YYYY
  const formatFecha = (isoDate) => {
    if (!isoDate) return "—";
    const [y, m, d] = isoDate.split("-");
    return `${d}/${m}/${y}`;
  };

  // Cerrar al hacer click fuera
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
    <LayoutMayordomo ocultarEncabezado>
      {/* Volver */}
      <button
        onClick={() => navigate("/equipos_mayordomo")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-6 h-6 mr-1" /> Volver
      </button>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Historial de trabajo</h1>
        {finca && (
          <span className="text-2xl font-bold text-green-700">{finca.nombre}</span>
        )}
      </div>

      {/* Info general */}
      {maquina && (
        <div className="bg-white border border-gray-300 p-6 rounded-xl mb-8 max-w-4xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Información general</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <p><strong>Código Equipo:</strong> {maquina.codigo_equipo}</p>
            <p><strong>Ubicación:</strong> {maquina.ubicacion_nombre}</p>
            <p><strong>Máquina:</strong> {maquina.maquina}</p>
            <p><strong>Estado:</strong> {maquina.estado}</p>
            <p><strong>Referencia:</strong> {maquina.referencia}</p>
          </div>
        </div>
      )}

      {/* Subtítulo */}
      <h2 className="text-3xl font-bold text-green-700 mb-2">Historial de labores</h2>

      {/* Botón debajo del subtítulo */}
      {maquina && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate(`/registrarlabormaquinariam/${maquina.id}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <IconPlus className="w-5 h-5" />
            Registrar labores
          </button>
        </div>
      )}

      {/* Tabla historial */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-center text-base">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {columnas.map((col) => (
                <th key={col} className="p-4 border text-center">
                  <div className="flex justify-center items-center gap-2">
                    <span className="uppercase">{col}</span>
                    {col !== "observaciones" && (
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historialFiltrado.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100">
                {columnas.map((campo) => (
                  <td key={campo} className="p-4 border">
                    {campo === "fecha" ? formatFecha(item[campo]) : item[campo]}
                  </td>
                ))}
              </tr>
            ))}
            {historialFiltrado.length === 0 && (
              <tr>
                <td colSpan={columnas.length} className="p-4 border text-gray-500">
                  Cargando labores...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* === Filtro flotante === */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60"
          style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
        >
          <div className="font-semibold mb-2">
            Filtrar por {filtroActivo.toUpperCase()}
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
            {getValoresUnicos(filtroActivo).map((val) => (
              <label key={val} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                  onChange={() => toggleValor(filtroActivo, val)}
                  className="accent-green-600"
                />
                {String(val)}
              </label>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => limpiarFiltro(filtroActivo)}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-300 transition"
            >
              Borrar
            </button>
            <button
              onClick={() => setFiltroActivo(null)}
              className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-green-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </LayoutMayordomo>
  );
};

export default Historial_trabajom;
