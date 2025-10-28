import { BrowserRouter, Routes } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { useUser } from "./context/UserContext";

import NotificationBell from "./components/NotificationBell/NotificationBell";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <NotificationBell />

      <Routes>
        {MainRoutes}
        {AdminRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
