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
import Home_mayo from "./pages/mayordomo/Home_mayo";
import Regis_labores from "./pages/mayordomo/Regis_labores";
import Historial_labor from "./pages/mayordomo/Historial_labor";
import Bodega_insu from "./pages/mayordomo/Bodega_insu";
import Detalle_produc from "./pages/mayordomo/Detalle_produc";
import Agregar_prodm from "./pages/mayordomo/Agregar_prodm";
import Variables_climam from "./pages/mayordomo/Variables_climam";
import Registrar_vclima from "./pages/mayordomo/Registrar_vclima";
import Informes_mayor from "./pages/mayordomo/Informes_mayor";
import Equipos_mayor from "./pages/mayordomo/Equipos_mayor";
import Actualizar_estado_maquina from "./pages/mayordomo/Actualizar_estado_maquina";
import Historial_trabajom from "./pages/mayordomo/Historial_trabajom";
import Hoja_vidam from "./pages/mayordomo/Hoja_vidam";


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
      <Route path="/homemayordomo" element={<Home_mayo />} />
      <Route path="/registrolabores" element={<Regis_labores />} />
      <Route path="/historial_labores" element={<Historial_labor />} />
      <Route path="/bodega_insumos" element={<Bodega_insu />} />
      <Route path="/detalle_producto" element={<Detalle_produc />} />
      <Route path="/agregar_productom" element={<Agregar_prodm />} />
      <Route path="/variables_climaticasm" element={<Variables_climam />} />
      <Route path="/registrar_climam" element={<Registrar_vclima />} />
      <Route path="/informes_mayordomo" element={<Informes_mayor />} />
      <Route path="/equipos_mayordomo" element={<Equipos_mayor />} />
      <Route path="/actualizar_estado_maquina" element={<Actualizar_estado_maquina />} />
      <Route path="/historial_trabajom" element={<Historial_trabajom />} />
      <Route path="/hoja_vidam" element={<Hoja_vidam />} />

    </Routes>
  );
}

export default App;



