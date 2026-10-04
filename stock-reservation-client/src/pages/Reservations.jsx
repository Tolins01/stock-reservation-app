import { useState } from 'react';
import { Link } from 'react-router-dom';
import { reservations } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

export default function Reservations() {
  const [q, setQ] = useState('');
  const [s, setS] = useState('All');

  const rows = reservations.filter(
    (r) =>
      (s === 'All' || r.status === s) &&
      `${r.id} ${r.orderId} ${r.product}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reservations</h1>
          <p className="text-slate-500">View and manage all stock reservations.</p>
        </div>
        <Link to="/modal-examples" className="btn-primary">
          + Create Reservation
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="flex gap-3 border-b p-4">
          <input
            className="input"
            placeholder="Search reservations..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="input max-w-44"
            value={s}
            onChange={(e) => setS(e.target.value)}
          >
            {['All', 'Active', 'Released', 'Expired'].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                {['Reservation ID', 'Order ID', 'Product', 'Quantity', 'Status', 'Expires At', 'Action'].map((x) => (
                  <th className="px-5 py-3" key={x}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-5 py-4 font-semibold">{r.id}</td>
                  <td className="px-5 py-4">{r.orderId}</td>
                  <td className="px-5 py-4">{r.product}</td>
                  <td className="px-5 py-4">{r.quantity}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-4">{r.expiresAt}</td>
                  <td className="px-5 py-4">
                    <Link to={`/reservations/${r.id}`} className="text-brand-700 font-semibold">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

