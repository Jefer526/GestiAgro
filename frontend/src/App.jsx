import { Routes } from "react-router-dom";
import authRoutes from "./routes/AuthRoutes";
import agronomoRoutes from "./routes/AgronomoRoutes";
import MayordomoRoutes from "./routes/MayordomoRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <Routes>
      {authRoutes}
      {agronomoRoutes}
      {MayordomoRoutes}
      {AdminRoutes}
      {PublicRoutes}
    </Routes>
  );
}

export default App;




