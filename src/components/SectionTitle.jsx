import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-txt">
        {title}
      </h2>
      <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full" />
      {subtitle && (
        <p className="text-lg max-w-2xl mx-auto text-muted">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
