import { useMockExams } from "../../hooks/use-mock-exams";
import { UserCheck } from "lucide-react";

const loggedUser = "Lab-Analista-Demo";

export default function Exams() {
  const { exams, assignExam } = useMockExams();

  const pending = exams.filter((e) => e.status === "pending");

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
            <tr key={exam.id} className="border-b last:border-0">
              <td>{exam.examType}</td>
              <td>{exam.patientName}</td>
              <td>{exam.doctor}</td>
              <td className="text-right">
                <button
                  onClick={() => assignExam(exam.id, loggedUser)}
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
