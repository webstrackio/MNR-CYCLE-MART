import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SectionTitle from './SectionTitle';

const highlights = [
  'Quality cycles from top brands',
  'Expert guidance for every rider',
  'Professional cycle servicing',
  'Wide range of accessories',
  'Customer-first approach',
];

export default function About() {
  return (
    <section id="about" className="bg-secondary py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title="About M N R Cycle Mart"
          subtitle="Your trusted local destination for quality cycles and cycling expertise."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559348349-86f1f65817fe?w=600&h=700&fit=crop"
                alt="Cycle shop interior"
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-brand text-primary font-bold
                         px-6 py-4 rounded-2xl shadow-xl text-center"
            >
              <div className="text-2xl">10+</div>
              <div className="text-xs opacity-80">Years of Trust</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cream/70 text-lg leading-relaxed mb-6">
              At <span className="text-cream font-semibold">M N R Cycle Mart</span>, we believe
              every rider deserves the perfect cycle. Whether you are a daily commuter, a weekend
              adventurer, or a professional cyclist, we are here to help you find the ideal ride.
            </p>
            <p className="text-cream/50 leading-relaxed mb-8">
              With a carefully curated collection of cycles from trusted brands, expert service
              support, and a passion for cycling, we have built a reputation as the go-to cycle
              destination in the community.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-cream/70">
                  <CheckCircle className="w-5 h-5 text-brand flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-l-4 border-brand pl-5 py-2">
              <p className="text-cream font-semibold text-lg italic">
                Your Ride. Your Journey. Our Expertise.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}