import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import E_cuenta from "./pages/recover/E_cuenta";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recuperar-cuenta" element={<E_cuenta />} />
    </Routes>
  );
}

export default App;

