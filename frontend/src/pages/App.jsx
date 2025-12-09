import { Routes, Route, Navigate } from "react-router-dom";

// Páginas públicas
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import Demo from "./Demo.jsx";
import AppHome from "./App.jsx";

// PACIENTE
import DashboardLayout from "../components/DashboardLayout.jsx";
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



      {/* --------------------- FALLBACK ---------------------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
