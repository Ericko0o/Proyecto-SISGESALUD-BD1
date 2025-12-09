import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

export default function DashboardLayout({ role = "patient" }) {
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-background/60 to-background">
      <Sidebar role={role} />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
