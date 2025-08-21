// src/pages/agronomo/Manejo_personal_agro.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconFilter,
  IconSortAscending2,
  IconSortDescending2,
  IconPencil,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Manejo_personal_agro = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  const [trabajadores, setTrabajadores] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState(null);
  const [filtroPosicion, setFiltroPosicion] = useState({ top: 0, left: 0 });
  const [busquedas, setBusquedas] = useState({});
  const [valoresSeleccionados, setValoresSeleccionados] = useState({});
  const [ordenCampo, setOrdenCampo] = useState(null);

  const columnas = ["codigo", "nombre", "cargo", "estado", "finca_nombre", "telefono"];

  useEffect(() => {
    api.get("/api/trabajadores/")
      .then(res => setTrabajadores(res.data))
      .catch(err => console.error("Error cargando trabajadores:", err));
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case "activo": return "bg-green-200 text-green-800 font-semibold px-2 py-1 rounded";
      case "inactivo": return "bg-gray-200 text-gray-700 font-semibold px-2 py-1 rounded";
      case "vacaciones": return "bg-yellow-200 text-yellow-800 font-semibold px-2 py-1 rounded";
      case "suspendido": return "bg-red-200 text-red-800 font-semibold px-2 py-1 rounded";
      default: return "";
    }
  };

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

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
                  {campo === "codigo" ? "CÓDIGO EMPLEADO"
                   : campo === "finca_nombre" ? "FINCA"
                   : campo.toUpperCase()}
                </th>
              ))}
              <th className="p-4 border">OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {trabajadores.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-100">
                <td className="p-4 border">{emp.codigo}</td>
                <td className="p-4 border">{emp.nombre}</td>
                <td className="p-4 border">{emp.cargo}</td>
                <td className="p-4 border">
                  <span className={getEstadoColor(emp.estado)}>
                    {capitalize(emp.estado)}
                  </span>
                </td>
                <td className="p-4 border">{emp.finca_nombre}</td>
                <td className="p-4 border">{emp.telefono}</td>
                <td className="p-4 border">
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate(`/editarempleado/${emp.id}`)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <IconPencil className="w-4 h-4" /> Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-8 mt-8">
        <button
          onClick={() => navigate("/registrarempleado")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 text-lg font-semibold"
        >
          Registrar empleado
        </button>
      </div>
    </LayoutAgronomo>
  );
};

export default Manejo_personal_agro;
