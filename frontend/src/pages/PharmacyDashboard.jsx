import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";

// Vistas internas de farmacia
import PharmacyDashboardHome from "./pharmacy/DashboardHome.jsx";
import PharmacyPrescriptions from "./pharmacy/Prescriptions.jsx";
import PharmacyHistory from "./pharmacy/History.jsx";

export default function PharmacyDashboard() {
  return (
    <Routes>
      {/* Dashboard con sidebar para Farmacia */}
      <Route element={<DashboardLayout role="pharmacy" />}>
        <Route path="inicio" element={<PharmacyDashboardHome />} />
        <Route path="recetas" element={<PharmacyPrescriptions />} />
        <Route path="historial" element={<PharmacyHistory />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/pharmacy/inicio" replace />} />
      </Route>
    </Routes>
  );
}
