import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import E_cuenta from "./pages/recover/E_cuenta";
import C_correo from "./pages/recover/C_correo"; // 👈 importa
import C_codigo from "./pages/recover/C_codigo"; // Página de confirmación de código

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recuperar-cuenta" element={<E_cuenta />} />
      <Route path="/confirmar-correo" element={<C_correo />} /> {/* 👈 nueva ruta */}
       <Route path="/confirmar-codigo" element={<C_codigo />} /> {/* Página de código */}
    </Routes>
  );
}

export default App;

