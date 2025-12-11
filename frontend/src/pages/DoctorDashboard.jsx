import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";

// Vistas internas
import DoctorDashboardHome from "./doctor/DashboardHome.jsx";
import Agenda from "./doctor/Agenda.jsx";
import Consultation from "./doctor/Consultation.jsx";
import Patients from "./doctor/Patients.jsx";

export default function DoctorDashboard() {
  return (
    <Routes>
      {/* Dashboard con sidebar */}
      <Route element={<DashboardLayout role="doctor" />}>
        <Route path="inicio" element={<DoctorDashboardHome />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="atender" element={<Consultation />} />
        <Route path="pacientes" element={<Patients />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/doctor/inicio" replace />} />
      </Route>
    </Routes>
  );
}
