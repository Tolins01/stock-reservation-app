import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bookmark, Package, ShoppingCart, Settings, Box } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Reservations', path: '/reservations', icon: Bookmark },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-brand-dark text-white p-5 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="bg-white/10 p-2 rounded-lg">
            <Box className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xs font-semibold leading-tight">Stock Reservation Service</h2>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
        <p>🍃 Keep your stock available, always.</p>
      </div>
    </aside>
  );
};

export default Sidebar;