import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Send, Award, ListFilter } from 'lucide-react';
import { GuestBlessing } from '../types';

export default function WishesMessages() {
  const [wishes, setWishes] = useState<GuestBlessing[]>([]);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [cardStyle, setCardStyle] = useState<'ivory' | 'gold' | 'emerald' | 'amber'>('gold');
  const [activeFilter, setActiveFilter] = useState<'all' | 'ivory' | 'gold' | 'emerald' | 'amber'>('all');

  const defaultWishes: GuestBlessing[] = [
    {
      id: "seeded-1",
      name: "Pradeep & Sunita Jain",
      message: "Sending our continuous blessings, dear Prince and Shreyal. May your exchange of rings bind you in deep spiritual values, endless laughter, and mutual laughter. Sri Mahaviraya Namah always protects your paths.",
      style: "ivory",
      createdAt: "06/15/2026"
    },
    {
      id: "seeded-2",
      name: "Dileep & Rekha Jain",
      message: "Pranams! Such a glorious chapter starting. We are immensely excited and waiting to celebrate this lovely union at Hotel Sukh Sagar, Gwalior. Best love to Prince and Shreyal!",
      style: "gold",
      createdAt: "06/16/2026"
    },
    {
      id: "seeded-3",
      name: "Ramesh Chandra (Grandpa)",
      message: "May the light of Dharma guide your steps. Two generous hearts, one gorgeous pathway. May your engagement shine like the rings you wear. My ultimate blessings.",
      style: "amber",
      createdAt: "06/16/2026"
    }
  ];

  useEffect(() => {
    const localData = localStorage.getItem('prince_shreyal_wishes');
    if (localData) {
      try {
        setWishes(JSON.parse(localData));
      } catch (e) {
        setWishes(defaultWishes);
      }
    } else {
      setWishes(defaultWishes);
      localStorage.setItem('prince_shreyal_wishes', JSON.stringify(defaultWishes));
    }
  }, []);

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    const newWish: GuestBlessing = {
      id: `wish-${Date.now()}`,
      name: guestName.trim(),
      message: guestMessage.trim(),
      style: cardStyle,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('prince_shreyal_wishes', JSON.stringify(updated));

    // Reset fields
    setGuestName('');
    setGuestMessage('');
  };

  const getStyleClasses = (style: string) => {
    switch (style) {
      case 'ivory':
        return 'bg-gradient-to-br from-[#FAFAF6] to-[#FAF8F5] border-gold-300/30 text-stone-900 shadow-xl';
      case 'gold':
        return 'bg-gradient-to-br from-[#F5E6CC] via-[#FAEDD6] to-[#E2CEAC] border-gold-400/40 text-stone-900 shadow-xl';
      case 'emerald':
        return 'bg-gradient-to-br from-[#102A1A] via-[#123321] to-[#0A1A10] border-emerald-500/20 text-[#FAFAF6] shadow-xl';
      case 'amber':
        return 'bg-gradient-to-br from-[#3b2f1c] via-[#2D2314] to-[#1C150A] border-amber-500/20 text-[#FBFAF6] shadow-xl';
      default:
        return 'bg-neutral-900 border-[#dec576]/30 text-white';
    }
  };

  const getTagStyleLabel = (style: string) => {
    switch (style) {
      case 'ivory': return 'Royal Ivory';
      case 'gold': return 'Champagne Gold';
      case 'emerald': return 'Imperial Emerald';
      case 'amber': return 'Antique Amber';
      default: return 'Custom';
    }
  };

  const filteredWishes = activeFilter === 'all' 
    ? wishes 
    : wishes.filter(w => w.style === activeFilter);

  return (
    <section id="wishes-wall" className="relative py-24 px-4 bg-gradient-to-b from-[#100D09] to-[#15110A] text-white overflow-hidden">
      
      {/* Decorative floral halos in backdrop */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-serif-luxury text-gold-400 text-xs tracking-[0.3em] uppercase block mb-3">
            Pure Joy
          </span>
          <h2 className="font-serif-display text-3xl md:text-5xl font-bold text-gold-gradient-light mb-4">
            Wishes & Blessings Scroll
          </h2>
          <div className="w-24 h-[1px] bg-gold-500/30 mx-auto" />
          <p className="max-w-md mx-auto font-serif-luxury text-gold-100/60 text-sm italic mt-4 leading-relaxed">
            Pour your warm wishes, blessings, or simple congratulations onto Prince & Shreyal's golden guestboard.
          </p>
        </div>

        {/* Form and Board Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Post Wish Column (4 Cols) */}
          <div className="lg:col-span-5 h-full">
            <div className="card-foil-dark rounded-2xl p-6 border-gold-glow sticky top-24">
              
              <div className="flex items-center gap-2 mb-4 border-b border-gold-500/10 pb-3">
                <Gift className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif-display text-lg font-bold text-gold-200">
                  Write Your Blessing
                </h3>
              </div>

              <form onSubmit={handlePostWish} className="flex flex-col gap-4 text-xs font-sans text-gold-100">
                {/* Guest Name input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wishes-name" className="font-serif-luxury uppercase tracking-wider text-[10px] text-gold-400">
                    Your Name or Family Designation
                  </label>
                  <input 
                    id="wishes-name"
                    type="text" 
                    placeholder="E.g., Dr. Ashok Jain, Gwalior"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full bg-[#0E0B08] border border-gold-400/20 rounded-xl px-4 py-3 text-gold-100 outline-none focus:border-gold-300 transition-colors"
                  />
                </div>

                {/* Blessing Message text */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wishes-msg" className="font-serif-luxury uppercase tracking-wider text-[10px] text-gold-400">
                    A Loving Message for the Couple
                  </label>
                  <textarea 
                    id="wishes-msg"
                    rows={4}
                    placeholder="Enter short poem, sacred blessing, or simple text congratulating Prince & Shreyal..."
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    required
                    className="w-full bg-[#0E0B08] border border-gold-400/20 rounded-xl px-4 py-3 text-gold-100 outline-none focus:border-gold-300 resize-none transition-colors"
                  />
                </div>

                {/* Theme Selection options */}
                <div className="flex flex-col gap-2">
                  <span className="font-serif-luxury uppercase tracking-wider text-[10px] text-gold-400">
                    Select Stationery Theme
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'ivory', name: 'Ivory', color: 'bg-[#FAFAF6] text-[#15110A]' },
                      { id: 'gold', name: 'Gold', color: 'bg-[#F2DEC0] text-[#15110A]' },
                      { id: 'emerald', name: 'Emerald', color: 'bg-[#123321] text-gold-300' },
                      { id: 'amber', name: 'Amber', color: 'bg-[#2D2314] text-gold-300' }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setCardStyle(theme.id as any)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-[9px] uppercase font-serif-luxury tracking-wide transition-all ${theme.color} ${cardStyle === theme.id ? 'border-gold-400 scale-105 shadow-md font-semibold' : 'border-transparent opacity-60'}`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!guestName.trim() || !guestMessage.trim()}
                  className="w-full py-3 bg-gold-gradient text-luxury-charcoal font-serif-display text-xs font-semibold uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all disabled:opacity-40 disabled:scale-100 mt-2 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Warm Wish
                </button>
              </form>

            </div>
          </div>

          {/* Cards feed Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Filtering Tools row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gold-500/10 pb-4 mb-2 gap-3">
              <span className="font-serif-luxury text-sm text-gold-200 uppercase tracking-widest">
                Scroll of Heartfelt Blessing Notes
              </span>
              
              <div className="flex items-center gap-2 text-xs">
                <ListFilter className="w-3.5 h-3.5 text-gold-400" />
                <select 
                  id="filter-style"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value as any)}
                  className="bg-[#0E0B08] border border-gold-400/20 rounded-lg px-2.5 py-1 text-gold-300 text-[11px] font-mono outline-none"
                >
                  <option value="all">Display All Card Themes</option>
                  <option value="ivory">Theme: Royal Ivory</option>
                  <option value="gold">Theme: Champagne Gold</option>
                  <option value="emerald">Theme: Imperial Emerald</option>
                  <option value="amber">Theme: Antique Amber</option>
                </select>
              </div>
            </div>

            {/* Scroll Area containing cards */}
            <div className="max-h-[500px] overflow-y-auto pr-2 grid grid-cols-1 gap-4 scroll-smooth">
              <AnimatePresence>
                {filteredWishes.length > 0 ? (
                  filteredWishes.map((item, id) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className={`p-6 rounded-2xl border ${getStyleClasses(item.style)} relative overflow-hidden`}
                    >
                      {/* Wax Stamp Seal ornament icon top corner */}
                      <div className="absolute right-3 top-3 w-8 h-8 rounded-full border border-gold-400/15 flex items-center justify-center text-[10px] bg-gold-400/5 text-gold-400/20">
                        <Heart className="w-4 h-4 fill-current opacity-25" />
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <span className="font-serif-display text-sm font-bold tracking-wide">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest bg-black/5 px-2 py-0.5 rounded-full select-none text-current/60">
                          {getTagStyleLabel(item.style)}
                        </span>
                      </div>

                      <p className="font-serif-luxury text-sm italic leading-relaxed text-current/90 break-words mb-4">
                        "{item.message}"
                      </p>

                      <div className="flex justify-between items-center border-t border-current/10 pt-3">
                        <span className="font-mono text-[9.5px] uppercase tracking-wide text-current/50 flex items-center gap-1">
                          <Award className="w-3 h-3 text-gold-500" />
                          Blessed Couple Companion
                        </span>
                        <span className="font-mono text-[9.5px] text-current/50 select-none">
                          {item.createdAt}
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 border border-dashed border-gold-500/20 rounded-2xl"
                  >
                    <p className="font-serif-luxury text-sm text-gold-300 italic tracking-wider">
                      No blessings found matching this card layout. Be the first to post!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
