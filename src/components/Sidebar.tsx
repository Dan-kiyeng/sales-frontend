import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, History, AlertTriangle, TrendingUp } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/sales', icon: ShoppingCart, label: 'Record Sale' },
    { path: '/sales-history', icon: History, label: 'Sales History' },
    { path: '/ai-alerts', icon: AlertTriangle, label: 'Low Stock Alerts' },
    { path: '/ai-predictions', icon: TrendingUp, label: 'Demand Prediction' },
  ];

  return (
    <aside className="bg-slate-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">AI Inventory Pro</h1>
        <p className="text-slate-400 text-sm mt-1">Smart Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <p className="text-slate-400 text-sm">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
