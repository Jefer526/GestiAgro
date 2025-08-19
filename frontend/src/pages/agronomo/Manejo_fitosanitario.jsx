// src/pages/agronomo/Manejo_fitosanitario.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconFilter,
  IconPlus,
  IconEdit,
  IconTrash,
  IconBug,
  IconVaccine,
  IconLeaf,
} from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";

const Manejo_fitosanitario = () => {
  const navigate = useNavigate();
  const filtroRef = useRef(null);

  // Columnas principales
  const columnas = [
    "Fecha",
    "Lote",
    "Tipo",
    "Plaga/Enfermedad",
    "Producto aplicado",
    "Dosis",
    "Estado",
  ];

  // Datos de ejemplo
  const [registros, setRegistros] = useState([
    {
      fecha: "2025-08-10",
      lote: "1",
      tipo: "Plaga",
      nombre: "Arañita roja",
      producto: "Abamectina 1.8 EC",
      dosis: "200 ml/ha",
      estado: "Controlado",
    },
    {
      fecha: "2025-08-12",
      lote: "2",
      tipo: "Enfermedad",
      nombre: "Antracnosis",
      producto: "Clorotalonil 720 SC",
      dosis: "1.5 L/ha",
      estado: "En seguimiento",
    },
  ]);

  return (
    <LayoutAgronomo>
      <div className="p-6">
        {/* 🔹 Título y botón nuevo */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <IconLeaf className="w-8 h-8 text-green-600" />
            Manejo Fitosanitario
          </h1>
          <button
            onClick={() => alert("Registrar nuevo control fitosanitario")}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            <IconPlus className="w-5 h-5" /> Nuevo Registro
          </button>
        </div>

        {/* 🔹 Filtros */}
        <div className="flex gap-4 mb-6">
          <select className="border rounded-lg px-3 py-2">
            <option value="">Filtrar por Tipo</option>
            <option value="Plaga">Plaga</option>
            <option value="Enfermedad">Enfermedad</option>
          </select>
          <select className="border rounded-lg px-3 py-2">
            <option value="">Filtrar por Estado</option>
            <option value="Controlado">Controlado</option>
            <option value="En seguimiento">En seguimiento</option>
            <option value="No controlado">No controlado</option>
          </select>
          <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            <IconFilter className="w-5 h-5" /> Aplicar filtros
          </button>
        </div>

        {/* 🔹 Tabla de registros */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-green-100">
              <tr>
                {columnas.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border"
                  >
                    {col}
                  </th>
                ))}
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 border">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors border-b"
                >
                  <td className="px-4 py-2">{r.fecha}</td>
                  <td className="px-4 py-2">{r.lote}</td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    {r.tipo === "Plaga" ? (
                      <IconBug className="w-5 h-5 text-red-600" />
                    ) : (
                      <IconVaccine className="w-5 h-5 text-blue-600" />
                    )}
                    {r.tipo}
                  </td>
                  <td className="px-4 py-2">{r.nombre}</td>
                  <td className="px-4 py-2">{r.producto}</td>
                  <td className="px-4 py-2">{r.dosis}</td>
                  <td className="px-4 py-2">{r.estado}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <IconEdit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <IconTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAgronomo>
  );
};

export default Manejo_fitosanitario;
