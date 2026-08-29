import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Star,
  MessageCircle,
  Wrench,
  Users,
  ThumbsUp,
} from 'lucide-react';
import SectionTitle from './SectionTitle';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    description: 'Curated cycles from reliable manufacturers.',
  },
  {
    icon: Star,
    title: 'Trusted Brands',
    description: 'We only stock brands that riders depend on.',
  },
  {
    icon: MessageCircle,
    title: 'Expert Guidance',
    description: 'Knowledgeable staff to help you choose right.',
  },
  {
    icon: Wrench,
    title: 'Reliable Service',
    description: 'Professional maintenance and repair support.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your satisfaction is our highest priority.',
  },
  {
    icon: ThumbsUp,
    title: 'Local & Trusted',
    description: 'Serving the community with dedication.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title="Why Choose M N R Cycle Mart?"
          subtitle="What makes us the preferred cycling destination."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="card group p-6 text-center transition-all duration-500"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center
                                mx-auto mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-txt font-bold text-lg mb-2">{reason.title}</h3>
                <p className="text-muted text-sm">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
