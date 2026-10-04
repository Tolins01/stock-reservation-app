import { orders } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-slate-500">View and manage customer orders.</p>
      </div>

      <div className="card overflow-hidden">
        <div className="flex gap-3 border-b p-4">
          <input className="input" placeholder="Search orders..." />
          <select className="input max-w-44">
            <option>All Statuses</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                {['Order ID', 'Customer', 'Items', 'Reservation Status', 'Order Status', 'Created At', 'Action'].map((x) => (
                  <th className="px-5 py-3" key={x}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="px-5 py-4 font-semibold">{o.id}</td>
                  <td className="px-5 py-4">{o.customer}</td>
                  <td className="px-5 py-4">{o.items} items</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={o.reservation} />
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={o.orderStatus} />
                  </td>
                  <td className="px-5 py-4">{o.created}</td>
                  <td className="px-5 py-4 text-brand-700 font-semibold">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
