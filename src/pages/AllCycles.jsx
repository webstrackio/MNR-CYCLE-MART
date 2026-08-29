import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, ChevronRight, Grid, Bike, Baby, User, UserRound, Crown, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import CycleCard from '../components/CycleCard';
import cycles from '../data/cycles';

const filterCategories = [
  { label: 'All Cycles', key: 'All Cycles', Icon: Grid },
  { label: 'Kids Cycles', key: 'Kids Cycles', Icon: Bike },
  { label: 'Baby Cycles', key: 'Baby Cycles', Icon: Baby },
  { label: 'Adults – Gents', key: 'Adults – Gents', Icon: User },
  { label: 'Adults – Ladies', key: 'Adults – Ladies', Icon: UserRound },
  { label: 'High-End Cycles', key: 'High-End / Premium Cycles', Icon: Crown },
  { label: 'Gear Cycle', key: 'Gear Cycle', Icon: Settings },
  { label: 'Spare Parts', key: 'Spare Parts', Icon: Settings },
];

const PAGE_SIZE = 5;

export default function AllCycles() {
  const [active, setActive] = useState('All Cycles');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered =
    active === 'All Cycles'
      ? cycles
      : cycles.filter((cycle) => cycle.category === active);

  const visibleCycles = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const selectCategory = (key) => {
    setActive(key);
    setVisible(PAGE_SIZE);
  };

  return (
    <>
      <Navbar />
      <section className="bg-bg pt-24 lg:pt-28 pb-20 lg:pb-28">
        <div className="section-padding">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted hover:text-accent font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-txt">
              Explore Our Cycles
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full" />
            <p className="text-lg max-w-2xl mx-auto text-muted">
              Explore our complete collection of premium cycles — from kids to high-end
              performance models. Choose a category to find the perfect ride.
            </p>
          </motion.div>

          {/* Category filter nav (sliding pill) */}
          <div className="mb-10 -mx-2 px-2 border-b border-border/40">
            <div className="flex flex-nowrap items-center justify-start lg:justify-center gap-2 overflow-x-auto scrollbar-none pb-3">
              {filterCategories.map(({ label, key, Icon }) => {
                const isActive = active === key;
                return (
                  <button
                    key={key}
                    onClick={() => selectCategory(key)}
                    className="relative inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="categoryPill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-accent/15 border-2 border-accent shadow-md shadow-accent/20"
                      />
                    )}
                    <Icon
                      className={`relative z-10 w-[16px] h-[16px] shrink-0 transition-colors duration-200 ${
                        isActive ? 'text-accent' : 'text-muted group-hover:text-accent'
                      }`}
                      strokeWidth={2}
                    />
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-accent' : 'text-muted hover:text-accent'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleCycles.map((cycle, index) => (
                <motion.div
                  key={cycle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CycleCard cycle={cycle} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          {hasMore ? (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="btn-primary transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 rotate-90" />
                Load More
              </button>
            </div>
          ) : filtered.length > 0 ? (
            <div className="flex justify-center mt-12">
              <span className="text-muted text-sm inline-flex items-center gap-2">
                <Star className="w-4 h-4 fill-accent text-accent" />
                Showing all {filtered.length} products
              </span>
            </div>
          ) : null}
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
