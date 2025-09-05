import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconPlus,
  IconEye,
  IconFilter,
} from "@tabler/icons-react";
import LayoutMayordomo from "../../layouts/LayoutMayordomo";
import { cuadernoCampoApi, getMe } from "../../services/apiClient";

const Cuadernocampom = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  // Datos desde API
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fincaAsignada, setFincaAsignada] = useState(null);

  // Columnas con filtro
  const columnas = ["fecha", "finca", "lote"];

  // Estados de filtros
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Función para formatear fecha (dd/mm/yyyy)
  const formatFecha = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Cargar finca asignada al usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        console.log("👤 Usuario:", res.data);
        if (res.data.finca_asignada) {
          setFincaAsignada(res.data.finca_asignada);
        } else {
          console.warn("⚠️ Usuario sin finca asignada");
        }
      } catch (err) {
        console.error("❌ Error obteniendo usuario:", err);
      }
    };
    fetchUser();
  }, []);

  // Cargar registros de la finca asignada
  useEffect(() => {
    const fetchRegistros = async () => {
      if (!fincaAsignada) {
        setLoading(false);
        return;
      }
      try {
        console.log("📥 Cargando registros de la finca:", fincaAsignada);
        const res = await cuadernoCampoApi.list();
        console.log("📊 Todos los registros recibidos:", res.data);

        const registrosFinca = res.data.filter(
          (r) =>
            Number(r.finca?.id) === Number(fincaAsignada.id) ||
            Number(r.finca_id) === Number(fincaAsignada.id) ||
            r.finca_nombre === fincaAsignada.nombre
        );

        console.log("✅ Registros filtrados para la finca:", registrosFinca);
        setRegistros(registrosFinca);
      } catch (err) {
        console.error("❌ Error cargando registros:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistros();
  }, [fincaAsignada]);

  // === Popover fuera de foco ===
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  // === Funciones de filtro y orden ===
  const getValoresUnicos = (campo) => {
    if (campo === "fecha") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(registros.map((e) => e[campo]))].filter((v) =>
      String(v).toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    const ancho = 260;
    let left = icono.left + window.scrollX;
    if (left + ancho > window.innerWidth) left = window.innerWidth - ancho - 10;
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({ top: icono.bottom + window.scrollY + 4, left });
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
  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  // === Aplicar filtros y orden ===
  const registrosFiltrados = registros
    .filter((item) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo])
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? String(a[campo]).localeCompare(String(b[campo]))
        : String(b[campo]).localeCompare(String(a[campo]));
    });

  return (
    <LayoutMayordomo titulo="Cuaderno de Campo">
      {/* Botón registro */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => navigate("/registro_campom")}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 text-lg font-semibold flex items-center gap-2"
        >
          <IconPlus className="w-6 h-6" />
          Nuevo registro de campo
        </button>
      </div>

      {/* Tabla con filtros */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-auto relative">
        {loading ? (
          <p className="p-6 text-gray-500 text-center">Cargando registros...</p>
        ) : registros.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">
            No hay registros para tu finca.
          </p>
        ) : (
          <table className="w-full text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                {["fecha", "finca", "lote", "anotaciones", "acciones"].map((col, idx) => (
                  <th key={idx} className="px-4 py-3 border text-center uppercase">
                    {col === "fecha" || col === "finca" || col === "lote" ? (
                      <div className="flex justify-center items-center gap-2">
                        <span>{col}</span>
                        <button
                          onClick={(e) =>
                            toggleFiltro(
                              col === "finca" ? "finca_nombre" :
                              col === "lote" ? "lote_nombre" : col, e
                            )
                          }
                        >
                          <IconFilter className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      col
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-200 text-center align-middle hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 border">{formatFecha(r.fecha)}</td>
                  <td className="px-4 py-2 border">{r.finca?.nombre || r.finca_nombre}</td>
                  <td className="px-4 py-2 border">{r.lote?.nombre || r.lote_nombre}</td>
                  <td className="px-4 py-2 border">{r.anotaciones}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => navigate(`/detallecampom/${r.id}`, { state: r })}
                      className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 justify-center mx-auto hover:bg-blue-200 transition"
                    >
                      <IconEye className="w-4 h-4" /> Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </LayoutMayordomo>
  );
};

export default Cuadernocampom;
