import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, Plus, Save, X, Search, Edit2, Trash2 } from 'lucide-react';

const sampleCategories = [
  { id: 1, name: 'Mountain Bike', products: 12, status: 'Active' },
  { id: 2, name: 'Road Bike', products: 8, status: 'Active' },
  { id: 3, name: 'Kids Bike', products: 15, status: 'Active' },
  { id: 4, name: 'E-Bike', products: 5, status: 'Active' },
  { id: 5, name: 'Hybrid', products: 7, status: 'Active' },
  { id: 6, name: 'Accessories', products: 45, status: 'Active' },
];

const categoryTemplates = {
  'Mountain Bike': { description: 'Off-road bicycles designed for rough terrain', icon: '🏔️' },
  'Road Bike': { description: 'Lightweight bicycles for speed on paved roads', icon: '🛣️' },
  'Kids Bike': { description: 'Safe and fun bicycles for children', icon: '👶' },
  'E-Bike': { description: 'Electric powered bicycles', icon: '⚡' },
  'Hybrid': { description: 'Versatile bikes for both road and trail', icon: '🔄' },
  'Accessories': { description: 'Helmets, locks, lights, and more', icon: '🎯' },
};

export default function DashboardCategories() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(sampleCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', icon: '' });

  const handleAutoFill = (name) => {
    const template = categoryTemplates[name];
    if (template) {
      setFormData({ name, description: template.description, icon: template.icon });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { id: categories.length + 1, name: formData.name, products: 0, status: 'Active' };
    setCategories([...categories, newCategory]);
    setShowForm(false);
    setFormData({ name: '', description: '', icon: '' });
  };

  const filtered = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-1.5 text-muted hover:text-txt transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Categories</h1>
              <p className="text-muted text-sm">Manage product categories</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors" />
            </div>
            <button onClick={() => setShowForm(true)} className="bg-accent hover:bg-accenthover text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((cat) => (
              <div key={cat.id} className="bg-surface border border-borderc rounded-2xl p-5 hover:border-accent/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                    {categoryTemplates[cat.name]?.icon || '📦'}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-muted hover:text-accent transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1.5 text-muted hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <h3 className="text-txt font-bold text-lg mb-1">{cat.name}</h3>
                <p className="text-muted text-sm">{cat.products} products</p>
                <span className="inline-block mt-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400">{cat.status}</span>
              </div>
            ))}
          </motion.div>

          {showForm && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface border border-borderc rounded-2xl w-full max-w-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b border-borderc">
                  <h2 className="text-txt text-lg font-bold">Add New Category</h2>
                  <button onClick={() => setShowForm(false)} className="text-muted hover:text-txt"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="bg-card rounded-xl p-4 border border-accent/20">
                    <p className="text-accent text-sm font-semibold mb-3">Quick Fill</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(categoryTemplates).map((name) => (
                        <button key={name} type="button" onClick={() => handleAutoFill(name)}
                          className="bg-surface hover:bg-accent/20 text-txt text-xs px-3 py-2 rounded-lg border border-borderc hover:border-accent/50 transition-colors">
                          {categoryTemplates[name].icon} {name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-muted text-xs font-medium mb-1.5 block">Category Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" required />
                  </div>
                  <div>
                    <label className="text-muted text-xs font-medium mb-1.5 block">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3}
                      className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 resize-none" />
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
