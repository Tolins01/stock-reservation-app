import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { register } = useAuth(); const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"" });
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(e) { e.preventDefault(); setError(""); 
    if(form.password!==form.confirmPassword) 
    return setError("Passwords do not match"); setLoading(true); 
    try { await register({name:form.name,email:form.email,password:form.password}); navigate("/dashboard",{replace:true}); }  
    catch(err){setError(err.message)} finally{setLoading(false)} }
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
    <h1 className="text-2xl font-bold text-slate-900">Create account</h1><p className="mt-2 text-sm text-slate-500">New users are registered as staff.</p>
    {error && <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
    <div className="mt-6 space-y-4"><input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /><input className="input" type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /><input className="input" type="password" minLength={8} placeholder="Password (minimum 8 characters)" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /><input className="input" type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} required /><button className="btn-primary w-full" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button></div>
    <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-brand-700">Sign in</Link></p>
  </form></div>;
}
