import { useEffect } from "react";
import { useForm } from "react-hook-form";

const mockPatients = [
  { id: "PAT001", dni: "78945612", name: "Carlos Santana" },
  { id: "PAT002", dni: "84561239", name: "Elena Rodriguez" },
  { id: "PAT003", dni: "12345678", name: "Jorge Mendoza" },
  { id: "PAT004", dni: "98765432", name: "Patricia Acosta" },
];

const mockDoctors = [
  { id: "DR001", name: "Dr. Alan Grant", specialty: "Cardiología" },
  { id: "DR002", name: "Dra. Ellie Sattler", specialty: "Dermatología" },
  { id: "DR003", name: "Dr. Ian Malcolm", specialty: "Neurología" },
  { id: "DR004", name: "Dr. John Hammond", specialty: "Consulta Externa" },
];

const mockSpecialties = ["Cardiología", "Dermatología", "Neurología", "Consulta Externa"];

export default function AppointmentForm({ appointment, onSubmit, onDoctorChange }) {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      patient: "",
      specialty: "",
      doctor: "",
      date: "",
      time: "",
    },
  });

  const selectedSpecialty = watch("specialty");
  const selectedDoctor = watch("doctor");

  useEffect(() => {
    if (appointment) {
      reset({
        patient: appointment.patientName || "",
        specialty: appointment.specialty || "",
        doctor: appointment.doctorName || "",
        date: appointment.date ? new Date(appointment.date).toISOString().slice(0, 10) : "",
        time: appointment.time || "",
      });
    } else {
      reset({
        patient: "",
        specialty: "",
        doctor: "",
        date: new Date().toISOString().slice(0, 10),
        time: "",
      });
    }
  }, [appointment, reset]);

  useEffect(() => {
    if (appointment?.specialty !== selectedSpecialty) {
      reset({ ...watch(), doctor: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpecialty]);

  useEffect(() => {
    onDoctorChange && onDoctorChange(selectedDoctor);
  }, [selectedDoctor, onDoctorChange]);

  const availableDoctors = selectedSpecialty ? mockDoctors.filter((d) => d.specialty === selectedSpecialty) : mockDoctors;

  const submit = (data) => onSubmit(data, appointment?.id);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <div>
        <label className="text-sm">Paciente</label>
        <select className="w-full border rounded-md p-2" {...register("patient", { required: true })}>
          <option value="">Seleccione un paciente…</option>
          {mockPatients.map((p) => (
            <option key={p.id} value={p.name}>{p.name} — {p.dni}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm">Especialidad</label>
        <select className="w-full border rounded-md p-2" {...register("specialty", { required: true })}>
          <option value="">Seleccione una especialidad…</option>
          {mockSpecialties.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm">Doctor</label>
        <select className="w-full border rounded-md p-2" disabled={!selectedSpecialty} {...register("doctor", { required: true })}>
          <option value="">{!selectedSpecialty ? "Seleccione una especialidad primero" : "Seleccione un doctor"}</option>
          {availableDoctors.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm">Fecha</label>
          <input type="date" className="w-full border rounded-md p-2" {...register("date", { required: true })} />
        </div>
        <div>
          <label className="text-sm">Hora</label>
          <input type="time" className="w-full border rounded-md p-2" {...register("time", { required: true })} />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button className="w-full px-3 py-2 rounded-md bg-primary text-white" type="submit">
          {appointment?.id ? "Guardar Cambios" : "Agendar Cita"}
        </button>
        <button
          className="w-full px-3 py-2 rounded-md border"
          type="button"
          onClick={() =>
            reset(
              appointment
                ? {
                    patient: appointment.patientName,
                    specialty: appointment.specialty,
                    doctor: appointment.doctorName,
                    date: new Date(appointment.date).toISOString().slice(0, 10),
                    time: appointment.time,
                  }
                : undefined
            )
          }
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
