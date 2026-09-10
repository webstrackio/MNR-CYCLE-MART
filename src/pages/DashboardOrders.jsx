import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Search, Eye, ChevronDown, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const sampleOrders = [
  { id: '#ORD1284', customer: 'Ravi Kumar', email: 'ravi@email.com', phone: '+91 98765 43210', items: 2, amount: '₹ 8,999', status: 'Delivered', date: 'Sep 15, 2025', address: '123 Main St, Hyderabad' },
  { id: '#ORD1283', customer: 'Priya Sharma', email: 'priya@email.com', phone: '+91 87654 32109', items: 1, amount: '₹ 12,499', status: 'Shipped', date: 'Sep 14, 2025', address: '456 Park Ave, Bangalore' },
  { id: '#ORD1282', customer: 'Karthik S', email: 'karthik@email.com', phone: '+91 76543 21098', items: 3, amount: '₹ 6,799', status: 'Processing', date: 'Sep 14, 2025', address: '789 Lake Rd, Chennai' },
  { id: '#ORD1281', customer: 'Anjali Reddy', email: 'anjali@email.com', phone: '+91 65432 10987', items: 1, amount: '₹ 15,999', status: 'Delivered', date: 'Sep 13, 2025', address: '321 Hill St, Pune' },
  { id: '#ORD1280', customer: 'Suresh Babu', email: 'suresh@email.com', phone: '+91 54321 09876', items: 2, amount: '₹ 9,499', status: 'Shipped', date: 'Sep 13, 2025', address: '654 Valley Rd, Mumbai' },
  { id: '#ORD1279', customer: 'Meena Devi', email: 'meena@email.com', phone: '+91 43210 98765', items: 1, amount: '₹ 24,999', status: 'Cancelled', date: 'Sep 12, 2025', address: '987 Garden St, Delhi' },
];

const statusConfig = {
  Delivered: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
  Shipped: { icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  Processing: { icon: Package, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  Cancelled: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
};

export default function DashboardOrders() {
  const navigate = useNavigate();
  const [orders] = useState(sampleOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = orders.filter(o => {
    const matchesSearch = o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-1.5 text-muted hover:text-txt transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Orders</h1>
              <p className="text-muted text-sm">Manage and track customer orders</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50" />
            </div>
            <div className="relative">
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-surface border border-borderc rounded-xl px-4 py-2.5 pr-10 text-sm text-txt focus:outline-none focus:border-accent/50 appearance-none cursor-pointer">
                <option value="All">All Status</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="w-4 h-4 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface border border-borderc rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-borderc">
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Order ID</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Customer</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Items</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Amount</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Status</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Date</th>
                    <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => {
                    const sc = statusConfig[order.status];
                    const StatusIcon = sc.icon;
                    return (
                      <tr key={order.id} className="border-b border-borderc hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4 text-accent text-sm font-semibold">{order.id}</td>
                        <td className="px-5 py-4 text-txt text-sm font-medium">{order.customer}</td>
                        <td className="px-5 py-4 text-muted text-sm">{order.items} items</td>
                        <td className="px-5 py-4 text-txt text-sm font-semibold">{order.amount}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted text-sm">{order.date}</td>
                        <td className="px-5 py-4">
                          <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-muted hover:text-accent transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {selectedOrder && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface border border-borderc rounded-2xl w-full max-w-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b border-borderc">
                  <h2 className="text-txt text-lg font-bold">Order Details</h2>
                  <button onClick={() => setSelectedOrder(null)} className="text-muted hover:text-txt text-2xl">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Order ID</span>
                    <span className="text-accent font-bold">{selectedOrder.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Customer</span>
                    <span className="text-txt font-semibold">{selectedOrder.customer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Email</span>
                    <span className="text-txt text-sm">{selectedOrder.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Phone</span>
                    <span className="text-txt text-sm">{selectedOrder.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Address</span>
                    <span className="text-txt text-sm text-right max-w-[200px]">{selectedOrder.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Items</span>
                    <span className="text-txt font-semibold">{selectedOrder.items} items</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Amount</span>
                    <span className="text-txt text-lg font-bold">{selectedOrder.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Status</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">Date</span>
                    <span className="text-txt text-sm">{selectedOrder.date}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
