import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import C_correo from "./pages/recover/C_correo";
import E_cuenta from "./pages/recover/E_cuenta";
import C_codigo from "./pages/recover/C_codigo";
import N_contraseña from "./pages/recover/N_contraseña";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/confirmar-correo" element={<C_correo />} />
      <Route path="/recuperar-cuenta" element={<E_cuenta />} />
      <Route path="/codigo-verificacion" element={<C_codigo />} />
      <Route path="/nueva-contrasena" element={<N_contraseña />} />
    </Routes>
  );
}

export default App;



