import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { viewportOnce } from '../lib/motion';

export default function CycleCard({ cycle, index }) {
  return (
    <div
      className="group h-full transition-transform duration-300 ease-out
                 hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="card h-full overflow-hidden"
      >
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={cycle.image}
            alt={cycle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

          <div className="p-6 flex flex-col items-center text-center">
          <h3 className="text-txt text-xl font-bold mb-3">{cycle.title}</h3>

          <Link
            to={`/product/${cycle.id}`}
            className="inline-flex items-center justify-center gap-1.5 w-full rounded-full border border-accent/40 text-accent font-semibold text-sm py-2.5
                       hover:bg-accent hover:text-white hover:border-accent
                       hover:shadow-lg hover:shadow-accent/25
                       transition-all duration-300 ease-out"
          >
            View Details
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
