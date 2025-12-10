import { useState } from "react";

const initialExams = [
  {
    id: "EX-001",
    examType: "Hemograma Completo",
    patientName: "Carlos Santana",
    patientDni: "78945612",
    doctor: "Dr. Grant",
    technician: null,
    status: "pending",
  },
  {
    id: "EX-002",
    examType: "Perfil Lipídico",
    patientName: "Elena Rodriguez",
    patientDni: "84561239",
    doctor: "Dr. Malcolm",
    technician: null,
    status: "pending",
  },
  {
    id: "EX-003",
    examType: "Glucosa en Sangre",
    patientName: "Jorge Mendoza",
    patientDni: "12345678",
    doctor: "Dr. Rivera",
    technician: "Lab-Analista-Demo",
    status: "in-progress",
  },
];

let globalExams = [...initialExams]; // almacenamiento simple en memoria

export function useMockExams() {
  const [exams, setExams] = useState(globalExams);

  // Asignar examen a un técnico
  function assignExam(id, technician) {
    globalExams = globalExams.map((e) =>
      e.id === id ? { ...e, technician, status: "in-progress" } : e
    );
    setExams([...globalExams]);
  }

  // Completar examen
  function completeExam(id) {
    globalExams = globalExams.map((e) =>
      e.id === id ? { ...e, status: "completed" } : e
    );
    setExams([...globalExams]);
  }

  return {
    exams,
    assignExam,
    completeExam,
  };
}
