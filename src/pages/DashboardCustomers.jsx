import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Search, Eye, Mail, Phone, MapPin } from 'lucide-react';

const sampleCustomers = [
  { id: 1, name: 'Ravi Kumar', email: 'ravi@email.com', phone: '+91 98765 43210', orders: 5, totalSpent: '₹ 45,999', joinDate: 'Jan 2025', address: 'Hyderabad, Telangana' },
  { id: 2, name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 87654 32109', orders: 3, totalSpent: '₹ 37,497', joinDate: 'Mar 2025', address: 'Bangalore, Karnataka' },
  { id: 3, name: 'Karthik S', email: 'karthik@email.com', phone: '+91 76543 21098', orders: 8, totalSpent: '₹ 89,992', joinDate: 'Feb 2025', address: 'Chennai, Tamil Nadu' },
  { id: 4, name: 'Anjali Reddy', email: 'anjali@email.com', phone: '+91 65432 10987', orders: 2, totalSpent: '₹ 31,998', joinDate: 'Jun 2025', address: 'Pune, Maharashtra' },
  { id: 5, name: 'Suresh Babu', email: 'suresh@email.com', phone: '+91 54321 09876', orders: 6, totalSpent: '₹ 56,994', joinDate: 'Apr 2025', address: 'Mumbai, Maharashtra' },
];

export default function DashboardCustomers() {
  const navigate = useNavigate();
  const [customers] = useState(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filtered = customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-1.5 text-muted hover:text-txt transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Customers</h1>
              <p className="text-muted text-sm">View and manage customer details</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((customer, i) => (
              <motion.div key={customer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedCustomer(customer)}
                className="bg-surface border border-borderc rounded-2xl p-5 hover:border-accent/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-txt font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-txt font-bold">{customer.name}</p>
                    <p className="text-muted text-xs">{customer.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted">Orders</span><span className="text-txt font-semibold">{customer.orders}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Total Spent</span><span className="text-accent font-bold">{customer.totalSpent}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Joined</span><span className="text-txt">{customer.joinDate}</span></div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedCustomer && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface border border-borderc rounded-2xl w-full max-w-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b border-borderc">
                  <h2 className="text-txt text-lg font-bold">Customer Details</h2>
                  <button onClick={() => setSelectedCustomer(null)} className="text-muted hover:text-txt text-2xl">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-txt font-bold text-2xl">
                      {selectedCustomer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-txt text-xl font-bold">{selectedCustomer.name}</p>
                      <p className="text-muted text-sm">Customer since {selectedCustomer.joinDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-muted" /><span className="text-txt">{selectedCustomer.email}</span></div>
                  <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-muted" /><span className="text-txt">{selectedCustomer.phone}</span></div>
                  <div className="flex items-center gap-3 text-sm"><MapPin className="w-4 h-4 text-muted" /><span className="text-txt">{selectedCustomer.address}</span></div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-card rounded-xl p-4 text-center">
                      <p className="text-muted text-xs mb-1">Total Orders</p>
                      <p className="text-txt text-2xl font-bold">{selectedCustomer.orders}</p>
                    </div>
                    <div className="bg-card rounded-xl p-4 text-center">
                      <p className="text-muted text-xs mb-1">Total Spent</p>
                      <p className="text-accent text-2xl font-bold">{selectedCustomer.totalSpent}</p>
                    </div>
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
