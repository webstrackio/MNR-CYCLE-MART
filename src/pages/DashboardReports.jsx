import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart2, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '₹ 1,24,560', change: '+15%', trend: 'up', icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Total Orders', value: '128', change: '+12%', trend: 'up', icon: ShoppingCart, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Total Customers', value: '86', change: '+8%', trend: 'up', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Products Sold', value: '156', change: '-3%', trend: 'down', icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

const monthlyData = [
  { month: 'Jun', revenue: 98000, orders: 89 },
  { month: 'Jul', revenue: 112000, orders: 102 },
  { month: 'Aug', revenue: 135000, orders: 118 },
  { month: 'Sep', revenue: 124560, orders: 128 },
];

const topProducts = [
  { name: 'Mountain Explorer Pro', sold: 32, revenue: '₹ 7,99,968' },
  { name: 'Electric EcoRide', sold: 18, revenue: '₹ 8,27,820' },
  { name: 'City Rider 21 Speed', sold: 28, revenue: '₹ 5,17,972' },
];

export default function DashboardReports() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-1.5 text-muted hover:text-txt transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Reports</h1>
              <p className="text-muted text-sm">Sales and performance reports</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-surface border border-borderc rounded-2xl p-5 hover:border-accent/20 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 ${s.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {s.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-xs font-semibold">{s.change}</span>
                    </div>
                  </div>
                  <p className="text-muted text-xs font-medium mb-1">{s.label}</p>
                  <p className="text-txt text-2xl font-bold">{s.value}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-surface border border-borderc rounded-2xl p-5">
              <h2 className="text-txt font-bold mb-4">Monthly Revenue</h2>
              <div className="space-y-3">
                {monthlyData.map((m) => (
                  <div key={m.month} className="flex items-center gap-3">
                    <span className="text-muted text-sm w-8">{m.month}</span>
                    <div className="flex-1 h-8 bg-card rounded-lg overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accenthover rounded-lg flex items-center px-3"
                        style={{ width: `${(m.revenue / 150000) * 100}%` }}>
                        <span className="text-white text-xs font-semibold">₹ {(m.revenue / 1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-surface border border-borderc rounded-2xl p-5">
              <h2 className="text-txt font-bold mb-4">Top Products</h2>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3 bg-card rounded-xl p-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-txt text-sm font-semibold truncate">{p.name}</p>
                      <p className="text-muted text-xs">{p.sold} units sold</p>
                    </div>
                    <span className="text-accent text-sm font-bold">{p.revenue}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
