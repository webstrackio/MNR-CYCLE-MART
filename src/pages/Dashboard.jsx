import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  Warehouse,
  Image,
  Ticket,
  Star,
  BarChart2,
  Settings,
  Sun,
  Moon,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  Zap,
  ArrowRight,
  Calendar,
  ChevronDown,
  Bike,
  X,
  UserCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/* ─── Sidebar nav items ─────────────────────────────────────────── */
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', path: '/dashboard' },
  { icon: Package, label: 'Products', id: 'products', path: '/dashboard/products', hasChild: true },
  { icon: Tag, label: 'Categories', id: 'categories', path: '/dashboard/categories' },
  { icon: ShoppingCart, label: 'Orders', id: 'orders', path: '/dashboard/orders', hasChild: true },
  { icon: Users, label: 'Customers', id: 'customers', path: '/dashboard/customers' },
  { icon: Warehouse, label: 'Inventory', id: 'inventory', path: '/dashboard/inventory' },
  { icon: Image, label: 'Banners', id: 'banners', path: '/dashboard/banners' },
  { icon: Ticket, label: 'Coupons', id: 'coupons', path: '/dashboard/coupons' },
  { icon: Star, label: 'Reviews', id: 'reviews', path: '/dashboard/reviews' },
  { icon: BarChart2, label: 'Reports', id: 'reports', path: '/dashboard/reports', hasChild: true },
  { icon: Settings, label: 'Settings', id: 'settings', path: '/dashboard/settings' },
];

/* ─── Stat cards data ────────────────────────────────────────────── */
const stats = [
  {
    icon: ShoppingCart,
    label: 'Total Orders',
    value: '128',
    change: '+12%',
    sub: 'vs last week',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
  {
    icon: Users,
    label: 'Total Customers',
    value: '86',
    change: '+8%',
    sub: 'vs last week',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    icon: () => <span className="text-blue-400 font-bold text-lg">₹</span>,
    label: 'Total Revenue',
    value: '₹ 1,24,560',
    change: '+15%',
    sub: 'vs last week',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Package,
    label: 'Products In Stock',
    value: '42',
    change: '+5%',
    sub: 'vs last week',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
];

/* ─── Recent orders ──────────────────────────────────────────────── */
const recentOrders = [
  { id: '#ORD1284', customer: 'Ravi Kumar', amount: '₹ 8,999', status: 'Delivered', date: 'Sep 15, 2025' },
  { id: '#ORD1283', customer: 'Priya Sharma', amount: '₹ 12,499', status: 'Shipped', date: 'Sep 14, 2025' },
  { id: '#ORD1282', customer: 'Karthik S', amount: '₹ 6,799', status: 'Processing', date: 'Sep 14, 2025' },
  { id: '#ORD1281', customer: 'Anjali Reddy', amount: '₹ 15,999', status: 'Delivered', date: 'Sep 13, 2025' },
  { id: '#ORD1280', customer: 'Suresh Babu', amount: '₹ 9,499', status: 'Shipped', date: 'Sep 13, 2025' },
];

/* ─── Quick actions ──────────────────────────────────────────────── */
const quickActions = [
  { icon: Package, label: 'Add Product', desc: 'Add new cycle or accessory', color: 'text-orange-400', bg: 'bg-orange-400/10', path: '/dashboard/products' },
  { icon: ShoppingCart, label: 'Manage Orders', desc: 'View and update orders', color: 'text-green-400', bg: 'bg-green-400/10', path: '/dashboard/orders' },
  { icon: Users, label: 'Manage Customers', desc: 'View customer details', color: 'text-blue-400', bg: 'bg-blue-400/10', path: '/dashboard/customers' },
  { icon: Image, label: 'Add Banner', desc: 'Update homepage banners', color: 'text-purple-400', bg: 'bg-purple-400/10', path: '/dashboard/banners' },
  { icon: BarChart2, label: 'View Reports', desc: 'Sales & performance reports', color: 'text-teal-400', bg: 'bg-teal-400/10', path: '/dashboard/reports' },
];

/* ─── Sidebar toggle icon (panel + divider line) ──────────────────── */
function SidebarToggleIcon({ collapsed }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer border */}
      <rect
        x="1"
        y="1"
        width="16"
        height="16"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Left panel (small filled rectangle) */}
      <rect
        x="2.5"
        y="2.5"
        width={collapsed ? '4' : '5'}
        height="13"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Vertical divider line on right side */}
      <line
        x1="9"
        y1="2.5"
        x2="9"
        y2="15.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ─── Status badge ───────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    Delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
    Shipped: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Processing: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${map[status] || 'bg-gray-500/20 text-gray-400'}`}>
      {status}
    </span>
  );
}

/* ─── Mini sparkline chart (SVG) ────────────────────────────────── */
function SalesChart() {
  // 7-day sales data (arbitrary realistic values)
  const data = [10200, 8500, 12000, 9800, 15000, 18000, 32000];
  const labels = ['Sep 9', 'Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15'];
  const yLabels = ['0', '10k', '20k', '30k', '40k'];

  const W = 520;
  const H = 160;
  const padLeft = 40;
  const padBottom = 24;
  const padTop = 10;
  const chartW = W - padLeft - 10;
  const chartH = H - padBottom - padTop;

  const maxVal = 40000;
  const pts = data.map((v, i) => [
    padLeft + (i / (data.length - 1)) * chartW,
    padTop + chartH - (v / maxVal) * chartH,
  ]);

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1][0]},${padTop + chartH} L${pts[0][0]},${padTop + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4A340" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F4A340" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Y grid lines */}
      {yLabels.map((l, i) => {
        const y = padTop + chartH - (i / (yLabels.length - 1)) * chartH;
        return (
          <g key={l}>
            <line x1={padLeft} y1={y} x2={W - 10} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={padLeft - 5} y={y + 4} fontSize="9" fill="rgba(184,184,184,0.7)" textAnchor="end">{l}</text>
          </g>
        );
      })}
      {/* X axis labels */}
      {labels.map((l, i) => {
        const x = padLeft + (i / (data.length - 1)) * chartW;
        return (
          <text key={l} x={x} y={H - 6} fontSize="9" fill="rgba(184,184,184,0.7)" textAnchor="middle">{l}</text>
        );
      })}
      {/* Area fill */}
      <path d={areaPath} fill="url(#chartGrad)" />
      {/* Line */}
      <path d={linePath} fill="none" stroke="#F4A340" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#F4A340" stroke="#1C1C1C" strokeWidth="2" />
      ))}
    </svg>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────────────── */
export default function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [topSearch, setTopSearch] = useState('');
  const [topSearchFocused, setTopSearchFocused] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-surface flex flex-col border-r border-borderc transition-all duration-300 ${
          sidebarCollapsed ? 'lg:w-0 lg:border-r-0 lg:overflow-hidden' : 'lg:w-56'
        } ${
          sidebarOpen ? 'w-56 translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-borderc">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <Bike className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-txt font-bold text-sm leading-tight truncate">MNR Cycle Mart</p>
            <p className="text-muted text-[10px]">Ride Your Dreams</p>
          </div>
        </div>

        {/* Sidebar Search */}
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

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 scrollbar-none">
          {navItems
            .filter((item) =>
              item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
            )
            .map(({ icon: Icon, label, id, path, hasChild }) => (
              <button
                key={id}
                onClick={() => { navigate(path); setActiveNav(id); setSidebarOpen(false); setSidebarSearch(''); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg mx-2 my-0.5 group ${
                  activeNav === id
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'text-muted hover:bg-white/5 hover:text-txt'
                }`}
                style={{ width: 'calc(100% - 16px)' }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                {hasChild && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </button>
            ))}
          {navItems.filter((item) => item.label.toLowerCase().includes(sidebarSearch.toLowerCase())).length === 0 && (
            <p className="text-muted text-xs text-center py-6">No results found</p>
          )}

          <div className="border-t border-borderc mt-2 pt-2 mx-2">
            <button
              onClick={() => { toggleTheme(); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-txt transition-all duration-200 rounded-lg group"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 flex-shrink-0" />
              ) : (
                <Moon className="w-4 h-4 flex-shrink-0" />
              )}
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

        {/* Footer info */}
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

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          {/* Sidebar toggle btn */}
          <button
            onClick={() => {
              if (window.innerWidth >= 1024) {
                setSidebarCollapsed(!sidebarCollapsed);
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }}
            className="p-2 text-muted hover:text-txt transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <SidebarToggleIcon collapsed={sidebarCollapsed} />
          </button>

          {/* Search */}
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
                {navItems
                  .filter((item) => item.label.toLowerCase().includes(topSearch.toLowerCase()))
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          navigate(item.path);
                          setActiveNav(item.id);
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
                {navItems.filter((item) => item.label.toLowerCase().includes(topSearch.toLowerCase())).length === 0 && (
                  <p className="text-muted text-xs text-center py-4">No results found</p>
                )}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Notification */}
            <button className="relative p-2 text-muted hover:text-txt transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User */}
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

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="text-txt text-xl font-bold">Dashboard</h1>
                <p className="text-muted text-sm">Welcome back, {user?.username || 'Admin'}! Here's what's happening with your store.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface border border-borderc rounded-xl px-4 py-2 text-sm text-muted self-start sm:self-auto cursor-pointer hover:border-accent/30 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Sep 9, 2025 – Sep 15, 2025</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-surface border border-borderc rounded-2xl p-5 hover:border-accent/20 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                  </div>
                  <p className="text-muted text-xs font-medium mb-1">{s.label}</p>
                  <p className="text-txt text-2xl font-bold mb-2">{s.value}</p>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 text-xs font-semibold">{s.change}</span>
                    <span className="text-muted text-xs">{s.sub}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Sales chart + Recent orders */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 xl:grid-cols-5 gap-4"
          >
            {/* Sales chart */}
            <div className="xl:col-span-3 bg-surface border border-borderc rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <BarChart2 className="w-4 h-4 text-accent" />
                    <h2 className="text-txt font-semibold text-sm">Sales Overview</h2>
                  </div>
                  <p className="text-muted text-xs">Daily sales performance (last 7 days)</p>
                </div>
                <div className="flex items-center gap-2 bg-card border border-borderc rounded-lg px-3 py-1.5 text-xs text-muted cursor-pointer hover:border-accent/30 transition-colors">
                  Last 7 Days
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="h-44 mt-4">
                <SalesChart />
              </div>
            </div>

            {/* Recent orders */}
            <div className="xl:col-span-2 bg-surface border border-borderc rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-accent" />
                  <h2 className="text-txt font-semibold text-sm">Recent Orders</h2>
                </div>
                <button className="text-accent text-xs font-semibold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="overflow-x-auto -mx-5 px-5">
                <div className="min-w-[640px]">
                  {/* Table header */}
                  <div className="grid grid-cols-[100px_1fr_100px_110px_110px] gap-3 text-muted text-[10px] font-semibold uppercase tracking-wide mb-2">
                    <span>Order ID</span>
                    <span>Customer</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span className="text-right">Date</span>
                  </div>

                  <div className="space-y-2">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="grid grid-cols-[100px_1fr_100px_110px_110px] gap-3 items-center bg-card rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors"
                      >
                        <span className="text-accent text-[11px] font-semibold truncate">{order.id}</span>
                        <span className="text-txt text-[11px] font-medium truncate">{order.customer}</span>
                        <span className="text-txt text-[11px] font-semibold truncate">{order.amount}</span>
                        <span className="whitespace-nowrap"><StatusBadge status={order.status} /></span>
                        <span className="text-muted text-[10px] whitespace-nowrap text-right">{order.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions + Promo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-4"
          >
            {/* Quick actions */}
            <div className="xl:col-span-2 bg-surface border border-borderc rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-accent" />
                <h2 className="text-txt font-semibold text-sm">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {quickActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.label}
                      onClick={() => navigate(a.path)}
                      className="flex flex-col items-start gap-3 bg-card hover:bg-card/80 border border-borderc hover:border-accent/20 rounded-xl p-3.5 transition-all duration-200 group text-left"
                    >
                      <div className={`w-9 h-9 ${a.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-4.5 h-4.5 ${a.color}`} />
                      </div>
                      <div>
                        <p className="text-txt text-xs font-semibold leading-tight mb-0.5">{a.label}</p>
                        <p className="text-muted text-[10px] leading-tight">{a.desc}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors mt-auto" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Promo card */}
            <div className="relative bg-gradient-to-br from-accent/5 via-surface to-surface border border-accent/20 rounded-2xl p-5 overflow-hidden flex flex-col justify-between">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/5 rounded-full translate-y-8 -translate-x-8" />

              {/* Bike silhouette overlay */}
              <div className="absolute inset-0 flex items-center justify-end opacity-10">
                <Bike className="w-40 h-40 text-accent" />
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Bike className="w-5 h-5 text-accent" />
                </div>
                <p className="text-muted text-xs font-medium mb-1">MNR Cycle Mart</p>
                <p className="text-txt text-2xl font-extrabold leading-tight">
                  Better Bikes.<br />
                  <span className="text-accent">Happier</span> Rides.
                </p>
              </div>

              <div className="relative z-10 mt-4">
                <div className="h-1 w-16 bg-gradient-to-r from-accent to-accenthover rounded-full" />
                <p className="text-muted text-xs mt-3">
                  Manage your cycle store from one place.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
