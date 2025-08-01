import React, { useState, useRef, useEffect } from "react";
import {
  IconHome,
  IconClipboardList,
  IconChartBar,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconBox,
  IconUsersGroup,
  IconPlant,
  IconFrame,
  IconArrowLeft,
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Hoja_vida = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0, rightAlign: false });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const maquina = {
    id: 1,
    maquina: "Tractor",
    referencia: "JD 5055",
    ubicacion: "La Esmeralda",
    estado: "Óptimo",
  };

  const historial = [
    {
      fecha: "2025-05-20",
      prev: true,
      correcc: false,
      descripcion: "Mantenimiento 1500 horas",
      realizado: "John Deere",
    },
    {
      fecha: "2025-05-21",
      prev: false,
      correcc: true,
      descripcion: "Reparación Radiador",
      realizado: "Alex Condza",
    },
    {
      fecha: "2025-05-22",
      prev: false,
      correcc: false,
      descripcion: "Cambio Refrigerante",
      realizado: "Alex Condza",
    },
    {
      fecha: "2025-05-23",
      prev: false,
      correcc: false,
      descripcion: "Cambio de llantas",
      realizado: "Montalantas",
    },
  ];

  const columnas = [
    { campo: "fecha", label: "Fecha" },
    { campo: "prev", label: "Mantenimiento preventivo" },
    { campo: "correcc", label: "Mantenimiento correctivo" },
    { campo: "descripcion", label: "Descripción" },
    { campo: "realizado", label: "Realizado" },
  ];

  const getValoresUnicos = (campo) => {
  if (campo === "fecha" || campo === "descripcion") return [];
  const search = (busquedas[campo] || "").toLowerCase();
  return [...new Set(historial.map((e) => {
    if (typeof e[campo] === "boolean") return e[campo] ? "Sí" : "No";
    return e[campo] || "";
  }))].filter((v) => v.toLowerCase().includes(search));
};

  const toggleFiltro = (campo, e) => {
  if (campo === "descripcion") return; 
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

  const historialFiltrado = historial
    .filter((item) =>
      columnas.every(({ campo }) => {
        const val = typeof item[campo] === "boolean"? item[campo] ? "Sí" : "No" : item[campo];
        return !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(val);
      })
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      const valA = typeof a[campo] === "boolean" ? (a[campo] ? "Sí" : "No") : a[campo];
      const valB = typeof b[campo] === "boolean" ? (b[campo] ? "Sí" : "No") : b[campo];
      return orden === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

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
    <div className="flex">
          {/* Sidebar */}
                <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
                  <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
                    <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          
                    <button
                      className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                      onClick={() => navigate("/homeagro")}>
                      <IconHome className="text-white w-11 h-11" />
                    </button>
          
                    <button
                      className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                      onClick={() => navigate("/laboresagro")}>
                      <IconClipboardList className="text-white w-11 h-11" />
                    </button>
          
                    <div className="relative">
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full" />
                      <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                      onClick={() => navigate("/Informesagro")}>
                        <IconChartBar className="text-white w-11 h-11" />
                      </button>
                    </div>
          
                     <button
                       className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                       onClick={() => navigate("/Bodegaagro")}>
                       <IconBox className="text-white w-11 h-11" />
                     </button>
          
                    <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                      onClick={() => navigate("/variablesclimaticas")}>
                      <IconCloudRain className="text-white w-11 h-11" />
                    </button>
          
                    <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                    onClick={() => navigate("/maquinariaequipos")}>
                      <IconTractor className="text-white w-11 h-11" />
                    </button>

                    <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                     onClick={() => navigate("/manejopersonal")}>
                      <IconUsersGroup className="text-white w-11 h-11" />
                    </button>

                    <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                     onClick={() => navigate("/crearfinca")}>
                      <IconPlant className="text-white w-11 h-11" />
                    </button>

                    <button className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                     onClick={() => navigate("/crearlote")}>
                      <IconFrame className="text-white w-11 h-11" />
                    </button>
                    
                  </div>
                  <div className="sticky bottom-6 bg-green-600">
                    <button
                      onClick={() => navigate("/ajustes")}
                      className="hover:scale-110 hover:bg-white/10 p-2 rounded-lg transition"
                    >
                      <IconSettings className="text-white w-11 h-11" />
                    </button>
                  </div>
                </div>
    

      <div className="flex-1 px-10 py-8 overflow-auto">
        <button onClick={() => navigate("/maquinariaequipos")} className="flex items-center text-green-600 hover:text-green-800 mb-4">
          <IconArrowLeft className="w-6 h-6 mr-1" />
          <span className="text-base font-medium">Volver</span>
        </button>

        <h2 className="text-3xl font-bold text-green-600 mb-6">Hoja de vida</h2>

        <div className="bg-white border border-gray-300 p-6 rounded-xl mb-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Información general</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-lg">
            <div><strong>ID Máquina:</strong> {maquina.id}</div>
            <div><strong>Ubicación:</strong> {maquina.ubicacion}</div>
            <div><strong>Máquina:</strong> {maquina.maquina}</div>
            <div><strong>Estado:</strong> {maquina.estado}</div>
            <div><strong>Referencia:</strong> {maquina.referencia}</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-4">Historial de mantenimiento</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-center border border-gray-300 text-base">
            <thead className="bg-green-600 text-white font-bold text-base">
              <tr>
                {columnas.map(({ campo, label }) => (
                <th key={campo} className="p-3 border">
                  <div className="flex items-center justify-center gap-2">
                    <span>{label.toUpperCase()}</span>
                    {campo !== "descripcion" && (
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
                </tr>
              ))}
            </tbody>
          </table>

          {filtroActivo && (
  <div
    ref={filtroRef}
    className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
    style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
  >
    <div className="font-semibold mb-2">
      Filtrar por {filtroActivo.charAt(0).toUpperCase() + filtroActivo.slice(1)}
    </div>

    {filtroActivo !== "fecha" ? (
      <>
        <button onClick={() => ordenar(filtroActivo, "asc")} className="text-green-700 flex items-center gap-1 mb-1">
          <IconSortAscending2 className="w-4 h-4" /> Ordenar A → Z
        </button>
        <button onClick={() => ordenar(filtroActivo, "desc")} className="text-green-700 flex items-center gap-1 mb-2">
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
            <label key={idx} className="flex items-center gap-2 mb-1 capitalize">
              <input
                type="checkbox"
                checked={(valoresSeleccionados[filtroActivo] || []).includes(val)}
                onChange={() => toggleValor(filtroActivo, val)}
                className="accent-green-600"
              />
              {val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()}
            </label>
          ))}
        </div>
      </>
    ) : (
      <>
        {Object.entries(
          historial.reduce((acc, { fecha }) => {
            const [year, month, day] = fecha.split("-");
            const monthName = new Date(fecha).toLocaleString("default", { month: "long" });
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
                        checked={(valoresSeleccionados["fecha"] || []).includes(fullDate)}
                        onChange={() => toggleValor("fecha", fullDate)}
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
      className="text-blue-600 hover:underline text-xs lowercase mt-2"
    >
      borrar filtro
    </button>
  </div>
)}

        </div>

        <div className="flex justify-center gap-10 mt-10">
          <button onClick={() => navigate("/registrar_mantenimiento")} className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
            Registrar mantenimiento
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-3 rounded-lg">
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hoja_vida;




