import React from 'react';
import { LayoutDashboard, ShoppingCart, Package, ListOrdered, Settings, Box, Leaf, Search, Bell, ChevronDown, Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const mockOrders = [
  { id: 'ORD-1005', customer: 'John Doe', items: '2 items', resStatus: 'Active', orderStatus: 'Pending', createdAt: 'Oct 3, 2026 14:20' },
  { id: 'ORD-1004', customer: 'Sarah Ahmed', items: '3 items', resStatus: 'Active', orderStatus: 'Processing', createdAt: 'Oct 3, 2026 12:10' },
  { id: 'ORD-1003', customer: 'Michael Brown', items: '1 item', resStatus: 'Active', orderStatus: 'Shipped', createdAt: 'Oct 3, 2026 10:45' },
  { id: 'ORD-1002', customer: 'Aisha Bello', items: '2 items', resStatus: 'Active', orderStatus: 'Processing', createdAt: 'Oct 3, 2026 09:30' },
  { id: 'ORD-1001', customer: 'Daniel Kim', items: '1 item', resStatus: 'Expired', orderStatus: 'Cancelled', createdAt: 'Oct 2, 2026 18:12' },
  { id: 'ORD-0999', customer: 'Fatima Yusuf', items: '4 items', resStatus: 'Released', orderStatus: 'Delivered', createdAt: 'Oct 2, 2026 16:20' },
  { id: 'ORD-0998', customer: 'Chinedu Okafor', items: '2 items', resStatus: 'Active', orderStatus: 'Processing', createdAt: 'Oct 2, 2026 14:05' },
  { id: 'ORD-0997', customer: 'Grace Wilson', items: '1 item', resStatus: 'Active', orderStatus: 'Pending', createdAt: 'Oct 2, 2026 11:40' },
];

const getBadgeStyle = (status) => {
  switch (status) {
    case 'Active': return 'bg-emerald-100/70 text-emerald-700';
    case 'Expired': return 'bg-rose-100 text-rose-600';
    case 'Released': return 'bg-slate-100 text-slate-600';
    case 'Pending': return 'bg-amber-100/70 text-amber-700';
    case 'Processing': return 'bg-blue-100/70 text-blue-700';
    case 'Shipped': return 'bg-sky-100 text-sky-700';
    case 'Cancelled': return 'bg-rose-100 text-rose-600';
    case 'Delivered': return 'bg-emerald-100/70 text-emerald-700';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const OrdersPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        
        {/* Content Area */}
        <main className="p-8 flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Orders</h2>
              <p className="text-sm text-slate-500 mt-0.5">View and manage <span className="font-semibold text-slate-700">customer orders</span>.</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-600"><option>All Statuses</option></select>
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-600">
                <span>Oct 1, 2026 – Oct 31, 2026</span>
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#033625] text-white text-xs font-semibold rounded-lg">
                <Plus className="w-4 h-4" /> Create Order
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase bg-slate-50/50">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Items</th>
                  <th className="py-4 px-6">Reservation Status</th>
                  <th className="py-4 px-6">Order Status</th>
                  <th className="py-4 px-6">Created At</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-medium text-slate-700">{order.id}</td>
                    <td className="py-4 px-6 text-slate-800 font-medium">{order.customer}</td>
                    <td className="py-4 px-6 text-slate-500">{order.items}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${getBadgeStyle(order.resStatus)}`}>{order.resStatus}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${getBadgeStyle(order.orderStatus)}`}>{order.orderStatus}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs">{order.createdAt}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="px-3 py-1 text-xs border border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 rounded-md">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 gap-1">
              <button className="p-1 text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-7 h-7 text-xs font-semibold rounded bg-[#033625] text-white">1</button>
              <button className="w-7 h-7 text-xs font-medium rounded text-slate-600 hover:bg-slate-100">2</button>
              <button className="w-7 h-7 text-xs font-medium rounded text-slate-600 hover:bg-slate-100">3</button>
              <button className="w-7 h-7 text-xs font-medium rounded text-slate-600 hover:bg-slate-100">4</button>
              <button className="p-1 text-slate-400"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;
