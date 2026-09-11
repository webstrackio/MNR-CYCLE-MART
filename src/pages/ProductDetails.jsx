import { useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle2,
  Accessibility,
  Ruler,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ChevronRight,
  Copy,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import cycles from '../data/cycles';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { viewportOnce } from '../lib/motion';

const WHATSAPP = '918919267847';
const PHONE = 'tel:+918919267847';

const findSpec = (cycle, terms) =>
  cycle.specs?.find((s) => terms.some((t) => s.label.toLowerCase().includes(t)))?.value;

function Stars({ rating, size = 'w-5 h-5' }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < Math.round(rating) ? 'fill-accent text-accent' : 'fill-borderc text-borderc'
          }`}
        />
      ))}
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-txt">{title}</h2>
      {subtitle && <p className="text-muted mt-2 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cycle = cycles.find((c) => c.id === Number(id));

  const images = cycle && cycle.images && cycle.images.length > 0 ? cycle.images : [cycle.image];
  const [selectedImage, setSelectedImage] = useState(0);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { t } = useLanguage();
  const wishlisted = cycle ? isWishlisted(cycle.id) : false;
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const details = useMemo(() => {
    if (!cycle) return null;
    const category = cycle.category?.toLowerCase() || '';
    const isSparePart = category.includes('spare') || category.includes('accessor');
    return {
      isSparePart,
      age: cycle.ageRange || findSpec(cycle, ['age']),
      size: cycle.frameSize || findSpec(cycle, ['frame size', 'frame', 'size']),
      reviewCount: cycle.reviewCount ?? 23 + cycle.id * 11,
    };
  }, [cycle]);

  if (!cycle) {
    return (
      <>
        <Navbar />
        <div className="bg-bg min-h-svh pt-32 pb-24">
          <div className="section-padding text-center">
            <h1 className="text-3xl font-bold text-txt mb-4">Product Not Found</h1>
            <p className="text-muted mb-8">Sorry, we couldn't find that product.</p>
            <Link to="/all-cycles" className="btn-primary">
              <ArrowLeft className="w-5 h-5" />
              Back to All Cycles
            </Link>
          </div>
        </div>
        <ScrollToTop />
      </>
    );
  }

  const related = cycles.filter((c) => c.category === cycle.category && c.id !== cycle.id).slice(0, 4);

  const whatsappLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hello MNR Cycle Mart, I am interested in the ${cycle.name} cycle. Please share the price and availability.`
  )}`;

  const productUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    const shareData = { title: cycle.name, text: cycle.description, url: productUrl };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (_) {}
    }
    try {
      await navigator.clipboard.writeText(productUrl);
    } catch (_) {
      setShareOpen(true);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <section className="bg-bg pt-24 lg:pt-28 pb-16 lg:pb-24">
        <div className="section-padding">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted mb-6">
            <Link to="/" className="hover:text-accent transition-colors">{t('Home')}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/all-cycles" className="hover:text-accent transition-colors">{t('All Cycles')}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-txt">{cycle.name}</span>
          </nav>

          {/* Hero: gallery + details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Gallery */}
              <div className="p-4 lg:p-6">
                <div className="relative h-[320px] sm:h-[380px] lg:h-[460px] overflow-hidden rounded-xl">
                  <img
                    key={images[selectedImage]}
                    src={images[selectedImage]}
                    alt={cycle.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-accent/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {cycle.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-surface/90 backdrop-blur text-accent text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    In Stock
                  </span>
                </div>
                {images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-none pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={img + idx}
                        onClick={() => setSelectedImage(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === idx
                            ? 'border-accent ring-2 ring-accent/30'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`${cycle.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col">
                <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                  {t('Availability: In Stock')}
                </span>

                <h1 className="text-3xl sm:text-4xl font-bold text-txt mb-4">{cycle.name}</h1>

                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="flex items-center gap-1">
                    <Stars rating={cycle.rating} />
                  </div>
                  <span className="text-accent font-bold text-lg">{cycle.rating.toFixed(1)}</span>
                   <span className="text-muted text-sm">{details.reviewCount} {t('Reviews')}</span>
                </div>

                <p className="text-muted text-base leading-relaxed mb-8">{cycle.description}</p>

                {/* Spec cards: Age/Size for cycles, Spare Parts/Cycle Type for accessories */}
                {details.isSparePart || details.age || details.size ? (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-surface rounded-xl border border-borderc p-4 flex items-center gap-3">
                      <Accessibility className="w-6 h-6 text-accent flex-shrink-0" />
                      <div>
                        <p className="text-muted text-xs uppercase tracking-wider">
                          {details.isSparePart ? t('Spare Parts') : t('Age')}
                        </p>
                        <p className="text-txt font-semibold">
                          {details.isSparePart ? t('All Types') : details.age ?? t('All Ages')}
                        </p>
                      </div>
                    </div>
                    <div className="bg-surface rounded-xl border border-borderc p-4 flex items-center gap-3">
                      <Ruler className="w-6 h-6 text-accent flex-shrink-0" />
                      <div>
                        <p className="text-muted text-xs uppercase tracking-wider">
                          {details.isSparePart ? t('Cycle Type') : t('Frame Size')}
                        </p>
                        <p className="text-txt font-semibold">
                          {details.isSparePart ? t('All Types') : details.size ?? t('See Below')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Actions */}
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="tel:8919267847"
                      className="inline-flex flex-1 min-w-full sm:min-w-[180px] justify-center items-center gap-2 btn-primary"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Contact / Enquire Now
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 min-w-full sm:min-w-[180px] justify-center items-center gap-2 rounded-full border-2 border-accent/60 text-accent font-semibold px-8 py-3 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Enquiry
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => toggleWishlist(cycle.id)}
                      aria-pressed={wishlisted}
                      className={`flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 rounded-full border font-semibold px-5 py-2.5 text-sm transition-all duration-300 ${
                        wishlisted
                          ? 'bg-accent/10 border-accent text-accent'
                          : 'border-border text-muted hover:text-accent hover:border-accent/50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${wishlisted ? 'fill-accent text-accent' : ''}`} />
                      {wishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 rounded-full border border-border text-muted hover:text-accent hover:border-accent/50 px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                    >
                      {copied ? <Copy className="w-5 h-5 text-accent" /> : <Share2 className="w-5 h-5" />}
                      {copied ? 'Link Copied' : 'Share'}
                    </button>
                  </div>
                  {shareOpen && (
                    <p className="text-xs text-muted text-center">
                      Clipboard unavailable on this device. Use your browser's share menu.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Separated gallery card */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
              className="card mt-12 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-txt mb-2">More Images</h2>
                <p className="text-muted text-sm mb-5">Tap a photo to preview it in the main gallery.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={img + idx}
                      onClick={() => setSelectedImage(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === idx
                          ? 'border-accent ring-2 ring-accent/30'
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${cycle.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Store location */}
          <div className="mt-16">
            <SectionHeading title="Visit Our Mart" subtitle="Come see this cycle in person." />
            <div className="card p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="w-6 h-6 text-accent" />
                  <p className="text-muted text-xs uppercase tracking-wider">Address</p>
                  <p className="text-txt font-semibold text-sm"># 17-328, 17-329, TV Naidu Street</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Phone className="w-6 h-6 text-accent" />
                  <p className="text-muted text-xs uppercase tracking-wider">Call</p>
                  <a href={PHONE} className="text-txt font-semibold text-sm hover:text-accent">+91 89192 67847</a>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="w-6 h-6 text-accent" />
                  <p className="text-muted text-xs uppercase tracking-wider">Hours</p>
                  <p className="text-txt font-semibold text-sm">Mon–Sat 9–9 · Sun 9–6</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link to="/#location" className="btn-primary justify-center">
                  <MapPin className="w-5 h-5" />
                  View Store Location
                </Link>
                <a
                  href="https://www.google.com/maps/dir/13.2186045,79.0916872/M+N+R+cycle+mart,+TV+Naidu+St,+Thotapalyam,+Chittoor,+Andhra+Pradesh+517001,+India/@13.2180068,79.0920114,17z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bad5ea7f12d2979:0xe1d0c0957290f7b4!2m2!1d79.0974701!2d13.2173512"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline justify-center"
                >
                  <ExternalLink className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-16">
              <SectionHeading title={`More in ${cycle.category}`} subtitle="You might also like these." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="group card h-full overflow-hidden text-left transition-transform duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/10"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-txt font-bold mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(item.rating)
                                ? 'fill-accent text-accent'
                                : 'fill-borderc text-borderc'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-muted text-xs">{item.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky mobile enquiry bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-borderc px-4 py-3 flex gap-3">
        <a href="tel:8919267847" className="btn-primary flex-1 justify-center text-sm px-4 py-3">
          <MessageCircle className="w-4 h-4" />
          Enquire
        </a>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 justify-center items-center gap-2 rounded-full bg-accent/15 text-accent border border-accent/60 font-semibold text-sm px-4 py-3"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      <div className="lg:hidden h-20" />
      <ScrollToTop />
    </>
  );
}
