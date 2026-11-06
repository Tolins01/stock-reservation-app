import { useState } from "react";
import {
  ArrowRight, BarChart3, Boxes, CheckCircle2, Clock3,
  LockKeyhole, Menu, PackageCheck, ShieldCheck, Sparkles, Truck, X
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Boxes, title: "Smart inventory control", text: "Create, track and manage stock with clear availability and reservation status." },
  { icon: LockKeyhole, title: "Private workspaces", text: "Operational records are protected by authenticated, role-aware access controls." },
  { icon: BarChart3, title: "Operational visibility", text: "See inventory, orders and reservations in one focused dashboard." },
  { icon: Truck, title: "Reservation workflow", text: "Place time-bound holds on available stock and track each reservation through confirmation or release." }
];

const activityBars = [35, 52, 42, 70, 58, 84, 68, 96, 76, 90, 82, 100];

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[590px]">
      <div className="absolute -inset-5 rounded-[2.5rem] bg-emerald-400/15 blur-3xl sm:-inset-8" />
      <div className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-2.5 shadow-2xl shadow-black/40 backdrop-blur sm:rounded-[2rem] sm:p-3.5">
        <div className="overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#0d1b2a] p-3.5 sm:rounded-[1.5rem] sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300"><Boxes size={18} /></span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">Operations overview</p>
                <p className="text-[11px] text-slate-500">Workspace snapshot</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 sm:text-xs">● System healthy</span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Total stock", value: "12,480", icon: Boxes },
              { label: "Reserved", value: "2,340", icon: Clock3 },
              { label: "Available", value: "10,140", icon: PackageCheck }
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.045] p-2.5 sm:p-3.5">
                <Icon size={15} className="mb-2 text-emerald-300/80" />
                <p className="truncate text-[10px] text-slate-400 sm:text-xs">{label}</p>
                <p className="mt-1 break-words text-sm font-bold tracking-tight text-white sm:text-xl">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3.5 sm:mt-4 sm:p-4">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div><p className="text-xs font-semibold text-slate-200">Reservation activity</p><p className="mt-0.5 text-[10px] text-slate-500">Weekly overview</p></div>
              <span className="rounded-lg bg-emerald-300/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">+18.4%</span>
            </div>
            <div className="flex h-24 items-end gap-1.5 sm:h-32 sm:gap-2">
              {activityBars.map((height, index) => (
                <div key={index} className="flex h-full flex-1 items-end">
                  <div className="w-full rounded-t-sm bg-gradient-to-t from-emerald-600 to-emerald-300/90 opacity-90" style={{ height: `${height}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[9px] text-slate-600"><span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span></div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 sm:p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sky-400/10 text-sky-300"><PackageCheck size={16} /></span>
              <div className="min-w-0"><p className="truncate text-[10px] text-slate-500 sm:text-xs">Active reservations</p><p className="text-lg font-bold text-white sm:text-xl">128</p></div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 sm:p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet-400/10 text-violet-300"><Truck size={16} /></span>
              <div className="min-w-0"><p className="truncate text-[10px] text-slate-500 sm:text-xs">Orders today</p><p className="text-lg font-bold text-white sm:text-xl">64</p></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-2 hidden items-center gap-2 rounded-xl border border-white/10 bg-slate-900/95 px-4 py-3 shadow-xl sm:flex lg:-left-8">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300"><CheckCircle2 size={17} /></span>
        <div><p className="text-xs font-semibold text-white">Stock status updated</p><p className="text-[10px] text-slate-500">Availability at a glance</p></div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-950 text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" onClick={closeMenu} className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"><Boxes size={21} /></span>
            <span className="min-w-0"><span className="block truncate text-sm font-bold tracking-tight sm:text-base">Stock Reservation</span><span className="block text-[10px] text-slate-400 sm:text-xs">Inventory intelligence</span></span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-emerald-300">Features</a>
            <a href="#workflow" className="transition hover:text-emerald-300">How it works</a>
            <a href="#security" className="transition hover:text-emerald-300">Security</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">Sign in</Link>
            <Link to="/register" className="rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">Get started <ArrowRight className="ml-1 inline" size={15} /></Link>
          </div>

          <button type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="border-t border-white/10 bg-slate-950 px-4 pb-5 pt-3 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              <a href="#features" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-slate-200 hover:bg-white/5">Features</a>
              <a href="#workflow" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-slate-200 hover:bg-white/5">How it works</a>
              <a href="#security" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-slate-200 hover:bg-white/5">Security</a>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                <Link to="/login" onClick={closeMenu} className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white">Sign in</Link>
                <Link to="/register" onClick={closeMenu} className="rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-bold text-slate-950">Get started</Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="relative isolate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_20%,rgba(16,185,129,0.20),transparent_42%),radial-gradient(ellipse_at_5%_75%,rgba(14,165,233,0.12),transparent_38%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:px-8 lg:pb-28 lg:pt-24">
            <div className="min-w-0">
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-[10px] font-semibold text-emerald-300 sm:mb-6 sm:text-xs">
                <Sparkles size={14} className="shrink-0" /> Built for modern stock operations
              </div>
              <h1 className="max-w-3xl text-[clamp(2.55rem,8vw,4.5rem)] font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Know your stock.<span className="block text-emerald-300">Own every move.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:mt-7 sm:text-lg sm:leading-8">
                Bring inventory, orders and reservations into one clear workspace. Track what is available, what is committed and what needs your attention.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-9 sm:flex">
                <Link to="/register" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5 hover:bg-emerald-300 sm:text-base">Create your workspace <ArrowRight size={17} /></Link>
                <Link to="/login" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base">Sign in to dashboard</Link>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-6 sm:mt-10 sm:grid-cols-3">
                {["Inventory", "Reservations", "Orders"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-300 sm:text-sm"><CheckCircle2 className="shrink-0 text-emerald-300" size={16} />{item}</div>
                ))}
              </div>
            </div>
            <div className="min-w-0 pt-1 sm:px-3 lg:px-0"><DashboardPreview /></div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-white py-16 text-slate-950 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-sm">One operational workspace</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Everything in sync. Nothing overlooked.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">Replace scattered spreadsheets and uncertain stock availability with a focused workflow for inventory and reservations.</p>
            </div>
            <div className="mt-9 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
              {features.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl sm:p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><Icon size={21} /></div>
                  <h3 className="mt-4 font-bold sm:mt-5">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="scroll-mt-24 bg-slate-100 py-16 text-slate-950 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-sm">A clearer process</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">From stock entry to confirmed reservation.</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">Create your inventory, build an order, reserve available quantities and follow each reservation through its lifecycle.</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                ["01", "Create inventory", "Enter products, SKUs and available quantities."],
                ["02", "Create an order", "Select inventory and define customer and quantity details."],
                ["03", "Reserve stock", "Place a time-bound hold against available inventory."],
                ["04", "Confirm or release", "Complete the order or return reserved stock to availability."]
              ].map(([number, title, text]) => (
                <div key={number} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-sm font-black text-emerald-700">{number}</span>
                  <div className="min-w-0"><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="scroll-mt-24 bg-slate-950 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400 text-slate-950"><ShieldCheck size={27} /></div>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:mt-6 sm:text-4xl">Your workspace stays yours.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:mt-5 sm:text-lg sm:leading-8">Authentication and server-side ownership checks help keep operational records isolated between clients, with privileged actions governed by user roles.</p>
            <Link to="/register" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:bg-slate-200">Get started <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7 sm:text-sm lg:px-8">
          <p>© {new Date().getFullYear()} Stock Reservation. All rights reserved.</p>
          <div className="flex gap-5"><Link to="/login" className="hover:text-white">Sign in</Link><Link to="/register" className="hover:text-white">Create account</Link></div>
        </div>
      </footer>
    </div>
  );
}
