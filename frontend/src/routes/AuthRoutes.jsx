// src/routes/AuthRoutes.jsx
import { Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import C_correo from "../pages/auth/recover/C_correo";
import E_cuenta from "../pages/auth/recover/E_cuenta";
import C_codigo from "../pages/auth/recover/C_codigo";
import N_contraseña from "../pages/auth/recover/N_contraseña";
import Soporte from "../pages/auth/recover/Soporte";
import Seleccion_rol from "../pages/Seleccion_rol";

const AuthRoutes = [
  <Route key="login" path="/" element={<Login />} />,
  <Route key="register" path="/crear-cuenta" element={<Register />} />,
  <Route key="correo" path="/confirmar-correo" element={<C_correo />} />,
  <Route key="cuenta" path="/recuperar-cuenta" element={<E_cuenta />} />,
  <Route key="codigo" path="/confirmar-codigo" element={<C_codigo />} />,
  <Route key="nueva" path="/nueva-contraseña" element={<N_contraseña />} />,
  <Route key="soporte" path="/soporte_user" element={<Soporte />} />,
  <Route key="seleccion-rol" path="/seleccion-rol" element={<Seleccion_rol />} />
];

export default AuthRoutes;
