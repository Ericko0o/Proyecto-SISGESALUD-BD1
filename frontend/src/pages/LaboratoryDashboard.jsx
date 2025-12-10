import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";

// Vistas internas del laboratorio
import LaboratoryDashboardHome from "./laboratory/DashboardHome.jsx";
import LaboratoryExams from "./laboratory/Exams.jsx";
import LaboratoryMyExams from "./laboratory/MyExams.jsx";
import LaboratoryResults from "./laboratory/Results.jsx";

export default function LaboratoryDashboard() {
  return (
    <Routes>
      {/* Dashboard con sidebar */}
      <Route element={<DashboardLayout role="laboratory" />}>
        <Route index element={<LaboratoryDashboardHome />} />
        <Route path="inicio" element={<LaboratoryDashboardHome />} />
        <Route path="examenes" element={<LaboratoryExams />} />
        <Route path="mis-examenes" element={<LaboratoryMyExams />} />
        <Route path="resultados" element={<LaboratoryResults />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/laboratory/inicio" replace />} />
      </Route>
    </Routes>
  );
}
