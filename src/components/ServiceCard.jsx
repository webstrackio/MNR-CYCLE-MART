import { motion } from 'framer-motion';

export default function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card group p-8 hover:border-brand/30 transition-all duration-500"
    >
      <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-5
                      group-hover:bg-brand/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 text-brand" />
      </div>
      <h3 className="text-cream font-bold text-lg mb-3">{service.title}</h3>
      <p className="text-cream/50 text-sm leading-relaxed">{service.description}</p>
    </motion.div>
  );
}