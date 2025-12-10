// src/pages/admin/Hospitals.jsx
import { useState } from "react";
import { PlusCircle } from "lucide-react";

import HospitalForm from "./forms/HospitalForm.jsx";
import AreaManagementDialog from "./dialogs/AreaManagementDialog.jsx";

const INITIAL = [
  {
    id: "HOS01",
    name: "Hospital Central de Lima",
    address: "Av. Principal 123, Lima",
    phone: "987-654-321",
    areas: [
      { id: "A1", name: "Emergencias", description: "Atención inmediata" },
      { id: "A2", name: "Pediatría", description: "Atención infantil" },
    ],
  },
  {
    id: "HOS02",
    name: "Clínica San Borja",
    address: "Calle Las Artes 456, San Borja",
    phone: "999-888-777",
    areas: [],
  },
];

export default function Hospitals() {
  const [rows, setRows] = useState(INITIAL);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [areasModal, setAreasModal] = useState(null);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (h) => {
    setEditing(h);
    setModalOpen(true);
  };

  const saveHospital = (data) => {
    if (editing) {
      setRows((r) =>
        r.map((x) => (x.id === editing.id ? { ...x, ...data } : x))
      );
    } else {
      setRows((r) => [
        ...r,
        { id: crypto.randomUUID(), areas: [], ...data },
      ]);
    }
    setModalOpen(false);
  };

  const deleteHospital = (id) =>
    setRows((r) => r.filter((h) => h.id !== id));

  return (
    <>
      <div className="bg-background/70 border border-white/10 rounded-xl shadow">
        <div className="p-6 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Gestión de Hospitales</h3>
            <p className="text-muted-foreground text-sm">
              Administre hospitales y sus áreas internas.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="mt-4 md:mt-0 px-3 py-2 rounded-md bg-primary/90 text-white hover:bg-primary flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Agregar Hospital
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-t border-b border-white/10 bg-background/60">
                <th className="py-3 px-4">Nombre</th>
                <th className="py-3 px-4">Dirección</th>
                <th className="py-3 px-4">Teléfono</th>
                <th className="py-3 px-4">Áreas</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((h) => (
                <tr key={h.id} className="border-b border-white/10">
                  <td className="py-3 px-4">{h.name}</td>
                  <td className="py-3 px-4">{h.address}</td>
                  <td className="py-3 px-4">{h.phone}</td>
                  <td className="py-3 px-4">{h.areas.length}</td>

                  <td className="py-3 px-4 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => setAreasModal(h)}
                      className="px-2 py-1 text-sm rounded hover:bg-white/5"
                    >
                      Áreas
                    </button>
                    <button
                      onClick={() => openEdit(h)}
                      className="px-2 py-1 text-sm rounded hover:bg-white/5"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteHospital(h.id)}
                      className="px-2 py-1 text-sm rounded text-red-400 hover:bg-red-400/10"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No hay hospitales registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL HOSPITAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-background p-6 rounded-xl border border-white/10 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              {editing ? "Editar Hospital" : "Nuevo Hospital"}
            </h2>

            <HospitalForm
              initialData={editing || {}}
              onSubmit={saveHospital}
              onCancel={() => setModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* MODAL ÁREAS */}
      {areasModal && (
        <AreaManagementDialog
          hospital={areasModal}
          onClose={() => setAreasModal(null)}
          onSave={(newAreas) => {
            setRows((r) =>
              r.map((h) =>
                h.id === areasModal.id ? { ...h, areas: newAreas } : h
              )
            );
          }}
        />
      )}
    </>
  );
}
