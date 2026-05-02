'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [cartDesign, setCartDesign] = useState(null); // design selected for booking

  const addToWishlist = (designId) => {
    setWishlist((prev) =>
      prev.includes(designId) ? prev.filter((id) => id !== designId) : [...prev, designId]
    );
  };

  const isWishlisted = (designId) => wishlist.includes(designId);

  return (
    <AppContext.Provider value={{ wishlist, addToWishlist, isWishlisted, cartDesign, setCartDesign }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
