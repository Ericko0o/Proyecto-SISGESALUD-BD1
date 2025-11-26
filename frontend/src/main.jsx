import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import LandingPage from "./pages/LandingPage.jsx";
import App from "./pages/App.jsx";
import Demo from "./pages/Demo.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

// Dashboards
import PatientDashboard from "./pages/PatientDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<LandingPage />} />

        {/* Login y Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard del Paciente */}
        <Route path="/patient/*" element={<PatientDashboard />} />

        {/* Dashboard del Doctor (nuevo) */}
        <Route path="/doctor/*" element={<DoctorDashboard />} />

        {/* Otras páginas existentes */}
        <Route path="/app" element={<App />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
