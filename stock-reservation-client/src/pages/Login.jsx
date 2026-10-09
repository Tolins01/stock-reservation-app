import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(form); navigate(location.state?.from?.pathname || "/dashboard", { replace: true }); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
    <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
    <p className="mt-2 text-sm text-slate-500">Stock Reservation Service</p>
    {error && <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
    <div className="mt-6 space-y-4">
      <input className="input" type="email" placeholder="Email address" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
      <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} required />
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </div>
    <p className="mt-6 text-center text-sm text-slate-500">
      Don't have an account? <Link to="/register" className="font-semibold text-brand-700">Create account</Link>
    </p>
  </form></div>;
}
