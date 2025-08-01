// src/pages/agronomo/Detalles_agrop.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconHome, IconClipboardList, IconChartBar, IconCloudRain,
  IconTractor, IconSettings, IconBox, IconUsersGroup, IconPlant,
  IconFrame, IconChevronLeft, IconFilter, IconSortAscending2, IconSortDescending2
} from "@tabler/icons-react";
import faviconBlanco from "../../assets/favicon-blanco.png";
import { useNavigate } from "react-router-dom";

const Detalles_agrop = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const movimientos = [
    { fecha: "2025-06-15", lote: "1", cantidad: "50", um: "Kg", tipo: "Entrada" },
    { fecha: "2025-06-16", lote: "2", cantidad: "20", um: "Kg", tipo: "Salida" },
    { fecha: "2025-06-17", lote: "3", cantidad: "45", um: "Kg", tipo: "Entrada" },
  ];

  const columnas = ["fecha", "lote", "cantidad", "um", "tipo"];
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [busquedas, setBusquedas] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const getValoresUnicos = (campo) => {
  if (campo === "fecha") return []; // desactiva el filtro plano para 'fecha'
  const search = (busquedas[campo] || "").toLowerCase();
  return [...new Set(movimientos.map(e => e[campo]))].filter(v =>
    v.toLowerCase().includes(search)
  );
};

  const toggleFiltro = (campo, e) => {
  const icono = e.currentTarget.getBoundingClientRect();
  const filtroWidth = 240; // Ancho aprox. del filtro (w-72 = 18rem = 288px)
  const pantallaWidth = window.innerWidth;

  let left = icono.left + window.scrollX;
  if (left + filtroWidth > pantallaWidth) {
    left = pantallaWidth - filtroWidth - 10; // margen de 10px
  }

  setFiltroActivo(filtroActivo === campo ? null : campo);
  setFiltroPosicion({
    top: icono.bottom + window.scrollY + 4,
    left
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

  const movimientosFiltrados = movimientos
    .filter(item =>
      columnas.every(campo =>
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex-1 flex flex-col items-center space-y-8 overflow-y-auto scrollbar-hide pr-1">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homeagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconHome className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Laboresagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconClipboardList className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Informesagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconChartBar className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/Bodegaagro")} className="hover:bg-white/10 p-2 rounded-lg"><IconBox className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/variablesclimaticas")} className="hover:bg-white/10 p-2 rounded-lg"><IconCloudRain className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/maquinariaequipos")} className="hover:bg-white/10 p-2 rounded-lg"><IconTractor className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/manejopersonal")} className="hover:bg-white/10 p-2 rounded-lg"><IconUsersGroup className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearfinca")} className="hover:bg-white/10 p-2 rounded-lg"><IconPlant className="text-white w-11 h-11" /></button>
          <button onClick={() => navigate("/crearlote")} className="hover:bg-white/10 p-2 rounded-lg"><IconFrame className="text-white w-11 h-11" /></button>
        </div>
        <div className="sticky bottom-6 bg-green-600">
          <button onClick={() => navigate("/ajustes")} className="hover:bg-white/10 p-2 rounded-lg"><IconSettings className="text-white w-11 h-11" /></button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-10">
        <button onClick={() => navigate("/Bodegaagro")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
          <IconChevronLeft className="w-5 h-5 mr-1" /> Volver
        </button>

        <h1 className="text-3xl font-bold text-green-700 mb-6">Detalle del producto</h1>

        <div className="border border-gray-400 rounded-lg p-6 text-lg grid grid-cols-2 gap-y-2 max-w-3xl mb-10">
          <div><span className="font-bold">Producto:</span> Urea</div>
          <div><span className="font-bold">Ingrediente activo:</span> Nitrogeno 46%</div>
          <div><span className="font-bold">Finca:</span> La esmeralda</div>
          <div><span className="font-bold">Categoría:</span> Fertilizante</div>
          <div><span className="font-bold">Cantidad:</span> 300</div>
          <div><span className="font-bold">Um:</span> Kg</div>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-4">Movimiento del producto</h2>

        <div className="bg-white border border-gray-300 rounded-xl overflow-auto relative">
          <table className="w-full text-left text-base">
            <thead className="bg-green-600 text-white">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="px-4 py-3 border-r border-gray-300 uppercase text-center">
                    <div className="flex justify-center items-center gap-2">
                      <span>{col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}><IconFilter className="w-4 h-4" /></button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map((m, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.fecha}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.lote}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.cantidad}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.um}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.tipo}</td>
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
            <label key={idx} className="flex items-center gap-2 mb-1">
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
          movimientos.reduce((acc, { fecha }) => {
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
                  const fullDate = `2025-${String(new Date(`${month} 1`).getMonth() + 1).padStart(2, "0")}-${day}`;
                  return (
                    <label key={day} className="ml-6 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={(valoresSeleccionados["fecha"] || []).includes(fullDate)}
                        onChange={() => toggleValor("fecha", fullDate)}
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
      Borrar filtro
    </button>
  </div>
)}

        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 text-lg font-semibold">
            Exportar historial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detalles_agrop;

