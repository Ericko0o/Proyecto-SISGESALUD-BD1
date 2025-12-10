import { Routes, Route, Navigate } from "react-router-dom";

// Páginas públicas
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import Demo from "./Demo.jsx";
import AppHome from "./App.jsx";

// LAYOUT GENERAL
import DashboardLayout from "../components/DashboardLayout.jsx";

// PACIENTE
import PatientDashboardHome from "./patient/DashboardHome.jsx";
import PatientAppointments from "./patient/Appointments.jsx";
import PatientDiagnostics from "./patient/Diagnostics.jsx";
import PatientPrescriptions from "./patient/Prescriptions.jsx";
import PatientResults from "./patient/Results.jsx";
import PatientMedicalHistory from "./patient/MedicalHistory.jsx";

// DOCTOR
import DoctorDashboardHome from "./doctor/DashboardHome.jsx";
import DoctorAgenda from "./doctor/Agenda.jsx";
import DoctorConsultation from "./doctor/Consultation.jsx";
import DoctorPatients from "./doctor/Patients.jsx";

// FARMACIA
import PharmacyDashboardHome from "./pharmacy/PharmacyDashboardHome.jsx";
import PharmacyPrescriptions from "./pharmacy/Prescriptions.jsx";
import PharmacyHistory from "./pharmacy/History.jsx";

// LABORATORIO → SECCIÓN COMPLETA
import LaboratoryDashboardHome from "./laboratory/DashboardHome.jsx";
import LaboratoryExams from "./laboratory/Exams.jsx";
import LaboratoryMyExams from "./laboratory/MyExams.jsx";
import LaboratoryResults from "./laboratory/Results.jsx";

// CLINICAL ADMIN
import ClinicalAdminDashboard from "./ClinicalAdminDashboard.jsx";
import ClinicalAdminPatients from "./clinicalAdmin/Patients.jsx";
import ClinicalAdminAppointments from "./clinicalAdmin/Appointments.jsx";
import ClinicalAdminShifts from "./clinicalAdmin/Shifts.jsx";

export default function App() {
  return (
    <Routes>
      {/* --------------------- PÚBLICAS ---------------------- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/app" element={<AppHome />} />

      {/* --------------------- PACIENTE ---------------------- */}
      <Route path="/patient" element={<DashboardLayout role="patient" />}>
        <Route index element={<PatientDashboardHome />} />
        <Route path="inicio" element={<PatientDashboardHome />} />
        <Route path="citas" element={<PatientAppointments />} />
        <Route path="diagnosticos" element={<PatientDiagnostics />} />
        <Route path="recetas" element={<PatientPrescriptions />} />
        <Route path="resultados" element={<PatientResults />} />
        <Route path="historia" element={<PatientMedicalHistory />} />
      </Route>

      {/* --------------------- DOCTOR ---------------------- */}
      <Route path="/doctor" element={<DashboardLayout role="doctor" />}>
        <Route index element={<DoctorDashboardHome />} />
        <Route path="inicio" element={<DoctorDashboardHome />} />
        <Route path="agenda" element={<DoctorAgenda />} />
        <Route path="atender" element={<DoctorConsultation />} />
        <Route path="pacientes" element={<DoctorPatients />} />
      </Route>

      {/* --------------------- FARMACIA ---------------------- */}
      <Route path="/pharmacy/*" element={<DashboardLayout role="pharmacy" />}>
        <Route index element={<PharmacyDashboardHome />} />
        <Route path="inicio" element={<PharmacyDashboardHome />} />
        <Route path="recetas" element={<PharmacyPrescriptions />} />
        <Route path="historial" element={<PharmacyHistory />} />
      </Route>

      {/* --------------------- LABORATORIO ---------------------- */}
      <Route path="/laboratory/*" element={<DashboardLayout role="laboratory" />}>
        <Route index element={<LaboratoryDashboardHome />} />
        <Route path="inicio" element={<LaboratoryDashboardHome />} />
        <Route path="examenes" element={<LaboratoryExams />} />
        <Route path="mis-examenes" element={<LaboratoryMyExams />} />
        <Route path="resultados" element={<LaboratoryResults />} />
      </Route>

            {/* --------------------- CLINICAL ADMIN ---------------------- */}
      <Route path="/clinical-admin/*" element={<DashboardLayout role="clinical-admin" />}>
        <Route index element={<ClinicalAdminDashboard />} />
        <Route path="inicio" element={<ClinicalAdminDashboard />} />
        <Route path="pacientes" element={<ClinicalAdminPatients />} />
        <Route path="citas" element={<ClinicalAdminAppointments />} />
        <Route path="turnos" element={<ClinicalAdminShifts />} />
      </Route>

      {/* --------------------- FALLBACK ---------------------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
