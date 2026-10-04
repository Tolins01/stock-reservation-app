import { useParams, Link } from 'react-router-dom';
import { reservations } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

export default function ReservationDetails() {
  const { id } = useParams();
  const r = reservations.find((x) => x.id === id) || reservations[0];

  return (
    <div className="space-y-6">
      <Link to="/reservations" className="text-sm font-semibold text-slate-600">
        ← Back to Reservations
      </Link>

      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reservation Details</h1>
          <p className="text-slate-500">
            {r.id} • {r.orderId}
          </p>
        </div>
        <StatusBadge status={r.status} />
      </div>

      <div className="card grid gap-5 p-5 sm:grid-cols-4">
        {[
          ['Reservation ID', r.id],
          ['Order ID', r.orderId],
          ['Created At', 'Oct 1, 2026 14:32'],
          ['Expires At', r.expiresAt],
        ].map(([label, value]) => (
          <div key={label}>
            <small className="text-slate-400">{label}</small>
            <p className="font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="font-bold">Order Information</h2>
          <div className="mt-4 space-y-3 text-sm">
            <p className="flex justify-between">
              <span>Customer</span>
              <b>John Doe</b>
            </p>
            <p className="flex justify-between">
              <span>Order Status</span>
              <b>Pending</b>
            </p>
            <p className="flex justify-between">
              <span>Total Items</span>
              <b>2</b>
            </p>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-bold">Reserved Items</h2>
          <div className="mt-4 rounded-xl bg-slate-50 p-4 flex justify-between">
            <span>{r.product}</span>
            <b>{r.quantity}</b>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="btn-secondary text-red-600">Release Reservation</button>
        <button className="btn-primary">Confirm Order</button>
      </div>
    </div>
  );
}
