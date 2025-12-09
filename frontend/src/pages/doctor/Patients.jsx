import { useState } from "react";

const patients = [
  { id: "PAT001", dni: "78945612", name: "Carlos Santana", lastVisit: "2024-07-10" },
  { id: "PAT002", dni: "84561239", name: "Elena Rodriguez", lastVisit: "2024-07-08" },
  { id: "PAT003", dni: "12345678", name: "Jorge Mendoza", lastVisit: "2024-06-25" },
];

export default function Patients() {
  const [search, setSearch] = useState("");

  const filtered = patients.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.dni.includes(search)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pacientes</h1>

      <input
        type="text"
        placeholder="Buscar por DNI o nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 bg-white/10 rounded-lg mb-6"
      />

      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="p-4 bg-white/10 rounded-lg flex justify-between">
            <div>
              <p className="font-bold">{p.name}</p>
              <p className="text-gray-400 text-sm">Última visita: {p.lastVisit}</p>
            </div>
            <button className="text-primary">Ver historial</button>
          </div>
        ))}
      </div>
    </div>
  );
}
