import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
    value: '+91 89192 67847',
    href: 'tel:+918919267847',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 97032 75716',
    href: 'https://wa.me/919703275716',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'mnrcyclemartchittoor@gmail.com',
    href: 'mailto:mnrcyclemartchittoor@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '# 17-328, 17-329, TV Naidu Street, Thotapalyam',
    href: '#location',
  },
  {
    icon: Clock,
    label: 'Opening Hours',
    value: 'Mon — Sat: 9:00 AM to 9:00 PM\nSunday: 9:00 AM to 6:00 PM',
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-surface py-20 lg:py-28">
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
                  className={`card p-6 transition-all duration-500 ${
                    item.label === 'Opening Hours'
                      ? 'sm:col-span-2 lg:max-w-xl lg:mx-auto w-full'
                      : ''
                  }`}
                >
                  <div
                    className={`flex items-start gap-4 ${
                      item.label === 'Opening Hours'
                        ? 'sm:justify-center sm:text-center'
                        : ''
                    }`}
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-muted text-xs font-semibold uppercase tracking-wider mb-1">
                        {item.label}
                      </h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-txt hover:text-accent transition-colors font-medium text-sm leading-relaxed break-words"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-txt font-medium text-sm leading-relaxed whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          >
            <Link to="/#location" className="btn-primary text-base">
              <MapPin className="w-5 h-5" />
              Visit M N R Cycle Mart
            </Link>
            <a href="tel:+918919267847" className="btn-outline text-base">
              <Phone className="w-5 h-5" />
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
