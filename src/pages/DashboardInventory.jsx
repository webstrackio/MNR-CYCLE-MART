import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Warehouse, Search, Package, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const sampleInventory = [
  { id: 1, name: 'Mountain Explorer Pro', sku: 'MNR-MOU-001', stock: 12, minStock: 5, status: 'In Stock', lastUpdated: 'Sep 15, 2025' },
  { id: 2, name: 'City Rider 21 Speed', sku: 'MNR-ROA-002', stock: 8, minStock: 5, status: 'In Stock', lastUpdated: 'Sep 14, 2025' },
  { id: 3, name: 'Kids Fun Cycle', sku: 'MNR-KID-003', stock: 25, minStock: 10, status: 'In Stock', lastUpdated: 'Sep 13, 2025' },
  { id: 4, name: 'Electric EcoRide', sku: 'MNR-EBI-004', stock: 3, minStock: 5, status: 'Low Stock', lastUpdated: 'Sep 12, 2025' },
  { id: 5, name: 'Hybrid Comfort Plus', sku: 'MNR-HYB-005', stock: 0, minStock: 5, status: 'Out of Stock', lastUpdated: 'Sep 10, 2025' },
  { id: 6, name: 'Safety Helmet Pro', sku: 'MNR-ACC-006', stock: 45, minStock: 15, status: 'In Stock', lastUpdated: 'Sep 15, 2025' },
];

const statusConfig = {
  'In Stock': { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
  'Low Stock': { icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  'Out of Stock': { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
};

export default function DashboardInventory() {
  const navigate = useNavigate();
  const [inventory] = useState(sampleInventory);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = inventory.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.sku.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-1.5 text-muted hover:text-txt transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Inventory</h1>
              <p className="text-muted text-sm">Track stock levels and inventory</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface border border-borderc rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center"><CheckCircle className="w-5 h-5 text-green-400" /></div>
                <span className="text-muted text-sm font-medium">In Stock</span>
              </div>
              <p className="text-txt text-2xl font-bold">3 items</p>
            </div>
            <div className="bg-surface border border-borderc rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-orange-400" /></div>
                <span className="text-muted text-sm font-medium">Low Stock</span>
              </div>
              <p className="text-txt text-2xl font-bold">1 item</p>
            </div>
            <div className="bg-surface border border-borderc rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center"><XCircle className="w-5 h-5 text-red-400" /></div>
                <span className="text-muted text-sm font-medium">Out of Stock</span>
              </div>
              <p className="text-txt text-2xl font-bold">1 item</p>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search inventory..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50" />
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface border border-borderc rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-borderc">
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Product</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">SKU</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Stock</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Min Stock</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Status</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => {
                    const sc = statusConfig[item.status];
                    const StatusIcon = sc.icon;
                    return (
                      <tr key={item.id} className="border-b border-borderc hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center"><Package className="w-4 h-4 text-accent" /></div>
                            <span className="text-txt text-sm font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-muted text-sm font-mono">{item.sku}</td>
                        <td className="px-5 py-4 text-txt text-sm font-bold">{item.stock}</td>
                        <td className="px-5 py-4 text-muted text-sm">{item.minStock}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" /> {item.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted text-sm">{item.lastUpdated}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
