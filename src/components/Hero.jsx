import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section id="home" className="relative min-h-svh flex items-center bg-bg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-svh z-0 bg-bg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&h=1080&fit=crop"
          alt="Premium cycle"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

      <div className="section-padding relative z-10 w-full py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-sm font-medium">{t('Premium Cycle Showroom')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-txt leading-tight mb-6"
            >
              {t('Find Your')}{' '}
              <span className="text-accent">{t('Perfect')}</span>{' '}
              {t('Ride')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-muted text-lg sm:text-xl max-w-lg mb-10 leading-relaxed"
            >
              {t('Discover quality cycles, trusted brands, and expert cycling services at')}{' '}
              <span className="text-txt font-medium">M N R Cycle Mart</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/all-cycles" className="btn-primary text-base">
                {t('Explore Our Cycles')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/#contact" className="btn-outline text-base">
                <MapPin className="w-5 h-5" />
                {t('Visit Our Mart')}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl blur-2xl" />
              <video
                src="/cardvideo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="relative rounded-2xl shadow-2xl shadow-accent/10 w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
