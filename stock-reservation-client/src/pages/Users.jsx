import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function Users() {
  const { apiRequest, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const load = () => apiRequest("/users").then((b) => setUsers(b.data)).catch((e) => setError(e.message));

  useEffect(() => { load(); }, [apiRequest]);

  async function role(id, role) {
    try { await apiRequest(`/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }); await load(); }
    catch (e) { setError(e.message); }
  }

  async function remove(u) {
    if (!window.confirm(`Delete ${u.name}'s account?`)) return;
    try { await apiRequest(`/users/${u.id}`, { method: "DELETE" }); await load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Users</h1><p className="text-slate-500">Manage registered accounts, roles and access.</p></div>
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500"><tr>{["Name","Email","Role","Created","Actions"].map((x)=><th className="px-5 py-3" key={x}>{x}</th>)}</tr></thead>
            <tbody className="divide-y">
              {users.map((u) => <tr key={u.id}>
                <td className="px-5 py-4 font-semibold">{u.name}{u.id===user?.id&&<span className="ml-2 text-xs text-slate-400">You</span>}</td>
                <td className="px-5 py-4">{u.email}</td>
                <td className="px-5 py-4"><select className="input max-w-36" value={u.role} disabled={u.id===user?.id || user?.role!=="admin"} onChange={(e)=>role(u.id,e.target.value)}><option>staff</option><option>manager</option><option>admin</option></select></td>
                <td className="px-5 py-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-4">{user?.role==="admin" && u.id!==user?.id && <button onClick={()=>remove(u)} className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button>}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
