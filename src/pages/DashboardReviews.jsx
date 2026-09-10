import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Search, ThumbsUp, MessageCircle } from 'lucide-react';

const sampleReviews = [
  { id: 1, customer: 'Ravi Kumar', product: 'Mountain Explorer Pro', rating: 5, date: 'Sep 15, 2025', comment: 'Excellent bike! Perfect for off-road adventures. The suspension is amazing.', helpful: 12 },
  { id: 2, customer: 'Priya Sharma', product: 'City Rider 21 Speed', rating: 4, date: 'Sep 14, 2025', comment: 'Great for daily commuting. Light and easy to handle. Would recommend!', helpful: 8 },
  { id: 3, customer: 'Karthik S', product: 'Kids Fun Cycle', rating: 5, date: 'Sep 13, 2025', comment: 'My son loves it! Very safe and well-built. Training wheels are sturdy.', helpful: 15 },
  { id: 4, customer: 'Anjali Reddy', product: 'Electric EcoRide', rating: 4, date: 'Sep 12, 2025', comment: 'Good battery life and smooth ride. A bit heavy but worth the price.', helpful: 6 },
  { id: 5, customer: 'Suresh Babu', product: 'Hybrid Comfort Plus', rating: 3, date: 'Sep 11, 2025', comment: 'Decent bike for the price. Could use better seat comfort.', helpful: 3 },
];

export default function DashboardReviews() {
  const navigate = useNavigate();
  const [reviews] = useState(sampleReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState(0);

  const filtered = reviews.filter(r => {
    const matchesSearch = r.customer.toLowerCase().includes(searchTerm.toLowerCase()) || r.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 0 || r.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-surface border-b border-borderc px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-1.5 text-muted hover:text-txt transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-txt text-xl font-bold">Reviews</h1>
              <p className="text-muted text-sm">View and manage customer reviews</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface border border-borderc rounded-2xl p-5 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className={`w-5 h-5 ${s <= Math.round(avgRating) ? 'text-accent fill-accent' : 'text-muted'}`} />)}
              </div>
              <p className="text-txt text-3xl font-bold">{avgRating}</p>
              <p className="text-muted text-sm">Average Rating</p>
            </div>
            <div className="bg-surface border border-borderc rounded-2xl p-5 text-center">
              <p className="text-txt text-3xl font-bold">{reviews.length}</p>
              <p className="text-muted text-sm">Total Reviews</p>
            </div>
            <div className="bg-surface border border-borderc rounded-2xl p-5 text-center">
              <p className="text-txt text-3xl font-bold">{reviews.filter(r => r.rating >= 4).length}</p>
              <p className="text-muted text-sm">Positive Reviews</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search reviews..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface border border-borderc rounded-xl pl-9 pr-4 py-2.5 text-sm text-txt placeholder:text-muted focus:outline-none focus:border-accent/50" />
            </div>
            <div className="flex gap-2">
              {[0, 5, 4, 3, 2, 1].map(r => (
                <button key={r} onClick={() => setFilterRating(r)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${filterRating === r ? 'bg-accent text-white' : 'bg-surface border border-borderc text-muted hover:border-white/20'}`}>
                  {r === 0 ? 'All' : `${r}★`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-surface border border-borderc rounded-2xl p-5 hover:border-accent/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-txt font-bold">
                      {review.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-txt font-semibold">{review.customer}</p>
                      <p className="text-muted text-xs">{review.product} • {review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-accent fill-accent' : 'text-muted'}`} />)}
                  </div>
                </div>
                <p className="text-txt text-sm mb-3">{review.comment}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-muted hover:text-accent text-xs transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1.5 text-muted hover:text-accent text-xs transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> Reply
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
