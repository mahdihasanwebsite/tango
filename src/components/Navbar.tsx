/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Menu, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  cart: CartItem[];
  favorites: Product[];
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  activeSection: string;
}

export default function Navbar({
  cart,
  favorites,
  onOpenCart,
  onOpenFavorites,
  activeSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const favCount = favorites.length;

  const navLinks = [
    { name: 'Collection', href: '#collection' },
    { name: 'Story', href: '#story' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Inquire', href: '#inquire' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of glassmorphic navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glassmorphic border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2 group">
              <span className="font-display text-2xl font-extrabold tracking-widest text-white group-hover:text-neon-cyan transition-colors duration-300">
                AURA<span className="text-neon-cyan">.</span>
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-1.5 py-0.5 rounded">
                STUDIO Ateliers
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="relative text-sm tracking-widest uppercase transition-colors duration-300 py-2 text-white/70 hover:text-white font-medium"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-cyan to-electric-purple"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-full hover:bg-white/5 text-white/80 hover:text-electric-purple transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Wishlist"
              id="wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-electric-purple text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-white/5 text-white/80 hover:text-neon-cyan transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Shopping Bag"
              id="shopping-bag-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neon-cyan text-brand-darker text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-white/5 text-white/80 hover:text-white transition-colors duration-200"
                aria-label="Main menu"
                id="menu-toggle-btn"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glassmorphic border-b border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className={`block px-3 py-3 rounded-lg text-base tracking-widest uppercase transition-all duration-200 font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-neon-cyan/10 to-electric-purple/5 text-neon-cyan border-l-2 border-neon-cyan'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
