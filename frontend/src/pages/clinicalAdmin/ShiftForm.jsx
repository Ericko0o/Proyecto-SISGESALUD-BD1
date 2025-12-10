import { useForm } from "react-hook-form";

const AREAS = ["Emergencia", "Consulta Externa", "Cardiología", "Pediatría"];
const DAYS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

export default function ShiftForm({ shift, onSubmit, close }) {
  const { register, handleSubmit } = useForm({
    defaultValues: shift || { area: "", day: "", startTime: "", endTime: "" },
  });

  const submit = (data) => {
    onSubmit(data, shift?.id);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-bold">{shift ? "Editar Turno" : "Asignar Nuevo Turno"}</h3>
        <p className="text-sm text-gray-600 mb-4">Especifique el área, día y horario del turno.</p>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Área</label>
              <select className="w-full border rounded-md p-2" {...register("area", { required: true })}>
                <option value="">Seleccione un área</option>
                {AREAS.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm">Día</label>
              <select className="w-full border rounded-md p-2" {...register("day", { required: true })}>
                <option value="">Seleccione un día</option>
                {DAYS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Hora Inicio</label>
              <input type="time" className="w-full border rounded-md p-2" {...register("startTime", { required: true })} />
            </div>
            <div>
              <label className="text-sm">Hora Fin</label>
              <input type="time" className="w-full border rounded-md p-2" {...register("endTime", { required: true })} />
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-2 mt-5">
          <button className="px-4 py-2 border rounded-md" onClick={close}>Cancelar</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleSubmit(submit)}>
            {shift ? "Guardar Cambios" : "Asignar Turno"}
          </button>
        </div>
      </div>
    </div>
  );
}
