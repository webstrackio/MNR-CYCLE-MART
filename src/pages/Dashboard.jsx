import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Image,
  BarChart2,
  TrendingUp,
  Zap,
  ArrowRight,
  Calendar,
  ChevronDown,
  Bike,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { useAuth } from '../context/AuthContext';

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
      {yLabels.map((l, i) => {
        const y = padTop + chartH - (i / (yLabels.length - 1)) * chartH;
        return (
          <g key={l}>
            <line x1={padLeft} y1={y} x2={W - 10} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={padLeft - 5} y={y + 4} fontSize="9" fill="rgba(184,184,184,0.7)" textAnchor="end">{l}</text>
          </g>
        );
      })}
      {labels.map((l, i) => {
        const x = padLeft + (i / (data.length - 1)) * chartW;
        return (
          <text key={l} x={x} y={H - 6} fontSize="9" fill="rgba(184,184,184,0.7)" textAnchor="middle">{l}</text>
        );
      })}
      <path d={areaPath} fill="url(#chartGrad)" />
      <path d={linePath} fill="none" stroke="#F4A340" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#F4A340" stroke="#1C1C1C" strokeWidth="2" />
      ))}
    </svg>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────────────── */
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AdminLayout
      title="Dashboard"
      subtitle={`Welcome back, ${user?.username || 'Admin'}! Here's what's happening with your store.`}
      icon={LayoutDashboard}
      contentClass="space-y-6"
      headerRight={
        <div className="flex items-center gap-2 bg-surface border border-borderc rounded-xl px-4 py-2 text-sm text-muted self-start sm:self-auto cursor-pointer hover:border-accent/30 transition-colors">
          <Calendar className="w-4 h-4" />
          <span>Sep 9, 2025 – Sep 15, 2025</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      }
    >
      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {stats.map((s) => {
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
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/5 rounded-full translate-y-8 -translate-x-8" />

          <div className="absolute inset-0 flex items-center justify-end opacity-40 dark:opacity-10">
            <Bike className="w-40 h-40 text-accent brightness-50 dark:brightness-100" />
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
    </AdminLayout>
  );
}