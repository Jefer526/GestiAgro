import { Route } from "react-router-dom";
import Home_agro from "../pages/agronomo/Home_agro";
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
import Actualizar_maquina from "../pages/agronomo/Actualizar_maquina";
import Hoja_vida_agro from "../pages/agronomo/Hoja_vida_agro";
import Historial_trabajo_agro from "../pages/agronomo/Historial_trabajo_agro";
import Registrar_mantenimiento from "../pages/agronomo/Registrar_mantenimiento";
import Manejo_personal_agro from "../pages/agronomo/Manejo_personal_agro";
import Registrar_empleado from "../pages/agronomo/Registrar_empleado";
import Actualizar_estado from "../pages/agronomo/Actualizar_estado";
import Crear_finca_agro from "../pages/agronomo/Crear_finca_agro";
import Editar_finca from "../pages/agronomo/Editar_finca";
import Crear_lote_agro from "../pages/agronomo/Crear_lote_agro";
import Editar_lote from "../pages/agronomo/Editar_lote";

const AgronomoRoutes = () => (
  <>
      <Route path="/Homeagro" element={<Home_agro />} />
      <Route path="/Laboresagro" element={<Labores_agro />} />
      <Route path="/historial" element={<Historial_labores />} />
      <Route path="/Informesagro" element={<Informes_agro />} />
      <Route path="/Bodegaagro" element={<Bodega_agro />} />
      <Route path="/Detallesagrop" element={<Detalles_agrop />} />
      <Route path="/agregarproducto" element={<Agregar_producto />} />
      <Route path="/variablesclimaticas" element={<Variables_climaticas />} />
      <Route path="/Registrarclima" element={<Registrar_clima />} />
      <Route path="/maquinariaequipos" element={<Maquinaria_equipos />} />
      <Route path="/registrarmaquina" element={<Registrar_maquina />} />
      <Route path="/actualizarmaquina" element={<Actualizar_maquina />} />
      <Route path="/hojadevida" element={<Hoja_vida_agro />} />
      <Route path="/historialtrabajo" element={<Historial_trabajo_agro />} />
      <Route path="/registrar_mantenimiento" element={<Registrar_mantenimiento />} />
      <Route path="/manejopersonal" element={<Manejo_personal_agro />} />
      <Route path="/registrarempleado" element={<Registrar_empleado />} />
      <Route path="/actualizarestado" element={<Actualizar_estado />} />
      <Route path="/crearfinca" element={<Crear_finca_agro />} />
      <Route path="/editarfinca" element={<Editar_finca />} />
      <Route path="/crearlote" element={<Crear_lote_agro />} />
      <Route path="/editarlote" element={<Editar_lote />} />
  </>
  );

export default AgronomoRoutes;