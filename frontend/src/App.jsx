import { Routes } from "react-router-dom";
import authRoutes from "./routes/AuthRoutes";
import agronomoRoutes from "./routes/AgronomoRoutes";
import MayordomoRoutes from "./routes/MayordomoRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Routes>
      {authRoutes}
      {agronomoRoutes}
      {MayordomoRoutes}
      {AdminRoutes}
    </Routes>
  );
}

export default App;




