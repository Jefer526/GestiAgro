import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/apiClient"; // ✅ Usamos api centralizado

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/accounts/me/") // ✅ ruta correcta
      .then((res) => {
        console.log("✅ Rol recibido desde backend:", res.data.rol);
        setRol(res.data.rol);
      })
      .catch((err) => {
        console.error("❌ Error al obtener rol:", err);
        setRol(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log("🔍 Estado ProtectedRoute:", { rol, allowedRoles, loading });

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>Cargando permisos...</h3>
      </div>
    );
  }

  if (rol && allowedRoles.includes(rol)) {
    return children;
  }

  return <Navigate to="/no-autorizado" replace />;
};

export default ProtectedRoute;
