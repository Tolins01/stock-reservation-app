import { useEffect, useState } from "react";
import { CheckCheck, Bell } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function Notifications() {
  const { apiRequest } = useAuth();
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");

  const load = () => apiRequest("/notifications").then((b) => {
    setItems(b.data);
    setUnread(b.unreadCount);
  }).catch((e) => setError(e.message));

  useEffect(() => { load(); }, [apiRequest]);

  async function markRead(id) {
    try { await apiRequest(`/notifications/${id}/read`, { method: "PATCH" }); await load(); }
    catch (e) { setError(e.message); }
  }

  async function markAll() {
    try { await apiRequest("/notifications/read-all", { method: "PATCH" }); await load(); }
    catch (e) { setError(e.message); }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Notifications</h1><p className="text-slate-500">{unread} unread notification{unread === 1 ? "" : "s"}.</p></div>
        <button onClick={markAll} className="btn-secondary"><CheckCheck size={17}/> Mark all read</button>
      </div>
      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      <div className="card divide-y overflow-hidden">
        {!items.length && <div className="p-10 text-center text-slate-500"><Bell className="mx-auto mb-3" size={28}/><p>No notifications yet.</p></div>}
        {items.map((n) => (
          <button key={n._id} onClick={() => !n.read && markRead(n._id)} className={`flex w-full gap-4 p-5 text-left hover:bg-slate-50 ${n.read ? "" : "bg-emerald-50/50"}`}>
            <div className="mt-0.5 rounded-full bg-slate-100 p-2"><Bell size={17}/></div>
            <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><p className="font-semibold">{n.title}</p>{!n.read && <span className="h-2 w-2 rounded-full bg-brand-600"/>}</div><p className="mt-1 text-sm text-slate-600">{n.message}</p><p className="mt-2 text-xs text-slate-400">{new Date(n.createdAt).toLocaleString()}</p></div>
          </button>
        ))}
      </div>
    </div>
  );
}
