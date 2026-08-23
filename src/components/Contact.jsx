import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from 'lucide-react';
import SectionTitle from './SectionTitle';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 98765 43210',
    href: 'https://wa.me/919876543210',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@mnrcyclemart.com',
    href: 'mailto:hello@mnrcyclemart.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123, Main Road, Near City Center, Bengaluru — 560001',
    href: '#location',
  },
  {
    icon: Clock,
    label: 'Opening Hours',
    value: 'Mon — Sat: 9:30 AM to 8:00 PM\nSunday: 10:00 AM to 6:00 PM',
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-secondary py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title="Get In Touch"
          subtitle="We would love to hear from you. Visit us or reach out."
        />

        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="card p-6 hover:border-brand/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brand" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-cream/50 text-xs font-semibold uppercase tracking-wider mb-1">
                        {item.label}
                      </h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-cream hover:text-brand transition-colors font-medium text-sm leading-relaxed break-words"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-cream font-medium text-sm leading-relaxed whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          >
            <a href="#location" className="btn-primary text-base">
              <MapPin className="w-5 h-5" />
              Visit M N R Cycle Mart
            </a>
            <a href="tel:+919876543210" className="btn-outline text-base">
              <Phone className="w-5 h-5" />
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}