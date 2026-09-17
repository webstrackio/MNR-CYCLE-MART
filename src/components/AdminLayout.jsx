import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Tag, ShoppingCart, Users, Warehouse, BarChart2, Settings, Sun, Moon, LogOut, Bell, Search, ChevronDown, Bike, X, UserCircle, Receipt } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/dashboard' },
  { icon: Package, label: 'Products', id: 'products', path: '/dashboard/products' },
  { icon: Tag, label: 'Categories', id: 'categories', path: '/dashboard/categories' },
  { icon: ShoppingCart, label: 'Orders', id: 'orders', path: '/dashboard/orders' },
  { icon: Receipt, label: 'Billing', id: 'billing', path: '/dashboard/billing' },
  { icon: Users, label: 'Customers', id: 'customers', path: '/dashboard/customers' },
  { icon: Warehouse, label: 'Inventory', id: 'inventory', path: '/dashboard/inventory' },
  { icon: BarChart2, label: 'Reports', id: 'reports', path: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', id: 'settings', path: '/dashboard/settings' },
];

const pathToKey = adminNavItems.reduce((map, item) => {
  map[item.path] = item.id;
  return map;
}, {});

/* ─── Sidebar toggle icon (panel + divider line) ──────────────────── */
function SidebarToggleIcon({ collapsed }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2.5" y="2.5" width={collapsed ? '4' : '5'} height="13" rx="0.5" stroke="currentColor" strokeWidth="1" />
      <line x1="9" y1="2.5" x2="9" y2="15.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function AdminLayout({ title, subtitle, icon: HeaderIcon, headerRight, children, contentClass = 'space-y-4' }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [topSearch, setTopSearch] = useState('');
  const [topSearchFocused, setTopSearchFocused] = useState(false);

  const activeKey = pathToKey[location.pathname] || 'dashboard';

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredNavItems = adminNavItems.filter((item) =>
    item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setSidebarCollapsed((c) => !c);
    } else {
      setSidebarOpen((o) => !o);
    }
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-surface flex flex-col border-r border-borderc transition-all duration-300 ${
          sidebarCollapsed ? 'lg:w-0 lg:border-r-0 lg:overflow-hidden' : 'lg:w-56'
        } ${
          sidebarOpen ? 'w-56 translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-borderc">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <Bike className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-txt font-bold text-sm leading-tight truncate">MNR Cycle Mart</p>
            <p className="text-muted text-[10px]">Ride Your Dreams</p>
          </div>
        </div>

        <div className="px-3 pt-3 pb-1">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search menu..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full bg-card border border-borderc rounded-lg pl-8 pr-7 py-2 text-xs text-txt placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
            />
            {sidebarSearch && (
              <button
                onClick={() => setSidebarSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-txt"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 scrollbar-none">
          {filteredNavItems.map(({ icon: Icon, label, id, path }) => (
            <button
              key={id}
              onClick={() => { navigate(path); setSidebarOpen(false); setSidebarSearch(''); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg mx-2 my-0.5 group ${
                activeKey === id
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'text-muted hover:bg-white/5 hover:text-txt'
              }`}
              style={{ width: 'calc(100% - 16px)' }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">{label}</span>
            </button>
          ))}
          {filteredNavItems.length === 0 && (
            <p className="text-muted text-xs text-center py-6">No results found</p>
          )}

          <div className="border-t border-borderc mt-2 pt-2 mx-2">
            <button
              onClick={() => { toggleTheme(); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-txt transition-all duration-200 rounded-lg group"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
              <span className="flex-1 text-left">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 rounded-lg group mt-0.5"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">Logout</span>
            </button>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-borderc">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bike className="w-4 h-4 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-txt text-xs font-semibold truncate">MNR Cycle Mart</p>
              <p className="text-muted text-[10px]">Ride Your Dreams</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-2 text-muted hover:text-txt transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <SidebarToggleIcon collapsed={sidebarCollapsed} />
          </button>

          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search anything..."
              value={topSearch}
              onChange={(e) => setTopSearch(e.target.value)}
              onFocus={() => setTopSearchFocused(true)}
              onBlur={() => setTimeout(() => setTopSearchFocused(false), 200)}
              className="w-full bg-card border border-borderc rounded-lg pl-9 pr-4 py-2 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
            />
            {topSearch && topSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-borderc rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                {adminNavItems
                  .filter((item) => item.label.toLowerCase().includes(topSearch.toLowerCase()))
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          navigate(item.path);
                          setTopSearch('');
                          setTopSearchFocused(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-txt hover:bg-accent/10 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-accent" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                {adminNavItems.filter((item) => item.label.toLowerCase().includes(topSearch.toLowerCase())).length === 0 && (
                  <p className="text-muted text-xs text-center py-4">No results found</p>
                )}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 text-muted hover:text-txt transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-accent" />
              </div>
              <div className="hidden sm:block">
                <p className="text-txt text-sm font-semibold leading-tight">{user?.username || 'Admin'}</p>
                <p className="text-muted text-[10px]">{user?.role || 'Administrator'}</p>
              </div>
              <ChevronDown className="hidden sm:block w-4 h-4 text-muted" />
            </div>
          </div>
        </header>

        <main className={`flex-1 overflow-y-auto p-4 lg:p-6 ${contentClass}`}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
                <HeaderIcon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="text-txt text-xl font-bold">{title}</h1>
                <p className="text-muted text-sm">{subtitle}</p>
              </div>
            </div>
            {headerRight}
          </motion.div>
          {children}
        </main>
      </div>
    </div>
  );
}