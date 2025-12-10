import { useMockExams } from "../../hooks/use-mock-exams";
import { useState } from "react";

export default function ResultUploadForm({ exam, close }) {
  const { completeExam } = useMockExams();
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");

  const submit = () => {
    if (!file) {
      alert("Debes subir un archivo PDF.");
      return;
    }

    completeExam(exam.id);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[450px] rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-bold">Subir Resultado</h2>
        <p className="text-sm text-gray-600 mb-4">
          Examen: {exam.examType} <br />
          Paciente: {exam.patientName}
        </p>

        <div className="space-y-3">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded-md p-2 w-full"
          />

          <textarea
            placeholder="Notas opcionales…"
            className="border rounded-md p-2 w-full"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 border rounded-md"
            onClick={close}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={submit}
          >
            Subir y Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
