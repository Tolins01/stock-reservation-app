import { ArrowRight, BarChart3, Boxes, CheckCircle2, LockKeyhole, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Boxes,
    title: "Smart inventory control",
    text: "Create, track and manage stock with clear availability and reservation status."
  },
  {
    icon: LockKeyhole,
    title: "Private workspaces",
    text: "Your operational records are protected by authenticated, role-aware access controls."
  },
  {
    icon: BarChart3,
    title: "Operational visibility",
    text: "See inventory, orders and reservations in one focused dashboard."
  },
  {
    icon: Truck,
    title: "Reservation workflow",
    text: "Place time-bound holds on available stock and track the lifecycle through confirmation or release."
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <header className="relative z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
              <Boxes size={21} />
            </span>
            <div>
              <p className="font-bold tracking-tight">Stock Reservation</p>
              <p className="text-xs text-slate-400">Inventory intelligence</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#workflow" className="transition hover:text-white">How it works</a>
            <a href="#security" className="transition hover:text-white">Security</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10">
              Sign in
            </Link>
            <Link to="/register" className="rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_10%_70%,rgba(14,165,233,0.12),transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <Sparkles size={14} /> Built for modern stock operations
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
                Reserve stock.
                <span className="block text-emerald-300">Move business forward.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                A secure workspace for inventory, orders and reservations—designed to give teams a clear view of what is available, what is reserved and what needs attention.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-300">
                  Create your workspace <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                  Sign in to dashboard
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
                {["Inventory", "Reservations", "Orders"].map((item) => (
                  <div key={item} className="text-sm text-slate-300">
                    <CheckCircle2 className="mb-2 text-emerald-300" size={17} />
                    {item} management
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-emerald-400/10 blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Operations overview</p>
                      <p className="text-xs text-slate-500">Live workspace snapshot</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">Healthy</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      ["Total stock", "12,480"],
                      ["Reserved", "2,340"],
                      ["Available", "10,140"]
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                        <p className="text-[11px] text-slate-500">{label}</p>
                        <p className="mt-2 text-lg font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-300">Reservation activity</p>
                      <p className="text-xs text-emerald-300">+18.4%</p>
                    </div>
                    <div className="flex h-32 items-end gap-2">
                      {[35, 52, 42, 70, 58, 84, 68, 96, 76, 90, 82, 100].map((height, index) => (
                        <div key={index} className="flex-1 rounded-t-md bg-emerald-400/70" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-slate-500">Active reservations</p>
                      <p className="mt-1 text-2xl font-bold">128</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-slate-500">Orders today</p>
                      <p className="mt-1 text-2xl font-bold">64</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-24 text-slate-950">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">One operational workspace</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Everything your team needs to stay in control.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Replace scattered spreadsheets and uncertain stock availability with a single workflow for inventory and reservations.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-slate-100 py-24 text-slate-950">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Simple workflow</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">From stock entry to confirmed reservation.</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Create your inventory, build an order, reserve available quantities and follow the reservation through its lifecycle.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  ["01", "Create inventory", "Enter products, SKUs and available quantities."],
                  ["02", "Create an order", "Select inventory and define customer and quantity details."],
                  ["03", "Reserve stock", "Place a time-bound hold against available inventory."],
                  ["04", "Confirm or release", "Complete the order or return reserved stock to availability."]
                ].map(([number, title, text]) => (
                  <div key={number} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="font-black text-emerald-600">{number}</span>
                    <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-slate-600">{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="bg-slate-950 py-24">
          <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400 text-slate-950">
              <ShieldCheck size={27} />
            </div>
            <h2 className="mt-6 text-4xl font-black tracking-tight">Your workspace stays yours.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Authentication and server-side ownership checks keep operational records isolated between clients while privileged users can manage the organization according to their role.
            </p>
            <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:bg-slate-200">
              Get started <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Stock Reservation. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/login" className="hover:text-white">Sign in</Link>
            <Link to="/register" className="hover:text-white">Create account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
