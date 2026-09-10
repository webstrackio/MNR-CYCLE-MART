import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, Save, Store, Bell, Shield, Globe } from 'lucide-react';

export default function DashboardSettings() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'MNR Cycle Mart',
    storeEmail: 'contact@mnrcyclemart.com',
    storePhone: '+91 98765 43210',
    storeAddress: '123 Cycle Street, Hyderabad, Telangana 500001',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    language: 'English',
    notifications: { email: true, sms: false, push: true },
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
              <Settings className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Settings</h1>
              <p className="text-muted text-sm">Manage your store settings</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <form onSubmit={handleSave} className="max-w-3xl space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-surface border border-borderc rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-borderc">
                <Store className="w-4 h-4 text-accent" />
                <h2 className="text-txt font-bold">Store Settings</h2>
              </div>
              <div className="p-5 space-y-4">
                <div><label className="text-muted text-xs font-medium mb-1.5 block">Store Name</label>
                  <input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" /></div>
                <div><label className="text-muted text-xs font-medium mb-1.5 block">Store Email</label>
                  <input type="email" value={settings.storeEmail} onChange={(e) => setSettings({...settings, storeEmail: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" /></div>
                <div><label className="text-muted text-xs font-medium mb-1.5 block">Store Phone</label>
                  <input type="text" value={settings.storePhone} onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50" /></div>
                <div><label className="text-muted text-xs font-medium mb-1.5 block">Store Address</label>
                  <textarea value={settings.storeAddress} onChange={(e) => setSettings({...settings, storeAddress: e.target.value})} rows={2}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50 resize-none" /></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-surface border border-borderc rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-borderc">
                <Globe className="w-4 h-4 text-accent" />
                <h2 className="text-txt font-bold">Preferences</h2>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className="text-muted text-xs font-medium mb-1.5 block">Currency</label>
                  <select value={settings.currency} onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50">
                    <option value="INR">INR (₹)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option>
                  </select></div>
                <div><label className="text-muted text-xs font-medium mb-1.5 block">Timezone</label>
                  <select value={settings.timezone} onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50">
                    <option value="Asia/Kolkata">Asia/Kolkata</option><option value="UTC">UTC</option>
                  </select></div>
                <div><label className="text-muted text-xs font-medium mb-1.5 block">Language</label>
                  <select value={settings.language} onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt focus:outline-none focus:border-accent/50">
                    <option value="English">English</option><option value="Hindi">Hindi</option><option value="Telugu">Telugu</option>
                  </select></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-surface border border-borderc rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-borderc">
                <Bell className="w-4 h-4 text-accent" />
                <h2 className="text-txt font-bold">Notifications</h2>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive order updates via email' },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Receive order updates via SMS' },
                  { key: 'push', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between bg-card rounded-xl px-4 py-3">
                    <div>
                      <p className="text-txt text-sm font-semibold">{n.label}</p>
                      <p className="text-muted text-xs">{n.desc}</p>
                    </div>
                    <button type="button" onClick={() => setSettings({...settings, notifications: {...settings.notifications, [n.key]: !settings.notifications[n.key]}})}
                      className={`w-11 h-6 rounded-full transition-colors relative ${settings.notifications[n.key] ? 'bg-accent' : 'bg-card'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform`}
                        style={{ transform: settings.notifications[n.key] ? 'translateX(22px)' : 'translateX(2px)' }} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-surface border border-borderc rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-borderc">
                <Shield className="w-4 h-4 text-accent" />
                <h2 className="text-txt font-bold">Security</h2>
              </div>
              <div className="p-5 space-y-4">
                <div><label className="text-muted text-xs font-medium mb-1.5 block">Current Password</label>
                  <input type="password" placeholder="Enter current password"
                    className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt placeholder:text-muted/50 focus:outline-none focus:border-accent/50" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-muted text-xs font-medium mb-1.5 block">New Password</label>
                    <input type="password" placeholder="Enter new password"
                      className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt placeholder:text-muted/50 focus:outline-none focus:border-accent/50" /></div>
                  <div><label className="text-muted text-xs font-medium mb-1.5 block">Confirm Password</label>
                    <input type="password" placeholder="Confirm new password"
                      className="w-full bg-card border border-borderc rounded-xl px-4 py-2.5 text-sm text-txt placeholder:text-muted/50 focus:outline-none focus:border-accent/50" /></div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-end">
              <button type="submit" className="bg-accent hover:bg-accenthover text-white font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
                {saved ? <><span className="text-green-400">✓</span> Saved!</> : <><Save className="w-4 h-4" /> Save Settings</>}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
