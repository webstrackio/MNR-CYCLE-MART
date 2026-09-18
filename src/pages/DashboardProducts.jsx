import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Save, X, Search, Edit2, Trash2, Eye } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const sampleProducts = [
  { id: 1, name: 'Mountain Explorer Pro', category: 'Mountain Bike', price: '₹ 24,999', stock: 12, status: 'Active', image: '🚲' },
  { id: 2, name: 'City Rider 21 Speed', category: 'Road Bike', price: '₹ 18,499', stock: 8, status: 'Active', image: '🚲' },
  { id: 3, name: 'Kids Fun Cycle', category: 'Kids Bike', price: '₹ 6,999', stock: 25, status: 'Active', image: '🚲' },
  { id: 4, name: 'Electric EcoRide', category: 'E-Bike', price: '₹ 45,999', stock: 5, status: 'Low Stock', image: '🔋' },
  { id: 5, name: 'Hybrid Comfort Plus', category: 'Hybrid', price: '₹ 15,999', stock: 0, status: 'Out of Stock', image: '🚲' },
];

const productTemplates = {
  'Mountain Bike': { name: 'Mountain Explorer Pro', price: '24999', description: 'High-performance mountain bike with 21 gears and suspension fork', weight: '14.5', color: 'Matte Black' },
  'Road Bike': { name: 'City Rider 21 Speed', price: '18499', description: 'Lightweight road bike perfect for city commuting', weight: '11.2', color: 'Racing Red' },
  'Kids Bike': { name: 'Kids Fun Cycle', price: '6999', description: 'Durable kids bike with training wheels and safety features', weight: '8.5', color: 'Bright Blue' },
  'E-Bike': { name: 'Electric EcoRide', price: '45999', description: 'Premium electric bike with 500W motor and long battery life', weight: '22.0', color: 'Pearl White' },
  'Hybrid': { name: 'Hybrid Comfort Plus', price: '15999', description: 'Versatile hybrid bike for both city and trail riding', weight: '12.8', color: 'Forest Green' },
};

const emptyForm = { name: '', category: '', price: '', description: '', stock: '', weight: '', color: '', sku: '' };

export default function DashboardProducts() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState(emptyForm);

  const handleAutoFill = (category) => {
    const template = productTemplates[category];
    if (template) {
      setFormData({
        name: template.name,
        category: category,
        price: template.price,
        description: template.description,
        stock: '10',
        weight: template.weight,
        color: template.color,
        sku: `MNR-${category.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`
      });
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(Number(String(product.price).replace(/[^\d]/g, '')) || ''),
      description: product.description || '',
      stock: String(product.stock),
      weight: product.weight || '',
      color: product.color || '',
      sku: product.sku || '',
    });
    setShowForm(true);
  };

  const buildProduct = () => ({
    name: formData.name,
    category: formData.category,
    price: `₹ ${Number(formData.price).toLocaleString('en-IN')}`,
    stock: parseInt(formData.stock) || 0,
    status: (parseInt(formData.stock) || 0) > 5 ? 'Active' : (parseInt(formData.stock) || 0) > 0 ? 'Low Stock' : 'Out of Stock',
    description: formData.description,
    weight: formData.weight,
    color: formData.color,
    sku: formData.sku,
    image: formData.category === 'E-Bike' ? '🔋' : '🚲',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setProducts(products.map((p) => (p.id === editingId ? { ...p, ...buildProduct() } : p)));
    } else {
      const newProduct = { id: products.length + 1, ...buildProduct() };
      setProducts([...products, newProduct]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Products" subtitle="Manage your cycle products and accessories" icon={Package}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <button
          onClick={openAdd}
          className="bg-accent hover:bg-accenthover text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-borderc rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-borderc">
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Product</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Category</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Price</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Stock</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Status</th>
                <th className="text-left text-muted text-xs font-semibold uppercase tracking-wide px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-borderc hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{product.image}</span>
                      <span className="text-txt text-sm font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted text-sm">{product.category}</td>
                  <td className="px-5 py-4 text-txt text-sm font-semibold">{product.price}</td>
                  <td className="px-5 py-4 text-txt text-sm">{product.stock}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      product.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                      product.status === 'Low Stock' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setViewing(product)} className="p-1.5 text-muted hover:text-accent transition-colors" aria-label={`View ${product.name}`}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEdit(product)} className="p-1.5 text-muted hover:text-accent transition-colors" aria-label={`Edit ${product.name}`}>
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 text-muted hover:text-red-400 transition-colors" aria-label={`Delete ${product.name}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-borderc rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-borderc">
              <h2 className="text-txt text-lg font-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-txt">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="bg-card rounded-xl p-4 border border-accent/20">
                <p className="text-accent text-sm font-semibold mb-3">Quick Fill - Select Category</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(productTemplates).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleAutoFill(cat)}
                      className="bg-surface hover:bg-accent/20 text-txt text-xs px-3 py-2 rounded-lg border border-borderc hover:border-accent/50 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-muted text-xs font-medium mb-1.5 block">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-muted text-xs font-medium mb-1.5 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 transition-colors"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Mountain Bike">Mountain Bike</option>
                    <option value="Road Bike">Road Bike</option>
                    <option value="Kids Bike">Kids Bike</option>
                    <option value="E-Bike">E-Bike</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="text-muted text-xs font-medium mb-1.5 block">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-muted text-xs font-medium mb-1.5 block">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-muted text-xs font-medium mb-1.5 block">Weight (kg)</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-muted text-xs font-medium mb-1.5 block">Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-muted text-xs font-medium mb-1.5 block">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-muted text-xs font-medium mb-1.5 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-card hover:bg-card/80 text-muted font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-accent hover:bg-accenthover text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    {viewing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-borderc rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-borderc">
              <h2 className="text-txt text-lg font-bold">Product Details</h2>
              <button onClick={() => setViewing(null)} className="text-muted hover:text-txt">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-4xl">{viewing.image}</span>
                <div>
                  <p className="text-txt font-bold text-lg">{viewing.name}</p>
                  <p className="text-muted text-sm">{viewing.category}</p>
                </div>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['Price', viewing.price],
                  ['Stock', viewing.stock],
                  ['Status', viewing.status],
                  ['SKU', viewing.sku || '—'],
                  ['Weight (kg)', viewing.weight || '—'],
                  ['Color', viewing.color || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-card border border-borderc rounded-xl p-3">
                    <dt className="text-muted text-xs font-medium mb-1">{label}</dt>
                    <dd className="text-txt text-sm font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              {viewing.description && (
                <div className="mt-3 bg-card border border-borderc rounded-xl p-3">
                  <p className="text-muted text-xs font-medium mb-1">Description</p>
                  <p className="text-txt text-sm">{viewing.description}</p>
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { openEdit(viewing); setViewing(null); }}
                  className="flex-1 bg-accent hover:bg-accenthover text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Product
                </button>
                <button
                  onClick={() => setViewing(null)}
                  className="flex-1 bg-card hover:bg-card/80 text-muted font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}