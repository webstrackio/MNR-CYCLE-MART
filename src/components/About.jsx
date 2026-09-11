import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const highlights = [
    t('Quality cycles from top brands'),
    t('Expert guidance for every rider'),
    t('Professional cycle servicing'),
    t('Wide range of accessories'),
    t('Customer-first approach'),
  ];
  return (
    <section id="about" className="bg-surface py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title={t('About M N R Cycle Mart')}
          subtitle={t('Your trusted local destination for quality cycles and cycling expertise.')}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/pom.jpeg"
                alt="Cycle shop interior"
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-accent text-white font-bold
                         px-6 py-4 rounded-2xl shadow-xl text-center"
            >
              <div className="text-2xl">20+</div>
              <div className="text-xs opacity-80">{t('Years of Trust')}</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-muted text-lg leading-relaxed mb-6">
              {t('At')} <span className="text-txt font-semibold">M N R Cycle Mart</span>, {t('we believe every rider deserves the perfect cycle. Whether you are a daily commuter, a weekend adventurer, or a professional cyclist, we are here to help you find the ideal ride.')}
            </p>
            <p className="text-muted/70 leading-relaxed mb-8">
              {t('With a carefully curated collection of cycles from trusted brands, expert service support, and a passion for cycling, we have built a reputation as the go-to cycle destination in the community.')}
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-l-4 border-accent pl-5 py-2">
              <p className="text-txt font-semibold text-lg italic">
                {t('Your Ride. Your Journey. Our Expertise.')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
