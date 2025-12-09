import {
  CalendarDays,
  UserCheck,
  History,
  Home,
  ClipboardList, // ← FALTABA ESTO
} from "lucide-react";


export const ROLES = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  PHARMACY: "pharmacy",
};

export const NAV_PATIENT = [
  { to: "/patient/inicio", label: "Inicio", icon: Home },
  { to: "/patient/citas", label: "Mis Citas", icon: CalendarDays },
  { to: "/patient/diagnosticos", label: "Diagnósticos", icon: History },
  { to: "/patient/recetas", label: "Recetas", icon: History },
  { to: "/patient/resultados", label: "Resultados", icon: History },
  { to: "/patient/historia", label: "Historia Clínica", icon: History },
];

export const NAV_DOCTOR = [
  { to: "/doctor/inicio", label: "Inicio", icon: Home },
  { to: "/doctor/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/doctor/atender", label: "Atender", icon: UserCheck },
  { to: "/doctor/pacientes", label: "Pacientes", icon: History },
];

export const NAV_PHARMACY = [
  { to: "/pharmacy/inicio", label: "Inicio", icon: Home },
  { to: "/pharmacy/recetas", label: "Dispensar Recetas", icon: ClipboardList },
  { to: "/pharmacy/historial", label: "Historial de Entregas", icon: History },
];
