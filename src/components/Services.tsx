/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Leaf, Truck, ShieldCheck } from 'lucide-react';
import { services } from '../data';

export default function Services() {
  
  // Icon mapping helper
  const renderIcon = (name: string, colorClass: string) => {
    switch (name) {
      case 'Scissors':
        return <Scissors className={`w-6 h-6 ${colorClass}`} />;
      case 'Leaf':
        return <Leaf className={`w-6 h-6 ${colorClass}`} />;
      case 'Truck':
        return <Truck className={`w-6 h-6 ${colorClass}`} />;
      case 'ShieldCheck':
        default:
        return <ShieldCheck className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-brand-bg">
      {/* Background neon ambient spotlight */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs font-mono tracking-widest uppercase text-electric-purple neon-glow-purple mb-3">Service Ecosystem</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Uncompromising Standards
          </h2>
          <p className="text-slate-400 font-light text-sm">
            We do not end our relationship at checkout. Our comprehensive service charter protects your garment and carbon footprint for life.
          </p>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const accentColor = isEven ? 'cyan' : 'purple';
            const hoverBorderClass = accentColor === 'cyan' ? 'hover:border-neon-cyan/40 hover:neon-border-cyan' : 'hover:border-electric-purple/40 hover:neon-border-purple';
            const iconColorClass = accentColor === 'cyan' ? 'text-neon-cyan' : 'text-electric-purple';
            const badgeClass = accentColor === 'cyan' ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-electric-purple/10 text-electric-purple';

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                key={service.id}
                className={`flex flex-col justify-between bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8 transition-all duration-300 ${hoverBorderClass}`}
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Top-row: Lucide icon and custom brand badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                      {renderIcon(service.icon, iconColorClass)}
                    </div>
                    
                    <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${badgeClass}`}>
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-white text-base sm:text-lg mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6">
                  <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">
                    AURA STANDARDS • 0{index + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="mt-16 bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display font-semibold text-white text-sm sm:text-base">Need a dedicated digital scan or sizing verification?</h4>
            <p className="text-xs text-slate-400 font-light">Bring your phone to any premium partner boutique in Geneva, Tokyo, or Dhaka with your active order ID.</p>
          </div>
          <a
            href="#inquire"
            className="text-xs font-mono uppercase tracking-widest text-neon-cyan hover:text-white transition-colors flex items-center space-x-2 shrink-0 font-bold"
          >
            <span>Learn about Sizing Maps</span>
            <span className="text-neon-cyan">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
