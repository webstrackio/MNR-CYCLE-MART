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
  Palette,
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
  Menu,
  X,
  UserCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ─── Sidebar nav items ─────────────────────────────────────────── */
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Package, label: 'Products', id: 'products', hasChild: true },
  { icon: Tag, label: 'Categories', id: 'categories' },
  { icon: ShoppingCart, label: 'Orders', id: 'orders', hasChild: true },
  { icon: Users, label: 'Customers', id: 'customers' },
  { icon: Warehouse, label: 'Inventory', id: 'inventory' },
  { icon: Image, label: 'Banners', id: 'banners' },
  { icon: Ticket, label: 'Coupons', id: 'coupons' },
  { icon: Star, label: 'Reviews', id: 'reviews' },
  { icon: BarChart2, label: 'Reports', id: 'reports', hasChild: true },
  { icon: Settings, label: 'Settings', id: 'settings' },
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
  { icon: Package, label: 'Add Product', desc: 'Add new cycle or accessory', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { icon: ShoppingCart, label: 'Manage Orders', desc: 'View and update orders', color: 'text-green-400', bg: 'bg-green-400/10' },
  { icon: Users, label: 'Manage Customers', desc: 'View customer details', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: Image, label: 'Add Banner', desc: 'Update homepage banners', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: BarChart2, label: 'View Reports', desc: 'Sales & performance reports', color: 'text-teal-400', bg: 'bg-teal-400/10' },
];

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
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#121212] overflow-hidden font-sans">
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-[#1C1C1C] flex flex-col border-r border-white/5 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
          <div className="w-8 h-8 bg-[#F4A340] rounded-lg flex items-center justify-center flex-shrink-0">
            <Bike className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">MNR Cycle Mart</p>
            <p className="text-[#B8B8B8] text-[10px]">Ride Your Dreams</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-none">
          {navItems.map(({ icon: Icon, label, id, hasChild }) => (
            <button
              key={id}
              onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg mx-2 my-0.5 group ${
                activeNav === id
                  ? 'bg-[#F4A340] text-white shadow-lg shadow-[#F4A340]/20'
                  : 'text-[#B8B8B8] hover:bg-white/5 hover:text-white'
              }`}
              style={{ width: 'calc(100% - 16px)' }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {hasChild && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </button>
          ))}

          <div className="border-t border-white/5 mt-2 pt-2 mx-2">
            <button
              onClick={() => { setActiveNav('themes'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                activeNav === 'themes'
                  ? 'bg-[#F4A340] text-white'
                  : 'text-[#B8B8B8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">Themes</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#B8B8B8] hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 rounded-lg group mt-0.5"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">Logout</span>
            </button>
          </div>
        </nav>

        {/* Footer info */}
        <div className="px-4 py-4 border-t border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#F4A340]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bike className="w-4 h-4 text-[#F4A340]" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">MNR Cycle Mart</p>
              <p className="text-[#B8B8B8] text-[10px]">Ride Your Dreams</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-[#1C1C1C] border-b border-white/5 px-4 lg:px-6 py-3 flex items-center gap-4 flex-shrink-0">
          {/* Mobile menu btn */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 text-[#B8B8B8] hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#B8B8B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-[#242424] border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#B8B8B8] focus:outline-none focus:border-[#F4A340]/50 transition-colors"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Notification */}
            <button className="relative p-2 text-[#B8B8B8] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#F4A340]/20 rounded-full flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-[#F4A340]" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-sm font-semibold leading-tight">{user?.username || 'Admin'}</p>
                <p className="text-[#B8B8B8] text-[10px]">{user?.role || 'Administrator'}</p>
              </div>
              <ChevronDown className="hidden sm:block w-4 h-4 text-[#B8B8B8]" />
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
              <div className="w-9 h-9 bg-[#F4A340]/10 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-[#F4A340]" />
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">Dashboard</h1>
                <p className="text-[#B8B8B8] text-sm">Welcome back, {user?.username || 'Admin'}! Here's what's happening with your store.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#1C1C1C] border border-white/5 rounded-xl px-4 py-2 text-sm text-[#B8B8B8] self-start sm:self-auto cursor-pointer hover:border-[#F4A340]/30 transition-colors">
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
                  className="bg-[#1C1C1C] border border-white/5 rounded-2xl p-5 hover:border-[#F4A340]/20 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                  </div>
                  <p className="text-[#B8B8B8] text-xs font-medium mb-1">{s.label}</p>
                  <p className="text-white text-2xl font-bold mb-2">{s.value}</p>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 text-xs font-semibold">{s.change}</span>
                    <span className="text-[#B8B8B8] text-xs">{s.sub}</span>
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
            <div className="xl:col-span-3 bg-[#1C1C1C] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <BarChart2 className="w-4 h-4 text-[#F4A340]" />
                    <h2 className="text-white font-semibold text-sm">Sales Overview</h2>
                  </div>
                  <p className="text-[#B8B8B8] text-xs">Daily sales performance (last 7 days)</p>
                </div>
                <div className="flex items-center gap-2 bg-[#242424] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-[#B8B8B8] cursor-pointer hover:border-[#F4A340]/30 transition-colors">
                  Last 7 Days
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="h-44 mt-4">
                <SalesChart />
              </div>
            </div>

            {/* Recent orders */}
            <div className="xl:col-span-2 bg-[#1C1C1C] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-[#F4A340]" />
                  <h2 className="text-white font-semibold text-sm">Recent Orders</h2>
                </div>
                <button className="text-[#F4A340] text-xs font-semibold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-5 gap-1 text-[#B8B8B8] text-[10px] font-semibold uppercase tracking-wide mb-2 px-1">
                <span className="col-span-1">Order ID</span>
                <span className="col-span-1">Customer</span>
                <span className="col-span-1">Amount</span>
                <span className="col-span-1">Status</span>
                <span className="col-span-1">Date</span>
              </div>

              <div className="space-y-2">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-5 gap-1 items-center bg-[#242424] rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-[#F4A340] text-[11px] font-semibold col-span-1 truncate">{order.id}</span>
                    <span className="text-white text-[11px] font-medium col-span-1 truncate">{order.customer}</span>
                    <span className="text-white text-[11px] font-semibold col-span-1 truncate">{order.amount}</span>
                    <span className="col-span-1"><StatusBadge status={order.status} /></span>
                    <span className="text-[#B8B8B8] text-[10px] col-span-1 truncate">{order.date}</span>
                  </div>
                ))}
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
            <div className="xl:col-span-2 bg-[#1C1C1C] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-[#F4A340]" />
                <h2 className="text-white font-semibold text-sm">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {quickActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.label}
                      className="flex flex-col items-start gap-3 bg-[#242424] hover:bg-[#2a2a2a] border border-white/5 hover:border-[#F4A340]/20 rounded-xl p-3.5 transition-all duration-200 group text-left"
                    >
                      <div className={`w-9 h-9 ${a.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-4.5 h-4.5 ${a.color}`} />
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold leading-tight mb-0.5">{a.label}</p>
                        <p className="text-[#B8B8B8] text-[10px] leading-tight">{a.desc}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B8B8B8] group-hover:text-[#F4A340] transition-colors mt-auto" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Promo card */}
            <div className="relative bg-gradient-to-br from-[#1a1510] via-[#1C1C1C] to-[#1C1C1C] border border-[#F4A340]/20 rounded-2xl p-5 overflow-hidden flex flex-col justify-between">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4A340]/5 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#F4A340]/5 rounded-full translate-y-8 -translate-x-8" />

              {/* Bike silhouette overlay */}
              <div className="absolute inset-0 flex items-center justify-end opacity-10">
                <Bike className="w-40 h-40 text-[#F4A340]" />
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 bg-[#F4A340]/10 rounded-xl flex items-center justify-center mb-4">
                  <Bike className="w-5 h-5 text-[#F4A340]" />
                </div>
                <p className="text-[#B8B8B8] text-xs font-medium mb-1">MNR Cycle Mart</p>
                <p className="text-white text-2xl font-extrabold leading-tight">
                  Better Bikes.<br />
                  <span className="text-[#F4A340]">Happier</span> Rides.
                </p>
              </div>

              <div className="relative z-10 mt-4">
                <div className="h-1 w-16 bg-gradient-to-r from-[#F4A340] to-[#E89232] rounded-full" />
                <p className="text-[#B8B8B8] text-xs mt-3">
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
