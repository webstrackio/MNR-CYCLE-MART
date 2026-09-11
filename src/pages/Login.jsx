import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bike,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Headphones,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import { useAuth } from '../context/AuthContext';

/* ── decorative dot grid ── */
function DotGrid({ className = '' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={8 + col * 18}
              cy={8 + row * 18}
              r="3"
              fill="rgb(var(--color-accent))"
              opacity={0.25}
            />
          ))
        )}
      </svg>
    </div>
  );
}

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
    <section className="relative min-h-screen w-full overflow-hidden bg-bg">
      {/* ── Background blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* top-left blob */}
        <div
          className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgb(var(--color-accent) / 0.15) 0%, transparent 70%)',
          }}
        />
        {/* bottom-left blob */}
        <div
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full opacity-25"
          style={{
            background:
              'radial-gradient(circle, rgb(var(--color-accent) / 0.12) 0%, transparent 70%)',
          }}
        />
        {/* bottom-right blob */}
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgb(var(--color-accent) / 0.1) 0%, transparent 70%)',
          }}
        />
        {/* middle-right blob */}
        <div
          className="absolute top-1/3 -right-20 w-[300px] h-[300px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgb(var(--color-accent) / 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Dot grids ── */}
      <DotGrid className="absolute top-28 right-6 sm:right-12 lg:right-20" />
      <DotGrid className="absolute bottom-20 left-4 sm:left-10 lg:left-16" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-10 pb-12 min-h-screen">
        {/* Back to Home */}
        <div className="self-start sticky top-5 ml-4 sm:ml-8 z-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-surface/80 backdrop-blur-sm border border-borderc text-muted hover:text-accent hover:border-accent/50 font-medium transition-all text-sm px-4 py-2.5 rounded-xl shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center mb-2">
            <Bike className="w-14 h-14 text-accent" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-txt tracking-wide">
            MNR{' '}
            <span className="text-accent">Cycle Mart</span>
          </h2>
          <p className="text-sm text-muted mt-1">
            Find Your Perfect Ride
          </p>
          <div className="w-8 h-1 bg-accent rounded-full mx-auto mt-2" />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-md bg-card/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-10 border border-borderc"
        >
          <div className="text-center mb-7">
            <h1 className="text-3xl sm:text-4xl font-bold text-txt mb-2">
              Welcome Back
            </h1>
            <p className="text-muted text-sm">
              Sign in to your M N R Cycle Mart admin account.
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mb-5 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-xs text-muted">
            <span className="font-semibold text-accent">Demo credentials:&nbsp;</span>
            Username: <code className="font-mono font-bold text-txt">admin</code> &nbsp;/&nbsp;
            Password: <code className="font-mono font-bold text-txt">admin@123</code>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username */}
            <div className="relative">
              <User className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                className="w-full bg-surface border border-borderc rounded-xl pl-11 pr-4 py-3.5 text-txt placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full bg-surface border border-borderc rounded-xl pl-11 pr-12 py-3.5 text-txt placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-accent transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-400/20 rounded-lg px-4 py-2.5 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </p>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-sm text-muted text-center mt-5">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-accent hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-borderc" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card/80 px-4 text-muted">OR</span>
            </div>
          </div>

          {/* Feature icons */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface flex items-center justify-center border border-borderc">
                <Bike className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-muted leading-tight">
                Wide Range<br />of Cycles
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface flex items-center justify-center border border-borderc">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-muted leading-tight">
                Secure<br />Login
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface flex items-center justify-center border border-borderc">
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-muted" />
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-muted leading-tight">
                24/7<br />Support
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <ScrollToTop />
    </section>
  );
}
