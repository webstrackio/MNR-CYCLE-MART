import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&h=1080&fit=crop"
          alt="Premium cycle"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-brand/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-brand/5 rounded-full blur-3xl" />

      <div className="section-padding relative z-10 w-full py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              <span className="text-brand text-sm font-medium">Premium Cycle Showroom</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-cream leading-tight mb-6"
            >
              Find Your{' '}
              <span className="text-brand">Perfect</span>{' '}
              Ride
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-cream/60 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed"
            >
              Discover quality cycles, trusted brands, and expert cycling services at{' '}
              <span className="text-cream font-medium">M N R Cycle Mart</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#cycles" className="btn-primary text-base">
                Explore Our Cycles
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="btn-outline text-base">
                <MapPin className="w-5 h-5" />
                Visit Our Store
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-transparent rounded-2xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=700&h=500&fit=crop"
                alt="Cyclist riding"
                className="relative rounded-2xl shadow-2xl shadow-brand/10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}