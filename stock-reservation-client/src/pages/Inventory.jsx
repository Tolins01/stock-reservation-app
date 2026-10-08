import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../auth/AuthContext";

const blank = { name: "", sku: "", totalStock: 0 };

export default function Inventory() {
  const { apiRequest } = useAuth();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);

  const load = () => apiRequest("/inventory")
    .then((b) => setItems(b.data))
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false));

  useEffect(() => { load(); }, [apiRequest]);

  const rows = useMemo(
    () => items.filter((p) => `${p.name} ${p.sku}`.toLowerCase().includes(q.toLowerCase())),
    [items, q]
  );

  function openCreate() { setEditing("new"); setForm(blank); setError(""); }
  function openEdit(item) {
    setEditing(item._id);
    setForm({ name: item.name, sku: item.sku, totalStock: item.totalStock });
    setError("");
  }

  async function save(e) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const payload = { ...form, totalStock: Number(form.totalStock) };
      if (editing === "new") await apiRequest("/inventory", { method: "POST", body: JSON.stringify(payload) });
      else await apiRequest(`/inventory/${editing}`, { method: "PATCH", body: JSON.stringify(payload) });
      setEditing(null); await load();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  }

  async function remove(item) {
    if (!window.confirm(`Delete ${item.name}? This cannot be undone.`)) return;
    try { await apiRequest(`/inventory/${item._id}`, { method: "DELETE" }); await load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h1 className="text-3xl font-bold">Inventory</h1><p className="text-slate-500">Create, edit and delete stock items.</p></div>
        <button className="btn-primary" onClick={openCreate}><Plus size={18}/> Add inventory</button>
      </div>
      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <div className="card overflow-hidden">
        <div className="border-b p-4"><input className="input max-w-md" placeholder="Search products or SKU..." value={q} onChange={(e) => setQ(e.target.value)}/></div>
        {loading ? <p className="p-6">Loading inventory…</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500"><tr>{["Product","SKU","Total","Reserved","Available","Status","Actions"].map((x) => <th className="px-5 py-3" key={x}>{x}</th>)}</tr></thead>
              <tbody className="divide-y">
                {rows.map((p) => {
                  const available = p.totalStock - p.reservedStock;
                  return <tr key={p._id}>
                    <td className="px-5 py-4 font-semibold">{p.name}</td>
                    <td className="px-5 py-4">{p.sku}</td>
                    <td className="px-5 py-4">{p.totalStock}</td>
                    <td className="px-5 py-4">{p.reservedStock}</td>
                    <td className="px-5 py-4 font-semibold">{available}</td>
                    <td className="px-5 py-4"><StatusBadge status={available > 0 ? "In Stock" : "Out of Stock"}/></td>
                    <td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => openEdit(p)} className="btn-secondary px-3 py-2"><Pencil size={15}/></button><button onClick={() => remove(p)} className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button></div></td>
                  </tr>;
                })}
              </tbody>
            </table>
            {!rows.length && <p className="p-8 text-center text-sm text-slate-500">No inventory items found.</p>}
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/40 p-4">
          <form onSubmit={save} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-bold">{editing === "new" ? "Add inventory" : "Edit inventory"}</h2><p className="text-sm text-slate-500">Changes are saved to the database.</p></div><button type="button" onClick={() => setEditing(null)}><X/></button></div>
            <div className="space-y-4">
              <label className="block text-sm font-medium">Product name<input className="input mt-1" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} required/></label>
              <label className="block text-sm font-medium">SKU<input className="input mt-1" value={form.sku} onChange={(e) => setForm({...form, sku:e.target.value.toUpperCase()})} required/></label>
              <label className="block text-sm font-medium">Total stock<input className="input mt-1" type="number" min={form.reservedStock || 0} value={form.totalStock} onChange={(e) => setForm({...form, totalStock:e.target.value})} required/></label>
            </div>
            <div className="mt-6 flex justify-end gap-2"><button type="button" className="btn-secondary" onClick={() => setEditing(null)}>Cancel</button><button className="btn-primary" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
