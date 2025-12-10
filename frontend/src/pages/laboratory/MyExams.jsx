import { useState } from "react";
import { useMockExams } from "../../hooks/use-mock-exams";
import { Clock, FileUp, FileText } from "lucide-react";
import ResultUploadForm from "./ResultUploadForm.jsx";
import PatientHistoryDialog from "./PatientHistoryDialog.jsx";

const loggedUser = "Lab-Analista-Demo";

export default function MyExams() {
  const { exams } = useMockExams();
  const working = exams.filter(
    (e) => e.technician === loggedUser && e.status === "in-progress"
  );

  const [selectedExam, setSelectedExam] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <>
      <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Mis Exámenes Asignados</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-300 text-sm">
              <th className="py-2">Examen</th>
              <th>Paciente</th>
              <th>DNI</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {working.length > 0 ? (
              working.map((exam) => (
                <tr key={exam.id} className="border-b last:border-0">
                  <td className="py-3">{exam.examType}</td>
                  <td>{exam.patientName}</td>
                  <td>{exam.patientDni}</td>

                  <td>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md border border-blue-300 flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3" />
                      En Proceso
                    </span>
                  </td>

                  <td className="text-right space-x-3 py-3">
                    <button
                      className="px-3 py-2 rounded-md border border-white/30 hover:bg-white/10 transition"
                      onClick={() => {
                        setSelectedExam(exam);
                        setOpenHistory(true);
                      }}
                    >
                      <FileText className="inline w-4 h-4 mr-1" />
                      Historial
                    </button>

                    <button
                      className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                      onClick={() => {
                        setSelectedExam(exam);
                        setOpenForm(true);
                      }}
                    >
                      <FileUp className="inline w-4 h-4 mr-1" />
                      Cargar Resultado
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-gray-400"
                >
                  No tienes exámenes asignados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openForm && (
        <ResultUploadForm
          exam={selectedExam}
          close={() => setOpenForm(false)}
        />
      )}

      {openHistory && (
        <PatientHistoryDialog
          exam={selectedExam}
          close={() => setOpenHistory(false)}
        />
      )}
    </>
  );
}
