import { Route } from "react-router-dom";
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
import Editar_finca from "../pages/agronomo/Editar_finca";
import Crear_lote_agro from "../pages/agronomo/Crear_lote_agro";
import Editar_lote from "../pages/agronomo/Editar_lote";
import Soporte_agro from "../pages/agronomo/Soporte_agro";
import Ajustes_agro from "../pages/agronomo/Ajustes_agro";
import Detalle_mantenimiento from "../pages/agronomo/Detalle_mantenimiento";
import Produccion_agro from "../pages/agronomo/Produccion_agro";


const agronomoRoutes = [
  <Route key="home" path="/Homeagro" element={<Home_agro />} />,
  <Route key="labores" path="/Laboresagro" element={<Labores_agro />} />,
  <Route key="historial-labores" path="/historial" element={<Historial_labores />} />,
  <Route key="informes" path="/Informesagro" element={<Informes_agro />} />,
  <Route key="bodega" path="/Bodegaagro" element={<Bodega_agro />} />,
  <Route key="detalles" path="/Detallesagrop" element={<Detalles_agrop />} />,
  <Route key="agregar-producto" path="/agregarproducto" element={<Agregar_producto />} />,
  <Route key="variables-clima" path="/variablesclimaticas" element={<Variables_climaticas />} />,
  <Route key="registrar-clima" path="/Registrarclima" element={<Registrar_clima />} />,
  <Route key="maquinaria" path="/maquinariaequipos" element={<Maquinaria_equipos />} />,
  <Route key="registrar-maquina" path="/registrarmaquina" element={<Registrar_maquina />} />,
  <Route key="registrar-novedad-agro" path="/registrarnovedad" element={<Registrar_novedad_agro />} />,
  <Route key="hoja-vida" path="/hojadevida" element={<Hoja_vida_agro />} />,
  <Route key="historial-trabajo" path="/historialtrabajo" element={<Historial_trabajo_agro />} />,
  <Route key="registrar-novedad-hv" path="/registrarnovedadhv" element={<Registrar_novedad_hv />} />,
  <Route key="manejo-personal" path="/manejopersonal" element={<Manejo_personal_agro />} />,
  <Route key="registrar-empleado" path="/registrarempleado" element={<Registrar_empleado />} />,
  <Route key="editar-empleado" path="/editarempleado" element={<Editar_empleado />} />,
  <Route key="crear-finca" path="/crearfinca" element={<Crear_finca_agro />} />,
  <Route key="editar-finca" path="/editarfinca" element={<Editar_finca />} />,
  <Route key="crear-lote" path="/crearlote" element={<Crear_lote_agro />} />,
  <Route key="editar-lote" path="/editarlote" element={<Editar_lote />} />,
  <Route key="soporte-agro" path="/soporteagro" element={<Soporte_agro />} />,
  <Route key="ajustes-agro" path="/ajustesagro" element={<Ajustes_agro />} />,
  <Route key="detalle-mantenimiento" path="/detalle_mantenimiento" element={<Detalle_mantenimiento />} />,
  <Route key="produccion-agro" path="/produccionagro" element={<Produccion_agro />} />,
  
];

export default agronomoRoutes;
