import { useState } from 'react';
import { Menu, X, Bike, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Cycles', href: '#cycles' },
  { label: 'Brands', href: '#brands' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/5">
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <Bike className="w-7 h-7 text-brand group-hover:scale-110 transition-transform" />
            <span className="text-cream font-bold text-lg lg:text-xl tracking-tight">
              M N R <span className="text-brand">Cycle Mart</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 xl:px-4 py-2 text-cream/70 hover:text-brand transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="btn-primary text-sm py-2.5 px-5"
            >
              <MapPin className="w-4 h-4" />
              Visit Our Store
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-cream hover:text-brand transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-primary border-t border-white/5 overflow-hidden"
          >
            <div className="section-padding py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-cream/70 hover:text-brand hover:bg-secondary/50 rounded-lg transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-sm py-3 justify-center mt-2"
              >
                <MapPin className="w-4 h-4" />
                Visit Our Store
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}