import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import C_correo from "./pages/auth/recover/C_correo";
import E_cuenta from "./pages/auth/recover/E_cuenta";
import C_codigo from "./pages/auth/recover/C_codigo";
import N_contraseña from "./pages/auth/recover/N_contraseña";
import Soporte from "./pages/auth/recover/Soporte";
import Home_adm from "./pages/administrador/Home_adm";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/crear-cuenta" element={<Register />} />
      <Route path="/confirmar-correo" element={<C_correo />} />
      <Route path="/recuperar-cuenta" element={<E_cuenta />} />
      <Route path="/confirmar-codigo" element={<C_codigo />} />
      <Route path="/nueva-contraseña" element={<N_contraseña />} />
      <Route path="/soporte" element={<Soporte />} />
      <Route path="/Homeadm" element={<Home_adm />} />
      
    </Routes>
  );
}

export default App;



