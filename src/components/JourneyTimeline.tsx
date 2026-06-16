import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Star, Heart, Flame, Milestone } from 'lucide-react';
import { TimelineEvent } from '../types';

export default function JourneyTimeline() {
  const milestones: TimelineEvent[] = [
    {
      year: "2025",
      title: "Shared Dreams & Fortresses",
      description: "From cozy talks in historical Gwalior lands to sharing deep personal visions, they realized that they spoke the exact same language of love, respect, and spiritual devotion under the Mahavir blessings.",
      icon: "compass",
      illustrationType: "stars"
    },
    {
      year: "Early 2026",
      title: "The Unified Blessings",
      description: "The two Jain families connected, merging values, laughter, and spiritual prayers in absolute agreement. The elders poured out their massive ancestral blessings, laying down the foundation for an eternal sacred bond.",
      icon: "heart",
      illustrationType: "heart"
    },
    {
      year: "June 20, 2026",
      title: "A Promise Made, A Journey Begun",
      description: "At the grand Hotel Sukh Sagar in Gwalior at 1:00 PM, their hands will unite. Witnessed by standard Jain rituals and loved ones, Prince and Shreyal transition from two individual lines into a singular, eternal loop.",
      icon: "blossom",
      illustrationType: "blossom"
    }
  ];

  const renderIllustration = (type: string) => {
    switch (type) {
      case 'sparkle':
        return (
          <div className="relative w-full h-32 rounded-xl bg-gold-900/10 border border-gold-500/20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-radial from-gold-500/5 to-transparent animate-pulse" />
            <Sparkles className="w-12 h-12 text-gold-300 sparkle-glow" />
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-gold-300/30 uppercase tracking-widest">Alignment Vector #1</span>
          </div>
        );
      case 'stars':
        return (
          <div className="relative w-full h-32 rounded-xl bg-gold-900/10 border border-gold-500/20 flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-gold-100 rounded-full animate-ping" />
            <div className="absolute bottom-6 right-8 w-1 h-1 bg-gold-300 rounded-full animate-bounce" />
            <Compass className="w-12 h-12 text-gold-300 transform hover:rotate-45 transition-transform duration-700" />
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-gold-300/30 uppercase tracking-widest">Guidance Vector #2</span>
          </div>
        );
      case 'heart':
        return (
          <div className="relative w-full h-32 rounded-xl bg-gold-900/10 border border-gold-500/20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-gold-900/5 to-transparent" />
            <Heart className="w-12 h-12 text-gold-300 animate-pulse fill-gold-500/10" />
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-gold-300/30 uppercase tracking-widest">Devotion Vector #3</span>
          </div>
        );
      case 'blossom':
        return (
          <div className="relative w-full h-32 rounded-xl bg-gold-950/20 border border-gold-500/20 flex items-center justify-center overflow-hidden">
            {/* Spinning decorative gold gears / floral arcs */}
            <svg viewBox="0 0 100 100" className="absolute w-24 h-24 text-gold-600/20 animate-spin" style={{ animationDuration: '24s' }}>
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" fill="none" />
            </svg>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full border border-gold-400 bg-gold-400/10 flex items-center justify-center text-[10px] text-gold-300">💍</div>
              <div className="w-5 h-5 rounded-full border border-gold-400 bg-gold-400/10 flex items-center justify-center text-[10px] text-gold-300">💍</div>
            </div>
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-gold-300/30 uppercase tracking-widest">Destiny Vector #4</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="timeline-section" 
      className="relative py-24 px-4 bg-gradient-to-b from-[#100D09] to-[#15110A] text-white overflow-hidden"
    >
      {/* Background radial spotlights to add elegant luster */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gold-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-serif-luxury text-gold-400 text-xs tracking-[0.3em] uppercase block mb-3">
            Pure Connection
          </span>
          <h2 className="font-serif-display text-3xl md:text-5xl font-bold text-gold-gradient-light mb-4">
            Our Journey of Hearts
          </h2>
          <div className="w-24 h-[1px] bg-gold-500/30 mx-auto" />
          <p className="max-w-lg mx-auto font-serif-luxury text-gold-100/70 text-sm italic mt-4">
            "A promise made, a journey begun, and a future filled with love."
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative">
          {/* Vertical gold center bar */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-gold-500/20 via-gold-400/40 to-gold-500/10 hidden md:block" />

          {/* Timeline Cards container */}
          <div className="flex flex-col gap-12 md:gap-16">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Left/Right Card Spacer for vertical desktop layouts */}
                  <div className="w-full md:w-1/2 md:px-10 flex justify-center">
                    <div className="relative w-full max-w-sm card-foil-dark rounded-2xl p-6 border-gold-glow group hover:bg-[#1E1911]/80 transition-all duration-500">
                      
                      {/* Interactive hover glowing dot */}
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold-500/40 group-hover:bg-gold-300 animate-pulse transition-colors" />

                      {/* Year badge */}
                      <span className="inline-block font-sans font-semibold text-xs tracking-widest text-gold-300 border border-gold-500/30 px-3 py-1 rounded-full mb-3 uppercase bg-gold-500/5">
                        {item.year}
                      </span>

                      {/* Title */}
                      <h3 className="font-serif-display text-xl font-bold text-gold-100 mb-2 group-hover:text-gold-200 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-serif-luxury text-sm text-gold-100/60 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Line art illustration representation */}
                      {renderIllustration(item.illustrationType)}
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="relative my-4 md:my-0 flex items-center justify-center z-30">
                    <div className="w-10 h-10 rounded-full bg-[#1c1812] border-2 border-gold-400 flex items-center justify-center shadow-[0_0_15px_rgba(193,147,46,0.3)] text-gold-300 bg-linear-to-tr from-gold-950 to-[#100D09]">
                      {item.icon === 'sparkle' && <Sparkles className="w-4 h-4 animate-pulse" />}
                      {item.icon === 'compass' && <Compass className="w-4 h-4" />}
                      {item.icon === 'heart' && <Heart className="w-4 h-4 fill-gold-500/20" />}
                      {item.icon === 'blossom' && <Milestone className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '30s' }} />}
                    </div>
                  </div>

                  {/* Empty space block for side alignment balance */}
                  <div className="hidden md:block w-1/2 md:px-10" />

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
