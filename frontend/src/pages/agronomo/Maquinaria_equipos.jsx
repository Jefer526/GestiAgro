// src/pages/agronomo/Maquinaria_equipos.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { equiposApi } from "../../services/apiClient";

const Maquinaria_equipos = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const [maquinas, setMaquinas] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const campos = [
    "codigo_equipo",
    "maquina",
    "referencia",
    "ubicacion_nombre",
    "estado",
  ];

  // 🔄 Cargar datos
  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const res = await equiposApi.list();
        setMaquinas(res.data);
      } catch (err) {
        console.error("❌ Error cargando máquinas:", err);
      }
    };
    fetchMaquinas();
  }, []);

  // === Filtros ===
  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(maquinas.map((d) => String(d[campo] || "")))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const toggleFiltro = (campo, e) => {
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

  // === Filtrar y ordenar ===
  const maquinasFiltradas = maquinas
    .filter((d) =>
      campos.every((campo) => {
        const seleccionados = valoresSeleccionados[campo] || [];
        if (seleccionados.length === 0) return true;
        return seleccionados.includes(String(d[campo]));
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const valA = a[campo];
      const valB = b[campo];
      return orden === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  // Cerrar filtros al hacer click fuera
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
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Maquinaria y Equipos
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-center text-base bg-white">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {campos.map((campo) => (
                <th key={campo} className="p-4 border text-center">
                  <div className="flex items-center justify-center gap-2">
                    {campo.replace("_", " ").toUpperCase()}
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
                {campos.map((campo) => (
                  <td key={campo} className="p-4 border text-center">
                    {m[campo]}
                  </td>
                ))}
                <td className="p-4 border text-center">
                  <button
                    onClick={() => navigate(`/hojadevida/${m.id}`)}
                    className="bg-blue-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
                  >
                    Ver
                  </button>
                </td>
                <td className="p-4 border text-center">
                  <button
                    onClick={() => navigate(`/historialtrabajo/${m.id}`)}
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

      {/* === Filtro flotante === */}
      {filtroActivo && (
        <div
          ref={filtroRef}
          className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60"
          style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
        >
          <div className="font-semibold mb-2">
            Filtrar por {filtroActivo.replace("_", " ").toUpperCase()}
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

      <div className="flex justify-center gap-8 mt-8">
        <button
          onClick={() => navigate("/registrarmaquina")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold"
        >
          Registrar nueva máquina
        </button>
        <button
          onClick={() => navigate("/registrarnovedad")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold"
        >
          Registrar novedad
        </button>
      </div>
    </LayoutAgronomo>
  );
};

export default Maquinaria_equipos;
