import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Clock, Phone } from 'lucide-react';
import SectionTitle from './SectionTitle';

export default function LocationMap() {
  return (
    <section id="location" className="bg-bg py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title="Find Us"
          subtitle="Visit M N R Cycle Mart and explore our collection in person."
        />

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 card overflow-hidden rounded-2xl h-[350px] lg:h-[400px]"
          >
            <iframe
              src="https://maps.google.com/maps?q=17-328+TV+Naidu+Street+Thotapalyam+Chittoor&t=&z=15&ie=UTF8&iwloc=&output=embed"
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="card p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-txt font-semibold mb-1">Address</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    # 17-328, 17-329, TV Naidu Street, Thotapalyam
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-txt font-semibold mb-1">Opening Hours</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    Mon — Sat: 9:00 AM – 9:00 PM
                  </p>
                  <p className="text-muted text-sm leading-relaxed">
                    Sunday: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-txt font-semibold mb-1">Phone</h4>
                  <a
                    href="tel:+918919267847"
                    className="text-muted text-sm hover:text-accent transition-colors"
                  >
                    +91 89192 67847
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/13.2186045,79.0916872/M+N+R+cycle+mart,+TV+Naidu+St,+Thotapalyam,+Chittoor,+Andhra+Pradesh+517001,+India/@13.2180068,79.0920114,17z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bad5ea7f12d2979:0xe1d0c0957290f7b4!2m2!1d79.0974701!2d13.2173512?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
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
