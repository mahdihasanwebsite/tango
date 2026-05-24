/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Github, Linkedin, ArrowUp, Instagram, Twitter, Command } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-brand-darker border-t border-white/5 py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Structural visual grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px)] bg-[size:6rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 sm:pb-16 border-b border-white/5">
          
          {/* Brand Intro info Column 1 */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="font-display text-2xl font-extrabold tracking-widest text-white">
                AURA<span className="text-neon-cyan">.</span>
              </span>
              <p className="text-slate-400 font-light text-xs sm:text-sm leading-relaxed max-w-sm">
                Sovereign digital tailoring. Engineered with zero tolerance, GOTS certified Egyptian fibers, and post-modern architectural patterns that transcend fast-fashion circles.
              </p>
            </div>

            {/* Corporate identification index */}
            <div className="font-mono text-[9px] text-white/30 space-y-1">
              <p>CH-REGISTER IDENTIFIER: AT-7795-GVA</p>
              <p>REGISTRED OPERATING DESKS: SHIBUYA-TOKYO • DHAKA-DIPLOMATIC • GENÈVE</p>
            </div>
          </div>

          {/* Quick links Column 2 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-white text-xs tracking-widest uppercase">Garment Directories</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <a href="#collection" className="hover:text-neon-cyan transition-colors duration-200">The Signature Shirt</a>
              </li>
              <li>
                <a href="#collection" className="hover:text-neon-cyan transition-colors duration-200">The Tailored Pant</a>
              </li>
              <li>
                <a href="#story" className="hover:text-neon-cyan transition-colors duration-200">The Atelier Story</a>
              </li>
              <li>
                <a href="#services" className="hover:text-neon-cyan transition-colors duration-200">Our Services & Warranties</a>
              </li>
            </ul>
          </div>

          {/* Corporate guidelines Column 3 */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-white text-xs tracking-widest uppercase">Charter Policies</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <a href="#story" className="hover:text-electric-purple transition-colors duration-200">Sovereign Carbon Offsetting (Zero-Emissions)</a>
              </li>
              <li>
                <a href="#story" className="hover:text-electric-purple transition-colors duration-200">Bespoke Fitting & AI Mapping Regulations</a>
              </li>
              <li>
                <a href="#story" className="hover:text-electric-purple transition-colors duration-200">Lifetime Repair Sealing Charter</a>
              </li>
              <li>
                <p className="text-[10px] text-white/30 flex items-center gap-1.5 font-mono">
                  <Command className="w-3 h-3" /> E2E Encrypted Ledger Enforced
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row: copyright and socials */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-xs text-slate-400 font-light font-mono">
              © {currentYear} AURA Studio Ltd. All rights reserved globally.
            </p>
            <p className="text-[9px] text-white/20 font-mono">
              Designed by Code Builders in direct agreement with the Sovereign Styling Charter.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Social icons */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 text-white/50 hover:text-neon-cyan hover:bg-white/10 hover:shadow-cyan-400/20 shadow-sm transition-all duration-300"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 text-white/50 hover:text-electric-purple hover:bg-white/10 hover:shadow-purple-400/20 shadow-sm transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 text-white/50 hover:text-neon-cyan hover:bg-white/10 transition-all duration-300"
              aria-label="Twitter Account"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 text-white/50 hover:text-electric-purple hover:bg-white/10 transition-all duration-300"
              aria-label="Instagram Gallery"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Back to top scroll button */}
            <button
              onClick={handleScrollTop}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-neon-cyan hover:border-neon-cyan hover:bg-white/15 transition-all duration-300 ml-2 group hover:scale-105 active:scale-95"
              aria-label="Scroll to Top"
              id="scroll-to-top-btn"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
