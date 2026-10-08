import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Clock3, CheckCircle2, AlertTriangle, PlusCircle, ArrowRight } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { apiRequest } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/dashboard")
      .then((body) => setData(body.data))
      .catch((e) => setError(e.message));
  }, [apiRequest]);

  const stats = data?.stats || {};
  const cards = [
    ["Total Inventory", stats.totalInventory ?? 0, Package],
    ["Available Inventory", stats.availableInventory ?? 0, CheckCircle2],
    ["Active Reservations", stats.activeReservations ?? 0, Clock3],
    ["Expired Reservations", stats.expiredReservations ?? 0, AlertTriangle],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-700">Overview</p>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-500">Your live inventory, orders and reservations at a glance.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/inventory" className="btn-secondary"><Package size={17}/> Manage inventory</Link>
          <Link to="/orders/new" className="btn-primary"><PlusCircle size={17}/> New order</Link>
        </div>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, value, Icon]) => (
          <div key={title} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{value.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-slate-100 p-3"><Icon size={21}/></div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="card overflow-hidden xl:col-span-2">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h2 className="font-bold">Recent reservations</h2>
              <p className="text-sm text-slate-500">Latest stock holds and their status.</p>
            </div>
            <Link to="/reservations" className="text-sm font-semibold text-brand-700">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>{["Reservation", "Customer", "Items", "Status", "Expires"].map((x) => <th className="px-5 py-3" key={x}>{x}</th>)}</tr>
              </thead>
              <tbody className="divide-y">
                {(data?.recentReservations || []).map((r) => (
                  <tr key={r._id}>
                    <td className="px-5 py-4"><Link className="font-semibold text-brand-700" to={`/reservations/${r._id}`}>{r.reservationNumber}</Link></td>
                    <td className="px-5 py-4">{r.order?.customer?.name || "—"}</td>
                    <td className="px-5 py-4">{r.items?.reduce((sum, x) => sum + x.quantity, 0) || 0}</td>
                    <td className="px-5 py-4"><StatusBadge status={r.status}/></td>
                    <td className="px-5 py-4">{new Date(r.expiresAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!data?.recentReservations?.length && <p className="p-8 text-center text-sm text-slate-500">No reservations yet. Create one from the Reservations page.</p>}
          </div>
        </div>

        <div className="card">
          <div className="border-b p-5">
            <h2 className="font-bold">Quick actions</h2>
            <p className="text-sm text-slate-500">Jump straight into common tasks.</p>
          </div>
          <div className="space-y-2 p-4">
            {[
              ["/orders/new", "Create new order", "Start a customer order."],
              ["/reservations/new", "Create reservation", "Hold stock for an order."],
              ["/inventory", "Manage inventory", "Create, edit or remove stock."],
              ["/notifications", "View notifications", "Review account activity."],
            ].map(([to, title, description]) => (
              <Link key={to} to={to} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
                <div className="min-w-0 flex-1"><p className="font-semibold text-slate-900">{title}</p><p className="text-xs text-slate-500">{description}</p></div>
                <ArrowRight size={17}/>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="card p-5">
        <div className="flex items-center justify-between">
          <div><h2 className="font-bold">Today</h2><p className="text-sm text-slate-500">Orders created today.</p></div>
          <p className="text-3xl font-bold">{stats.ordersToday ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
