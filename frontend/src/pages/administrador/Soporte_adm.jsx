// src/pages/admin/Soporte_adm.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconCloudUpload,
  IconTool,
  IconSettings,
  IconLogout,
  IconEye,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import faviconBlanco from "../../assets/favicon-blanco.png";
// 👇 cliente con interceptor y endpoints (igual que en Admin_usuarios)
import api, { accountsApi, ENDPOINTS } from "../../services/apiClient";

const Soporte_adm = () => {
  const navigate = useNavigate();

  // -------- Perfil flotante --------
  const tarjetaRef = useRef(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const letraInicial = "J";

  useEffect(() => {
    const clickFueraTarjeta = (e) => {
      if (tarjetaRef.current && !tarjetaRef.current.contains(e.target)) {
        setMostrarTarjeta(false);
      }
    };
    document.addEventListener("mousedown", clickFueraTarjeta);
    return () => document.removeEventListener("mousedown", clickFueraTarjeta);
  }, []);
  // ---------------------------------

  // ====== LOGOUT real (backend + limpieza + redirect) ======
  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const refresh = localStorage.getItem("refresh");
      try {
        if (ENDPOINTS?.logout) {
          await api.post(ENDPOINTS.logout, { refresh });
        } else if (accountsApi?.logout) {
          await accountsApi.logout({ refresh });
        }
      } catch (e) {
        console.warn("Fallo en logout del backend, se cierra sesión localmente igual:", e);
      }
    } finally {
      try {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
      } catch {}
      try {
        if (api?.defaults?.headers?.common) {
          delete api.defaults.headers.common.Authorization;
        }
      } catch {}
      setMostrarTarjeta(false);
      setIsLoggingOut(false);
      window.location.replace("/");
    }
  };

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
  // --------------------------------

  // ------------- Filtros -------------
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0, rightAlign: false });
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
    const anchoVentana = window.innerWidth;
    const anchoTarjeta = 240;
    const espacioDerecha = anchoVentana - icono.right;
    const rightAlign = espacioDerecha < anchoTarjeta;

    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: rightAlign ? icono.right - anchoTarjeta + window.scrollX : icono.left + window.scrollX,
      rightAlign,
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
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-28 h-[100dvh] bg-green-600 flex flex-col items-center py-6 justify-between">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeadm")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/admuser")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconUsers className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/copias")} className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
            <IconCloudUpload className="text-white w-11 h-11" />
          </button>
          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
            <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition">
              <IconTool className="text-white w-11 h-11" />
            </button>
          </div>
        </div>

        {/* Perfil — EXACTO a Admin_usuarios */}
        <div className="relative mb-6">
          <button
            onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl shadow hover:scale-110 transition"
          >
            {letraInicial}
          </button>
          {mostrarTarjeta && (
            <div
              ref={tarjetaRef}
              className="absolute bottom-16 left-14 w-52 bg-white/95 border-2 border-gray-300 rounded-xl shadow-2xl py-3 z-50"
            >
              <button
                onClick={() => navigate("/ajustesadm")}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <IconSettings className="w-5 h-5 mr-2 text-green-600" /> Ajustes
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  isLoggingOut ? "opacity-60 cursor-not-allowed" : "text-red-600"
                }`}
              >
                <IconLogout className="w-5 h-5 mr-2 text-red-600" />
                {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Contenido */}
      <main className="ml-28 min-h-[100dvh] p-8">
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
                // -------------------------------
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
      </main>
    </div>
  );
};

export default Soporte_adm;
