import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import AgronomoRoutes from "./routes/AgronomoRoutes";
import MayordomoRoutes from "./routes/AgronomoRoutes";
import AdminRoutes from "./routes/AgronomoRoutes";

function App() {
  return (
    <Routes>
      <AuthRoutes />
      <AgronomoRoutes />
      <MayordomoRoutes />
      <AdminRoutes />
    </Routes>
  );
}

export default App;




