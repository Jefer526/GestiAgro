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
  const { id } = useParams();
  const filtroRef = useRef(null);

  const [maquina, setMaquina] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 📌 Info de la máquina
        const resMaquina = await equiposApi.get(id);
        setMaquina(resMaquina.data);

        // 📌 Labores de la máquina
        const resLabores = await laboresMaquinariaApi.list(id);
        const mapped = resLabores.data.map((l) => {
          const horasMaquina = Math.abs(l.horometro_fin - l.horometro_inicio);
          return {
            fecha: l.fecha,
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

  // === Filtros ===
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const getValoresUnicos = (campo) => {
    if (campo === "observaciones" || campo === "fecha") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historial.map((e) => String(e[campo] || "")))]
      .filter((v) => v.toLowerCase().includes(search));
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
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? String(a[campo]).localeCompare(String(b[campo]))
        : String(b[campo]).localeCompare(String(a[campo]));
    });

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
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-xl font-bold text-green-700">Historial de labores</h2>
          {maquina && (
            <button
              onClick={() => navigate(`/registrarlabormaquinaria/${maquina.id}`)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center gap-2"
            >
              <IconPlus className="w-6 h-6" />
              Registrar labores
            </button>
          )}
        </div>

        <table className="w-full text-base text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {columnas.map((col) => (
                <th key={col} className="px-4 py-4 font-bold border">
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
                {columnas.map((campo) => (
                  <td key={campo} className="px-6 py-4 border border-gray-200">
                    {item[campo]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Filtro flotante === */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-64"
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

          <div className="flex flex-col max-h-52 overflow-y-auto">
            {filtroActivo === "fecha"
              ? (() => {
                  const agrupado = {};
                  historial.forEach((h) => {
                    const fecha = new Date(h.fecha);
                    if (isNaN(fecha)) return;
                    const year = fecha.getFullYear();
                    const month = fecha.toLocaleString("es-ES", { month: "long" });
                    const day = fecha.getDate();

                    if (!agrupado[year]) agrupado[year] = {};
                    if (!agrupado[year][month]) agrupado[year][month] = new Set();
                    agrupado[year][month].add(day);
                  });

                  return Object.entries(agrupado).map(([year, meses]) => {
                    const yearValues = Object.entries(meses).flatMap(([mes, dias]) =>
                      [...dias].map(
                        (dia) =>
                          `${year}-${String(
                            new Date(`${mes} 1, ${year}`).getMonth() + 1
                          ).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
                      )
                    );
                    const yearSelected = yearValues.every((val) =>
                      (valoresSeleccionados["fecha"] || []).includes(val)
                    );

                    return (
                      <details key={year} open className="mb-2">
                        <summary className="font-bold flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={yearSelected}
                            onChange={() => {
                              const actual = new Set(valoresSeleccionados["fecha"] || []);
                              if (yearSelected) {
                                yearValues.forEach((v) => actual.delete(v));
                              } else {
                                yearValues.forEach((v) => actual.add(v));
                              }
                              setValoresSeleccionados({
                                ...valoresSeleccionados,
                                fecha: [...actual],
                              });
                            }}
                            className="accent-green-600"
                          />
                          {year}
                        </summary>

                        {Object.entries(meses).map(([mes, dias]) => {
                          const mesValues = [...dias].map(
                            (dia) =>
                              `${year}-${String(
                                new Date(`${mes} 1, ${year}`).getMonth() + 1
                              ).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
                          );
                          const mesSelected = mesValues.every((val) =>
                            (valoresSeleccionados["fecha"] || []).includes(val)
                          );

                          return (
                            <details key={mes} open className="ml-4 mb-1">
                              <summary className="font-semibold flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={mesSelected}
                                  onChange={() => {
                                    const actual = new Set(valoresSeleccionados["fecha"] || []);
                                    if (mesSelected) {
                                      mesValues.forEach((v) => actual.delete(v));
                                    } else {
                                      mesValues.forEach((v) => actual.add(v));
                                    }
                                    setValoresSeleccionados({
                                      ...valoresSeleccionados,
                                      fecha: [...actual],
                                    });
                                  }}
                                  className="accent-green-600"
                                />
                                {mes}
                              </summary>

                              {[...dias].sort((a, b) => a - b).map((dia) => {
                                const valor = `${year}-${String(
                                  new Date(`${mes} 1, ${year}`).getMonth() + 1
                                ).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
                                return (
                                  <label
                                    key={valor}
                                    className="flex items-center gap-2 ml-6 mb-1"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={(valoresSeleccionados["fecha"] || []).includes(valor)}
                                      onChange={() => toggleValor("fecha", valor)}
                                      className="accent-green-600"
                                    />
                                    {dia}
                                  </label>
                                );
                              })}
                            </details>
                          );
                        })}
                      </details>
                    );
                  });
                })()
              : getValoresUnicos(filtroActivo).map((val) => (
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
    </LayoutAgronomo>
  );
};

export default Historial_trabajo_agro;
