import React from 'react';
import { Search, Bell, ChevronDown, Calendar, Plus } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const reservationsData = [
  { id: 'RES-0010', orderId: 'ORD-1005', product: 'Laptop Sleeve', qty: 5, status: 'Active', expiresAt: 'Oct 3, 2026 14:32' },
  { id: 'RES-0009', orderId: 'ORD-1004', product: 'Wireless Mouse', qty: 10, status: 'Active', expiresAt: 'Oct 3, 2026 12:20' },
  { id: 'RES-0008', orderId: 'ORD-1003', product: 'Keyboard', qty: 5, status: 'Active', expiresAt: 'Oct 3, 2026 11:05' },
  { id: 'RES-0007', orderId: 'ORD-1002', product: 'Monitor 24"', qty: 2, status: 'Active', expiresAt: 'Oct 3, 2026 10:33' },
  { id: 'RES-0006', orderId: 'ORD-1001', product: 'USB-C Cable', qty: 20, status: 'Expired', expiresAt: 'Oct 2, 2026 18:45' },
  { id: 'RES-0005', orderId: 'ORD-0998', product: 'Webcam', qty: 3, status: 'Released', expiresAt: 'Oct 2, 2026 16:12' },
  { id: 'RES-0004', orderId: 'ORD-0997', product: 'Headphones', qty: 4, status: 'Active', expiresAt: 'Oct 2, 2026 14:27' },
  { id: 'RES-0003', orderId: 'ORD-0996', product: 'Power Bank', qty: 8, status: 'Expired', expiresAt: 'Oct 2, 2026 12:11' },
];

const Reservations = () => {
  return (
    <div className="flex-1 bg-slate-50 min-h-screen flex flex-col">
      <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full w-72">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search reservations..." className="bg-transparent text-sm outline-none w-full" />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-brand-dark text-white rounded-full flex items-center justify-center text-xs font-bold">VI</div>
            <span className="text-sm font-semibold text-slate-800">Victor Ilori</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reservations</h1>
            <p className="text-sm text-slate-500">View and manage all stock reservations.</p>
          </div>
          <button className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-opacity-90">
            <Plus className="w-4 h-4" /> Create Reservation
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <select className="bg-white border border-slate-200 text-xs px-3 py-2 rounded-lg text-slate-600 outline-none">
            <option>All Statuses</option>
          </select>
          <select className="bg-white border border-slate-200 text-xs px-3 py-2 rounded-lg text-slate-600 outline-none">
            <option>All Orders</option>
          </select>
          <div className="bg-white border border-slate-200 text-xs px-3 py-2 rounded-lg text-slate-600 flex items-center gap-2">
            <span>Oct 1, 2026 - Oct 31, 2026</span>
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-slate-200 text-slate-500 text-xs font-semibold">
              <tr>
                <th className="p-4">Reservation ID</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Status</th>
                <th className="p-4">Expires At</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reservationsData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-500">{item.id}</td>
                  <td className="p-4 font-medium text-slate-500">{item.orderId}</td>
                  <td className="p-4 text-slate-800">{item.product}</td>
                  <td className="p-4 text-slate-800">{item.qty}</td>
                  <td className="p-4"><StatusBadge status={item.status} /></td>
                  <td className="p-4 text-slate-600">{item.expiresAt}</td>
                  <td className="p-4 text-right">
                    <button className="border border-slate-300 text-slate-600 px-4 py-1 rounded-full text-xs font-medium hover:bg-slate-100">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;