import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import cycles from '../data/cycles';

const WishlistContext = createContext();

function loadWishlist() {
  try {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const isWishlisted = useCallback(
    (id) => wishlistIds.includes(Number(id)),
    [wishlistIds]
  );

  const toggleWishlist = useCallback((id) => {
    setWishlistIds((prev) =>
      prev.includes(Number(id)) ? prev.filter((x) => x !== Number(id)) : [...prev, Number(id)]
    );
  }, []);

  const wishlistItems = cycles.filter((c) => wishlistIds.includes(c.id));

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, wishlistItems, isWishlisted, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
