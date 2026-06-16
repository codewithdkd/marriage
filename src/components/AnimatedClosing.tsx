import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Flame, HelpCircle } from 'lucide-react';

export default function AnimatedClosing() {
  return (
    <section className="relative py-28 px-4 bg-radial from-[#1A140F] via-[#100D09] to-[#0A0805] text-white text-center overflow-hidden">
      
      {/* Outer borders matching standard invitation arch envelope */}
      <div className="absolute inset-6 md:inset-10 border border-gold-600/10 rounded-[2.2rem] pointer-events-none" />
      
      {/* Dynamic Golden glow behind the main spiritual emblem */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-20 flex flex-col items-center">
        
        {/* 1. Sacred Jain Emblem Vector Illustration (Swastika & Ahimsa Hand) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-24 h-32 text-gold-400 mb-8 hover:text-gold-300 transition-colors duration-500 transform hover:scale-105 select-none"
        >
          <svg viewBox="0 0 100 130" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* 1. Swastika Pillar Top (Siddhasila Crescent & 3 dots representing Three Jewels) */}
            <path d="M35,15 Q50,22 65,15" />
            <circle cx="50" cy="8" r="2.5" fill="currentColor" />
            
            <circle cx="34" cy="23" r="2.2" fill="currentColor" />
            <circle cx="50" cy="23" r="2.2" fill="currentColor" />
            <circle cx="66" cy="23" r="2.2" fill="currentColor" />
            
            {/* 2. Swastika symbol centered and exact */}
            {/* Draw Swastika pathways cleanly */}
            <path d="M50,30 L50,46" />
            <path d="M42,38 L58,38" />
            <path d="M42,30 L50,30" />
            <path d="M50,46 L58,46" />
            <path d="M42,38 L42,46" />
            <path d="M58,30 L58,38" />

            {/* 3. Ahimsa Hand Frame */}
            {/* Outline of the hand shape pointing upward in meditation */}
            <path d="M28,88 
                     C28,102 34,115 50,115 
                     C66,115 72,102 72,88 
                     L72,72 C72,69 70,67 67,67 C64,67 63.5,69 63.5,72 
                     L63.5,64 C63.5,61.5 61.5,60 59,60 C56.5,60 55,61.5 55,64
                     L55,59 C55,56.5 53,55 50.5,55 C48,55 46.5,56.5 46.5,59
                     L46.5,68 
                     C46.5,65 44,64 41.5,64 C39,64 38,65 38,68
                     L38,82
                     C38,82 32,80 30,82 C28.5,83.5 28,85 28,88 Z" fill="currentColor" fillOpacity="0.08" />

            {/* 4. Dharma Wheel inside palm */}
            <circle cx="50" cy="94" r="11" />
            <circle cx="50" cy="94" r="8" strokeDasharray="2 2" />
            {/* Spokes representation */}
            <path d="M50,83 L50,105" />
            <path d="M39,94 L61,94" />
            <path d="M42,86 L58,102" />
            <path d="M42,102 L58,86" />
            {/* Ahimsa label centered in sans */}
            <text x="50" y="96.5" fontSize="6.5" fill="currentColor" textAnchor="middle" className="font-sans font-bold tracking-tighter" stroke="none">अहिंसा</text>
          </svg>
        </motion.div>

        {/* 2. Invitation quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif-display text-xl md:text-2xl text-gold-gradient-light mb-6 tracking-wide leading-relaxed font-semibold max-w-lg px-2"
        >
          "Excited to join you in celebrating this special occasion!"
        </motion.p>

        {/* Lotus & flourish separator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-[1.2px] bg-linear-to-r from-transparent to-gold-400/50" />
          <Heart className="w-4 h-4 text-gold-400 fill-gold-500/10 animate-pulse" />
          <div className="w-10 h-[1.2px] bg-linear-to-l from-transparent to-gold-400/50" />
        </div>

        {/* 3. Host signatures */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <span className="font-serif-luxury text-[10px] uppercase tracking-[0.4em] text-gold-400 block mb-3">
            With Respectful Pranams & Joy:
          </span>
          
          <h4 className="font-serif-display text-lg font-bold text-gold-100 tracking-wider mb-2">
            Jain Family (Gwalior)
          </h4>
          
          <p className="font-serif-luxury text-gold-100/50 text-xs italic max-w-sm leading-relaxed">
            Sri Pradeep Jain • Sri Anil Jain • Sri Rajesh Jain • Sri Dileep Jain <br />
            and all near & dear relatives.
          </p>
        </motion.div>

        {/* Copyright notice */}
        <p className="mt-16 font-mono text-[8.5px] text-gold-500/30 uppercase tracking-widest leading-none select-none">
          © 2026. Prince & Shreyal Ring Ceremony Digital Invitation.
        </p>

      </div>
    </section>
  );
}
