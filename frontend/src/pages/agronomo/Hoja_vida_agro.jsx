// src/pages/agronomo/Hoja_vida.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconArrowLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconEye,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Hoja_vida = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({
    top: 0,
    left: 0,
    rightAlign: false,
  });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  // Datos de la máquina
  const maquina = {
    codigo: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  // Historial
  const historial = [
    {
      fecha: "2025-05-20",
      prev: true,
      correcc: false,
      descripcion: "Mantenimiento 1500 horas",
      realizado: "John Deere",
      codigoEquipo: "1",
      maquina: "Tractor",
      referencia: "JD 5055",
      ubicacion: "La Esmeralda",
      estado: "Óptimo",
      tipo: "Preventivo",
      realizadoPor: "John Deere",
    },
    {
      fecha: "2025-05-21",
      prev: false,
      correcc: true,
      descripcion: "Reparación Radiador",
      realizado: "Alex Condza",
      codigoEquipo: "1",
      maquina: "Tractor",
      referencia: "JD 5055",
      ubicacion: "La Esmeralda",
      estado: "Mantenimiento",
      tipo: "Correctivo",
      realizadoPor: "Alex Condza",
    },
    {
      fecha: "2025-05-22",
      prev: false,
      correcc: false,
      descripcion: "Cambio Refrigerante",
      realizado: "Alex Condza",
      codigoEquipo: "1",
      maquina: "Tractor",
      referencia: "JD 5055",
      ubicacion: "La Esmeralda",
      estado: "En operación",
      tipo: "Preventivo",
      realizadoPor: "Alex Condza",
    },
    {
      fecha: "2025-05-23",
      prev: false,
      correcc: false,
      descripcion: "Cambio de llantas",
      realizado: "Montalantas",
      codigoEquipo: "1",
      maquina: "Tractor",
      referencia: "JD 5055",
      ubicacion: "La Esmeralda",
      estado: "Óptimo",
      tipo: "Correctivo",
      realizadoPor: "Montalantas",
    },
  ];

  const columnas = [
    { campo: "fecha", label: "Fecha" },
    { campo: "prev", label: "Mantenimiento preventivo" },
    { campo: "correcc", label: "Mantenimiento correctivo" },
    { campo: "descripcion", label: "Descripción" },
    { campo: "realizado", label: "Realizado" },
    { campo: "detalle", label: "Detalle" },
  ];

  // Funciones filtros y orden
  const getValoresUnicos = (campo) => {
    if (campo === "fecha" || campo === "descripcion" || campo === "detalle")
      return [];
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(historial.map((e) => {
      if (typeof e[campo] === "boolean") return e[campo] ? "Sí" : "No";
      return e[campo] || "";
    }))].filter((v) => v.toLowerCase().includes(search));
  };

  const toggleFiltro = (campo, e) => {
    if (campo === "descripcion" || campo === "detalle") return;
    const icono = e.currentTarget.getBoundingClientRect();
    const anchoVentana = window.innerWidth;
    const espacioDerecha = anchoVentana - icono.right;
    const rightAlign = espacioDerecha < 250;
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setFiltroPosicion({
      top: icono.bottom + window.scrollY + 4,
      left: rightAlign ? icono.right - 250 : icono.left,
      rightAlign,
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

  const ordenar = (campo, orden) => {
    setOrdenCampo({ campo, orden });
  };

  const handleBusqueda = (campo, texto) => {
    setBusquedas({ ...busquedas, [campo]: texto });
  };

  const historialFiltrado = historial
    .filter((item) =>
      columnas.every(({ campo }) => {
        if (campo === "detalle") return true;
        const val =
          typeof item[campo] === "boolean" ? (item[campo] ? "Sí" : "No") : item[campo];
        return !valoresSeleccionados[campo] ||
          valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(val);
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const valA =
        typeof a[campo] === "boolean" ? (a[campo] ? "Sí" : "No") : a[campo];
      const valB =
        typeof b[campo] === "boolean" ? (b[campo] ? "Sí" : "No") : b[campo];
      return orden === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  // Usuario (para Layout)
  const nombreUsuario = "Juan Pérez";
  const letraInicial = (nombreUsuario?.trim()?.[0] || "U").toUpperCase();

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
    <LayoutAgronomo active="/maquinariaequipos" letraInicial={letraInicial}>
      <div className="px-10 py-8 overflow-auto">
        {/* Volver */}
        <button
          onClick={() => navigate("/maquinariaequipos")}
          className="flex items-center text-green-600 hover:text-green-800 mb-4"
        >
          <IconArrowLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

        <h2 className="text-3xl font-bold text-green-600 mb-6">Hoja de vida</h2>

        {/* Información general */}
        <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Información general
          </h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <div>
              <strong>Código Equipo:</strong> {maquina.codigo}
            </div>
            <div>
              <strong>Ubicación:</strong> {maquina.ubicacion}
            </div>
            <div>
              <strong>Máquina:</strong> {maquina.maquina}
            </div>
            <div>
              <strong>Estado:</strong> {maquina.estado}
            </div>
            <div>
              <strong>Referencia:</strong> {maquina.referencia}
            </div>
          </div>
        </div>

        {/* Historial */}
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Historial de mantenimiento
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-center border border-gray-300 text-base">
            <thead className="bg-green-600 text-white font-bold text-base">
              <tr>
                {columnas.map(({ campo, label }) => (
                  <th key={campo} className="p-3 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{label.toUpperCase()}</span>
                      {campo !== "descripcion" && campo !== "detalle" && (
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
              {historialFiltrado.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.fecha}</td>
                  <td className="p-3 border">{item.prev ? "Sí" : "No"}</td>
                  <td className="p-3 border">{item.correcc ? "Sí" : "No"}</td>
                  <td className="p-3 border">{item.descripcion}</td>
                  <td className="p-3 border">{item.realizado}</td>
                  <td className="p-3 border">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          navigate("/detalle_mantenimiento", { state: item })
                        }
                        className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                        title="Ver detalle"
                      >
                        <IconEye className="w-4 h-4" />
                        <span className="text-sm font-medium">Detalle</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtro dinámico */}
          {filtroActivo && (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">
                Filtrar por{" "}
                {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
              </div>

              {filtroActivo !== "fecha" ? (
                <>
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
                    onChange={(e) =>
                      handleBusqueda(filtroActivo, e.target.value)
                    }
                  />
                  <div className="flex flex-col max-h-40 overflow-y-auto">
                    {getValoresUnicos(filtroActivo).map((val, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 mb-1 capitalize"
                      >
                        <input
                          type="checkbox"
                          checked={(
                            valoresSeleccionados[filtroActivo] || []
                          ).includes(val)}
                          onChange={() => toggleValor(filtroActivo, val)}
                          className="accent-green-600"
                        />
                        {val.charAt(0).toUpperCase() +
                          val.slice(1).toLowerCase()}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <> {/* Filtro fechas */} </>
              )}

              <button
                onClick={() => limpiarFiltro(filtroActivo)}
                className="text-blue-600 hover:underline text-xs lowercase mt-2"
              >
                borrar filtro
              </button>
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className="flex justify-center gap-10 mt-10">
          <button
            onClick={() => navigate("/registrarnovedadhv")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg"
          >
            Registrar novedad
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
            Descargar PDF
          </button>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Hoja_vida;
