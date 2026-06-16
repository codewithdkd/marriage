/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Menu, X, Landmark, Compass, Calendar, Gift, Lock } from 'lucide-react';

// Import our modular custom components
import AudioEngine from './components/AudioEngine';
import ParticleBackground from './components/ParticleBackground';
import WelcomeScreen from './components/WelcomeScreen';
import JourneyTimeline from './components/JourneyTimeline';
import RingCeremonyStory from './components/RingCeremonyStory';
import AnniversaryHighlights from './components/AnniversaryHighlights';
import FamilyAppreciation from './components/FamilyAppreciation';
import WishesMessages from './components/WishesMessages';
import AnimatedClosing from './components/AnimatedClosing';

export default function App() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Nav Links matrix linking exact IDs
  const navLinks = [
    { label: 'Welcome', id: 'welcome-top', icon: Landmark },
    { label: 'Our Story', id: 'timeline-section', icon: Compass },
    { label: 'Ring Exchange', id: 'exchange-rings-section', idLookup: 'exchange-rings-section', elementId: 'exchange-rings', icon: Lock },
    { label: 'Schedule & Venue', id: 'highlights-venue', icon: Calendar },
    { label: 'RSVP Support', id: 'rsvp-family', icon: Heart },
    { label: 'Guestbook Wishes', id: 'wishes-wall', icon: Gift }
  ];

  return (
    <div id="marriage-app-root" className="min-h-screen bg-[#0A0805] text-white selection:bg-gold-300 selection:text-luxury-charcoal font-sans relative">
      
      {/* 1. Immersive Synthesizer Sound Engine */}
      <AudioEngine />

      {/* 2. Interactive Gold Particle & Lotus Petal Canvas Layer */}
      <ParticleBackground />

      {/* 3. Floating Glassmorphic Top Jewel Navigation Frame */}
      <nav id="header-nav" className="fixed top-0 left-0 right-0 z-40 bg-[#120E0A]/85 backdrop-blur-md border-b border-gold-500/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          
          {/* Logo Brand Brand Plaque */}
          <div 
            onClick={() => scrollToId('welcome-top')} 
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-full border border-gold-400/40 flex items-center justify-center bg-gold-400/5 group-hover:border-gold-300 transition-colors">
              <span className="font-serif-display text-xs text-gold-300 font-bold group-hover:text-gold-100">PS</span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif-display text-sm font-semibold tracking-widest text-gold-gradient-light">
                Prince & Shreyal
              </span>
              <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-gold-400/60 font-medium tracking-widest mt-px">
                Engagement June 20, 2026
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const targetEl = link.idLookup ? link.idLookup : link.id;
                  // Handle cases where sections have slightly offset names
                  const safeId = targetEl === 'exchange-rings-section' ? 'highlights-venue' : targetEl;
                  
                  // Simple standard lookup
                  if (link.id === 'exchange-rings-section') {
                    document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' });
                    // Wait briefly and scroll specifically
                    setTimeout(() => {
                      document.getElementById('ring-slider')?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                  } else {
                    scrollToId(targetEl);
                  }
                }}
                className="font-serif-display text-[10.5px] font-medium tracking-[0.2em] uppercase text-gold-100/70 hover:text-gold-300 transition-colors hover:scale-[1.01] active:scale-95 outline-none pointer-events-auto"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden w-10 h-10 border border-gold-500/20 rounded-xl flex items-center justify-center text-gold-300 hover:bg-gold-500/5 transition-all outline-none focus:ring-1 focus:ring-gold-400"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile slide-out overlay menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gold-500/10 bg-[#15110A]/95 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (link.id === 'exchange-rings-section') {
                          scrollToId('timeline-section');
                          setTimeout(() => {
                            document.getElementById('ring-slider')?.scrollIntoView({ behavior: 'smooth' });
                          }, 500);
                        } else {
                          scrollToId(link.id);
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full p-3 font-serif-display text-xs tracking-widest uppercase text-gold-100 hover:bg-gold-500/10 rounded-xl transition-all select-none text-left"
                    >
                      <Icon className="w-4 h-4 text-gold-400" />
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Decorative vertical spacer to account for floating nav header height */}
      <div id="welcome-top" className="h-16 w-full bg-[#1A140F]" />

      {/* 4. MAIN SEQUENTIAL CINEMATIC SECTIONS FRAMEWORK */}
      <main className="relative z-25">
        
        {/* Welcome Section */}
        <WelcomeScreen />

        {/* Our Journey Timeline */}
        <JourneyTimeline />

        {/* Interactive Ring Exchange lock story section */}
        <RingCeremonyStory />

        {/* Venue Location details and schedule highlights */}
        <AnniversaryHighlights />

        {/* Tribute to Families & RSVP Call Triggers */}
        <FamilyAppreciation />

        {/* Wishes and Blessings Guest Postcards Scroll */}
        <WishesMessages />

        {/* Divine Outro Jain Closing and Monogram Frame */}
        <AnimatedClosing />

      </main>

    </div>
  );
}
