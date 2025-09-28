import { useEffect, useState } from "react";

function Demo() {
  const [doctores, setDoctores] = useState([]);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamar a PostgreSQL
        const resDoctores = await fetch("http://localhost:4000/api/demo/doctores");
        const dataDoctores = await resDoctores.json();

        // Llamar a MongoDB
        const resCitas = await fetch("http://localhost:4000/api/demo/citas");
        const dataCitas = await resCitas.json();

        setDoctores(dataDoctores);
        setCitas(dataCitas);
      } catch (err) {
        console.error("❌ Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-white mt-10">Cargando datos...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-10 text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        🔎 Datos de SISGESALUD
      </h1>

      {/* Tabla Doctores */}
      <div className="bg-white text-black p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">👨‍⚕️ Doctores (PostgreSQL)</h2>
        {doctores.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Nombre</th>
                <th className="border border-gray-300 p-2">Especialidad</th>
              </tr>
            </thead>
            <tbody>
              {doctores.map((doc) => (
                <tr key={doc.id}>
                  <td className="border border-gray-300 p-2">{doc.id}</td>
                  <td className="border border-gray-300 p-2">{doc.nombre}</td>
                  <td className="border border-gray-300 p-2">{doc.especialidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay doctores registrados.</p>
        )}
      </div>

      {/* Tabla Citas */}
      <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📋 Citas (MongoDB)</h2>
        {citas.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Paciente</th>
                <th className="border border-gray-300 p-2">Doctor</th>
                <th className="border border-gray-300 p-2">Fecha</th>
                <th className="border border-gray-300 p-2">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita._id}>
                  <td className="border border-gray-300 p-2">{cita.paciente}</td>
                  <td className="border border-gray-300 p-2">{cita.doctor}</td>
                  <td className="border border-gray-300 p-2">{cita.fecha}</td>
                  <td className="border border-gray-300 p-2">{cita.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay citas registradas.</p>
        )}
      </div>
    </div>
  );
}

export default Demo;
