// src/pages/agronomo/Historial_trabajo_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconChevronLeft,
  IconFilter,
  IconPlus,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { equiposApi, laboresMaquinariaApi } from "../../services/apiClient";

const Historial_trabajo_agro = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 id de la máquina
  const filtroRef = useRef(null);

  const [maquina, setMaquina] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 📌 Obtener la máquina actual
        const resMaquina = await equiposApi.get(id);
        setMaquina(resMaquina.data);

        // 📌 Traer SOLO las labores de esta máquina
        // 👇 CORREGIDO: ya no se anidan los params
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

  // ✅ Formato DD/MM/YYYY
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
    <LayoutAgronomo>
      {/* Volver */}
      <button
        onClick={() => navigate("/maquinariaequipos")}
        className="flex items-center text-green-700 font-semibold mb-4 text-lg hover:underline"
      >
        <IconChevronLeft className="w-6 h-6 mr-1" /> Volver
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-6">Historial de trabajo</h1>

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
            onClick={() => navigate(`/registrarlabormaquinaria/${maquina.id}`)}
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
                  No hay labores registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </LayoutAgronomo>
  );
};

export default Historial_trabajo_agro;
