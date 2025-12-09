import { useState, useMemo } from "react";
import { Search, HistoryIcon } from "lucide-react";

const historyData = [
  {
    id: "DISP001",
    receiptId: "RX001",
    patient: "Carlos Santana",
    medication: "Losartán 50mg",
    date: "2024-07-11",
    status: "Entregado",
  },
  {
    id: "DISP002",
    receiptId: "RX002",
    patient: "Elena Rodriguez",
    medication: "Crema Hidrocortisona 1%",
    date: "2024-06-16",
    status: "Confirmado por Paciente",
  },
  {
    id: "DISP003",
    receiptId: "RX003",
    patient: "Jorge Mendoza",
    medication: "Amoxicilina 500mg",
    date: "2024-05-02",
    status: "Confirmado por Paciente",
  },
];

export default function PharmacyHistory() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return historyData;
    const q = search.toLowerCase();
    return historyData.filter(
      (item) =>
        item.patient.toLowerCase().includes(q) ||
        item.receiptId.toLowerCase().includes(q) ||
        item.medication.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="container mx-auto">
      {/* TITULO */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-blue-50 border border-blue-100 flex items-center justify-center rounded-lg">
          <HistoryIcon className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Historial de Entregas</h1>
          <p className="text-muted-foreground">Módulo para Farmacia</p>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-6">Historial de Dispensaciones</h2>

        {/* BUSQUEDA */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por paciente, receta, medicamento…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-lg"
          />
        </div>

        {/* TABLA */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-2">Receta ID</th>
              <th className="py-2">Paciente</th>
              <th className="py-2">Medicamento</th>
              <th className="py-2">Fecha de Entrega</th>
              <th className="py-2">Estado</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-3 font-mono">{item.receiptId}</td>
                <td className="py-3">{item.patient}</td>
                <td className="py-3">{item.medication}</td>
                <td className="py-3">{item.date}</td>
                <td className="py-3">
                  {item.status.includes("Confirmado") ? (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm border border-blue-300">
                      {item.status}
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm">
                      Entregado
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
