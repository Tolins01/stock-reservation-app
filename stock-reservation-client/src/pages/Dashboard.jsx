import{Box,Clock3,ShoppingCart,Timer,ArrowUpRight} from'lucide-react';
import{Link}from'react-router-dom';
import{reservations}from'../data/mockData';
import StatusBadge from '../components/StatusBadge';

const stats=[['Total Inventory','1,248','+5%',Box],
['Active Reservations','86','+12%',Clock3],['Orders Today','32','+8%',ShoppingCart],
['Expired (Released)','7','−42%',Timer]];

export default function Dashboard(){
    return <div className="space-y-7"><div><h1 className="text-3xl font-bold">Welcome back, Victor 👋</h1>
    <p className="mt-1 text-slate-500">Manage stock reservations, track orders, and keep your inventory accurate.</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {
        stats.map(([l,v,c,I])=><div className="card p-5" key={l}>
        <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
        <I size={20}/></div><p className="text-sm text-slate-500">{l}</p><b className="mt-1 block text-3xl">{v}</b>
        <p className="mt-2 text-xs font-semibold text-emerald-600">{c} vs last week</p></div>)}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1fr_330px]">
            <section className="card overflow-hidden">
        <div className="flex justify-between border-b p-5">
            <b>Recent Reservations</b>
        <Link to="/reservations" className="flex items-center gap-1 text-sm font-semibold text-brand-700">
             View all<ArrowUpRight size={15}/></Link></div>
             <Table rows={reservations}/>
        </section><aside className="space-y-5">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><b>Quick Actions</b>
            <Link to="/modal-examples" className="btn-primary mt-4 w-full">+ Create Reservation</Link>
            <Link to="/inventory" className="btn-secondary mt-3 w-full">Manage Inventory</Link>
            </div><div className="card p-5">
            <b>Recent Activity</b>
            {['Reservation created','Reservation created','Reservation released','Reservation expired'].map(
                (x,i)=><div className="mt-4 flex gap-3 text-sm" 
                key={i}><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"/>
                <span>{x}<small className="block text-slate-400">{i+1}h ago</small></span></div>)}
                </div></aside></div></div>
        }
        
function Table({rows}){
    return <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500"><tr>{['Reservation ID','Order #','Product','Quantity','Status','Expires At','Action'].map(x=><th className="px-5 py-3" key={x}>{x}</th>)}
            </tr></thead><tbody className="divide-y">{rows.map(r=><tr key={r.id}>
                <td className="px-5 py-3 font-semibold">{r.id}</td><td className="px-5 py-3">{r.orderId}</td><td className="px-5 py-3">{r.product}</td>
                <td className="px-5 py-3">{r.quantity}</td><td className="px-5 py-3"><StatusBadge status={r.status}/></td>
                <td className="px-5 py-3">{r.expiresAt}</td><td className="px-5 py-3">
                    <Link to={`/reservations/${r.id}`} className="text-brand-700 font-semibold">View</Link></td></tr>)}
                    </tbody>
                    </table>
                </div>
            }
