import { useForm } from "react-hook-form";

export default function PatientForm({ patient, onSubmit, close }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: patient || {
      name: "",
      dni: "",
      birthDate: "",
      gender: "Masculino",
      phone: "",
      address: "",
    },
  });

  const submit = (data) => onSubmit(data, patient?.id);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-bold">{patient ? "Editar Paciente" : "Registrar Nuevo Paciente"}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {patient ? "Modifique los datos demográficos del paciente." : "Complete los datos para registrar un nuevo paciente."}
        </p>

        <form onSubmit={handleSubmit(submit)} className="space-y-3">
          <div>
            <label className="text-sm">Nombre Completo</label>
            <input className="w-full border rounded-md p-2" {...register("name", { required: true, minLength: 3 })} placeholder="Ej: Carlos Santana" />
            {errors.name && <p className="text-xs text-red-500 mt-1">El nombre es requerido.</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">DNI</label>
              <input className="w-full border rounded-md p-2" {...register("dni", { required: true, minLength: 8, maxLength: 8 })} placeholder="78945612" />
              {errors.dni && <p className="text-xs text-red-500 mt-1">DNI inválido (8 dígitos).</p>}
            </div>
            <div>
              <label className="text-sm">Fecha de Nacimiento</label>
              <input type="date" className="w-full border rounded-md p-2" {...register("birthDate", { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Género</label>
              <select className="w-full border rounded-md p-2" {...register("gender", { required: true })}>
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Teléfono</label>
              <input className="w-full border rounded-md p-2" {...register("phone", { required: true })} placeholder="987654321" />
            </div>
          </div>

          <div>
            <label className="text-sm">Dirección</label>
            <input className="w-full border rounded-md p-2" {...register("address", { required: true })} placeholder="Av. Siempre Viva 123" />
          </div>

        </form>

        <div className="flex justify-end gap-2 mt-5">
          <button className="px-4 py-2 border rounded-md" onClick={close}>Cancelar</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleSubmit(submit)}>
            {patient ? "Guardar Cambios" : "Registrar Paciente"}
          </button>
        </div>
      </div>
    </div>
  );
}
