import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Heart, ChevronDown } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

export default function WelcomeScreen() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

  useEffect(() => {
    // Target date: June 20, 2026 at 13:00:00 (1:00 PM)
    const targetDate = new Date('2026-06-20T13:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 py-8 overflow-hidden bg-radial from-[#1A140F] via-[#100D09] to-[#0A0805] text-white">
      
      {/* Structural Gold Arch Frames (Card Style) */}
      <div className="absolute inset-4 md:inset-8 border border-gold-600/20 rounded-[2.5rem] pointer-events-none z-10" />
      <div className="absolute inset-5 md:inset-9 border border-gold-400/10 rounded-[2.3rem] pointer-events-none z-10" />
      
      {/* Decorative Gold Corner Borders */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-gold-500/30 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-gold-500/30 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-gold-500/30 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-gold-500/30 rounded-br-xl pointer-events-none" />

      {/* 1. Divine Jain Greeting Element */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mt-6 z-20 flex flex-col items-center gap-1.5"
      >
        <div className="text-gold-300 font-serif-display text-sm md:text-base tracking-[0.25em] font-medium uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          श्री महावीराय नमः
        </div>
        
        {/* Lord Mahavir Devotional Line Icon */}
        <div className="w-16 h-18 mt-1 text-gold-400/80 hover:text-gold-300 transition-colors duration-500 transform hover:scale-105">
          <svg viewBox="0 0 100 110" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Meditative Buddha style Halo */}
            <circle cx="50" cy="40" r="16" strokeDasharray="3 3" />
            <circle cx="50" cy="40" r="12" />
            
            {/* Parasol (Triple Chhatra) */}
            <path d="M50,8 L50,22" />
            <path d="M38,15 Q50,8 62,15 Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M41,12 Q50,7 59,12 Z" />
            <path d="M44,9 Q50,6 56,9 Z" />
            
            {/* Meditative Sitting Figure (Lord Mahavir) */}
            {/* Head and Ears */}
            <circle cx="50" cy="30" r="5" fill="currentColor" fillOpacity="0.2" />
            <path d="M44,28 C43.5,30 44,32 44,32" />
            <path d="M56,28 C56.5,30 56,32 56,32" />
            
            {/* Torso & Shoulders in Lotus Pose */}
            <path d="M36,52 C38,45 42,39 50,39 C58,39 62,45 64,52" />
            <path d="M36,52 L64,52 C60,61 40,61 36,52 Z" fill="currentColor" fillOpacity="0.1" />
            {/* Bound hands in Dhyana Mudra */}
            <ellipse cx="50" cy="51" rx="6" ry="3" />
            
            {/* Traditional Pedestal with Lion (Simha) Emblem */}
            <rect x="34" y="60" width="32" height="12" rx="1" />
            <line x1="38" y1="66" x2="62" y2="66" />
            {/* Miniature Lion silhouette */}
            <path d="M48,64 C48,63 49,62 51,62 C53,62 53,64 51,64 Z" fill="currentColor" />
            <path d="M50,65 L52,65" />
          </svg>
        </div>
      </motion.div>

      {/* 2. Main Groom & Bride Monogram Shield and Names */}
      <div className="my-auto z-20 flex flex-col items-center">
        {/* Heart-Shaped Garland Monogram Plaque */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
          className="relative w-28 h-28 md:w-32 md:h-32 mb-6 flex items-center justify-center rounded-full bg-radial from-[#221B13] to-[#120E0A] border border-gold-500/20 shadow-[0_0_40px_rgba(193,147,46,0.15)]"
        >
          {/* Animated golden outer ring */}
          <div className="absolute inset-1 border border-dashed border-gold-300/40 rounded-full animate-spin" style={{ animationDuration: '40s' }} />
          
          <div className="text-center">
            <span className="font-serif-display text-3xl md:text-4xl font-bold bg-gradient-to-br from-gold-100 via-gold-300 to-gold-600 bg-clip-text text-transparent">
              PS
            </span>
            <div className="flex justify-center items-center gap-1 mt-1 text-gold-400">
              <Heart className="w-3 h-3 fill-gold-500/20 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Cinematic Announcement text */}
        <motion.p 
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-sans text-[11px] md:text-xs text-gold-300/80 uppercase tracking-[0.3em] font-medium mb-4"
        >
          Together with their families
        </motion.p>

        {/* Prince & Shreyal Typography Block */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 px-4">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 50 }}
            className="font-serif-display text-5xl md:text-7xl font-bold text-gold-gradient drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            Prince
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 font-serif-luxury text-xl font-light italic"
          >
            &
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, type: 'spring', stiffness: 50 }}
            className="font-serif-display text-5xl md:text-7xl font-bold text-gold-gradient drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            Shreyal
          </motion.h1>
        </div>

        {/* Engagement Announcement Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-6 px-6 py-2 border-y border-gold-500/20 backdrop-blur-xs"
        >
          <span className="font-serif-display text-base md:text-lg text-gold-100 tracking-[0.25em] font-light uppercase">
            Engagement Ceremony
          </span>
        </motion.div>

        {/* Countdown Timer Block (Precious Metallic Cards) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-10 z-20 flex flex-col items-center"
        >
          <p className="font-serif-luxury text-gold-200/50 text-xs italic tracking-widest mb-3">
            {!timeLeft.isOver ? 'Counting down to the sacred promise...' : 'The beautiful day is here'}
          </p>
          
          {!timeLeft.isOver ? (
            <div className="flex gap-2.5 md:gap-4">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Mins', val: timeLeft.minutes },
                { label: 'Secs', val: timeLeft.seconds }
              ].map((item, id) => (
                <div 
                  key={id}
                  className="flex flex-col items-center justify-center w-16 h-18 md:w-20 md:h-22 rounded-xl bg-[#1c1812]/80 border border-gold-500/20 shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-300"
                >
                  <span className="font-sans text-2xl md:text-3xl font-light text-gold-300 tracking-tight">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="font-serif-luxury text-[8px] md:text-[9px] uppercase tracking-widest text-gold-100/50 mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-8 py-3 rounded-xl bg-gold-900/20 border border-gold-500/30 text-gold-200 font-serif-display tracking-widest text-sm animate-pulse">
              🎉 HAPPENING LIVE TODAY
            </div>
          )}
        </motion.div>
      </div>

      {/* 3. Bottom Cards / Meta Location Details */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.5 }}
        className="w-full max-w-2xl z-20 flex flex-col md:flex-row justify-around items-center gap-4 border-t border-gold-500/20 pt-6 mt-10 text-gold-100/90 font-sans text-xs tracking-wider"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gold-400" />
          <span>Saturday, June 20, 2026</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-gold-400 rounded-full" />
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold-400" />
          <span>At 1:00 PM IST onwards</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-gold-400 rounded-full" />
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold-400" />
          <span>Hotel Sukh Sagar, Gwalior</span>
        </div>
      </motion.div>

      {/* 4. Elegant Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 2.4, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-6 z-20 flex flex-col items-center gap-1 cursor-pointer select-none"
        onClick={() => {
          document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="font-serif-luxury italic text-[10px] text-gold-400/70 tracking-widest uppercase">
          Scroll to view journey
        </span>
        <ChevronDown className="w-4 h-4 text-gold-400/80 animate-bounce" />
      </motion.div>

    </section>
  );
}
