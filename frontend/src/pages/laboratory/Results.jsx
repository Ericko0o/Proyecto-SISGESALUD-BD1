import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useMockExams } from "../../hooks/use-mock-exams";

export default function Results() {
  const { exams } = useMockExams();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return exams.filter(
      (e) =>
        e.patientName.toLowerCase().includes(q) ||
        e.examType.toLowerCase().includes(q) ||
        (e.technician && e.technician.toLowerCase().includes(q))
    );
  }, [query, exams]);

  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Monitor de Exámenes</h2>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
        <input
          className="pl-10 pr-4 py-2 border rounded-md w-full bg-white/5"
          placeholder="Buscar examen, paciente o técnico…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-300 text-sm">
            <th>Examen</th>
            <th>Paciente</th>
            <th>Técnico</th>
            <th>Estado</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((exam) => (
            <tr key={exam.id} className="border-b last:border-0">
              <td className="py-3">{exam.examType}</td>
              <td>{exam.patientName}</td>
              <td>{exam.technician || "No asignado"}</td>
              <td>
                {exam.status === "completed" ? (
                  <span className="text-green-500">Completado</span>
                ) : exam.status === "in-progress" ? (
                  <span className="text-blue-400">En Proceso</span>
                ) : (
                  <span className="text-gray-400">Pendiente</span>
                )}
              </td>

              <td className="text-right">
                <button
                  disabled={exam.status !== "completed"}
                  className="text-blue-500 disabled:text-gray-400"
                >
                  Ver PDF
                </button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-400">
                No hay coincidencias.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
