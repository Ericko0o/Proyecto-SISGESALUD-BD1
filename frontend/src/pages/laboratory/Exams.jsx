import { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";

const loggedUser = "Lab-Analista-Demo";

export default function Exams() {
  const [pending, setPending] = useState([]);

  const loadPending = () => {
    fetch("http://localhost:4000/api/lab/pending")
      .then((res) => res.json())
      .then((data) => setPending(data))
      .catch(console.error);
  };

  useEffect(loadPending, []);

  const assignExam = async (id) => {
    await fetch(`http://localhost:4000/api/lab/assign`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId: id, technician: loggedUser }),
    });

    loadPending();
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow">
      <h2 className="text-2xl font-bold mb-4">Exámenes Pendientes</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-sm text-gray-300">
            <th>Examen</th>
            <th>Paciente</th>
            <th>Doctor</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {pending.map((exam) => (
            <tr key={exam.id_examen} className="border-b last:border-0">
              <td>{exam.tipo_examen}</td>
              <td>{exam.patient_name}</td>
              <td>{exam.doctor_name}</td>
              <td className="text-right">
                <button
                  onClick={() => assignExam(exam.id_examen)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  Asignarme
                </button>
              </td>
            </tr>
          ))}

          {pending.length === 0 && (
            <tr>
              <td colSpan="4" className="py-8 text-center text-gray-400">
                No hay exámenes pendientes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
