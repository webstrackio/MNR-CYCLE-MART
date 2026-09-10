import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Plus, Save, X, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const sampleBanners = [
  { id: 1, title: 'Summer Sale', subtitle: 'Up to 30% off on all cycles', status: 'Active', order: 1 },
  { id: 2, title: 'New Arrivals', subtitle: 'Check out our latest e-bikes', status: 'Active', order: 2 },
  { id: 3, title: 'Free Delivery', subtitle: 'On orders above ₹10,000', status: 'Inactive', order: 3 },
];

export default function DashboardBanners() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState(sampleBanners);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', subtitle: '', status: 'Active' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBanner = { id: banners.length + 1, ...formData, order: banners.length + 1 };
    setBanners([...banners, newBanner]);
    setShowForm(false);
    setFormData({ title: '', subtitle: '', status: 'Active' });
  };

  const toggleStatus = (id) => {
    setBanners(banners.map(b => b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b));
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
              <Image className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Banners</h1>
              <p className="text-muted text-sm">Manage homepage banners</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowForm(true)} className="bg-accent hover:bg-accenthover text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> Add Banner
            </button>
          </div>

          <div className="space-y-3">
            {banners.map((banner, i) => (
              <motion.div key={banner.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-surface border border-borderc rounded-2xl p-5 hover:border-accent/20 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                      <Image className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-txt font-bold text-lg">{banner.title}</h3>
                      <p className="text-muted text-sm">{banner.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleStatus(banner.id)}
                      className={`p-2 rounded-lg transition-colors ${banner.status === 'Active' ? 'text-green-400 hover:bg-green-500/10' : 'text-muted hover:bg-white/5'}`}>
                      {banner.status === 'Active' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button className="p-2 text-muted hover:text-accent hover:bg-white/5 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => setBanners(banners.filter(b => b.id !== banner.id))}
                      className="p-2 text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${banner.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {banner.status}
                  </span>
                  <span className="text-muted text-xs">Order: {banner.order}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface border border-borderc rounded-2xl w-full max-w-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b border-borderc">
                  <h2 className="text-txt text-lg font-bold">Add New Banner</h2>
                  <button onClick={() => setShowForm(false)} className="text-muted hover:text-txt"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="text-muted text-xs font-medium mb-1.5 block">Banner Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" required />
                  </div>
                  <div>
                    <label className="text-muted text-xs font-medium mb-1.5 block">Subtitle</label>
                    <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                      className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" required />
                  </div>
                  <div>
                    <label className="text-muted text-xs font-medium mb-1.5 block">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
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
