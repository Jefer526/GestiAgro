import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import C_correo from "./pages/auth/recover/C_correo";
import E_cuenta from "./pages/auth/recover/E_cuenta";
import C_codigo from "./pages/auth/recover/C_codigo";
import N_contraseña from "./pages/auth/recover/N_contraseña";
import Soporte from "./pages/auth/recover/Soporte";
import Home_adm from "./pages/administrador/Home_adm";
import Admin_usuarios from "./pages/administrador/Admin_usuarios";
import Copias_segu from "./pages/administrador/Copias_segu";
import Soporte_adm from "./pages/administrador/Soporte_adm";
import Ajustes_adm from "./pages/administrador/Ajustes_adm";
import EditarRolUser from "./pages/administrador/Editar_roluser";
import Seleccion_rol from "./pages/Seleccion_rol";
import Home_agro from "./pages/agronomo/Home_agro";
import Labores_agro from "./pages/agronomo/Labores_agro";
import Historial_labores from "./pages/agronomo/Historial_labores";
import Informes_agro from "./pages/agronomo/Informes_agro";
import Bodega_agro from "./pages/agronomo/Bodega_agro";
import Detalles_agrop from "./pages/agronomo/Detalles_agrop";
import Agregar_producto from "./pages/agronomo/Agregar_producto";
import Variables_climaticas from "./pages/agronomo/Variables_climaticas";
import Registrar_clima from "./pages/agronomo/Registrar_clima";
import Maquinaria_equipos from "./pages/agronomo/Maquinaria_equipos";
import Registrar_maquina from "./pages/agronomo/Registrar_maquina";
import Actualizar_maquina from "./pages/agronomo/Actualizar_maquina";
import Hoja_vida_agro from "./pages/agronomo/Hoja_vida_agro";
import Registrar_mantenimiento from "./pages/agronomo/Registrar_mantenimiento";
import Historial_trabajo_agro from "./pages/agronomo/Historial_trabajo_agro";
import Manejo_personal_agro from "./pages/agronomo/Manejo_personal_agro";
import Registrar_empleado from "./pages/agronomo/Registrar_empleado";
import Actualizar_estado from "./pages/agronomo/Actualizar_estado";
import Crear_finca_agro from "./pages/agronomo/Crear_finca_agro";
import Crear_lote_agro from "./pages/agronomo/Crear_lote_agro";
import Editar_finca from "./pages/agronomo/Editar_finca";
import Editar_lote from "./pages/agronomo/Editar_lote";
import Editar_copias_segu from "./pages/administrador/Editar_copias_segu";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/crear-cuenta" element={<Register />} />
      <Route path="/confirmar-correo" element={<C_correo />} />
      <Route path="/recuperar-cuenta" element={<E_cuenta />} />
      <Route path="/confirmar-codigo" element={<C_codigo />} />
      <Route path="/nueva-contraseña" element={<N_contraseña />} />
      <Route path="/soporte_user" element={<Soporte />} />
      <Route path="/Ajustesadm" element={<Ajustes_adm />} />
      <Route path="/Homeadm" element={<Home_adm />} />
      <Route path="/Admuser" element={<Admin_usuarios />} />
      <Route path="/copias" element={<Copias_segu />} />
      <Route path="/soporte" element={<Soporte_adm />} />
      <Route path="/editar-roluser/:id" element={<EditarRolUser />} />
      <Route path="/seleccion-rol" element={<Seleccion_rol />} />
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
      <Route path="/registrar_mantenimiento" element={<Registrar_mantenimiento />} />
      <Route path="/historialtrabajo" element={<Historial_trabajo_agro />} />
      <Route path="/manejopersonal" element={<Manejo_personal_agro />} />
      <Route path="/registrarempleado" element={<Registrar_empleado />} />
      <Route path="/actualizarestado" element={<Actualizar_estado />} />
      <Route path="/crearfinca" element={<Crear_finca_agro />} />
      <Route path="/crearlote" element={<Crear_lote_agro />} />
      <Route path="/editarfinca" element={<Editar_finca />} />
      <Route path="/editarlote" element={<Editar_lote />} />
      <Route path="/editarcopiassegu" element={<Editar_copias_segu />} />

      <Route path="/homemayordomo" element={<Home_mayo />} />
      <Route path="/registrolabores" element={<Regis_labores />} />
      <Route path="/historial_labores" element={<Historial_labor />} />
      <Route path="/bodega_insumos" element={<Bodega_insu />} />
      <Route path="/detalle_producto" element={<Detalle_produc />} />
      <Route path="/variables_climaticasm" element={<Variables_climam />} />
      <Route path="/registrar_climam" element={<Registrar_vclima />} />
      <Route path="/informes_mayordomo" element={<Informes_mayor />} />
      <Route path="/equipos_mayordomo" element={<Equipos_mayor />} />
      <Route path="/actualizar_estado_maquina" element={<Actualizar_estado_maquina />} />
      <Route path="/registrar_mantenimiento" element={<Registrar_mante />} />
      <Route path="/historial_trabajom" element={<Historial_trabajom />} />
      <Route path="/hoja_vidam" element={<Hoja_vidam />} />

    </Routes>
  );z
}

export default App;



