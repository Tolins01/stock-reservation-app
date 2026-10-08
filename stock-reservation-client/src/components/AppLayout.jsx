import {
  LayoutDashboard, Package, ShoppingCart, CalendarClock, Bell, Users,
  Settings, LogOut, Menu, X, PlusCircle, UserPlus
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function AppLayout() {
  const { user, logout, offline } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    ["Dashboard", "/", LayoutDashboard],
    ["Inventory", "/inventory", Package],
    ["Orders", "/orders", ShoppingCart],
    ["New Order", "/orders/new", PlusCircle],
    ["Reservations", "/reservations", CalendarClock],
    ["New Reservation", "/reservations/new", PlusCircle],
    ["Notifications", "/notifications", Bell],
    ["Profile / Settings", "/settings", Settings],
  ];

  if (user?.role === "admin" || user?.role === "manager") {
    navigation.push(["Users", "/users", Users]);
  }
  // Public account pages are included here so every app page remains discoverable.
  navigation.push(["Sign-up", "/register", UserPlus]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <button onClick={() => navigate("/")} className="font-bold text-slate-900">Stock Reservation</button>
        <button onClick={() => setMobileOpen((v) => !v)} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Open menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div>
            <h1 className="font-bold text-slate-900">Stock Reservation</h1>
            <p className="text-xs text-slate-500">Inventory Management</p>
          </div>
        </div>

        {offline && (
          <div className="mx-3 mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            Offline mode: showing saved local data.
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map(([name, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} />
              <span>{name}</span>
              {name === "Notifications" && (
                <span className="ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">•</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-900 font-semibold text-white">
              {getInitials(user?.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{user?.name || "User"}</p>
              <p className="truncate text-xs text-slate-500">{user?.email || ""}</p>
              <p className="mt-0.5 text-xs capitalize text-slate-400">{user?.role || "staff"}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate("/login", { replace: true }); }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <main className="min-h-screen lg:pl-64">
        <div className="px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function getInitials(name = "") {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "U";
}
