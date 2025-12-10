import { useState } from "react";
import AppointmentForm from "./AppointmentForm.jsx";
import DoctorSchedule from "./DoctorSchedule.jsx";
import { useMockAppointments } from "../../hooks/use-mock-appointments.js";

const mockDoctors = [
  { id: "DR001", name: "Dr. Alan Grant", specialty: "Cardiología" },
  { id: "DR002", name: "Dra. Ellie Sattler", specialty: "Dermatología" },
  { id: "DR003", name: "Dr. Ian Malcolm", specialty: "Neurología" },
  { id: "DR004", name: "Dr. John Hammond", specialty: "Consulta Externa" },
];

export default function ClinicalAdminAppointments() {
  const { appointments, addAppointment, updateAppointment } = useMockAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleFormSubmit = (data, id) => {
    const payload = {
      patientName: data.patient,
      doctorName: data.doctor,
      specialty: data.specialty,
      time: data.time,
      date: new Date(`${data.date}T${data.time}`),
      status: "Programada",
    };
    if (id) updateAppointment(id, payload);
    else addAppointment(payload);
    setSelectedAppointment(null);
  };

  const onSelectTimeSlot = (dateTime, doctorId) => {
    const doctor = mockDoctors.find((d) => d.id === doctorId);
    if (!doctor) return;
    const mock = {
      id: selectedAppointment?.id || `NEW_${Date.now()}`,
      patientName: selectedAppointment?.patientName || "",
      doctorName: doctor.name,
      specialty: doctor.specialty,
      time: `${String(dateTime.getHours()).padStart(2, "0")}:${String(dateTime.getMinutes()).padStart(2, "0")}`,
      status: "Programada",
      date: dateTime,
    };
    setSelectedAppointment(mock);
  };

  const onDoctorChange = (doctorName) => {
    const found = mockDoctors.find((d) => d.name === doctorName);
    setSelectedDoctorId(found?.id || null);
  };

  const selectExistingAppointment = (apt) => {
    const found = mockDoctors.find((d) => d.name === apt.doctorName);
    setSelectedDoctorId(found?.id || null);
    setSelectedAppointment(apt);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full">
      {/* Formulario */}
      <div className="md:col-span-1">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 sticky top-20">
          <h3 className="text-xl font-semibold">Detalles de la Cita</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {selectedAppointment?.id ? "Reprograme la cita." : "Agende una nueva cita."}
          </p>
          <AppointmentForm
            key={selectedAppointment?.id || "new"}
            appointment={selectedAppointment}
            onSubmit={handleFormSubmit}
            onDoctorChange={onDoctorChange}
          />
        </div>
      </div>

      {/* Agenda del doctor */}
      <div className="md:col-span-2">
        <DoctorSchedule
          doctorId={selectedDoctorId}
          appointments={appointments}
          onSelectAppointment={selectExistingAppointment}
          onSelectTimeSlot={onSelectTimeSlot}
        />
      </div>
    </div>
  );
}
