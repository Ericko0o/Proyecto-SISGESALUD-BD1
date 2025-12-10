import { useState } from "react";

/**
 * Citas simuladas para el rol Clinical Admin
 */
const initialAppointments = [
  {
    id: "APT-001",
    patientName: "Carlos Santana",
    doctorName: "Dr. Alan Grant",
    specialty: "Cardiología",
    date: new Date("2025-02-12T10:00"),
    time: "10:00",
    status: "Programada",
  },
  {
    id: "APT-002",
    patientName: "Elena Rodriguez",
    doctorName: "Dra. Ellie Sattler",
    specialty: "Dermatología",
    date: new Date("2025-02-12T15:00"),
    time: "15:00",
    status: "Programada",
  },
];

let globalAppointments = [...initialAppointments]; // store global

export function useMockAppointments() {
  const [appointments, setAppointments] = useState(globalAppointments);

  /** Agregar nueva cita */
  function addAppointment(data) {
    const newApt = {
      id: `APT-${Math.floor(Math.random() * 100000)}`,
      ...data,
    };
    globalAppointments.push(newApt);
    setAppointments([...globalAppointments]);
  }

  /** Actualizar cita existente */
  function updateAppointment(id, data) {
    globalAppointments = globalAppointments.map((apt) =>
      apt.id === id ? { ...apt, ...data } : apt
    );
    setAppointments([...globalAppointments]);
  }

  return {
    appointments,
    addAppointment,
    updateAppointment,
  };
}
