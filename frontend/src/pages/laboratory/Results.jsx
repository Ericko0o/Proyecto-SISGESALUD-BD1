import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";

export default function Results() {
  const [query, setQuery] = useState("");
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/lab/search")
      .then((res) => res.json())
      .then((data) => setExams(data))
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return exams.filter(
      (e) =>
        e.patientName?.toLowerCase().includes(q) ||
        e.tipo_examen?.toLowerCase().includes(q) ||
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
            <tr key={exam.id_examen} className="border-b last:border-0">
              <td className="py-3">{exam.tipo_examen}</td>
              <td>{exam.patient_name}</td>
              <td>{exam.technician || "No asignado"}</td>
              <td>
                {exam.estado === "completed" ? (
                  <span className="text-green-500">Completado</span>
                ) : exam.estado === "in-progress" ? (
                  <span className="text-blue-400">En Proceso</span>
                ) : (
                  <span className="text-gray-400">Pendiente</span>
                )}
              </td>
              <td className="text-right">
                <button
                  disabled={exam.estado !== "completed"}
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
