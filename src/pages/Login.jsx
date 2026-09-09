import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Bike, User, Lock, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter your username and password.');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate slight delay for UX
    await new Promise((r) => setTimeout(r, 600));
    const result = login(username.trim(), password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-bg min-h-svh pt-28 lg:pt-32 pb-20">
        <div className="section-padding">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted hover:text-accent font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <div className="card p-8 sm:p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bike className="w-8 h-8 text-accent" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-txt mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted text-sm">
                  Sign in to your M N R Cycle Mart admin account.
                </p>
              </div>

              {/* Hint box */}
              <div className="mb-5 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-muted">
                <span className="font-semibold text-accent">Demo credentials:&nbsp;</span>
                Username: <code className="font-mono font-bold text-txt">admin</code> &nbsp;/&nbsp;
                Password: <code className="font-mono font-bold text-txt">admin@123</code>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-txt mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      autoComplete="username"
                      className="w-full bg-surface border border-borderc rounded-xl pl-11 pr-4 py-3 text-txt placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-txt mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full bg-surface border border-borderc rounded-xl pl-11 pr-12 py-3 text-txt placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-accent transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-400/20 rounded-lg px-4 py-2.5 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <LogIn className="w-5 h-5" />
                  )}
                  {loading ? 'Signing in...' : 'Login'}
                </button>
              </form>

              <p className="text-xs text-muted text-center mt-6">
                Don't have an account?{' '}
                <Link to="/signup" className="text-accent hover:underline font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </>
  );
}