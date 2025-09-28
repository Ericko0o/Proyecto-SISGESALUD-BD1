import { Link } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-5xl font-extrabold text-white mb-6">
        SISGESALUD-PERÚ funcionando con Tailwind
      </h1>

      <Link
        to="/demo"
        className="mt-8 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100"
      >
        Ir a Demo 🚑
      </Link>
    </div>
  );
}

export default App;
