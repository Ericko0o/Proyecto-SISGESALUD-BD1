import MedicalHistory from "../patient/MedicalHistory.jsx";

export default function PatientHistoryDialog({ exam, close }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[850px] h-[90vh] rounded-xl p-6 shadow-xl overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">
          Historial Clínico — {exam.patientName}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          DNI: {exam.patientDni}
        </p>

        <MedicalHistory />

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 border rounded-md"
            onClick={close}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
