import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Clock, Phone } from 'lucide-react';
import SectionTitle from './SectionTitle';

export default function LocationMap() {
  return (
    <section id="location" className="bg-primary py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title="Find Us"
          subtitle="Visit M N R Cycle Mart and explore our collection in person."
        />

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 card overflow-hidden rounded-2xl h-[350px] lg:h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d77.6!3d12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzEyLjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1000000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="M N R Cycle Mart Location"
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </motion.div>

          {/* Store Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="card p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-cream font-semibold mb-1">Address</h4>
                  <p className="text-cream/50 text-sm leading-relaxed">
                    123, Main Road, Near City Center,
                    <br />
                    Bengaluru — 560001
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-cream font-semibold mb-1">Opening Hours</h4>
                  <p className="text-cream/50 text-sm leading-relaxed">
                    Mon — Sat: 9:30 AM – 8:00 PM
                  </p>
                  <p className="text-cream/50 text-sm leading-relaxed">
                    Sunday: 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-cream font-semibold mb-1">Phone</h4>
                  <a
                    href="tel:+919876543210"
                    className="text-cream/50 text-sm hover:text-brand transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm justify-center py-3"
            >
              <ExternalLink className="w-4 h-4" />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}