import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../auth/AuthContext";

export default function Reservations() {
  const { apiRequest } = useAuth();
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [s, setS] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [expiresAt, setExpiresAt] = useState("");

  const load = () => apiRequest(`/reservations${s !== "All" ? `?status=${s}` : ""}`)
    .then((b) => setRows(b.data))
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false));

  useEffect(() => { load(); }, [apiRequest, s]);

  const filtered = useMemo(
    () => rows.filter((r) => `${r.reservationNumber} ${r.order?.orderNumber || ""} ${r.items?.map((x) => x.productName).join(" ")}`.toLowerCase().includes(q.toLowerCase())),
    [rows, q]
  );

  function edit(r) {
    setEditing(r);
    const date = new Date(r.expiresAt);
    setExpiresAt(new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
  }

  async function saveEdit(e) {
    e.preventDefault();
    try { await apiRequest(`/reservations/${editing._id}`, { method: "PATCH", body: JSON.stringify({ expiresAt: new Date(expiresAt).toISOString() }) }); setEditing(null); await load(); }
    catch (e) { setError(e.message); }
  }

  async function remove(r) {
    if (!window.confirm(`Delete ${r.reservationNumber}?`)) return;
    try { await apiRequest(`/reservations/${r._id}`, { method: "DELETE" }); await load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Reservations</h1><p className="text-slate-500">Manage stock holds and reservation lifecycle.</p></div>
        <Link to="/reservations/new" className="btn-primary">+ Create Reservation</Link>
      </div>
      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row"><input className="input" placeholder="Search reservations..." value={q} onChange={(e)=>setQ(e.target.value)}/><select className="input max-w-44" value={s} onChange={(e)=>setS(e.target.value)}><option>All</option><option>Active</option><option>Released</option><option>Expired</option><option>Confirmed</option></select></div>
        {loading ? <p className="p-6">Loading reservations…</p> : <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500"><tr>{["Reservation","Order","Products","Quantity","Status","Expires","Actions"].map((x)=><th className="px-5 py-3" key={x}>{x}</th>)}</tr></thead>
            <tbody className="divide-y">
              {filtered.map((r)=><tr key={r._id}>
                <td className="px-5 py-4 font-semibold"><Link className="text-brand-700" to={`/reservations/${r._id}`}>{r.reservationNumber}</Link></td>
                <td className="px-5 py-4">{r.order?.orderNumber || "—"}</td>
                <td className="px-5 py-4">{r.items?.map((x)=>x.productName).join(", ")}</td>
                <td className="px-5 py-4">{r.items?.reduce((a,x)=>a+x.quantity,0)}</td>
                <td className="px-5 py-4"><StatusBadge status={r.status}/></td>
                <td className="px-5 py-4">{new Date(r.expiresAt).toLocaleString()}</td>
                <td className="px-5 py-4"><div className="flex gap-2"><Link to={`/reservations/${r._id}`} className="btn-secondary px-3 py-2">View</Link>{r.status==="Active"&&<button onClick={()=>edit(r)} className="btn-secondary px-3 py-2"><Pencil size={15}/></button>}{r.status!=="Active"&&<button onClick={()=>remove(r)} className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button>}</div></td>
              </tr>)}
            </tbody>
          </table>
          {!filtered.length && <p className="p-8 text-center text-sm text-slate-500">No reservations found.</p>}
        </div>}
      </div>

      {editing && <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/40 p-4"><form onSubmit={saveEdit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-xl font-bold">Edit reservation</h2><p className="mt-1 text-sm text-slate-500">{editing.reservationNumber}</p><label className="mt-5 block text-sm font-medium">Expires at<input className="input mt-1" type="datetime-local" value={expiresAt} onChange={(e)=>setExpiresAt(e.target.value)} required/></label><div className="mt-6 flex justify-end gap-2"><button type="button" className="btn-secondary" onClick={()=>setEditing(null)}>Cancel</button><button className="btn-primary">Save changes</button></div></form></div>}
    </div>
  );
}
