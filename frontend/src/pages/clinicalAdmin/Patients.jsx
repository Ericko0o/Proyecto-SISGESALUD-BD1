import { useMemo, useState } from "react";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";
import PatientForm from "./PatientForm.jsx";

const initialPatients = [
  { id: "PAT001", dni: "78945612", name: "Carlos Santana", birthDate: "1979-05-15", gender: "Masculino", phone: "987654321", address: "Av. Siempre Viva 123" },
  { id: "PAT002", dni: "84561239", name: "Elena Rodriguez", birthDate: "1985-11-20", gender: "Femenino", phone: "999888777", address: "Calle Falsa 456" },
  { id: "PAT003", dni: "12345678", name: "Jorge Mendoza", birthDate: "1992-02-10", gender: "Masculino", phone: "911222333", address: "Jr. Luna Pizarro 789" },
];

export default function ClinicalAdminPatients() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return patients.filter((p) => p.name.toLowerCase().includes(q) || p.dni.includes(q));
  }, [patients, searchTerm]);

  const onSubmit = (data, id) => {
    if (id) {
      setPatients((arr) => arr.map((p) => (p.id === id ? { ...p, ...data } : p)));
    } else {
      const newP = { id: `PAT${(Math.random() * 1000).toFixed(0).padStart(3, "0")}`, ...data };
      setPatients((arr) => [...arr, newP]);
    }
    setOpenForm(false);
  };

  const onDelete = (p) => {
    if (confirm(`¿Eliminar al paciente "${p.name}"?`)) {
      setPatients((arr) => arr.filter((x) => x.id !== p.id));
    }
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow">
        <div className="p-6 md:flex md:items-center md:justify-between space-y-3 md:space-y-0">
          <div>
            <h2 className="text-2xl font-semibold">Maestro de Pacientes</h2>
            <p className="text-sm text-muted-foreground">Busque, registre o actualice los datos de los pacientes.</p>
            <div className="relative mt-4 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                className="pl-9 pr-3 py-2 w-full rounded-md border bg-white/5"
                placeholder="Buscar por nombre o DNI…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
          >
            <PlusCircle className="w-4 h-4" />
            Registrar Paciente
          </button>
        </div>

        <div className="px-6 pb-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-muted-foreground">
                <th className="py-2">Nombre Completo</th>
                <th className="py-2">DNI</th>
                <th className="py-2">Fecha Nac.</th>
                <th className="py-2">Teléfono</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{p.name}</td>
                  <td>{p.dni}</td>
                  <td>{p.birthDate}</td>
                  <td>{p.phone}</td>
                  <td className="text-right space-x-2">
                    <button
                      className="px-2 py-1 rounded-md hover:bg-white/10"
                      onClick={() => {
                        setEditing(p);
                        setOpenForm(true);
                      }}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="px-2 py-1 rounded-md text-red-500 hover:bg-red-500/10" onClick={() => onDelete(p)} title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-muted-foreground">
                    No se encontraron pacientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openForm && <PatientForm patient={editing} onSubmit={onSubmit} close={() => setOpenForm(false)} />}
    </>
  );
}
