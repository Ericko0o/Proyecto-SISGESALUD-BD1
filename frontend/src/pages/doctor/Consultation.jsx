import { useState } from "react";

const queue = [
  { id: "PAT001", name: "Carlos Santana", time: "10:00", reason: "Consulta General" },
  { id: "PAT002", name: "Elena Rodríguez", time: "11:00", reason: "Dermatología" },
];

export default function Consultation() {
  const [patient, setPatient] = useState(null);

  if (!patient) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Atender Paciente</h1>

        <ul className="space-y-3">
          {queue.map(p => (
            <button
              key={p.id}
              className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg flex justify-between"
              onClick={() => setPatient(p)}
            >
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-gray-400 text-sm">{p.reason}</p>
              </div>
              <span className="text-gray-300">{p.time}</span>
            </button>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Consulta Activa: {patient.name}</h1>

      <textarea
        className="w-full p-4 bg-white/10 rounded-lg"
        placeholder="Escribe el diagnóstico..."
        rows={6}
      />

      <button
        className="mt-4 px-4 py-2 bg-primary rounded-lg"
        onClick={() => setPatient(null)}
      >
        Finalizar Consulta
      </button>
    </div>
  );
}
