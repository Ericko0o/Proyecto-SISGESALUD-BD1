// src/pages/admin/Hospitals.jsx
import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import HospitalForm from "./forms/HospitalForm.jsx";
import AreaManagementDialog from "./dialogs/AreaManagementDialog.jsx";
import { adminAPI } from "../../services/api";

export default function Hospitals() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [areasModal, setAreasModal] = useState(null);

  // Cargar hospitales al montar el componente
  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const hospitals = await adminAPI.getHospitals();
      setRows(hospitals);
    } catch (error) {
      console.error('Error al cargar hospitales:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (hospital) => {
    setEditing(hospital);
    setModalOpen(true);
  };

  const saveHospital = async (data) => {
    try {
      if (editing) {
        await adminAPI.updateHospital(editing.id_hospital, data);
      } else {
        await adminAPI.createHospital(data);
      }
      
      await fetchHospitals();
      setModalOpen(false);
    } catch (error) {
      console.error('Error al guardar hospital:', error);
      alert('Error al guardar el hospital');
    }
  };

  const deleteHospital = async (id) => {
    if (!confirm('¿Está seguro de eliminar este hospital?')) return;
    
    try {
      await adminAPI.deleteHospital(id);
      await fetchHospitals();
    } catch (error) {
      console.error('Error al eliminar hospital:', error);
      alert('Error al eliminar el hospital');
    }
  };

  if (loading && rows.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Áreas</th>
                <th className="py-3 px-4">Citas</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((h) => (
                <tr key={h.id_hospital} className="border-b border-white/10">
                  <td className="py-3 px-4">{h.nombre}</td>
                  <td className="py-3 px-4">{h.direccion}</td>
                  <td className="py-3 px-4">{h.tipo}</td>
                  <td className="py-3 px-4">{h.areas_count || 0}</td>
                  <td className="py-3 px-4">{h.citas_count || 0}</td>
                  <td className="py-3 px-4 text-right space-x-2">
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
                      onClick={() => deleteHospital(h.id_hospital)}
                      className="px-2 py-1 text-sm rounded text-red-400 hover:bg-red-400/10"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
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
          onSave={async (newAreas) => {
            try {
              // Aquí necesitarías implementar la lógica para guardar áreas
              // usando adminAPI.createArea y adminAPI.deleteArea
              await fetchHospitals();
            } catch (error) {
              console.error('Error al guardar áreas:', error);
            }
          }}
        />
      )}
    </>
  );
}