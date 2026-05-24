/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, Heart, ShieldCheck, Truck, Check, HelpCircle } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductGrid from './components/ProductGrid';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { Product, CartItem } from './types';
import { products } from './data';

export default function App() {
  // Local state for shopping cart and favorites with client storage persistence
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  
  // Controls for drawer slide-outs
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  
  // Checkout simulator states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutReceiptNumber, setCheckoutReceiptNumber] = useState('');

  // Sizing assistant modal helper
  const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
  
  // Track active visual section on scroll
  const [activeSection, setActiveSection] = useState('hero');

  // Load cart & favorites on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aura_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedFavs = localStorage.getItem('aura_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error('Error hydrating state from localStorage', e);
    }
  }, []);

  // Update navbar section based on scrolling
  useEffect(() => {
    const sections = ['hero', 'collection', 'story', 'philosophy', 'services', 'inquire'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // Offset checking slightly above view
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync cart to local Storage
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('aura_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  };

  // Sync favorites to local Storage
  const updateFavorites = (newFavs: Product[]) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem('aura_favorites', JSON.stringify(newFavs));
    } catch (e) {
      console.error(e);
    }
  };

  // State handlers: CART
  const handleAddToCart = (product: Product, size: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      updateCart(updated);
    } else {
      updateCart([...cart, { product, selectedSize: size, quantity: 1 }]);
    }
  };

  const handleAdjustQuantity = (productId: string, size: string, adjustment: number) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === productId && item.selectedSize === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const newQty = updated[existingIndex].quantity + adjustment;
      
      if (newQty <= 0) {
        updated.splice(existingIndex, 1);
      } else {
        updated[existingIndex].quantity = newQty;
      }
      updateCart(updated);
    }
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    const filtered = cart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    );
    updateCart(filtered);
  };

  // State handlers: FAVORITES
  const handleToggleFavorite = (product: Product) => {
    const exists = favorites.some((item) => item.id === product.id);
    if (exists) {
      updateFavorites(favorites.filter((item) => item.id !== product.id));
    } else {
      updateFavorites([...favorites, product]);
    }
  };

  // Subtotal calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // checkout submission trigger
  const handleCheckoutSubmit = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    // Simulate high-end digital receipt processing
    setTimeout(() => {
      const slipNumber = `AURA-SEC-${Math.floor(100000 + Math.random() * 900000)}-PAK`;
      setCheckoutReceiptNumber(slipNumber);
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      updateCart([]); // Clear cart instantly on success
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-brand-bg flex flex-col justify-between">
      
      {/* Dynamic Navigation panel */}
      <Navbar
        cart={cart}
        favorites={favorites}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Single Page structural block segments */}
      <main className="flex-grow">
        
        {/* HERO Section */}
        <div id="hero">
          <Hero />
        </div>

        {/* BRANDS ABOUT Section */}
        <About />

        {/* PRODUCTS GRID SYSTEM */}
        <ProductGrid
          products={products}
          favorites={favorites}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* BRAND VALUE OFFERINGS */}
        <Services />

        {/* CONTACT INQUIRY SECTION */}
        <Contact />

      </main>

      {/* FOOTER */}
      <Footer />

      {/* DYNAMIC CART SIDE DRAWER PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            
            {/* Glass curtain behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutComplete(false);
              }}
              className="absolute inset-0 bg-brand-darker/80 backdrop-blur-xs"
            />

            {/* Sliding drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="relative w-full max-w-md bg-brand-bg md:border-l border-white/10 shadow-2xl flex flex-col justify-between h-full z-10"
              id="cart-drawer-container"
            >
              
              {/* Drawer Title Block */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-neon-cyan" />
                  <span className="font-display font-extrabold tracking-widest text-white uppercase text-sm">
                    Luxury Garment Box
                  </span>
                  <span className="font-mono text-xs bg-white/5 px-2 py-0.5 rounded-full text-slate-400">
                    {cartCount}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutComplete(false);
                  }}
                  className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content Body Scrollable */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                
                {/* Checkout Complete view state */}
                {checkoutComplete ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col justify-center items-center text-center space-y-4 pb-12"
                  >
                    <div className="w-14 h-14 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full flex items-center justify-center mb-2">
                      <Check className="w-8 h-8 text-neon-cyan" />
                    </div>
                    
                    <h3 className="font-display font-bold text-white text-base">Atelier Box Registered</h3>
                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                      We have synchronized your specifications. A physical catalog packaging box is being compiled now.
                    </p>

                    <div className="bg-brand-darker border border-white/5 py-2 px-4 rounded-xl">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-widest">SOVEREIGN CODE:</span>
                      <span className="text-xs font-mono text-white font-bold tracking-widest uppercase neon-glow-cyan">
                        {checkoutReceiptNumber}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutComplete(false);
                      }}
                      className="mt-6 text-xs font-mono text-neon-cyan hover:text-white underline tracking-widest uppercase"
                    >
                      Return To Showroom
                    </button>
                  </motion.div>
                ) : cart.length === 0 ? (
                  /* Empty state */
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-4 pb-12">
                    <p className="font-mono text-xs text-white/30 tracking-widest">LUXURY GARMENT BOX IS CURRENTLY EMPTY</p>
                    <p className="text-xs font-light text-slate-400 max-w-xs leading-relaxed">
                      Wander our signature grids. Explore detailed custom materials & sizing specs to select shirts or trousers to build your box.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-white tracking-widest uppercase px-5 py-2.5 rounded-xl transition-all"
                    >
                      Browse Showroom
                    </button>
                  </div>
                ) : (
                  /* List of Items */
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}`}
                        className="flex items-center space-x-4 bg-white/[0.01] border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg bg-brand-darker shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="flex-grow min-w-0 space-y-1">
                          <h4 className="text-xs font-semibold text-white truncate">{item.product.name}</h4>
                          <div className="flex items-center space-x-2 text-[10px] font-mono">
                            <span className="text-slate-400 uppercase">Size: <strong className="text-white bg-white/5 px-1.5 py-0.5 rounded">{item.selectedSize}</strong></span>
                            <span className="text-white/20">|</span>
                            <span className="text-slate-400">${item.product.price}.00</span>
                          </div>

                          {/* Adjustment row */}
                          <div className="flex items-center space-x-3 pt-1">
                            <div className="flex items-center bg-brand-darker border border-white/5 rounded-lg">
                              <button
                                onClick={() => handleAdjustQuantity(item.product.id, item.selectedSize, -1)}
                                className="p-1 hover:text-neon-cyan transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-mono text-white min-w-[20px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => handleAdjustQuantity(item.product.id, item.selectedSize, 1)}
                                className="p-1 hover:text-neon-cyan transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveFromCart(item.product.id, item.selectedSize)}
                              className="text-white/30 hover:text-red-400 p-1 rounded transition-colors"
                              title="Delete Item"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Price side */}
                        <div className="text-right shrink-0">
                          <p className="text-xs font-mono font-bold text-white">${item.product.price * item.quantity}.00</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Drawer Checkout Action Bar Footer */}
              {!checkoutComplete && cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-brand-darker/50 space-y-4">
                  {/* Summary math */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Exclusive Packaging Unit</span>
                      <span className="text-white font-mono uppercase">Complimentary</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Express Sovereign Courier</span>
                      <span className="text-white font-mono uppercase">Complimentary</span>
                    </div>

                    <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                      <span className="font-display font-bold text-white text-sm">Spec Subtotal</span>
                      <span className="font-mono text-base font-bold text-neon-cyan">${cartSubtotal}.00</span>
                    </div>
                  </div>

                  {/* High edge specifications checks info */}
                  <div className="bg-brand-bg border border-white/5 p-3 rounded-xl space-y-2">
                    <div className="flex items-start space-x-2 text-[10px] text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan shrink-0 mt-0.5" />
                      <span>Lifetime material and seam sealing guarantee applied.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-[10px] text-slate-400">
                      <Truck className="w-3.5 h-3.5 text-electric-purple shrink-0 mt-0.5" />
                      <span>Arrives assembled inside wood-and-steel garment display boxes.</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckoutSubmit}
                    disabled={isCheckingOut}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-neon-cyan to-cyan-300 text-brand-darker font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    id="cart-checkout-btn"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-4 h-4 border-2 border-brand-darker border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Sizing Codes...</span>
                      </>
                    ) : (
                      <>
                        <span>Validate & Check Out Box</span>
                      </>
                    )}
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DYNAMIC FAVORITES WISHLIST DRAWER PANEL */}
      <AnimatePresence>
        {isFavOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            
            {/* Glass curtain behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFavOpen(false)}
              className="absolute inset-0 bg-brand-darker/80 backdrop-blur-xs"
            />

            {/* Sliding drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="relative w-full max-w-md bg-brand-bg md:border-l border-white/10 shadow-2xl flex flex-col justify-between h-full z-10"
              id="favorites-drawer-container"
            >
              
              {/* Drawer Title Block */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-electric-purple fill-electric-purple" />
                  <span className="font-display font-extrabold tracking-widest text-white uppercase text-sm">
                    Signature Wishlist
                  </span>
                  <span className="font-mono text-xs bg-white/5 px-2 py-0.5 rounded-full text-slate-400">
                    {favorites.length}
                  </span>
                </div>

                <button
                  onClick={() => setIsFavOpen(false)}
                  className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Close favorites"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content Body Scrollable */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {favorites.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-4 pb-12">
                    <p className="font-mono text-xs text-white/30 tracking-widest">Wishlist ledger empty</p>
                    <p className="text-xs font-light text-slate-400 max-w-xs leading-relaxed">
                      Tap the heart symbol on our Signature Shirts & Tapered Dress Pants to curate your private selection.
                    </p>
                    <button
                      onClick={() => setIsFavOpen(false)}
                      className="text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-white tracking-widest uppercase px-5 py-2.5 rounded-xl transition-all"
                    >
                      Examine Collections
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favorites.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 bg-white/[0.01] border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-lg bg-brand-darker shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="flex-grow min-w-0 space-y-0.5">
                          <h4 className="text-xs font-semibold text-white truncate">{product.name}</h4>
                          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{product.category} • ${product.price}.00</p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            onClick={() => {
                              const size = product.sizes[1] || product.sizes[0];
                              handleAddToCart(product, size);
                              setIsFavOpen(false);
                              setIsCartOpen(true);
                            }}
                            className="p-2 hover:text-neon-cyan hover:bg-white/5 text-white/50 rounded-lg transition-all"
                            title={`Add size ${product.sizes[1] || product.sizes[0]}`}
                            aria-label="Add to cart"
                            id={`fav-add-to-cart-${product.id}`}
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleToggleFavorite(product)}
                            className="p-2 hover:text-red-400 hover:bg-white/5 text-white/50 rounded-lg transition-all"
                            title="Remove item"
                            aria-label="Remove item"
                            id={`fav-remove-${product.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer specs details clear */}
              {favorites.length > 0 && (
                <div className="p-6 border-t border-white/5">
                  <button
                    onClick={() => updateFavorites([])}
                    className="w-full text-center py-2.5 bg-white/5 hover:bg-red-400/10 border border-white/10 hover:border-red-400/20 rounded-xl text-xs font-mono tracking-widest text-white hover:text-red-400 uppercase transition-all"
                    id="clear-wishlist-btn"
                  >
                    Clear Wishlist Ledger
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
