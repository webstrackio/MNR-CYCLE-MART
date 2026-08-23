import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CycleCard({ cycle, index }) {
  const Icon = cycle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group overflow-hidden"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={cycle.image}
          alt={cycle.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
        <div className="absolute top-4 left-4 bg-brand/90 text-primary p-2.5 rounded-xl">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-cream text-xl font-bold mb-2">{cycle.title}</h3>
        <p className="text-cream/50 text-sm leading-relaxed mb-5">{cycle.description}</p>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-brand font-semibold text-sm
                     hover:gap-2 transition-all duration-200"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}