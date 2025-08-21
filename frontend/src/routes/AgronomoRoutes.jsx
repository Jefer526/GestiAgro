import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home_agro from "../pages/agronomo/home_agro";
import Labores_agro from "../pages/agronomo/Labores_agro";
import Historial_labores from "../pages/agronomo/Historial_labores";
import Informes_agro from "../pages/agronomo/Informes_agro";
import Bodega_agro from "../pages/agronomo/Bodega_agro";
import Detalles_agrop from "../pages/agronomo/Detalles_agrop";
import Agregar_producto from "../pages/agronomo/Agregar_producto";
import Variables_climaticas from "../pages/agronomo/Variables_climaticas";
import Registrar_clima from "../pages/agronomo/Registrar_clima";
import Maquinaria_equipos from "../pages/agronomo/Maquinaria_equipos";
import Registrar_maquina from "../pages/agronomo/Registrar_maquina";
import Registrar_novedad_agro from "../pages/agronomo/Registrar_novedad_agro";
import Hoja_vida_agro from "../pages/agronomo/Hoja_vida_agro";
import Historial_trabajo_agro from "../pages/agronomo/Historial_trabajo_agro";
import Registrar_novedad_hv from "../pages/agronomo/Registrar_novedad_hv";
import Manejo_personal_agro from "../pages/agronomo/Manejo_personal_agro";
import Registrar_empleado from "../pages/agronomo/Registrar_empleado";
import Editar_empleado from "../pages/agronomo/Editar_empleado";
import Crear_finca_agro from "../pages/agronomo/Crear_finca_agro";
import Crear_lote_agro from "../pages/agronomo/Crear_lote_agro";
import Detalle_lote_agro from "../pages/agronomo/Detalle_lote_agro";
import Editar_finca from "../pages/agronomo/Editar_finca";
import Soporte_agro from "../pages/agronomo/Soporte_agro";
import Ajustes_agro from "../pages/agronomo/Ajustes_agro";
import Detalle_mantenimiento from "../pages/agronomo/Detalle_mantenimiento";
import Produccion_agro from "../pages/agronomo/Produccion_agro";
import Cuaderno_campo_agro from "../pages/agronomo/Cuaderno_campo_agro";
import Registrarticketag from "../pages/agronomo/Registrarticketag"; 
import Detalles_ticketa from "../pages/agronomo/Detalle_ticketa";
import Gestion_fincas from "../pages/agronomo/Gestion_fincas";
import Manejo_fitosanitario from "../pages/agronomo/Manejo_fitosanitario";
import Historial_labor_agro from "../pages/agronomo/Historial_labor_agro";
import Historial_campo_agro from "../pages/agronomo/Historial_campo_agro";
import Detalle_campo_agro from "../pages/agronomo/Detalle_campo_agro";
import Gestion_mayordomos from "../pages/agronomo/Gestion_mayordomo";


const agronomoRoutes = [
  <Route key="home" path="/homeagro" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Home_agro /></ProtectedRoute>} />,
  <Route key="labores" path="/Laboresagro" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Labores_agro /></ProtectedRoute>} />,
  <Route key="historial-labores" path="/historial" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Historial_labores /></ProtectedRoute>} />,
  <Route key="informes" path="/Informesagro" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Informes_agro /></ProtectedRoute>} />,
  <Route key="bodega" path="/Bodegaagro" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Bodega_agro /></ProtectedRoute>} />,
  <Route key="detalles" path="/Detallesagrop" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Detalles_agrop /></ProtectedRoute>} />,
  <Route key="agregar-producto" path="/agregarproducto" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Agregar_producto /></ProtectedRoute>} />,
  <Route key="variables-clima" path="/variablesclimaticas" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Variables_climaticas /></ProtectedRoute>} />,
  <Route key="registrar-clima" path="/Registrarclima" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Registrar_clima /></ProtectedRoute>} />,
  <Route key="maquinaria" path="/maquinariaequipos" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Maquinaria_equipos /></ProtectedRoute>} />,
  <Route key="registrar-maquina" path="/registrarmaquina" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Registrar_maquina /></ProtectedRoute>} />,
  <Route key="registrar-novedad-agro" path="/registrarnovedad" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Registrar_novedad_agro /></ProtectedRoute>} />,
  <Route key="hoja-vida" path="/hojadevida" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Hoja_vida_agro /></ProtectedRoute>} />,
  <Route key="historial-trabajo" path="/historialtrabajo" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Historial_trabajo_agro /></ProtectedRoute>} />,
  <Route key="registrar-novedad-hv" path="/registrarnovedadhv" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Registrar_novedad_hv /></ProtectedRoute>} />,
  <Route key="manejo-personal" path="/manejopersonal" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Manejo_personal_agro /></ProtectedRoute>} />,
  <Route key="registrar-empleado" path="/registrarempleado" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Registrar_empleado /></ProtectedRoute>} />,
  <Route key="editar-empleado" path="/editarempleado/:id" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Editar_empleado /></ProtectedRoute>} />,
  <Route key="crear-finca" path="/crearfinca" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Crear_finca_agro /></ProtectedRoute>} />,
  <Route key="crear-lote" path="/crearlote/:fincaId" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Crear_lote_agro /></ProtectedRoute>} />,
  <Route key="Detalle-lote" path="/Detallelote/:fincaId/:loteId" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Detalle_lote_agro /></ProtectedRoute>} />,
  <Route key="editar-finca" path="/editarfinca/:id" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Editar_finca /></ProtectedRoute>} />,
  <Route key="soporte-agro" path="/soporteagro" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Soporte_agro /></ProtectedRoute>} />,
  <Route key="registrar-ticket-agro" path="/registrarticketag" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Registrarticketag /></ProtectedRoute>} />,
  <Route key="ajustes-agro" path="/ajustesagro" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Ajustes_agro /></ProtectedRoute>} />,
  <Route key="detalle-mantenimiento" path="/detalle_mantenimiento" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Detalle_mantenimiento /></ProtectedRoute>} />,
  <Route key="produccion-agro" path="/produccionagro" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Produccion_agro /></ProtectedRoute>} />,
  <Route key="cuaderno-campo-agro" path="/cuadernocampo" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Cuaderno_campo_agro /></ProtectedRoute>} />,
  <Route key="detalles-ticketa" path="/detallesticketa" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Detalles_ticketa /></ProtectedRoute>} />,
  <Route key="gestion-fincas" path="/gestionfincas" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Gestion_fincas /></ProtectedRoute>} />,
  <Route key="manejo-fitosanitario" path="/manejofitosanitario" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Manejo_fitosanitario /></ProtectedRoute>} />,
  <Route key="historial-labor-agro" path="/historialagro" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Historial_labor_agro /></ProtectedRoute>} />,
  <Route key="historial-campo-agro" path="/historialcampo" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Historial_campo_agro /></ProtectedRoute>} />,
  <Route key="detalle-campo-agro" path="/detallecampo" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Detalle_campo_agro /></ProtectedRoute>} />,
  <Route key="gestion-mayordomos" path="/gestionmayordomo" element={<ProtectedRoute allowedRoles={["admin", "agronomo"]}><Gestion_mayordomos /></ProtectedRoute>} />,
];

export default agronomoRoutes;
