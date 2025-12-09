export default function Agenda() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Agenda del Doctor</h1>

      <p className="text-gray-400">
        Aquí verás tus citas del día (demo sin backend aún).
      </p>

      <div className="mt-6 space-y-4">
        <div className="p-4 bg-white/10 rounded-lg">
          10:00 — Carlos Santana (Consulta General)
        </div>

        <div className="p-4 bg-white/10 rounded-lg">
          11:00 — Elena Rodríguez (Dermatología Online)
        </div>

        <div className="p-4 bg-white/10 rounded-lg">
          12:00 — Jorge Mendoza (Consulta General)
        </div>
      </div>
    </div>
  );
}
