// src/pages/agronomo/Crear_finca_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconFilter,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconMapPin,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Crear_finca_agro = () => {
  const navigate = useNavigate();

  /* ----------------------------------
     📌 ESTADOS Y REFERENCIAS
  ---------------------------------- */
  const filtroRef = useRef(null);
  const [fincas, setFincas] = useState([
    { nombre: "La Esmeralda", ubicacion: "Huila", coordenadas: "2.40,-75.25", area: "12 ha" },
    { nombre: "Las Palmas", ubicacion: "Caquetá", coordenadas: "1.62,-75.55", area: "18 ha" },
  ]);

  const columnas = ["nombre", "ubicacion", "coordenadas", "area"];
  const [formData, setFormData] = useState({ nombre: "", ubicacion: "", coordenadas: "", area: "" });
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);
  const [posicionTarjeta, setPosicionTarjeta] = useState({});
  const [visibleTarjeta, setVisibleTarjeta] = useState(null);

  /* ----------------------------------
     📌 HANDLERS
  ---------------------------------- */
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const agregarFinca = () => {
    if (!formData.nombre || !formData.ubicacion || !formData.coordenadas || !formData.area) return;
    setFincas([...fincas, { ...formData }]);
    setFormData({ nombre: "", ubicacion: "", coordenadas: "", area: "" });
  };

  const toggleFiltro = (campo, e) => {
    const icono = e.currentTarget.getBoundingClientRect();
    setFiltroActivo(filtroActivo === campo ? null : campo);
    setPosicionTarjeta({ top: icono.bottom + window.scrollY + 4, left: icono.left + window.scrollX });
  };

  const getValoresUnicos = (campo) => {
    const search = (busquedas[campo] || "").toLowerCase();
    return [...new Set(fincas.map((e) => e[campo]?.toString()))].filter((v) =>
      v.toLowerCase().includes(search)
    );
  };

  const datosFiltrados = fincas
    .filter((item) =>
      columnas.every((campo) =>
        !valoresSeleccionados[campo] || valoresSeleccionados[campo].length === 0
          ? true
          : valoresSeleccionados[campo].includes(item[campo]?.toString())
      )
    )
    .sort((a, b) => {
      if (!ordenCampo) return 0;
      const { campo, orden } = ordenCampo;
      return orden === "asc"
        ? a[campo]?.toString().localeCompare(b[campo]?.toString())
        : b[campo]?.toString().localeCompare(a[campo]?.toString());
    });

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

  const mostrarTarjeta = (idx, e) => {
    const boton = e.currentTarget.getBoundingClientRect();
    setVisibleTarjeta(idx);
    setPosicionTarjeta({ top: boton.bottom + window.scrollY + 4, left: boton.left + window.scrollX });
  };

  /* ----------------------------------
     📌 EFECTOS
  ---------------------------------- */
  useEffect(() => {
    const clickFuera = (e) => {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroActivo(null);
        setVisibleTarjeta(null);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  /* ----------------------------------
     📌 RENDER
  ---------------------------------- */
  return (
    <LayoutAgronomo>
      <div className="p-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Crear finca</h1>

        {/* Formulario */}
        <div className="bg-white border border-gray-200 shadow-gray-300 shadow-md p-6 rounded-lg mb-10 max-w-4xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Nombre finca</label>
              <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre finca" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1 items-center gap-1 ">
                <IconMapPin className="w-4 h-4 mr-1" /> Ubicación finca
              </label>
              <input name="ubicacion" value={formData.ubicacion} onChange={handleChange} placeholder="Ubicación finca" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1">Coordenadas</label>
              <input name="coordenadas" value={formData.coordenadas} onChange={handleChange} placeholder="Coordenadas" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-bold block mb-1">Área finca</label>
              <input name="area" value={formData.area} onChange={handleChange} placeholder="Área finca" className="w-full p-2 border rounded" />
            </div>
          </div>
          <button onClick={agregarFinca} className="bg-green-600 text-white mt-4 px-4 py-2 rounded hover:bg-green-700">
            Crear finca
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg shadow-lg relative">
          <table className="min-w-full text-base bg-white text-center">
            <thead className="bg-green-600 text-white font-bold">
              <tr>
                {columnas.map((col, idx) => (
                  <th key={idx} className="p-4 border">
                    <div className="flex items-center justify-center gap-2">
                      <span>{col.toUpperCase()}</span>
                      <button onClick={(e) => toggleFiltro(col, e)}>
                        <IconFilter className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                <th className="p-4 border">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((finca, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 border">{finca.nombre}</td>
                  <td className="p-4 border">{finca.ubicacion}</td>
                  <td className="p-4 border">{finca.coordenadas}</td>
                  <td className="p-4 border">{finca.area}</td>
                  <td className="p-4 border">
                    <button onClick={(e) => mostrarTarjeta(idx, e)}>
                      <IconDotsVertical className="w-5 h-5" />
                    </button>
                    {visibleTarjeta === idx && (
                      <div ref={filtroRef} className="fixed bg-white border shadow-lg rounded-md z-50 w-44 py-2" style={{ top: posicionTarjeta.top, left: posicionTarjeta.left }}>
                        <div onClick={() => navigate("/editarfinca")} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black gap-2">
                          <IconEdit className="w-4 h-4 text-blue-600" /> <span>Editar</span>
                        </div>
                        <div className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-red-600 gap-2">
                          <IconTrash className="w-4 h-4" /> <span>Eliminar</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Filtro */}
          {filtroActivo && (
            <div ref={filtroRef} className="fixed bg-white text-black shadow-md border rounded z-50 p-3 w-60 text-left text-sm" style={{ top: posicionTarjeta.top, left: posicionTarjeta.left }}>
              <div className="font-semibold mb-2 capitalize">Filtrar por {filtroActivo}</div>
              <input
                type="text"
                placeholder="Buscar..."
                value={busquedas[filtroActivo] || ""}
                onChange={(e) => setBusquedas({ ...busquedas, [filtroActivo]: e.target.value })}
                className="w-full px-2 py-1 border rounded mb-2 text-sm"
              />
              <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
                {getValoresUnicos(filtroActivo).map((val, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-green-600" checked={(valoresSeleccionados[filtroActivo] || []).includes(val)} onChange={() => toggleValor(filtroActivo, val)} />
                    {val}
                  </label>
                ))}
              </div>
              <button onClick={() => limpiarFiltro(filtroActivo)} className="text-blue-600 hover:underline text-xs mt-2">
                Borrar filtro
              </button>
            </div>
          )}
        </div>

        {/* Botón guardar cambios */}
        <div className="flex justify-center mt-6">
          <button className="bg-green-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-green-700 font-bold">
            Guardar cambios
          </button>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Crear_finca_agro;
