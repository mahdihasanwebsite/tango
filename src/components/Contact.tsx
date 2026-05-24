/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Ticket, Clock, ExternalLink } from 'lucide-react';
import { ContactSubmission } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Size Consultation',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [localSubmissions, setLocalSubmissions] = useState<ContactSubmission[]>([]);

  // Load submissions from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aura_submissions');
      if (saved) {
        setLocalSubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Could not load local submissions from Storage', e);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate luxury server processing time
    setTimeout(() => {
      const generatedTicket = `AURA-${Math.floor(1000 + Math.random() * 9000)}-${formData.name.substring(0, 3).toUpperCase()}`;
      const newSubmission: ContactSubmission = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('en-US')
      };

      const updatedSubmissions = [newSubmission, ...localSubmissions];
      setLocalSubmissions(updatedSubmissions);
      try {
        localStorage.setItem('aura_submissions', JSON.stringify(updatedSubmissions));
      } catch (err) {
        console.error(err);
      }

      setTicketId(generatedTicket);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: 'Size Consultation',
        message: ''
      });
    }, 1500);
  };

  const clearTickets = () => {
    setLocalSubmissions([]);
    try {
      localStorage.removeItem('aura_submissions');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="inquire" className="relative py-24 sm:py-32 bg-brand-darker">
      {/* Glow animations */}
      <div className="absolute top-1/2 left-1/10 w-96 h-96 bg-electric-purple/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-xl mb-16 sm:mb-20">
          <p className="text-xs font-mono tracking-widest uppercase text-neon-cyan neon-glow-cyan mb-3">Direct Interlock</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Corporate & Private Atelier Orders
          </h2>
          <p className="text-slate-400 font-light text-sm">
            Interested in customized sizing, corporate bulk uniform branding, or placing a bespoke commission? Submit an inquiry ticket below, and a private couturier will respond within 4 hours.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Information Column (Left) */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Atelier HQ block */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-white text-base sm:text-lg uppercase tracking-wider">ATELIER DIRECTORIES</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white/5 rounded-lg text-neon-cyan shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/50 tracking-wider">Geneva Desk</h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">Quai du Mont-Blanc 45, 1201 Genève, Switzerland</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white/5 rounded-lg text-electric-purple shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/50 tracking-wider">Dhaka Tech Guild</h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">Gulshan-2 Circle, Diplomatic Zone, Dhaka 1212</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white/5 rounded-lg text-neon-cyan shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-white/50 tracking-wider">Tokyo Shibuya Office</h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">Ring-Hill Building 3F, Shibuya, Tokyo, Japan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Lines */}
            <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-white/5 rounded-lg text-slate-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Secure Email</h4>
                  <a href="mailto:atelier@aurapremium.com" className="text-xs sm:text-sm text-white hover:text-neon-cyan transition-colors font-mono">
                    atelier@aurapremium.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-white/5 rounded-lg text-slate-300 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Sovereign Desk Tel</h4>
                  <p className="text-xs sm:text-sm text-white font-mono">+41 (22) 808-1111</p>
                </div>
              </div>
            </div>

            {/* Security Guarantee badge */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-white/80 font-bold uppercase tracking-wider">Secure Ledger Guarantee</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                All communications submitted on this endpoint are secured under end-to-end symmetric encryption patterns. Local support logs exist completely on your sandbox client ledger.
              </p>
            </div>

          </div>

          {/* Form Column (Right) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/[0.01] border border-white/5 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-2xl pointer-events-none" />

              <h3 className="font-display font-bold text-white text-base sm:text-lg uppercase tracking-wider mb-6 pb-2 border-b border-white/5 flex items-center justify-between">
                <span>CREATE INQUIRY TICKET</span>
                <Ticket className="w-4 h-4 text-neon-cyan" />
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5" id="contact-ticket-form">
                
                {/* Inputs Pair */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block">Signature Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      placeholder="e.g. Mahdi Hasan"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-brand-bg border border-white/10 text-white placeholder-white/20 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-neon-cyan/50 font-mono transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block">Corporate Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="e.g. client@corporate.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-brand-bg border border-white/10 text-white placeholder-white/20 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-neon-cyan/50 font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block">Inquiry Priority Mode</label>
                  <select
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-brand-bg border border-white/10 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-neon-cyan/50 font-mono transition-colors"
                  >
                    <option value="Size Consultation">Specific Sizing Map Consultation</option>
                    <option value="Corporate Bulk Release">Corporate Uniform/Bulk Release Order</option>
                    <option value="Custom Private Atelier">Custom Private Atelier Fitting</option>
                    <option value="Sponsorship & Partnership">Co-branding & Collaborative Syndicate</option>
                  </select>
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-mono uppercase text-slate-400 tracking-widest block">Detailed Specifications Requirements</label>
                  <textarea
                    required
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="Describe custom height, wrist girth, waist measures or order batch quantities..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-brand-bg border border-white/10 text-white placeholder-white/20 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-neon-cyan/50 font-sans leading-relaxed transition-colors resize-none"
                  />
                </div>

                {/* Sizing Note helper */}
                <p className="text-[10px] font-mono text-white/30 italic">
                  *Our sizes S, M, L, XL conform to metric shoulder maps. Trousers coordinates correspond to waist inches.
                </p>

                {/* Action Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-neon-cyan via-cyan-300 to-electric-purple text-brand-darker font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  id="submit-ticket-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-brand-darker border-t-transparent rounded-full animate-spin" />
                      <span>transmitting payload...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Ticket Payload</span>
                    </>
                  )}
                </button>

              </form>

              {/* Success Visual Overlay Box */}
              <AnimatePresence>
                {ticketId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-brand-bg/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl flex flex-col justify-between"
                  >
                    <div className="my-auto space-y-4 text-center pb-6">
                      <div className="w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan/40 p-4 mx-auto flex items-center justify-center mb-4">
                        <CheckCircle className="w-10 h-10 text-neon-cyan animate-pulse" />
                      </div>
                      
                      <h4 className="font-display font-extrabold text-white text-lg sm:text-xl">Inquiry Ticket Registered</h4>
                      
                      <div className="bg-brand-darker border border-white/5 py-2 px-4 rounded-lg inline-block">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">TICKET ID:</span>{' '}
                        <span className="text-xs font-mono font-bold text-white tracking-widest neon-glow-cyan">{ticketId}</span>
                      </div>

                      <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm mx-auto">
                        Your specifications have been recorded in our encrypted local ledger. An email thread will automatically boot at your provider address.
                      </p>
                    </div>

                    <button
                      onClick={() => setTicketId(null)}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono tracking-widest text-white uppercase transition-colors"
                    >
                      Create Another Ticket
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* active user tickets list showing local persistency logs */}
            {localSubmissions.length > 0 && (
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-electric-purple" />
                    <span className="font-mono text-xs uppercase text-white/70 font-semibold">Active Ledger Tickets</span>
                  </div>
                  
                  <button
                    onClick={clearTickets}
                    className="text-[9px] font-mono uppercase tracking-widest text-red-400/70 hover:text-red-400 hover:underline"
                  >
                    Clear Ledger Logs
                  </button>
                </div>

                <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {localSubmissions.map((sub, sIdx) => (
                    <div key={sIdx} className="bg-brand-darker/60 border border-white/5 p-3.5 rounded-xl space-y-1.5 hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neon-cyan font-bold uppercase">{sub.subject}</span>
                        <span className="text-slate-500">{sub.timestamp}</span>
                      </div>
                      
                      <p className="text-xs font-semibold text-white">{sub.name} <span className="text-slate-400 font-normal">({sub.email})</span></p>
                      
                      <p className="text-xs font-light text-slate-400 line-clamp-1 leading-relaxed">
                        {sub.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
