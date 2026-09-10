import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Sun, Moon, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function DashboardThemes() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const themes = [
    { id: 'dark', label: 'Dark Mode', description: 'Easy on the eyes, perfect for night browsing', icon: Moon, active: theme === 'dark' },
    { id: 'light', label: 'Light Mode', description: 'Clean and bright, great for daytime use', icon: Sun, active: theme === 'light' },
  ];

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-1.5 text-muted hover:text-txt transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Themes</h1>
              <p className="text-muted text-sm">Customize your store appearance</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-borderc rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                  {theme === 'dark' ? <Moon className="w-7 h-7 text-accent" /> : <Sun className="w-7 h-7 text-accent" />}
                </div>
                <div>
                  <p className="text-muted text-xs font-medium mb-0.5">Current Theme</p>
                  <p className="text-txt text-lg font-bold capitalize">{theme} Mode</p>
                </div>
              </div>
              <button onClick={toggleTheme}
                className="bg-accent hover:bg-accenthover text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
                {theme === 'dark' ? <><Sun className="w-4 h-4" /> Switch to Light</> : <><Moon className="w-4 h-4" /> Switch to Dark</>}
              </button>
            </div>
          </motion.div>

          <div>
            <h2 className="text-txt text-lg font-bold mb-4">Choose Theme</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themes.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.button key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    onClick={() => { if (theme !== t.id) toggleTheme(); }}
                    className={`relative text-left bg-surface border-2 rounded-2xl p-6 transition-all duration-300 ${
                      t.active ? 'border-accent shadow-lg shadow-accent/10' : 'border-borderc hover:border-white/20'
                    }`}>
                    {t.active && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${t.active ? 'bg-accent/20' : 'bg-white/5'}`}>
                        <Icon className={`w-7 h-7 ${t.active ? 'text-accent' : 'text-muted'}`} />
                      </div>
                      <div>
                        <p className="text-txt font-bold text-lg">{t.label}</p>
                        <p className="text-muted text-sm mt-1">{t.description}</p>
                      </div>
                    </div>
                    <div className={`mt-5 h-20 rounded-xl border border-borderc flex items-center justify-center ${
                      t.id === 'dark' ? 'bg-bg' : 'bg-white'
                    }`}>
                      <div className="flex items-center gap-2">
                        {t.id === 'dark' ? <Moon className="w-4 h-4 text-accent" /> : <Sun className="w-4 h-4 text-accent" />}
                        <span className={`text-xs font-medium ${t.id === 'dark' ? 'text-txt' : 'text-gray-800'}`}>{t.label} Preview</span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-surface border border-borderc rounded-2xl p-6">
            <h2 className="text-txt font-bold mb-4">Accent Colors</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Orange', color: '#F4A340', active: true },
                { name: 'Blue', color: '#3B82F6', active: false },
                { name: 'Green', color: '#22C55E', active: false },
                { name: 'Purple', color: '#A855F7', active: false },
                { name: 'Red', color: '#EF4444', active: false },
                { name: 'Teal', color: '#14B8A6', active: false },
              ].map((c) => (
                <button key={c.name}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-borderc hover:border-white/30 transition-colors bg-card">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-txt text-sm font-medium">{c.name}</span>
                  {c.active && <Check className="w-3.5 h-3.5 text-accent" />}
                </button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
