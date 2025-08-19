import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Manejo_personal_agro = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const empleados = [
    { id: "01", nombre: "Juan Pérez", cargo: "Gerente", estado: "Activo", finca: "La Esmeralda", telefono: "3124567890" },
    { id: "02", nombre: "Pedro Ramírez", cargo: "Ing Agrónomo", estado: "Activo", finca: "La Carolina", telefono: "3201112233" },
    { id: "03", nombre: "Ana González", cargo: "Mayordomo", estado: "Inactivo", finca: "Las Palmas", telefono: "3119876543" },
    { id: "04", nombre: "María Rojas", cargo: "Operario de campo", estado: "Activo", finca: "La Carolina", telefono: "3188888888" },
  ];

  const columnas = ["id", "nombre", "cargo", "estado", "finca", "telefono"];

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
    return [...new Set(empleados.map((d) => d[campo]))].filter((v) =>
      String(v).toLowerCase().includes(search)
    );
  };

  const empleadosFiltrados = empleados
    .filter((d) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] ||
        valoresSeleccionados[campo].length === 0
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
    <LayoutAgronomo>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Manejo Personal
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-center text-base bg-white">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              {columnas.map((campo, i) => (
                <th key={i} className="p-4 border text-center">
                  <div className="flex items-center justify-center gap-2">
                    {campo === "telefono" ? "TELÉFONO" : campo.toUpperCase()}
                    <button onClick={(e) => toggleFiltro(campo, e)}>
                      <IconFilter className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {empleadosFiltrados.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-100">
                {columnas.map((campo, j) => (
                  <td key={j} className="p-4 border text-center">
                    {emp[campo]}
                  </td>
                ))}
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
            Filtrar por{" "}
            {String(filtroActivo).charAt(0).toUpperCase() +
              String(filtroActivo).slice(1)}
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
          <button
            onClick={() => limpiarFiltro(filtroActivo)}
            className="text-blue-600 hover:underline text-xs mt-2"
          >
            Borrar filtro
          </button>
        </div>
      )}

      <div className="flex justify-center gap-8 mt-8">
        <button
          onClick={() => navigate("/registrarempleado")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold"
        >
          Registrar empleado
        </button>
        <button
          onClick={() => navigate("/editarempleado")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold"
        >
          Editar empleado
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold">
          Exportar
        </button>
      </div>
    </LayoutAgronomo>
  );
};

export default Manejo_personal_agro;


