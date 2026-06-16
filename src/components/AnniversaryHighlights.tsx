import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Sparkles, Heart, Map } from 'lucide-react';

export default function AnniversaryHighlights() {
  return (
    <section id="highlights-venue" className="relative py-24 px-4 bg-gradient-to-b from-[#100D09] to-[#15110A] text-white overflow-hidden">
      
      {/* Visual glowing elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold-400/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-serif-luxury text-gold-400 text-xs tracking-[0.3em] uppercase block mb-3">
            Royal Venue
          </span>
          <h2 className="font-serif-display text-3xl md:text-5xl font-bold text-gold-gradient-light mb-4">
            Celebration Venue
          </h2>
          <div className="w-24 h-[1px] bg-gold-500/30 mx-auto" />
          <p className="max-w-md mx-auto font-serif-luxury text-gold-100/60 text-sm italic mt-4">
            Join us to celebrate this beautiful chapter of our blissful family day.
          </p>
        </div>

        {/* Centered Grand Venue Plaque */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="card-foil rounded-3xl p-8 border border-gold-500/30 text-luxury-charcoal shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-gold-50/20 to-transparent pointer-events-none" />

            <span className="font-serif-luxury text-[9px] text-gold-800 uppercase tracking-widest block mb-1 text-center">
              Imperial Heritage Venue
            </span>
            <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-gold-900 mb-6 tracking-wide drop-shadow-xs text-center">
              Hotel Sukh Sagar, Gwalior
            </h3>

            <div className="w-full h-52 rounded-xl bg-[#0f0c08] border border-gold-400/20 relative overflow-hidden mb-6 flex flex-col justify-center items-center text-center px-4">
              {/* Decorative Map Grid Art */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12)_1px,transparent_1.5px)] bg-[size:10px_10px]" />
              
              {/* Compass Circle */}
              <div className="absolute w-36 h-36 rounded-full border border-gold-400/10 animate-spin" style={{ animationDuration: '60s' }} />
              
              {/* Visual Location Pins representing nearby Landmarks (Gwalior Fort & Station) */}
              <div className="absolute top-8 left-16 flex flex-col items-center">
                <span className="font-mono text-[8px] text-gold-100/40 tracking-tighter uppercase">Station</span>
                <div className="w-1 h-1 bg-gold-400/40 rounded-full" />
              </div>
              <div className="absolute top-12 right-20 flex flex-col items-center">
                <span className="font-mono text-[8px] text-gold-100/40 tracking-tighter uppercase">Gwalior Fort</span>
                <div className="w-2 h-2 border border-gold-400/30 rounded-full" />
              </div>

              {/* Main pin */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="relative z-10 flex flex-col items-center"
              >
                <MapPin className="w-12 h-12 text-gold-400 drop-shadow-[0_4px_8px_rgba(197,160,89,1)]" />
                <div className="w-5 h-1.5 bg-black/40 rounded-full filter blur-[1px] mt-1" />
              </motion.div>

              <span className="absolute bottom-3 font-mono text-[9px] text-gold-300/60 uppercase tracking-widest">
                Location Verified in Gwalior
              </span>
            </div>

            {/* Exact Address card detailing */}
            <div className="flex flex-col gap-4 text-xs font-serif-luxury text-gold-950 max-w-lg mx-auto">
              <div className="flex gap-3 items-start border-b border-gold-600/10 pb-3">
                <Map className="w-5 h-5 text-gold-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-gold-900">Address Location</span>
                  <span className="text-gold-800/80">Opposite Univ Main Gate, Jhansi Road, Gwalior, Madhya Pradesh, India.</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Calendar className="w-5 h-5 text-gold-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-gold-900">Arrival Timings</span>
                  <span className="text-gold-800/80">Guests are advised to assemble by 1:00 PM to catch full divine ceremonies on June 20, 2026.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons to open real systems */}
            <div className="mt-8 max-w-sm mx-auto">
              <a 
                href="https://maps.google.com/?q=Hotel+Sukh+Sagar+Gwalior" 
                target="_blank" 
                rel="noreferrer"
                className="block w-full text-center py-3 bg-gold-900 text-gold-100 font-serif-display text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-gold-800 transition-all shadow-[0_5px_15px_rgba(88,60,17,0.3)] hover:scale-[1.02] active:scale-95"
              >
                Get GPS Navigation Directions
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
