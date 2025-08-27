import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home_mayo from "../pages/mayordomo/Home_mayo";
import Regis_labores from "../pages/mayordomo/Regis_labores";
import Historial_labor from "../pages/mayordomo/Historial_labor";
import Bodega_insu from "../pages/mayordomo/Bodega_insu";
import Detalle_produc from "../pages/mayordomo/Detalle_produc";
import Variables_climam from "../pages/mayordomo/Variables_climam";
import Registrar_vclima from "../pages/mayordomo/Registrar_vclima";
import Informes_mayor from "../pages/mayordomo/Informes_mayor";
import Equipos_mayor from "../pages/mayordomo/Equipos_mayor";
import Hoja_vidam from "../pages/mayordomo/Hoja_vidam";
import Registrar_novedad_hoja from "../pages/mayordomo/Registrar_novedad_hoja";
import Historial_trabajom from "../pages/mayordomo/Historial_trabajom";
import Registrar_novedad from "../pages/mayordomo/Registrar_novedad";
import Soporte_mayordomo from "../pages/mayordomo/Soporte_mayordomo";
import Ajustes_mayordomo from "../pages/mayordomo/Ajustes_mayordomo";
import Produccion_mayor from "../pages/mayordomo/Produccion_mayor";
import Historial_cuadernoc from "../pages/mayordomo/Historial_cuadernoc";
import Detalle_mantenimientom from "../pages/mayordomo/Detalle_mantenimientom";
import Registrarticketm from "../pages/mayordomo/Registrarticketm";
import Detalles_ticketm from "../pages/mayordomo/Detalle_ticketm";
import Programacion_labores from "../pages/mayordomo/Programacion_labores";
import Manejo_fitosanitariom from "../pages/mayordomo/Manejo_fitosanitariom";
import Registro_campom from "../pages/mayordomo/Registro_campom";
import Seguimiento_laboresm from "../pages/mayordomo/Seguimiento_laboresm";
import Detalle_registrocampom from "../pages/mayordomo/Detalle_registrocampom";
import Detalle_laborm from "../pages/mayordomo/Detalle_laborm";
import Registrar_labor_maquinariam from "../pages/mayordomo/Registrar_labor_maquinariam";


const mayordomoRoutes = [
  <Route key="home" path="/homemayordomo" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Home_mayo /></ProtectedRoute>} />,
  <Route key="registro-labores" path="/registrolabores" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Regis_labores /></ProtectedRoute>} />,
  <Route key="historial-labores" path="/historial_labores" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Historial_labor /></ProtectedRoute>} />,
  <Route key="bodega-insumos" path="/bodega_insumos" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Bodega_insu /></ProtectedRoute>} />,
  <Route key="detalle-producto" path="/detalle_producto" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Detalle_produc /></ProtectedRoute>} />,
  <Route key="variables-clima" path="/variables_climaticasm" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Variables_climam /></ProtectedRoute>} />,
  <Route key="registrar-clima" path="/registrar_climam" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Registrar_vclima /></ProtectedRoute>} />,
  <Route key="informes-mayor" path="/informes_mayordomo" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Informes_mayor /></ProtectedRoute>} />,
  <Route key="equipos" path="/equipos_mayordomo" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Equipos_mayor /></ProtectedRoute>} />,
  <Route key="hoja-vida" path="/hoja_vidam/:id" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Hoja_vidam /></ProtectedRoute>} />,
  <Route key="registrar-novedadhoja" path="/registrarnovedadhvm/:id" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Registrar_novedad_hoja /></ProtectedRoute>} />,
  <Route key="historial-trabajo" path="/historial_trabajom/:id" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Historial_trabajom /></ProtectedRoute>} />,
  <Route key="regisnovedad" path="/registrar_novedadm" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Registrar_novedad /></ProtectedRoute>} />,
  <Route key="soporte-mayordomo" path="/soportemayordomo" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Soporte_mayordomo /></ProtectedRoute>} />,
  <Route key="registrarticketm" path="/registrarticketm" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Registrarticketm /></ProtectedRoute>} />, 
  <Route key="ajustes-mayordomo" path="/ajustesmayordomo" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Ajustes_mayordomo /></ProtectedRoute>} />,
  <Route key="Produccion-mayor" path="/produccion_mayor" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Produccion_mayor /></ProtectedRoute>} />,
  <Route key="historialcuadernoc" path="/historial_cuadernoc" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Historial_cuadernoc /></ProtectedRoute>} />,
  <Route key="detalle-mantenimientom" path="/detallemantenimientom/:id" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Detalle_mantenimientom /></ProtectedRoute>} />,
  <Route key="detalles-ticketm" path="/detallesticketm" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Detalles_ticketm /></ProtectedRoute>} />,
  <Route key="programacionlabores" path="/programacion_labores" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Programacion_labores /></ProtectedRoute>} />,
  <Route key="manejofitosanitariom" path="/manejo_fitosanitariom" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Manejo_fitosanitariom /></ProtectedRoute>} />,
  <Route key="registrocampom" path="/registro_campom" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Registro_campom /></ProtectedRoute>} />,
  <Route key="seguimientolaboresm" path="/seguimiento_laboresm" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Seguimiento_laboresm /></ProtectedRoute>} />,
  <Route key="detalleregistrocampom" path="/detalle_registrocampom" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Detalle_registrocampom /></ProtectedRoute>} />,
  <Route key="detallelabor" path="/detalle_laborm" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Detalle_laborm /></ProtectedRoute>} />,
  <Route key="Registrar-labor-maquinariam" path="/registrarlabormaquinariam/:id" element={<ProtectedRoute allowedRoles={["admin","mayordomo"]}><Registrar_labor_maquinariam /></ProtectedRoute>} />,

];

export default mayordomoRoutes;
