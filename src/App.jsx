import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import E_cuenta from "./pages/recover/E_cuenta";
import C_correo from "./pages/recover/C_correo"; // 👈 importa

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recuperar-cuenta" element={<E_cuenta />} />
      <Route path="/confirmar-correo" element={<C_correo />} /> {/* 👈 nueva ruta */}
    </Routes>
  );
}

export default App;

