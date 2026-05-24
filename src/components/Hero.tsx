/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Ruler } from 'lucide-react';
// @ts-ignore
import heroImage from '../assets/images/hero_banner_1779590828067.png';

export default function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-brand-bg">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-[450px] h-[450px] bg-electric-purple/5 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Horizontal subtle design grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Accent Left Copy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full self-start"
            >
              <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/80">
                The Sovereign Thread Collection • AW 2026
              </span>
            </motion.div>

            {/* Core Big Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                Tailored with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyan-300 to-electric-purple">
                  Cold Precision.
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-slate-300/80 leading-relaxed font-light">
                Disrupting classic tailoring. AURA merges hyper-minimalist corporate structure with sovereign premium fabrics, creating shirts and pants that exist outside of trends.
              </p>
            </motion.div>

            {/* Micro specs bullet ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 border-y border-white/5 py-4 max-w-lg"
            >
              <div className="flex items-center space-x-2 text-white/70">
                <Ruler className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                <span className="text-xs font-mono tracking-wider">AI Measuring</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <ShieldCheck className="w-4 h-4 text-electric-purple flex-shrink-0" />
                <span className="text-xs font-mono tracking-wider">100% GOTS Cert</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <span className="text-indigo-400 font-mono text-xs font-bold font-mono">2-PLY</span>
                <span className="text-xs font-mono tracking-wider">Reinforced</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5"
            >
              <button
                onClick={(e) => scrollToSection(e, 'collection')}
                className="relative group p-px rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                id="cta-shop-collection"
              >
                {/* Border glowing gradient */}
                <span className="absolute inset-x-0 top-0 h-full w-full bg-gradient-to-r from-neon-cyan to-electric-purple rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center space-x-2 bg-brand-darker hover:bg-brand-darker/90 py-3.5 px-8 rounded-[11px] text-white tracking-widest text-xs uppercase font-bold transition-colors duration-200">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-neon-cyan" />
                </span>
              </button>

              <button
                onClick={(e) => scrollToSection(e, 'inquire')}
                className="border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 py-3.5 px-8 rounded-xl text-white tracking-widest text-xs uppercase font-medium transition-all duration-300 hover:scale-[1.02]"
                id="cta-contact-us"
              >
                Custom Order Inquiry
              </button>
            </motion.div>
          </div>

          {/* Luxury Showcase Right Column - Featuring Generated Image */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Visual Frame wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
              className="relative aspect-square md:aspect-[3/4] lg:aspect-auto ring-1 ring-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 bg-white/[0.02]"
            >
              {/* Highlight borders */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-electric-purple rounded-br-xl" />
              
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <img
                  src={heroImage}
                  alt="Aura Studio Private Atelier Showroom"
                  className="w-full h-full object-cover grayscale-[35%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Tag overlay */}
                <div className="absolute bottom-4 left-4 right-4 glassmorphic border border-white/10 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-neon-cyan">Private Atelier Studio</p>
                    <p className="text-xs font-semibold text-white tracking-wide mt-0.5">Sovereign Shirt & Pant Racks</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono tracking-widest uppercase text-white/40">EST.</p>
                    <p className="text-xs font-bold text-white tracking-wider">2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Tiny tech specs callout card floating next to the grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden lg:block absolute -left-16 bottom-24 glassmorphic-light border border-white/5 p-4 rounded-xl shadow-lg w-52 pointer-events-none"
            >
              <p className="text-[10px] font-mono text-electric-purple tracking-widest uppercase">THE CRAFT STANDARDS</p>
              <p className="text-xs font-light text-slate-300 mt-1">
                Zero polyester. Rigid canvas interlining. Laser aligned stitches. Made individually, numbered uniquely.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
