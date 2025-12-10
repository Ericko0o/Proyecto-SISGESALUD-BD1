// src/lib/roleConfig.js

import {
  CalendarDays,
  UserCheck,
  History,
  Home,
  ClipboardList,
  TestTube,
  Search,
  Users2,
  CalendarClock,
  LayoutList,
} from "lucide-react";

export const ROLES = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  PHARMACY: "pharmacy",
  LABORATORY: "laboratory",
  CLINICAL_ADMIN: "clinical-admin",
};

/* ----------------------------------------
 * NAV PACIENTE
 * ----------------------------------------*/
export const NAV_PATIENT = [
  { to: "/patient/inicio", label: "Inicio", icon: Home },
  { to: "/patient/citas", label: "Mis Citas", icon: CalendarDays },
  { to: "/patient/diagnosticos", label: "Diagnósticos", icon: History },
  { to: "/patient/recetas", label: "Recetas", icon: History },
  { to: "/patient/resultados", label: "Resultados", icon: History },
  { to: "/patient/historia", label: "Historia Clínica", icon: History },
];

/* ----------------------------------------
 * NAV DOCTOR
 * ----------------------------------------*/
export const NAV_DOCTOR = [
  { to: "/doctor/inicio", label: "Inicio", icon: Home },
  { to: "/doctor/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/doctor/atender", label: "Atender", icon: UserCheck },
  { to: "/doctor/pacientes", label: "Pacientes", icon: History },
];

/* ----------------------------------------
 * NAV FARMACIA
 * ----------------------------------------*/
export const NAV_PHARMACY = [
  { to: "/pharmacy/inicio", label: "Inicio", icon: Home },
  { to: "/pharmacy/recetas", label: "Dispensar Recetas", icon: ClipboardList },
  { to: "/pharmacy/historial", label: "Historial de Entregas", icon: History },
];

/* ----------------------------------------
 * NAV LABORATORIO
 * ----------------------------------------*/
export const NAV_LABORATORY = [
  { to: "/laboratory/inicio", label: "Inicio", icon: Home },
  { to: "/laboratory/examenes", label: "Exámenes Pendientes", icon: TestTube },
  { to: "/laboratory/mis-examenes", label: "Mis Exámenes", icon: UserCheck },
  { to: "/laboratory/resultados", label: "Consultas", icon: Search },
];

/* ----------------------------------------
 * NAV ADMIN CLÍNICO
 * ----------------------------------------*/
export const NAV_CLINICAL_ADMIN = [
  { to: "/clinical-admin/inicio", label: "Inicio", icon: Home },
  { to: "/clinical-admin/pacientes", label: "Pacientes", icon: Users2 },
  { to: "/clinical-admin/citas", label: "Citas", icon: CalendarClock },
  { to: "/clinical-admin/turnos", label: "Turnos", icon: LayoutList },
];
