import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Sparkles, Utensils, Music, Heart, Map } from 'lucide-react';

export default function AnniversaryHighlights() {
  const events = [
    {
      time: "1:00 PM",
      title: "Welcome Mocktails & Chimes",
      desc: "Step through the golden arches into an ambient field of soft instrumental music and refreshing wellness elixirs (Sudarshan & Champagne mocktails).",
      icon: Sparkles
    },
    {
      time: "1:30 PM",
      title: "Sacred Tilak & Mandap Greet",
      desc: "The traditional ceremony starts with full devotion. A welcoming scent of sandalwood, roses, and chanting of divine Mahavir blessings.",
      icon: Heart
    },
    {
      time: "2:15 PM",
      title: "The Golden Ring Exchange",
      desc: "Watch Prince and Shreyal lock their destinies with the sacred couple bands under a rainfall of golden floral petals.",
      icon: Sparkles
    },
    {
      time: "3:00 PM",
      title: "The Royal Imperial Feast",
      desc: "A luxurious gourmet feast featuring exquisite traditional Jain cuisine crafted to perfection under high culinary standards.",
      icon: Utensils
    },
    {
      time: "4:30 PM",
      title: "Toasts, Melodies & Farewells",
      desc: "Celebratory chimes, relative blessings, family video timelines, and a final magical photo-session frame to capture the Gwalior sun.",
      icon: Music
    }
  ];

  return (
    <section id="highlights-venue" className="relative py-24 px-4 bg-gradient-to-b from-[#100D09] to-[#15110A] text-white overflow-hidden">
      
      {/* Visual glowing elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-serif-luxury text-gold-400 text-xs tracking-[0.3em] uppercase block mb-3">
            Royal Schedule
          </span>
          <h2 className="font-serif-display text-3xl md:text-5xl font-bold text-gold-gradient-light mb-4">
            Celebration Highlights
          </h2>
          <div className="w-24 h-[1px] bg-gold-500/30 mx-auto" />
          <p className="max-w-md mx-auto font-serif-luxury text-gold-100/60 text-sm italic mt-4">
            Join us through each beautiful chapter of this blissful family day.
          </p>
        </div>

        {/* Two-Column Layout (Left: Itinerary, Right: Grand Venue Plaque) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Itinerary Column (7 Cols on large screen) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-serif-display text-lg text-gold-200 tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              Ceremony Itinerary
            </h3>

            <div className="relative border-l border-gold-500/20 pl-6 ml-3 flex flex-col gap-8">
              {events.map((evt, idx) => {
                const Icon = evt.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    {/* Ring dot in timeline */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#100D09] border-2 border-gold-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-300" />
                    </div>

                    <div className="card-foil-dark p-5 rounded-xl border-gold-glow transition-all duration-300 group-hover:bg-[#1E1911]/50">
                      <span className="font-sans font-semibold text-xs text-gold-300 bg-gold-500/10 px-2.5 py-0.5 rounded-full tracking-wider">
                        {evt.time}
                      </span>
                      <h4 className="font-serif-display text-md font-bold text-gold-100 mt-2 mb-1 group-hover:text-gold-200 transition-colors">
                        {evt.title}
                      </h4>
                      <p className="font-serif-luxury text-xs text-gold-100/60 leading-relaxed">
                        {evt.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Venue Column (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 card-foil rounded-3xl p-8 border border-gold-500/30 text-luxury-charcoal shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-gold-50/20 to-transparent pointer-events-none" />

              <span className="font-serif-luxury text-[9px] text-gold-800 uppercase tracking-widest block mb-1">
                Imperial Heritage Venue
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-gold-900 mb-6 tracking-wide drop-shadow-xs">
                Hotel Sukh Sagar, Gwalior
              </h3>

              <div className="w-full h-44 rounded-xl bg-[#0f0c08] border border-gold-400/20 relative overflow-hidden mb-6 flex flex-col justify-center items-center text-center px-4">
                {/* Decorative Map Grid Art */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12)_1px,transparent_1.5px)] bg-[size:10px_10px]" />
                
                {/* Compass Circle */}
                <div className="absolute w-28 h-28 rounded-full border border-gold-400/10 animate-spin" style={{ animationDuration: '60s' }} />
                
                {/* Visual Location Pins representing nearby Landmarks (Gwalior Fort & Station) */}
                <div className="absolute top-8 left-12 flex flex-col items-center">
                  <span className="font-mono text-[8px] text-gold-100/40 tracking-tighter uppercase">Station</span>
                  <div className="w-1 h-1 bg-gold-400/40 rounded-full" />
                </div>
                <div className="absolute top-10 right-14 flex flex-col items-center">
                  <span className="font-mono text-[8px] text-gold-100/40 tracking-tighter uppercase">Gwalior Fort</span>
                  <div className="w-2 h-2 border border-gold-400/30 rounded-full" />
                </div>

                {/* Main pin */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <MapPin className="w-10 h-10 text-gold-400 drop-shadow-[0_4px_8px_rgba(197,160,89,1))]" />
                  <div className="w-4 h-1.5 bg-black/40 rounded-full filter blur-[1px] mt-1" />
                </motion.div>

                <span className="absolute bottom-3 font-mono text-[9px] text-gold-300/60 uppercase tracking-widest">
                  Location Verified in Gwalior
                </span>
              </div>

              {/* Exact Address card detailing */}
              <div className="flex flex-col gap-4 text-xs font-serif-luxury text-gold-950">
                <div className="flex gap-2 items-start border-b border-gold-600/10 pb-3">
                  <Map className="w-5 h-5 text-gold-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-gold-900">Address Location</span>
                    <span className="text-gold-800/80">Opposite Univ Main Gate, Jhansi Road, Gwalior, Madhya Pradesh, India.</span>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Calendar className="w-5 h-5 text-gold-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-gold-900">Arrival Timings</span>
                    <span className="text-gold-800/80">Guests are advised to assemble by 1:00 PM to catch full divine ceremonies.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons to open real systems */}
              <div className="mt-8">
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

      </div>
    </section>
  );
}
