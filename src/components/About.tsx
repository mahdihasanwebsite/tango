/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Cpu } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '100%', label: 'GOTS Certified Organic Bio-Cotton' },
    { value: '0.4%', label: 'Craft Size Defect Rate Margin' },
    { value: '18pt-24pt', label: 'Stitch Precision Per Inch' },
    { value: 'Sovereign', label: 'Direct Luxury Atelier to Client' },
  ];

  const values = [
    {
      icon: <Compass className="w-5 h-5 text-neon-cyan" />,
      title: 'Structural Architecture First',
      text: 'We do not decorate garments; we build physical architectures. Every fold, vent, seam, and pocket is laser-located to cooperate with your body’s daily kinetics.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-electric-purple" />,
      title: 'Digital Precision Mapping',
      text: 'Our signature size models are built around sophisticated 3D body scans. No generic sizing: we accommodate the high performance posture of active corporate leaders.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-neon-cyan" />,
      title: 'Permanent Seam Sealing',
      text: 'We apply proprietary canvas interlining and double stitching structures on our collar rings and trouser cuffs. Aura shirts and pants never collapse, fray, or bubble.'
    }
  ];

  return (
    <section id="story" className="relative py-24 sm:py-32 bg-brand-darker">
      {/* Structural ambient details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-radial from-electric-purple/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Brand Philosophy Left Copy Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono tracking-widest uppercase text-neon-cyan neon-glow-cyan">Our Philosophy</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Sovereign Aesthetics. <br />No Loud Advertising.
              </h2>
            </div>

            <div className="space-y-6 text-slate-300 font-light text-base sm:text-lg leading-relaxed">
              <p>
                In an era dominated by transient fast fashion and loud, status-seeking logos, <strong className="text-white font-medium">AURA</strong> stands in rigid silence. We believe that true status is whispered, understood exclusively by those who appreciate the mathematical weight of premium fabric.
              </p>
              <p>
                We specialize entirely in two categories: <strong className="text-neon-cyan font-medium">The Perfect Shirt</strong> and <strong className="text-electric-purple font-medium">The Perfect Pant</strong>. Each pattern is refined over hundreds of fitting iterations. We do not manufacture mass quantities; our active run sizes are constrained to only 200 items per batch to keep tailoring margins pristine.
              </p>
              <p className="text-sm font-mono text-white/50 border-l border-neon-cyan/45 pl-4 py-1">
                "Fashion represents clothing as a spectacle. Aura represents clothing as a high-integrity utility shield."
              </p>
            </div>

            {/* Interactive Stats Panel */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:border-white/10 transition-all duration-300 group">
                  <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-neon-cyan transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Brand Value Visual Rig Right Column */}
          <div className="lg:col-span-6 space-y-6">
            <div id="philosophy" className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-neon-cyan animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold">THE AURA CHARTER</span>
              </div>
              
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                We reject seasonal models. Every piece we make is cross-compatible. A 2026 Shirt matches a 2030 Pant seamlessly. The following three standards govern every garment stamped with our subtle collar seal:
              </p>

              {/* Stack of values */}
              <div className="space-y-6 pt-4">
                {values.map((v, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 6 }}
                    className="flex space-x-4 border-t border-white/5 pt-5 first:border-0 first:pt-0"
                  >
                    <div className="p-2 bg-white/5 rounded-lg h-fit flex-shrink-0">
                      {v.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-semibold text-white text-sm sm:text-base">{v.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">{v.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Design detail frame */}
            <div className="border border-white/5 py-4 px-6 rounded-xl bg-white/[0.01] flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-mono text-white/40 tracking-widest uppercase">DESIGN LAB LOCATION</span>
              <span className="text-[10px] sm:text-xs font-mono text-white tracking-widest uppercase">DHAKA • TOKYO • GENEVA</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
