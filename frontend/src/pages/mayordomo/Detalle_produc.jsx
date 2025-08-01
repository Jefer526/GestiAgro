import {
  IconHome,
  IconClipboardList,
  IconHistory,
  IconChartBar,
  IconBox,
  IconCloudRain,
  IconTractor,
  IconSettings,
  IconChevronLeft,
  IconFilter,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import faviconBlanco from "../../assets/favicon-blanco.png";

const Detalle_produc = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });

  const movimientos = [
    { fecha: "2025-06-15", lote: 1, cantidad: 50, um: "Kg", tipo: "Entrada" },
    { fecha: "2025-06-16", lote: 2, cantidad: 20, um: "Kg", tipo: "Salida" },
    { fecha: "2025-06-17", lote: 3, cantidad: 45, um: "Kg", tipo: "Entrada" },
  ];

  const toggleFiltro = (campo, event) => {
  const icono = event.currentTarget.getBoundingClientRect();
  const cardWidth = 240; // ancho estimado del filtro
  const margen = 12;

  let left = icono.left + window.scrollX;
  if (left + cardWidth + margen > window.innerWidth) {
    left = window.innerWidth - cardWidth - margen;
  }

  setFiltroActivo(filtroActivo === campo ? null : campo);
  setFiltroPosicion({
    top: icono.bottom + window.scrollY + 4,
    left,
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

  const datosFiltrados = movimientos.filter((d) => {
    return ["fecha", "lote", "cantidad", "um", "tipo"].every((campo) => {
      const filtro = valoresSeleccionados[campo];
      return !filtro || filtro.includes(String(d[campo]));
    });
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

  const renderFiltroSimple = (campo) => {
    const opcionesUnicas = [...new Set(movimientos.map((d) => String(d[campo])))];
    return (
      <div
        ref={filtroRef}
        className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-48 text-left text-sm"
        style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
      >
        <div className="font-semibold mb-2">Filtrar por {campo.charAt(0).toUpperCase() + campo.slice(1)}</div>
        {opcionesUnicas.map((valor) => (
          <label key={valor} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={(valoresSeleccionados[campo] || []).includes(valor)}
              onChange={() => toggleValor(campo, valor)}
              className="accent-green-600"
            />
            {valor}
          </label>
        ))}
        <button onClick={() => limpiarFiltro(campo)} className="text-blue-600 hover:underline text-xs mt-2">
          Borrar filtro
        </button>
      </div>
    );
  };

  return (
    <div className="flex absolute top-0 left-0 w-full h-full bg-white z-50">
      {/* Sidebar */}
      <div className="bg-green-600 w-28 h-screen flex flex-col items-center py-6 justify-between relative">
        <div className="flex flex-col items-center space-y-8">
          <img src={faviconBlanco} alt="Logo" className="w-11 h-11" />
          <button onClick={() => navigate("/homemayordomo")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconHome className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/registrolabores")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconClipboardList className="text-white w-11 h-11" />
          </button>
          <button onClick={() => navigate("/historial_labores")} className="hover:bg-white/10 p-2 rounded-lg">
            <IconHistory className="text-white w-11 h-11" />
          </button>
          <div className="relative w-full flex justify-center">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-11 bg-white rounded-full z-10" />
            <button className="hover:bg-white/10 p-2 rounded-lg">
              <IconBox className="text-white w-11 h-11" />
            </button>
          </div>
          <button className="hover:bg-white/10 p-2 rounded-lg">
            <IconCloudRain className="text-white w-11 h-11" />
          </button>
          <button className="hover:bg-white/10 p-2 rounded-lg">
            <IconChartBar className="text-white w-11 h-11" />
          </button>
          <button className="hover:bg-white/10 p-2 rounded-lg">
            <IconTractor className="text-white w-11 h-11" />
          </button>
        </div>
        <div className="mb-6">
          <button className="hover:bg-white/10 p-2 rounded-lg">
            <IconSettings className="text-white w-11 h-11" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-10">
        <button onClick={() => navigate("/bodega_insumos")} className="flex items-center text-green-600 font-semibold mb-6 text-lg hover:underline">
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

        <div className="relative bg-white border border-gray-300 rounded-xl overflow-auto">
          <table className="w-full text-base text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                {["fecha", "lote", "cantidad", "um", "tipo"].map((campo) => (
                  <th key={campo} className="px-4 py-3 border-r border-gray-300 text-center">
                    <div className="flex justify-center items-center gap-1">
                      {campo.toUpperCase()}
                      <button onClick={(e) => toggleFiltro(campo, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((m, i) => (
                <tr key={i} className="border-b border-gray-200 text-center">
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.fecha}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.lote}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.cantidad}</td>
                  <td className="px-4 py-2 border-r border-gray-200 text-center">{m.um}</td>
                  <td className="px-4 py-2 text-center">{m.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtroActivo && (filtroActivo === "fecha" ? (
            <div
              ref={filtroRef}
              className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm"
              style={{ top: filtroPosicion.top, left: filtroPosicion.left }}
            >
              <div className="font-semibold mb-2">Filtrar por Fecha</div>
              {Object.entries(
                movimientos.reduce((acc, { fecha }) => {
                  const [year, month, day] = fecha.split("-");
                  const monthName = new Date(`${year}-${month}-01`).toLocaleString("default", { month: "long" });
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
                        const fullDate = `${year}-${String(month).padStart(2, "0")}-${day}`;
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
              <button
                onClick={() => limpiarFiltro("fecha")}
                className="text-blue-600 hover:underline text-xs mt-2"
              >
                Borrar filtro
              </button>
            </div>
          ) : renderFiltroSimple(filtroActivo))}
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

export default Detalle_produc;





