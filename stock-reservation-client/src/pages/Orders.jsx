import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, X, Plus } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../auth/AuthContext";

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function Orders() {
  const { apiRequest } = useAuth();
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", status: "Pending" });
  const [saving, setSaving] = useState(false);

  const load = () => apiRequest("/orders")
    .then((b) => setOrders(b.data))
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false));

  useEffect(() => { load(); }, [apiRequest]);

  const rows = useMemo(
    () => orders.filter((o) => `${o.orderNumber} ${o.customer?.name || ""} ${o.customer?.email || ""}`.toLowerCase().includes(q.toLowerCase())),
    [orders, q]
  );

  function edit(order) {
    setEditing(order);
    setForm({ name: order.customer?.name || "", email: order.customer?.email || "", status: order.status || "Pending" });
    setError("");
  }

  async function save(e) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      await apiRequest(`/orders/${editing._id}`, {
        method: "PATCH",
        body: JSON.stringify({ customer: { name: form.name, email: form.email }, status: form.status }),
      });
      setEditing(null); await load();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  async function remove(order) {
    if (!window.confirm(`Delete ${order.orderNumber}?`)) return;
    try { await apiRequest(`/orders/${order._id}`, { method: "DELETE" }); await load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h1 className="text-3xl font-bold">Orders</h1><p className="text-slate-500">Create, edit and delete customer orders.</p></div>
        <Link to="/orders/new" className="btn-primary"><Plus size={17}/> Create order</Link>
      </div>
      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      <div className="card overflow-hidden">
        <div className="border-b p-4"><input className="input max-w-md" placeholder="Search orders..." value={q} onChange={(e) => setQ(e.target.value)}/></div>
        {loading ? <p className="p-6">Loading orders…</p> : <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500"><tr>{["Order ID","Customer","Items","Reservation","Order status","Total","Created","Actions"].map((x) => <th className="px-5 py-3" key={x}>{x}</th>)}</tr></thead>
            <tbody className="divide-y">
              {rows.map((o) => <tr key={o._id}>
                <td className="px-5 py-4 font-semibold">{o.orderNumber}</td>
                <td className="px-5 py-4"><p>{o.customer?.name}</p><p className="text-xs text-slate-400">{o.customer?.email}</p></td>
                <td className="px-5 py-4">{o.items?.length || 0}</td>
                <td className="px-5 py-4"><StatusBadge status={o.reservationStatus}/></td>
                <td className="px-5 py-4"><StatusBadge status={o.status}/></td>
                <td className="px-5 py-4">€{Number(o.totalAmount || 0).toFixed(2)}</td>
                <td className="px-5 py-4">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => edit(o)} className="btn-secondary px-3 py-2"><Pencil size={15}/></button><button onClick={() => remove(o)} className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button></div></td>
              </tr>)}
            </tbody>
          </table>
          {!rows.length && <p className="p-8 text-center text-sm text-slate-500">No orders found.</p>}
        </div>}
      </div>

      {editing && <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/40 p-4">
        <form onSubmit={save} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-5 flex justify-between"><div><h2 className="text-xl font-bold">Edit {editing.orderNumber}</h2><p className="text-sm text-slate-500">Update customer details or order status.</p></div><button type="button" onClick={() => setEditing(null)}><X/></button></div>
          <div className="space-y-4">
            <label className="block text-sm font-medium">Customer name<input className="input mt-1" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/></label>
            <label className="block text-sm font-medium">Customer email<input className="input mt-1" type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/></label>
            <label className="block text-sm font-medium">Order status<select className="input mt-1" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>{statuses.map((s)=><option key={s}>{s}</option>)}</select></label>
          </div>
          <div className="mt-6 flex justify-end gap-2"><button type="button" className="btn-secondary" onClick={()=>setEditing(null)}>Cancel</button><button className="btn-primary" disabled={saving}>{saving?"Saving…":"Save changes"}</button></div>
        </form>
      </div>}
    </div>
  );
}
