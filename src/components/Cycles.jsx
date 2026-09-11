import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Cycles() {
  const { t } = useLanguage();
  return (
    <section id="cycles" className="relative bg-bg overflow-hidden py-20 lg:py-28">
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center rounded-3xl overflow-hidden shadow-2xl min-h-[480px] lg:min-h-[620px]"
      >
        <img
          src="/hero-cycle.jpeg"
          alt="M N R Cycle Mart premium bicycle"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />

        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-16 lg:py-20 max-w-2xl w-full">
          <span className="inline-flex items-center gap-2 text-accent font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-5">
            <span className="w-8 h-[2px] bg-accent inline-block" />
            {t('Explore Our Cycles')}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {t('Ride Beyond Limits with')}{' '}
            <span className="text-gradient">{t('Premium Cycles')}</span>
          </h2>

          <p className="text-white/80 text-base sm:text-lg mb-9 max-w-xl leading-relaxed">
            {t('At M N R Cycle Mart, we offer quality cycles from top brands, expert guidance for every rider, and a wide range of models to suit every journey. Find the perfect ride today.')}
          </p>

          <div className="flex items-center gap-6 mb-9">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-accent">20+</span>
              <span className="text-white/70 text-xs sm:text-sm uppercase tracking-wider">{t('Years of Trust')}</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-accent">100+</span>
              <span className="text-white/70 text-xs sm:text-sm uppercase tracking-wider">{t('Cycle Models')}</span>
            </div>
          </div>

            <Link
              to="/all-cycles"
              className="btn-primary transition-transform duration-300 ease-out hover:scale-105 active:scale-95 inline-flex self-start"
            >
              <ShoppingCart className="w-5 h-5" />
              {t('More Cycles')}
            </Link>
        </div>
      </motion.div>
    </section>
  );
}
