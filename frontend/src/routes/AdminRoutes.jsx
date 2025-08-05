import { Route } from "react-router-dom";

import Home_adm from "../pages/administrador/Home_adm";
import Admin_usuarios from "../pages/administrador/Admin_usuarios";
import EditarRolUser from "../pages/administrador/Editar_roluser";
import Copias_segu from "../pages/administrador/Copias_segu";
import Editar_copias from "../pages/administrador/Editar_copias";
import Soporte_adm from "../pages/administrador/Soporte_adm";
import Ajustes_adm from "../pages/administrador/Ajustes_adm";

const adminRoutes = [
  <Route key="home" path="/Homeadm" element={<Home_adm />} />,
  <Route key="usuarios" path="/Admuser" element={<Admin_usuarios />} />,
  <Route key="editar-rol" path="/editar-roluser/:id" element={<EditarRolUser />} />,
  <Route key="copias" path="/copias" element={<Copias_segu />} />,
  <Route key="editar-copias" path="/editarcopiassegu" element={<Editar_copias />} />,
  <Route key="soporte" path="/soporte" element={<Soporte_adm />} />,
  <Route key="ajustes" path="/Ajustesadm" element={<Ajustes_adm />} />,
];

export default adminRoutes;
