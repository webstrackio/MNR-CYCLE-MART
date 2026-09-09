import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Bike, User, Mail, Lock, Eye, EyeOff, ArrowLeft, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Since this is a demo, redirect to login after "signup"
    navigate('/login');
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
                  Create Account
                </h1>
                <p className="text-muted text-sm">
                  Join M N R Cycle Mart today.
                </p>
              </div>

              {/* Info notice */}
              <div className="mb-5 rounded-xl border border-blue-400/30 bg-blue-500/5 px-4 py-3 text-sm text-muted flex gap-2">
                <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>
                  This is a demo app. Admin access uses hardcoded credentials.{' '}
                  <Link to="/login" className="text-accent hover:underline font-medium">
                    Login here
                  </Link>
                  .
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-txt mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="fullname"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="w-full bg-surface border border-borderc rounded-xl pl-11 pr-4 py-3 text-txt placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-txt mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full bg-surface border border-borderc rounded-xl pl-11 pr-4 py-3 text-txt placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-txt mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      autoComplete="new-password"
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

                <button type="submit" className="btn-primary w-full justify-center text-base">
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </button>
              </form>

              <p className="text-xs text-muted text-center mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-accent hover:underline font-medium">
                  Login
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
