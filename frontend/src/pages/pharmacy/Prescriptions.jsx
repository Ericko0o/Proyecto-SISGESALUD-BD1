import { useState } from "react";
import { Search, ClipboardList, Pill, User, CheckCircle } from "lucide-react";

const mockPrescription = {
  id: "RX001",
  patientName: "Carlos Santana",
  doctorName: "Dr. Alan Grant",
  date: "2024-07-10",
  medications: [
    { id: "MED01", name: "Losartán 50mg", dosage: "1 al día", status: "pending" },
    { id: "MED02", name: "Aspirina 100mg", dosage: "1 al día", status: "pending" },
  ],
};

export default function PharmacyPrescriptions() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const searchPrescription = () => {
    // Simulación: siempre devuelve mock data
    setData(mockPrescription);
  };

  const markDispensed = (id) => {
    if (!data) return;
    setData({
      ...data,
      medications: data.medications.map((m) =>
        m.id === id ? { ...m, status: "dispensed" } : m
      ),
    });
  };

  return (
    <div className="container mx-auto">
      {/* TITULO */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-blue-50 border border-blue-100 flex items-center justify-center rounded-lg">
          <ClipboardList className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Dispensar Recetas</h1>
          <p className="text-muted-foreground">Módulo para Farmacia</p>
        </div>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-4">Búsqueda de Recetas</h2>
        <p className="text-muted-foreground mb-6">
          Ingrese el código de la receta o el DNI del paciente para marcar los medicamentos como dispensados.
        </p>

        {/* BUSCADOR */}
        <div className="flex gap-3 max-w-md mb-8">
          <input
            type="text"
            placeholder="Código o DNI"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={searchPrescription}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            <Search className="w-4 h-4" />
            Buscar Receta
          </button>
        </div>

        {/* RESULTADOS */}
        {data && (
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-2">
              Receta: {data.id}
            </h3>
            <p className="text-muted-foreground flex items-center gap-2 mb-6">
              <User className="w-4 h-4" /> Paciente: {data.patientName}
            </p>

            <div className="space-y-4">
              {data.medications.map((m) => (
                <div
                  key={m.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border"
                >
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      <Pill className="w-4 h-4 text-blue-600" />
                      {m.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{m.dosage}</p>
                  </div>

                  {m.status === "pending" ? (
                    <button
                      onClick={() => markDispensed(m.id)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Marcar como Dispensado
                    </button>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm border border-green-300">
                      Dispensado
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
