// src/pages/agronomo/Gestion_mayordomos.jsx
import React, { useState, useEffect } from "react";
import { IconUserCog } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import api from "../../services/apiClient";

const Gestion_mayordomos = () => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [fincas, setFincas] = useState([]);

  // 👉 Traer todos los usuarios y filtrar mayordomos
  useEffect(() => {
    api.get("/api/accounts/users/")
      .then(res => {
        const soloMayordomos = res.data.filter(u => u.rol === "mayordomo");
        setUsuarios(soloMayordomos);
      })
      .catch(err => console.error("Error cargando usuarios:", err));

    api.get("/api/fincas/")
      .then(res => setFincas(res.data))
      .catch(err => console.error("Error cargando fincas:", err));
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "activo": return "bg-green-200 text-green-800 font-semibold px-2 py-1 rounded";
      case "inactivo": return "bg-gray-200 text-gray-700 font-semibold px-2 py-1 rounded";
      default: return "";
    }
  };

  const handleAsignarFinca = (usuarioId, fincaId) => {
    api.patch(`/api/accounts/users/${usuarioId}/`, { finca_asignada: parseInt(fincaId, 10) }) // 👈 asegurar que sea número
      .then(res => {
        setUsuarios(prev =>
          prev.map(u =>
            u.id === usuarioId ? { ...u, finca_asignada: res.data.finca_asignada } : u
          )
        );
      })
      .catch(err => console.error("Error asignando finca:", err));
  };

  return (
    <LayoutAgronomo>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Gestión de Mayordomos
        </h1>
        <button
          onClick={() => navigate("/manejopersonal")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold shadow"
        >
          <IconUserCog className="w-5 h-5" />
          Volver a personal
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-center text-base bg-white">
          <thead className="bg-green-600 text-white font-bold">
            <tr>
              <th className="p-4 border">NOMBRE</th>
              <th className="p-4 border">ROL</th>
              <th className="p-4 border">ESTADO</th>
              <th className="p-4 border">FINCA</th>
              <th className="p-4 border">TELÉFONO</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="hover:bg-gray-100">
                <td className="p-4 border">{u.nombre}</td>
                <td className="p-4 border capitalize">{u.rol}</td>
                <td className="p-4 border">
                  <span className={getEstadoColor(u.is_active ? "activo" : "inactivo")}>
                    {u.is_active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="p-4 border">
                  <select
                    value={u.finca_asignada?.id || ""}
                    onChange={(e) => handleAsignarFinca(u.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">-- Seleccionar finca --</option>
                    {fincas.map(f => (
                      <option key={f.id} value={f.id}>
                        {f.nombre}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 border">{u.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutAgronomo>
  );
};

export default Gestion_mayordomos;
