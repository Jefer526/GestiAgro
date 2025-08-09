import { Route } from "react-router-dom";
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
import Registrar_mante from "../pages/mayordomo/Registrar_mante";
import Historial_trabajom from "../pages/mayordomo/Historial_trabajom";
import Actualizar_estado_maquina from "../pages/mayordomo/Actualizar_estado_maquina";
import Soporte_mayordomo from "../pages/mayordomo/Soporte_mayordomo";
import Ajustes_mayordomo from "../pages/mayordomo/Ajustes_mayordomo";

const mayordomoRoutes = [
  <Route key="home" path="/homemayordomo" element={<Home_mayo />} />,
  <Route key="registro-labores" path="/registrolabores" element={<Regis_labores />} />,
  <Route key="historial-labores" path="/historial_labores" element={<Historial_labor />} />,
  <Route key="bodega-insumos" path="/bodega_insumos" element={<Bodega_insu />} />,
  <Route key="detalle-producto" path="/detalle_producto" element={<Detalle_produc />} />,
  <Route key="variables-clima" path="/variables_climaticasm" element={<Variables_climam />} />,
  <Route key="registrar-clima" path="/registrar_climam" element={<Registrar_vclima />} />,
  <Route key="informes-mayor" path="/informes_mayordomo" element={<Informes_mayor />} />,
  <Route key="equipos" path="/equipos_mayordomo" element={<Equipos_mayor />} />,
  <Route key="hoja-vida" path="/hoja_vidam" element={<Hoja_vidam />} />,
  <Route key="registrar-mantenimiento" path="/registrar_mantenimientom" element={<Registrar_mante />} />,
  <Route key="historial-trabajo" path="/historial_trabajom" element={<Historial_trabajom />} />,
  <Route key="actualizar-estado" path="/actualizar_estado_maquina" element={<Actualizar_estado_maquina />} />,
  <Route key="soporte-mayordomo" path="/soportemayordomo" element={<Soporte_mayordomo />} />,
  <Route key="ajustes-mayordomo" path="/ajustesmayordomo" element={<Ajustes_mayordomo />} />,
];

export default mayordomoRoutes;

