export default function Settings(){return <div className="space-y-6">
    <div><h1 className="text-3xl font-bold">
    Settings</h1>
    <p className="text-slate-500">Configure reservation behavior.</p>
    </div><div className="card max-w-3xl p-6 space-y-6">
        <label className="block text-sm font-medium">Default reservation duration
            <input className="input mt-1" value="24 hours" readOnly/>
            </label><label className="block text-sm font-medium">Expiration check interval<input className="input mt-1" value="5 minutes" readOnly/>
            </label><label className="flex gap-3 text-sm"><input type="checkbox" defaultChecked/> Notify when reservations expire</label>
            </div>
            </div>
    }
