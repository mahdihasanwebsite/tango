/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Eye, ShoppingCart, Star, X, Check, ArrowRight, ShieldCheck, Ruler, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  favorites: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onToggleFavorite: (product: Product) => void;
}

type CategoryFilter = 'all' | 'shirts' | 'pants';
type SortKey = 'featured' | 'price-low-high' | 'price-high-low' | 'rating';

export default function ProductGrid({
  products,
  favorites,
  onAddToCart,
  onToggleFavorite,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [cartSuccessMessage, setCartSuccessMessage] = useState<string | null>(null);

  // Filter items
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort items
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') return a.price - b.price;
    if (sortBy === 'price-high-low') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // 'featured' keeps original order
  });

  const isFavorite = (pid: string) => favorites.some((item) => item.id === pid);

  const handleOpenQuickView = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[1] || product.sizes[0]); // default to second size or first
    setCartSuccessMessage(null);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[1] || product.sizes[0];
    onAddToCart(product, defaultSize);
    
    // Quick micro visual response
    setCartSuccessMessage(`Added ${product.name} (Size ${defaultSize})`);
    setTimeout(() => {
      setCartSuccessMessage(null);
    }, 2500);
  };

  const handleModalAddToCart = () => {
    if (selectedProduct && selectedSize) {
      onAddToCart(selectedProduct, selectedSize);
      setCartSuccessMessage(`Successfully added to your luxury garment box.`);
      setTimeout(() => {
        setCartSuccessMessage(null);
      }, 3000);
    }
  };

  return (
    <section id="collection" className="py-24 sm:py-32 bg-brand-bg relative">
      {/* Decorative background grid elements */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-electric-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase text-neon-cyan neon-glow-cyan">Limited Release</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
              Sovereign Collection
            </h2>
            <p className="text-slate-400 font-light text-sm max-w-md">
              A precise grid of shirts and pants engineered for aesthetic weight and lifelong architectural form.
            </p>
          </div>

          {/* Quick Notification Toast */}
          <AnimatePresence>
            {cartSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="glassmorphic border border-neon-cyan/30 px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg"
              >
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
                <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider">{cartSuccessMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter, Search, and Sort Control Center */}
        <div className="bg-white/[0.01] border border-white/5 p-4 sm:p-6 rounded-2xl mb-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 shadow-xl">
          
          {/* Category Filter Buttons */}
          <div className="flex bg-brand-darker/60 rounded-xl p-1 border border-white/5 self-start shrink-0">
            {(['all', 'shirts', 'pants'] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 sm:px-6 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'text-brand-darker font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
                id={`filter-btn-${cat}`}
              >
                <span className="relative z-10">{cat === 'all' ? 'All Collection' : cat}</span>
                {activeCategory === cat && (
                  <motion.span
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-cyan-300 rounded-lg"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-grow max-w-sm">
            <input
              type="text"
              placeholder="Search garments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-darker/60 border border-white/5 text-white placeholder-white/30 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-neon-cyan/50 font-mono transition-colors duration-300"
              id="product-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Controller */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-[10px] font-mono uppercase text-white/40">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-brand-darker/60 border border-white/5 text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-electric-purple/50 font-mono"
              id="product-sort-select"
            >
              <option value="featured">Brand Standard</option>
              <option value="price-low-high">Price: Low - High</option>
              <option value="price-high-low">Price: High - Low</option>
              <option value="rating">Atelier Rating</option>
            </select>
          </div>

        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl">
            <p className="text-sm font-mono text-slate-400">NO GARMENTS FOUND MATCHING YOUR SPECIFICATIONS</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 text-xs font-mono text-neon-cyan underline tracking-widest uppercase hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Dynamic Clothes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {sortedProducts.map((product) => {
              const borderAccentClass = product.accentColor === 'cyan' ? 'hover:border-neon-cyan/40 hover:neon-border-cyan' : 'hover:border-electric-purple/40 hover:neon-border-purple';
              const textAccentClass = product.accentColor === 'cyan' ? 'text-neon-cyan group-hover:neon-glow-cyan' : 'text-electric-purple group-hover:neon-glow-purple';
              const isFav = isFavorite(product.id);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  onClick={() => handleOpenQuickView(product)}
                  className={`group bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 flex flex-col h-full ${borderAccentClass}`}
                  id={`product-card-${product.id}`}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-square sm:aspect-[4/5] bg-brand-darker overflow-hidden border-b border-white/5">
                    {/* Tags */}
                    {product.tag && (
                      <span className="absolute top-4 left-4 z-10 bg-brand-darker/80 border border-white/10 text-[9px] font-mono tracking-widest uppercase text-white px-2.5 py-1 rounded-md">
                        {product.tag}
                      </span>
                    )}

                    {/* Favorites heart button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product);
                      }}
                      className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-brand-darker/60 hover:bg-brand-darker border border-white/5 hover:border-white/20 text-white/70 hover:text-red-400 transition-all duration-300 active:scale-90"
                      id={`fav-toggle-${product.id}`}
                      aria-label="Add to favorites"
                    >
                      <Heart className={`w-4 h-4 transition-transform duration-300 ${isFav ? 'fill-red-400 text-red-400 scale-110' : ''}`} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />

                    {/* Fast overlay triggers */}
                    <div className="absolute inset-0 bg-brand-darker/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenQuickView(product);
                        }}
                        className="p-3 bg-white text-brand-bg hover:bg-neon-cyan hover:text-brand-darker rounded-xl transition-all duration-200 shadow-lg group/btn hover:scale-110"
                        title="Quick View Spec Sheet"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="p-3 bg-white text-brand-bg hover:bg-electric-purple hover:text-white rounded-xl transition-all duration-200 shadow-lg group/btn hover:scale-110"
                        title={`Quick Add Size ${product.sizes[1] || product.sizes[0]}`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Context Info */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Category and star review bar */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase text-white/40 tracking-widest">{product.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-mono text-white/50">{product.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-white text-base sm:text-lg mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-light leading-relaxed mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                      <span className="text-sm font-mono font-bold text-white">
                        ${product.price}.00
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 font-bold ${textAccentClass}`}>
                        Explore Atelier Specs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Quick View Detailed Overlay Sheet (Custom Bottom Drawer / Modal) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark glass background curtain */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-brand-darker/90 backdrop-blur-sm"
            />

            {/* Spec Sheet Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', delay: 0.05 }}
              className="relative w-full max-w-4xl bg-brand-bg border border-white/10 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[85vh] md:max-h-none overflow-y-auto z-10"
              id="spec-modal-container"
            >
              
              {/* Image Column */}
              <div className="md:col-span-5 bg-brand-darker relative h-64 md:h-full aspect-square md:aspect-auto">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg md:from-transparent to-transparent" />
                
                {selectedProduct.tag && (
                  <span className="absolute top-4 left-4 bg-brand-bg/85 border border-white/10 text-[9px] font-mono tracking-widest uppercase text-white px-2.5 py-1 rounded-md">
                    {selectedProduct.tag}
                  </span>
                )}
              </div>

              {/* Data Specifications Column */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                
                {/* Header controls */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neon-cyan uppercase tracking-widest">{selectedProduct.category} specification sheet</span>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                      aria-label="Close specification sheet"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="font-display font-extrabold text-white text-xl sm:text-2xl mb-1">
                    {selectedProduct.name}
                  </h3>
                  
                  {/* Rating / Base Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex bg-white/5 px-2 py-0.5 rounded items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-mono font-bold text-white/80">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-white/30 text-xs font-mono">|</span>
                    <span className="text-xs font-mono text-white/50">Verified Atelier Release</span>
                  </div>

                  <p className="text-sm font-light text-slate-300 leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Garment Technical Specs list */}
                  <div className="space-y-2 mb-6">
                    <p className="text-[10px] font-mono uppercase text-white/40 tracking-widest">Garment Integrity Standards</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProduct.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start space-x-2 text-xs text-slate-300 font-light">
                          <Check className="w-3.5 h-3.5 text-neon-cyan mt-0.5 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-mono uppercase text-white/40 tracking-widest">Select Fit Sizing</p>
                      <span className="text-[10px] font-mono text-neon-cyan flex items-center space-x-1">
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Sovereign Fit Maps</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[46px] h-[40px] flex items-center justify-center rounded-xl border text-xs font-mono uppercase transition-all duration-200 ${
                            selectedSize === size
                              ? 'bg-gradient-to-r from-neon-cyan to-cyan-300 border-neon-cyan text-brand-darker font-bold'
                              : 'bg-white/5 border-white/5 text-white hover:border-white/20'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Controls / Price & Shopping Call triggers */}
                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Direct Atelier Price</p>
                    <p className="text-2xl font-mono font-bold text-white">${selectedProduct.price}.00</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onToggleFavorite(selectedProduct)}
                      className={`p-3 border rounded-xl transition-all duration-300 ${
                        isFavorite(selectedProduct.id)
                          ? 'border-transparent bg-red-400/10 text-red-400'
                          : 'border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                      }`}
                      title={isFavorite(selectedProduct.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(selectedProduct.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={handleModalAddToCart}
                      className="flex-grow flex items-center justify-center space-x-2 bg-gradient-to-r from-neon-cyan to-cyan-300 hover:from-cyan-300 hover:to-neon-cyan text-brand-darker font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Luxury Box</span>
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
