import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home_adm from "../pages/administrador/Home_adm";
import Admin_usuarios from "../pages/administrador/Admin_usuarios";
import EditarRolUser from "../pages/administrador/Editar_roluser";
import Copias_segu from "../pages/administrador/Copias_segu";
import Editar_copias from "../pages/administrador/Editar_copias";
import Soporte_adm from "../pages/administrador/Soporte_adm";
import Detalles_ticket from "../pages/administrador/Detalles_ticket";
import Ajustes_adm from "../pages/administrador/Ajustes_adm";

const adminRoutes = [
  <Route
    key="home"
    path="/Homeadm"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Home_adm />
      </ProtectedRoute>
    }
  />,
  <Route
    key="usuarios"
    path="/Admuser"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Admin_usuarios />
      </ProtectedRoute>
    }
  />,
  <Route
    key="editar-rol"
    path="/editar-roluser/:id"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <EditarRolUser />
      </ProtectedRoute>
    }
  />,
  <Route
    key="copias"
    path="/copias"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Copias_segu />
      </ProtectedRoute>
    }
  />,
  <Route
    key="editar-copias"
    path="/editarcopiassegu"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Editar_copias />
      </ProtectedRoute>
    }
  />,
  <Route
    key="soporte"
    path="/soporte"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Soporte_adm />
      </ProtectedRoute>
    }
  />,
  <Route
    key="detalles"
    path="/detallesticket"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Detalles_ticket />
      </ProtectedRoute>
    }
  />,
  <Route
    key="ajustes"
    path="/Ajustesadm"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <Ajustes_adm />
      </ProtectedRoute>
    }
  />,
];

export default adminRoutes;
