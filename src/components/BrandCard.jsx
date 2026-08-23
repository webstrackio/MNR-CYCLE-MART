import { motion } from 'framer-motion';

export default function BrandCard({ brand, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card group p-8 text-center hover:border-brand/30 transition-all duration-500"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-brand/10 rounded-2xl flex items-center justify-center
                      group-hover:bg-brand/20 transition-colors duration-300">
        <span className="text-brand text-2xl font-black">{brand.name.charAt(0)}</span>
      </div>
      <h3 className="text-cream font-bold text-lg mb-2">{brand.name}</h3>
      <p className="text-cream/40 text-sm leading-relaxed">{brand.description}</p>
    </motion.div>
  );
}