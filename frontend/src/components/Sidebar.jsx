// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { HeartPulse } from "lucide-react";
import {
  NAV_PATIENT,
  NAV_DOCTOR,
  NAV_PHARMACY,
  NAV_LABORATORY,
  NAV_CLINICAL_ADMIN,
  NAV_ADMIN,                 // 👈 nuevo
} from "../lib/roleConfig";

export default function Sidebar({ role = "patient" }) {
  const items =
    role === "patient" ? NAV_PATIENT :
    role === "doctor" ? NAV_DOCTOR :
    role === "pharmacy" ? NAV_PHARMACY :
    role === "laboratory" ? NAV_LABORATORY :
    role === "clinical-admin" || role === "clinicalAdmin" ? NAV_CLINICAL_ADMIN :
    role === "admin" ? NAV_ADMIN :                        // 👈 nuevo
    [];

  return (
    <aside className="w-64 h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 p-4 flex flex-col">
      <div className="flex items-center gap-3 px-2 mb-6">
        <HeartPulse className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold tracking-wide">SISGESALUD</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? "bg-primary/20 text-primary" : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="mt-auto text-sm px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/10">
        Cerrar sesión
      </button>
    </aside>
  );
}
