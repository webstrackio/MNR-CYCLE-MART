import { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, X, Bike, LogIn, LogOut, LayoutDashboard, ChevronRight, Sun, Moon, Heart, Trash2, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Cycles', to: '/all-cycles' },
  { label: 'Brands', to: '/#brands' },
  { label: 'Services', to: '/#services' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Contact', to: '/#contact' },
];

function WishlistButton({ wishOpen, onToggle, onClose, compact = false, onToggleExtra }) {
  const { wishlistIds, wishlistItems, toggleWishlist } = useWishlist();
  const ref = useRef(null);

  const canHover =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(hover: hover)').matches
      : false;

  useEffect(() => {
    if (!wishOpen) return undefined;
    const handleClick = (e) => {
      const el = ref.current;
      if (el && el.offsetParent !== null && !el.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [wishOpen, onClose]);

  return (
    <div
      ref={ref}
      onMouseLeave={() => canHover && wishOpen && wishlistItems.length === 0 && onClose()}
      className={`relative ${compact ? 'mr-1' : ''}`}
    >
      <button
        onClick={() => {
          if (onToggleExtra) onToggleExtra();
          onToggle();
        }}
        className={`relative p-2 text-muted hover:text-accent transition-colors ${
          compact ? '' : 'rounded-full hover:bg-surface'
        }`}
        aria-label="Open wishlist"
        aria-expanded={wishOpen}
      >
        <Heart className="w-5 h-5" />
        {wishlistIds.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
            {wishlistIds.length}
          </span>
        )}
      </button>

      {wishOpen && (
        <div className={`absolute right-0 top-12 ${compact ? 'w-64' : 'w-80'} card overflow-hidden z-50 shadow-2xl`}>
          <div
            className={`px-4 border-b border-borderc/40 flex items-center justify-between ${
              compact ? 'py-2' : 'py-3'
            }`}
          >
            <span className={`text-txt font-semibold ${compact ? 'text-sm' : ''}`}>Wishlist</span>
            <span className="text-muted text-xs">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
            </span>
          </div>

          {wishlistItems.length === 0 ? (
            <div className={`text-center text-muted ${compact ? 'p-5' : 'p-6'}`}>
              <Heart className={`mx-auto mb-2 text-accent/60 ${compact ? 'w-6 h-6' : 'w-8 h-8'}`} />
              <p className={`text-txt font-semibold ${compact ? 'text-sm' : 'text-base'}`}>
                Your Wishlist is Empty
              </p>
              <p className="text-xs mt-1.5">Add your favourite cycles to your wishlist.</p>
            </div>
          ) : (
            <div className={`overflow-y-auto ${compact ? 'max-h-72' : 'max-h-80'}`}>
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center border-b border-borderc/30 ${
                    compact ? 'px-3 py-2 gap-2' : 'px-4 py-3 gap-3'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 overflow-hidden ${
                      compact ? 'w-10 h-10 rounded' : 'w-14 h-14 rounded-lg'
                    }`}
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={onClose}
                      className={`text-txt font-semibold hover:text-accent transition-colors block truncate ${
                        compact ? 'text-xs' : 'text-sm'
                      }`}
                    >
                      {item.title}
                    </Link>
                    <span className={`text-muted ${compact ? 'text-[10px]' : 'text-xs'}`}>
                      {item.category}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(item.id)}
className={`text-muted hover:text-accent transition-colors ${
  compact ? 'p-1' : 'p-1.5'
}`}
                    aria-label={`Remove ${item.title} from wishlist`}
                  >
                    <Trash2 className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                  </button>
                </div>
              ))}
              {!compact && (
                <div className="p-3">
                  <Link
                    to="/all-cycles"
                    onClick={onClose}
                    className="btn-primary justify-center w-full text-sm py-2.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Shop All Cycles
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);
  const closeWish = useCallback(() => setWishOpen(false), []);
  const toggleWish = useCallback(() => setWishOpen((v) => !v), []);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/60 backdrop-blur-md border-b border-borderc/40 shadow-lg shadow-black/5 will-change-transform">
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <Bike className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-txt font-bold text-lg lg:text-xl tracking-tight">
                M N R <span className="text-accent">Cycle Mart</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const cls =
                  'group px-3 xl:px-4 py-2 text-muted hover:text-accent text-sm font-medium relative transition-all duration-300 flex items-center gap-1 after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full';
                return (
                  <Link key={link.label} to={link.to} className={cls}>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <WishlistButton wishOpen={wishOpen} onToggle={toggleWish} onClose={closeWish} />

              <button
                onClick={toggleTheme}
                className="p-2 text-muted hover:text-accent transition-colors rounded-full hover:bg-surface"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              {user ? (
                <>
                  <Link to="/dashboard" className="btn-outline text-sm py-2.5 px-5">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-primary text-sm py-2.5 px-5">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn-primary text-sm py-2.5 px-5">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>

            <div className="flex items-center lg:hidden">
              <WishlistButton
                wishOpen={wishOpen}
                onToggle={toggleWish}
                onClose={closeWish}
                compact
                onToggleExtra={closeMenu}
              />
              <button
                onClick={toggleTheme}
                className="p-2 text-muted hover:text-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-txt hover:text-accent transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        onClick={closeMenu}
        className={`lg:hidden fixed inset-0 top-16 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`lg:hidden fixed top-16 right-0 bottom-0 w-1/2 min-w-[220px] bg-surface/60 backdrop-blur-md border-l border-borderc/40 z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const cls =
              'group px-4 py-3 text-muted hover:text-accent hover:bg-surface rounded-lg text-sm font-medium flex items-center gap-1 transition-all duration-300';
            return (
              <Link key={link.label} to={link.to} onClick={closeMenu} className={cls}>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 group-hover:after:w-full">
                  {link.label}
                </span>
              </Link>
            );
          })}
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="btn-outline text-sm py-3 justify-center mt-2 mx-4"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-primary text-sm py-3 justify-center mt-2 mx-4 w-[calc(100%-32px)]"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="btn-primary text-sm py-3 justify-center mt-2 mx-4"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}

        </div>
      </div>
    </>
  );
}