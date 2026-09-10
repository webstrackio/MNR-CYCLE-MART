import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Ticket, Plus, Save, X, Edit2, Trash2, Copy, Check } from 'lucide-react';

const sampleCoupons = [
  { id: 1, code: 'SUMMER30', discount: '30%', type: 'Percentage', minOrder: '₹ 5,000', maxDiscount: '₹ 3,000', usage: 45, limit: 100, status: 'Active', expiry: 'Sep 30, 2025' },
  { id: 2, code: 'FLAT2000', discount: '₹ 2,000', type: 'Fixed', minOrder: '₹ 10,000', maxDiscount: '₹ 2,000', usage: 23, limit: 50, status: 'Active', expiry: 'Oct 15, 2025' },
  { id: 3, code: 'NEWUSER', discount: '15%', type: 'Percentage', minOrder: '₹ 3,000', maxDiscount: '₹ 1,500', usage: 89, limit: 200, status: 'Active', expiry: 'Dec 31, 2025' },
  { id: 4, code: 'FREESHIP', discount: 'Free', type: 'Shipping', minOrder: '₹ 10,000', maxDiscount: '₹ 500', usage: 156, limit: 500, status: 'Inactive', expiry: 'Aug 31, 2025' },
];

const couponTemplates = [
  { code: 'FESTIVE50', discount: '50%', type: 'Percentage', minOrder: '₹ 8,000', maxDiscount: '₹ 5,000' },
  { code: 'WELCOME100', discount: '₹ 1,000', type: 'Fixed', minOrder: '₹ 5,000', maxDiscount: '₹ 1,000' },
  { code: 'VIP20', discount: '20%', type: 'Percentage', minOrder: '₹ 15,000', maxDiscount: '₹ 4,000' },
];

export default function DashboardCoupons() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState(sampleCoupons);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ code: '', discount: '', type: 'Percentage', minOrder: '', maxDiscount: '', expiry: '' });
  const [copiedId, setCopiedId] = useState(null);

  const handleAutoFill = (template) => {
    setFormData({ code: template.code, discount: template.discount, type: template.type, minOrder: template.minOrder, maxDiscount: template.maxDiscount, expiry: 'Dec 31, 2025' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCoupon = { id: coupons.length + 1, ...formData, usage: 0, limit: 100, status: 'Active' };
    setCoupons([...coupons, newCoupon]);
    setShowForm(false);
    setFormData({ code: '', discount: '', type: 'Percentage', minOrder: '', maxDiscount: '', expiry: '' });
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-1.5 text-muted hover:text-txt transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <Ticket className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Coupons</h1>
              <p className="text-muted text-sm">Create and manage discount coupons</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowForm(true)} className="bg-accent hover:bg-accenthover text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> Add Coupon
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coupons.map((coupon, i) => (
              <motion.div key={coupon.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-surface border border-borderc rounded-2xl p-5 hover:border-accent/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Ticket className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-txt font-mono font-bold text-lg">{coupon.code}</span>
                        <button onClick={() => copyCode(coupon.code, coupon.id)} className="text-muted hover:text-accent transition-colors">
                          {copiedId === coupon.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${coupon.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {coupon.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-muted hover:text-accent transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => setCoupons(coupons.filter(c => c.id !== coupon.id))} className="p-1.5 text-muted hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted">Discount:</span> <span className="text-accent font-bold">{coupon.discount}</span></div>
                  <div><span className="text-muted">Type:</span> <span className="text-txt">{coupon.type}</span></div>
                  <div><span className="text-muted">Min Order:</span> <span className="text-txt">{coupon.minOrder}</span></div>
                  <div><span className="text-muted">Expiry:</span> <span className="text-txt">{coupon.expiry}</span></div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted">Usage: {coupon.usage}/{coupon.limit}</span>
                    <span className="text-muted">{Math.round((coupon.usage/coupon.limit)*100)}%</span>
                  </div>
                  <div className="h-1.5 bg-card rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${(coupon.usage/coupon.limit)*100}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface border border-borderc rounded-2xl w-full max-w-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b border-borderc">
                  <h2 className="text-txt text-lg font-bold">Add New Coupon</h2>
                  <button onClick={() => setShowForm(false)} className="text-muted hover:text-txt"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="bg-card rounded-xl p-4 border border-accent/20">
                    <p className="text-accent text-sm font-semibold mb-3">Quick Fill Templates</p>
                    <div className="flex flex-wrap gap-2">
                      {couponTemplates.map((t) => (
                        <button key={t.code} type="button" onClick={() => handleAutoFill(t)}
                          className="bg-surface hover:bg-accent/20 text-txt text-xs px-3 py-2 rounded-lg border border-borderc hover:border-accent/50 transition-colors font-mono">
                          {t.code}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-muted text-xs font-medium mb-1.5 block">Coupon Code</label>
                      <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt font-mono focus:outline-none focus:border-accent/50" required /></div>
                    <div><label className="text-muted text-xs font-medium mb-1.5 block">Discount</label>
                      <input type="text" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})}
                        className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" required /></div>
                    <div><label className="text-muted text-xs font-medium mb-1.5 block">Type</label>
                      <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50">
                        <option value="Percentage">Percentage</option><option value="Fixed">Fixed</option><option value="Shipping">Shipping</option>
                      </select></div>
                    <div><label className="text-muted text-xs font-medium mb-1.5 block">Min Order</label>
                      <input type="text" value={formData.minOrder} onChange={(e) => setFormData({...formData, minOrder: e.target.value})}
                        className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" /></div>
                    <div><label className="text-muted text-xs font-medium mb-1.5 block">Max Discount</label>
                      <input type="text" value={formData.maxDiscount} onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})}
                        className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" /></div>
                    <div><label className="text-muted text-xs font-medium mb-1.5 block">Expiry Date</label>
                      <input type="text" value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                        className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" placeholder="e.g. Dec 31, 2025" /></div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-card hover:bg-card/80 text-muted font-semibold py-2.5 rounded-xl">Cancel</button>
                    <button type="submit" className="flex-1 bg-accent hover:bg-accenthover text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
