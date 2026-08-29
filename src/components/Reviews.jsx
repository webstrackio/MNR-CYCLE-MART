import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionTitle from './SectionTitle';
import reviews from '../data/reviews';

export default function Reviews() {
  return (
    <section id="reviews" className="bg-bg py-20 lg:py-28">
      <div className="section-padding">
        <SectionTitle
          title="What Our Customers Say"
          subtitle="Real feedback from riders who trust M N R Cycle Mart."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="card p-6 transition-all duration-500"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted leading-relaxed mb-6 text-sm">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">{review.initials}</span>
                </div>
                <div>
                  <h4 className="text-txt font-semibold text-sm">{review.name}</h4>
                  <p className="text-muted text-xs">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
