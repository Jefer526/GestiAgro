// src/pages/administrador/Soporte_adm.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconEye,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../layouts/LayoutAdmin";

const Soporte_adm = () => {
  const navigate = useNavigate();

  // --------- Datos tabla ----------
  const tickets = [
    {
      ticket: "TK-0001",
      asunto: "No carga el módulo de usuarios",
      estado: "Abierto",
      solicitadoPor: "Ana Rosas",
      fechaSolicitud: "2025-07-11",
      descripcion:
        "Al intentar ingresar al módulo de usuarios aparece pantalla en blanco. Probado en Chrome y Edge. Sucede desde ayer en la tarde.",
    },
    {
      ticket: "TK-0002",
      asunto: "Error al generar copia de seguridad",
      estado: "En proceso",
      solicitadoPor: "Carlos Soto",
      fechaSolicitud: "2025-07-12",
      descripcion:
        "El botón ‘Generar copia’ muestra error 500. Se adjunta captura en el correo enviado al soporte.",
    },
    {
      ticket: "TK-0003",
      asunto: "Solicitud de nuevo rol",
      estado: "Cerrado",
      solicitadoPor: "Juan Pérez",
      fechaSolicitud: "2025-08-01",
      descripcion:
        "Se requiere crear un rol ‘Supervisor de campo’ con acceso de solo lectura a reportes y clima.",
    },
  ];

  const columnas = ["ticket", "asunto", "estado", "solicitadoPor", "fechaSolicitud"];

  // ------------- Filtros -------------
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [busquedas, setBusquedas] = useState({});

  const getValoresUnicos = (campo) => {
    if (campo === "fechaSolicitud") return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(tickets.map((t) => t[campo]?.toString() || ""))].filter((v) =>
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

  const ticketsFiltrados = tickets
    .filter((row) =>
      columnas.every((campo) => {
        if (campo === "fechaSolicitud") {
          const filtrosFecha = valoresSeleccionados["fechaSolicitud"];
          return !filtrosFecha || filtrosFecha.length === 0
            ? true
            : filtrosFecha.includes(row.fechaSolicitud);
        }
        return !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(row[campo]?.toString());
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

  useEffect(() => {
    const clickFueraFiltro = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
      }
    };
    document.addEventListener("mousedown", clickFueraFiltro);
    return () => document.removeEventListener("mousedown", clickFueraFiltro);
  }, []);
  // -----------------------------------

  const verDetalle = (row) => {
    navigate("/detallesticket", { state: { ticket: row } });
  };

  return (
    <LayoutAdmin letraInicial="J">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Soporte</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg relative">
        <table className="min-w-full text-base text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              {["Ticket", "Asunto", "Estado", "Solicitado por", "Fecha de solicitud", "Acciones"].map((h, idx) => (
                <th key={h} className="px-4 py-4 border uppercase">
                  {h !== "Acciones" ? (
                    <div className="flex items-center justify-center gap-2">
                      <span>{h}</span>
                      <button onClick={(e) => toggleFiltro(columnas[idx], e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span>{h}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ticketsFiltrados.map((t) => (
              <tr key={t.ticket} className="border-t hover:bg-gray-50">
                <td className="p-3 border">{t.ticket}</td>
                <td className="p-3 border text-center">{t.asunto}</td>
                <td className="p-3 border">{t.estado}</td>
                <td className="p-3 border">{t.solicitadoPor}</td>
                <td className="p-3 border">{t.fechaSolicitud}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => verDetalle(t)}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-1 text-xs font-medium hover:bg-blue-200 transition justify-center mx-auto"
                    title="Ver detalle"
                  >
                    <IconEye className="w-4 h-4" />
                    Detalle
                  </button>
                </td>
              </tr>
            ))}
            {ticketsFiltrados.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-gray-500">Sin tickets</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Tarjeta de filtros */}
        {filtroActivo && (
          <div
            ref={filtroRef}
            className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
            style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
          >
            <div className="font-semibold mb-2">
              Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
            </div>

            {filtroActivo !== "fechaSolicitud" ? (
              <>
                <button
                  onClick={() => ordenar(filtroActivo, "asc")}
                  className="text-green-700 flex items-center gap-1 mb-1"
                >
                  <IconSortAscending2 className="w-4 h-4" />
                  Ordenar A → Z
                </button>
                <button
                  onClick={() => ordenar(filtroActivo, "desc")}
                  className="text-green-700 flex items-center gap-1 mb-2"
                >
                  <IconSortDescending2 className="w-4 h-4" />
                  Ordenar Z → A
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
                      {val}
                    </label>
                  ))}
                </div>
              </>
            ) : (
              // -------- Filtro de fecha --------
              <>
                {Object.entries(
                  tickets.reduce((acc, { fechaSolicitud }) => {
                    const [year, month, day] = fechaSolicitud.split("-");
                    const monthName = new Date(fechaSolicitud).toLocaleString("default", { month: "long" });
                    acc[year] = acc[year] || {};
                    acc[year][monthName] = acc[year][monthName] || new Set();
                    acc[year][monthName].add(day);
                    return acc;
                  }, {})
                ).map(([year, months]) => (
                  <div key={year} className="mb-2">
                    <div className="font-medium">{year}</div>
                    {Object.entries(months).map(([month, days]) => (
                      <div key={month} className="ml-4">
                        <div className="font-medium">{month}</div>
                        {[...days].map((day) => {
                          const monthNum = new Date(`${month} 1`).getMonth() + 1;
                          const fullDate = `${year}-${String(monthNum).padStart(2, "0")}-${day}`;
                          return (
                            <label key={day} className="ml-6 flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={(valoresSeleccionados["fechaSolicitud"] || []).includes(fullDate)}
                                onChange={() => toggleValor("fechaSolicitud", fullDate)}
                                className="accent-green-600"
                              />
                              {day}
                            </label>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}

            <button
              onClick={() => limpiarFiltro(filtroActivo)}
              className="text-blue-600 hover:underline text-xs mt-2"
            >
              Borrar filtro
            </button>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default Soporte_adm;
