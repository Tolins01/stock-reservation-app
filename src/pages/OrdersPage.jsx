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
      <aside className="w-64 bg-[#033625] text-white flex flex-col justify-between min-h-screen p-5 flex-shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="p-2 border border-emerald-500/40 rounded-lg bg-emerald-950/40">
              <Box className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">Stock Reservation</h1>
              <span className="text-xs text-emerald-300/70">Service</span>
            </div>
          </div>
          <nav className="space-y-1">
            <NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-emerald-100/70 hover:bg-[#0b4230]"><LayoutDashboard className="w-5 h-5"/>Dashboard</NavLink>
            <NavLink to="/reservations" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-emerald-100/70 hover:bg-[#0b4230]"><ShoppingCart className="w-5 h-5"/>Reservations</NavLink>
            <NavLink to="/inventory" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-emerald-100/70 hover:bg-[#0b4230]"><Package className="w-5 h-5"/>Inventory</NavLink>
            <NavLink to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold bg-[#154d39] text-white"><ListOrdered className="w-5 h-5"/>Orders</NavLink>
            <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-emerald-100/70 hover:bg-[#0b4230]"><Settings className="w-5 h-5"/>Settings</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-300/60 px-2 py-4 border-t border-emerald-900/50">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Keep your stock available, always.</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search orders..." className="w-full pl-9 pr-4 py-2 bg-gray-50 text-sm border border-gray-100 rounded-lg focus:outline-none" />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600"><Bell className="w-5 h-5"/></button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#033625] text-emerald-300 flex items-center justify-center font-bold text-xs">VI</div>
              <span className="text-sm font-medium text-gray-700">Victor Ilori</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

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
