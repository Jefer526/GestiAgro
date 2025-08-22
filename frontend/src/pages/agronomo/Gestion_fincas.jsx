// src/pages/agronomo/Gestion_lotes_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconEye,
  IconPlus,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Gestion_lotes_agro = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const [lotes, setLotes] = useState([]);
  const [fincas, setFincas] = useState([]);

  // --- Filtros y orden ---
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // === 📌 Obtener fincas y lotes desde API ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resFincas, resLotes] = await Promise.all([
          api.get("/api/fincas/"),
          api.get("/api/lotes/"),
        ]);

        const fincasData = resFincas.data;
        const lotesData = resLotes.data;

        const lotesConFincas = [...lotesData];
        fincasData.forEach((f) => {
          const tieneLotes = lotesData.some((l) => l.finca === f.id);
          if (!tieneLotes) {
            lotesConFincas.push({
              id: `finca-${f.id}`,
              finca: f.id,
              finca_nombre: f.nombre,
              lote: "-",
              cultivo: "-",
              numero_arboles: 0,
              variedades: [],
              variedades_detalle: [],
              area_neta: 0,
              area_bruta: 0,
              estado: "Sin lotes",
              detalles: null,
            });
          }
        });

        setFincas(fincasData);
        setLotes(lotesConFincas);
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
      }
    };
    fetchData();
  }, []);

  const columnas = [
    "finca_nombre",
    "lote",
    "cultivo",
    "numero_arboles",
    "variedades",
    "area_neta",
    "area_bruta",
    "estado",
    "detalles",
  ];

  // === 🔎 Filtros ===
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();

    if (campo === "variedades") {
      const todasVariedades = lotes.flatMap(
        (d) => (d.variedades_detalle || []).map((v) => v.variedad)
      );
      return [...new Set(todasVariedades)].filter((v) =>
        String(v).toLowerCase().includes(search)
      );
    }

    return [...new Set(lotes.map((d) => String(d[campo] || "")))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
    if (campo === "detalles") return;
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: icono.left + window.scrollX,
    });
  };

  const toggleValor = (campo, valor) => {
    const seleccionados = new Set(valoresSeleccionados[campo] || []);
    seleccionados.has(valor)
      ? seleccionados.delete(valor)
      : seleccionados.add(valor);
    setValoresSeleccionados({
      ...valoresSeleccionados,
      [campo]: [...seleccionados],
    });
  };

  const limpiarFiltro = (campo) => {
    const actualizado = { ...valoresSeleccionados };
    delete actualizado[campo];
    setValoresSeleccionados(actualizado);
  };

  const ordenar = (campo, orden) => setOrdenCampo({ campo, orden });

  const handleBusqueda = (campo, texto) =>
    setBusquedas({ ...busquedas, [campo]: texto });

  // === 🔎 Filtrar y ordenar ===
  const lotesFiltrados = lotes
    .filter((d) =>
      columnas.every((campo) => {
        if (campo === "detalles") return true;

        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;

        if (campo === "variedades") {
          if (seleccionados.length === 1) {
            return (d.variedades_detalle || []).some(
              (v) => v.variedad === seleccionados[0]
            );
          }
          return seleccionados.every((sel) =>
            (d.variedades_detalle || []).some((v) => v.variedad === sel)
          );
        }

        return seleccionados.includes(String(d[campo]));
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      if (campo === "detalles") return 0;

      const valA =
        campo === "variedades"
          ? (a.variedades_detalle || []).map((v) => v.variedad).join(", ")
          : a[campo];
      const valB =
        campo === "variedades"
          ? (b.variedades_detalle || []).map((v) => v.variedad).join(", ")
          : b[campo];

      return orden === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  // === Totales ===
  const lotesReales = lotesFiltrados.filter((l) => l.estado !== "Sin lotes");
  const totalArboles = lotesReales.reduce(
    (acc, l) => acc + (Number(l.numero_arboles) || 0),
    0
  );
  const totalAreaNeta = lotesReales.reduce(
    (acc, l) => acc + parseFloat(l.area_neta || 0),
    0
  );
  const totalAreaBruta = lotesReales.reduce(
    (acc, l) => acc + parseFloat(l.area_bruta || 0),
    0
  );

  const seleccionadas = valoresSeleccionados["variedades"] || [];
  const totalVariedades = lotesReales.reduce((acc, lote) => {
    const variedades = lote.variedades_detalle || [];
    const visibles =
      seleccionadas.length > 0
        ? variedades.filter((v) => seleccionadas.includes(v.variedad))
        : variedades;
    return (
      acc + visibles.reduce((sum, v) => sum + (Number(v.cantidad) || 0), 0)
    );
  }, 0);

  // === Cerrar filtro al hacer click fuera ===
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Gestión de Fincas y Lotes
        </h1>
        <button
          onClick={() => navigate("/crearfinca")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <IconPlus className="w-5 h-5" /> Añadir Finca
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-center text-base">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {columnas.map((campo) => (
                <th key={campo} className="p-4 border text-center">
                  <div className="flex items-center justify-center gap-2">
                    {campo === "area_bruta"
                      ? "ÁREA BRUTA"
                      : campo === "area_neta"
                      ? "ÁREA NETA"
                      : campo === "numero_arboles"
                      ? "NÚMERO DE ÁRBOLES"
                      : campo === "variedades"
                      ? "VARIEDADES"
                      : campo === "finca_nombre"
                      ? "FINCA"
                      : campo === "detalles"
                      ? "DETALLES"
                      : campo.toUpperCase()}
                    {campo !== "detalles" && (
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lotesFiltrados.map((lote) => (
              <tr key={lote.id} className="hover:bg-gray-50">
                {columnas.map((campo) => (
                  <td key={campo} className="p-4 border text-center">
                    {campo === "detalles" ? (
                      <button
                        onClick={() => navigate(`/editarfinca/${lote.finca}`)}
                        className="text-green-600 hover:text-green-800 flex items-center gap-1"
                      >
                        <IconEye className="w-5 h-5" /> Ver
                      </button>
                    ) : campo === "estado" ? (
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          lote.estado === "Activo"
                            ? "bg-green-100 text-green-700"
                            : lote.estado === "Sin lotes"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {lote.estado}
                      </span>
                    ) : campo === "variedades" ? (
                      (() => {
                        const seleccionados =
                          valoresSeleccionados["variedades"] || [];
                        const variedades = lote.variedades_detalle || [];
                        const visibles =
                          seleccionados.length > 0
                            ? variedades.filter((v) =>
                                seleccionados.includes(v.variedad)
                              )
                            : variedades;
                        return visibles
                          .map((v) => `${v.variedad} (${v.cantidad})`)
                          .join(", ");
                      })()
                    ) : campo === "area_neta" || campo === "area_bruta" ? (
                      `${lote[campo]} ha`
                    ) : (
                      lote[campo]
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* === Totales === */}
            {lotesFiltrados.length > 0 && (
              <tr className="font-bold bg-gray-100">
                <td colSpan={3} className="p-4 border text-right">
                  TOTAL
                </td>
                <td className="p-4 border text-center">{totalArboles}</td>
                <td className="p-4 border text-center">{totalVariedades}</td>
                <td className="p-4 border text-center">
                  {totalAreaNeta.toFixed(2)} ha
                </td>
                <td className="p-4 border text-center">
                  {totalAreaBruta.toFixed(2)} ha
                </td>
                <td className="p-4 border"></td>
                <td className="p-4 border"></td>
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
                  checked={(valoresSeleccionados[filtroActivo] || []).includes(
                    val
                  )}
                  onChange={() => toggleValor(filtroActivo, val)}
                  className="accent-green-600"
                />
                {String(val)}
              </label>
            ))}
          </div>

          {/* Botones Borrar / Aceptar */}
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

export default Gestion_lotes_agro;
