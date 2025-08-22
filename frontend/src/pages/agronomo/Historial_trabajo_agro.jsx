// src/pages/agronomo/Historial_trabajo_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconChevronLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { equiposApi } from "../../services/apiClient";

const Historial_trabajo_agro = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 id de la máquina
  const filtroRef = useRef(null);

  // Datos generales de la máquina (dinámico)
  const [maquina, setMaquina] = useState(null);

  useEffect(() => {
    const fetchMaquina = async () => {
      try {
        const res = await equiposApi.get(id);
        setMaquina(res.data);
      } catch (err) {
        console.error("❌ Error cargando máquina:", err.response?.data || err);
      }
    };
    fetchMaquina();
  }, [id]);

  // Datos del historial (ejemplo estático, luego puedes traerlo de API)
  const historial = [
    {
      fecha: "2025-06-15",
      labor: "Siembra",
      "horas trabajadas": "6 horas",
      "horas maquina": "4 horas",
      observaciones: "Se limpió lote 2, clima nublado",
    },
    {
      fecha: "2025-06-15",
      labor: "Desyerba guadaña",
      "horas trabajadas": "8 horas",
      "horas maquina": "3 horas",
      observaciones: "Cuchilla se atascó temporalmente. Se solucionó",
    },
    {
      fecha: "2025-06-15",
      labor: "Recolección",
      "horas trabajadas": "4 horas",
      "horas maquina": "1 hora",
      observaciones: "Trabajo en área común. Máquina en estado óptimo",
    },
  ];

  const columnas = ["fecha", "labor", "horas trabajadas", "horas maquina", "observaciones"];

  // Filtros
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const getValoresUnicos = (campo) => {
    if (campo === "fecha" || campo === "observaciones") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historial.map((e) => e[campo]))].filter((v) =>
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

  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  const historialFiltrado = historial
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
        ? a[campo].localeCompare(b[campo])
        : b[campo].localeCompare(a[campo]);
    });

  // Cerrar al hacer click fuera
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
    <LayoutAgronomo>
      {/* Volver */}
      <button
        onClick={() => navigate("/maquinariaequipos")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-6 h-6 mr-1" /> Volver
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-6">Historial de trabajo</h1>

      {/* Info general de la máquina */}
      {maquina ? (
        <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Información general</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <p><strong>Código Equipo:</strong> {maquina.codigo_equipo}</p>
            <p><strong>Ubicación:</strong> {maquina.ubicacion_nombre}</p>
            <p><strong>Máquina:</strong> {maquina.maquina}</p>
            <p><strong>Estado:</strong> {maquina.estado}</p>
            <p><strong>Referencia:</strong> {maquina.referencia}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Cargando información de la máquina...</p>
      )}

      {/* Tabla historial */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-x-auto relative">
        <table className="w-full text-base text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {columnas.map((col, idx) => (
                <th key={idx} className="px-4 py-4 font-bold border">
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
              <tr key={i} className="border-t hover:bg-gray-50 transition">
                {columnas.map((campo, j) => (
                  <td key={j} className="px-6 py-4 border border-gray-200">
                    {item[campo]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón Registrar → solo aparece si ya cargó la máquina */}
      {maquina && (
        <div className="flex justify-center gap-10 mt-10">
          <button
            onClick={() => navigate(`/registrarlabormaquinaria/${maquina.id}`)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg"
          >
            Registrar labores
          </button>
        </div>
      )}
    </LayoutAgronomo>
  );
};

export default Historial_trabajo_agro;
