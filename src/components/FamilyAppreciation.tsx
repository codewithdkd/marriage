import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Users, MessageSquare, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FamilyMember } from '../types';

export default function FamilyAppreciation() {
  const familyMembers: FamilyMember[] = [
    { name: "Pradeep Jain", relation: "Elder Blessing & Host", phone: "+91 96912 27291" },
    { name: "Anil Jain", relation: "Elder Blessing & Host", phone: "+91 88714 22534" },
    { name: "Rajesh Jain", relation: "RSVP Coordinator", phone: "+91 84374 10187" },
    { name: "Dileep Jain", relation: "RSVP Coordinator", phone: "+91 93016 85151" }
  ];

  // React State for guests planning to attend
  const [guestName, setGuestName] = useState('');
  const [totalGuests, setTotalGuests] = useState(1);
  const [isGoing, setIsGoing] = useState<boolean | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [existingRSVPs, setExistingRSVPs] = useState<any[]>([]);

  // Load registered RSVPs to show a counter
  useEffect(() => {
    const rawData = localStorage.getItem('prince_shreyal_rsvps');
    if (rawData) {
      try {
        setExistingRSVPs(JSON.parse(rawData));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || isGoing === null) return;

    const newRSVP = {
      name: guestName.trim(),
      count: totalGuests,
      going: isGoing,
      date: new Date().toLocaleDateString()
    };

    const updated = [...existingRSVPs, newRSVP];
    localStorage.setItem('prince_shreyal_rsvps', JSON.stringify(updated));
    setExistingRSVPs(updated);
    setFormSubmitted(true);
  };

  const totalAttendeesCounter = existingRSVPs.reduce((sum, item) => item.going ? sum + Number(item.count) : sum, 0);

  return (
    <section id="rsvp-family" className="relative py-24 px-4 bg-gradient-to-b from-[#15110A] to-[#100D09] text-white overflow-hidden">
      
      {/* Golden structural radial elements */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-gold-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-gold-400/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-serif-luxury text-gold-400 text-xs tracking-[0.3em] uppercase block mb-3">
            Pure Gratitude
          </span>
          <h2 className="font-serif-display text-3xl md:text-5xl font-bold text-gold-gradient-light mb-4">
            Family Honor & RSVPs
          </h2>
          <div className="w-24 h-[1px] bg-gold-500/30 mx-auto" />
          <p className="max-w-xl mx-auto font-serif-luxury text-gold-100/60 text-sm italic mt-4 leading-relaxed">
            "With deep respect, we celebrate the warmth and unconditional love of our parents and family elders. This sacred journey blossoms under their protective shade."
          </p>
        </div>

        {/* Part 1: Elders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {familyMembers.map((member, idx) => {
            const cleanPhone = member.phone.replace(/\s+/g, '');
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative card-foil-dark rounded-2xl p-6 border-gold-glow flex flex-col justify-between hover:bg-[#1C1812] transition-all duration-300 group"
              >
                <div>
                  {/* Subtle lotus flower graphic top corner */}
                  <div className="absolute top-4 right-4 w-6 h-6 text-gold-600/20 group-hover:text-gold-400/20 transition-colors">
                    <Heart className="w-full h-full fill-current" />
                  </div>

                  <span className="font-mono text-[8px] text-gold-500 uppercase tracking-widest block mb-1">
                    {member.relation}
                  </span>
                  <h4 className="font-serif-display text-lg font-bold text-gold-200 mb-2">
                    {member.name}
                  </h4>
                  <p className="font-sans text-[11px] text-gold-100/50 mb-6 font-light">
                    Available for RSVP support and local guidance in Gwalior.
                  </p>
                </div>

                {/* Dial trigger action panel */}
                <div className="flex flex-col gap-2 border-t border-gold-500/10 pt-4 mt-auto">
                  <span className="font-mono text-xs text-gold-300 font-semibold tracking-wider">
                    {member.phone}
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <a 
                      href={`tel:${cleanPhone}`}
                      className="flex items-center justify-center gap-1.5 py-1.5 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/20 rounded-lg text-[10px] uppercase font-serif-display text-gold-200 tracking-wider transition-all"
                    >
                      <Phone className="w-3 h-3 text-gold-400" />
                      Inquire
                    </a>

                    <a 
                      href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Pranams%20and%20Jai%20Jinendra!%20Representing%20the%20engagement%20ceremony%20of%20Prince%20and%20Shreyal...`}
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-lg text-[10px] uppercase font-serif-display text-green-400 tracking-wider transition-all"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Chat
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Part 2: Digital RSVP Registry block */}
        <div className="relative card-foil-dark rounded-3xl p-8 max-w-2xl mx-auto border border-gold-400/20 shadow-2xl relative">
          <div className="absolute inset-0 bg-radial from-gold-500/5 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gold-500/15 pb-6 mb-6 gap-3">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-gold-200 tracking-wide">
                Virtual RSVP Registry
              </h3>
              <p className="font-serif-luxury text-xs text-gold-100/60 italic mt-0.5">
                Kindly provide your confirmation counts to accommodate logistics.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gold-400/10 border border-gold-500/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase text-gold-300">
              <Users className="w-3.5 h-3.5" />
              <span>{totalAttendeesCounter} Confirmed Guests</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleRSVPSubmit}
                className="flex flex-col gap-4 text-xs font-sans text-gold-100/90"
              >
                
                {/* Guest Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="guest-name" className="font-serif-luxury uppercase tracking-wider text-[10px] text-gold-400">
                    Your Full Name
                  </label>
                  <input 
                    id="guest-name"
                    type="text" 
                    placeholder="Enter your name (e.g., Mahavir Prasad Jain)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full bg-[#0E0B08] border border-gold-400/20 rounded-xl px-4 py-3 text-gold-100 outline-none focus:border-gold-300 hover:border-gold-500/40 transition-colors"
                  />
                </div>

                {/* Grid for Count & Choice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Attendance Count */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="total-guests" className="font-serif-luxury uppercase tracking-wider text-[10px] text-gold-400">
                      Total Attendees (Including Family)
                    </label>
                    <select 
                      id="total-guests"
                      value={totalGuests}
                      onChange={(e) => setTotalGuests(Number(e.target.value))}
                      className="w-full bg-[#0E0B08] border border-gold-400/20 rounded-xl px-4 py-3 text-gold-100 outline-none focus:border-gold-300 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num} className="bg-luxury-charcoal text-white">
                          {num} {num === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Attendance choice Buttons */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-serif-luxury uppercase tracking-wider text-[10px] text-gold-400">
                      Will you attend our joy?
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-px">
                      <button
                        type="button"
                        onClick={() => setIsGoing(true)}
                        className={`py-3 rounded-xl border text-[11px] font-serif-display uppercase tracking-widest transition-all ${isGoing === true ? 'bg-gold-gradient text-luxury-charcoal font-semibold border-gold-400 shadow-[0_2px_10px_rgba(193,147,46,0.3)]' : 'bg-[#0E0B08] border-gold-400/20 text-gold-400 hover:border-gold-500/40'}`}
                      >
                        Joyfully Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsGoing(false)}
                        className={`py-3 rounded-xl border text-[11px] font-serif-display uppercase tracking-widest transition-all ${isGoing === false ? 'bg-red-500/20 border-red-500 text-red-200' : 'bg-[#0E0B08] border-gold-400/20 text-gold-400 hover:border-gold-500/40'}`}
                      >
                        regretfully No
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!guestName.trim() || isGoing === null}
                  className="w-full py-3.5 mt-4 bg-gold-gradient text-luxury-charcoal font-serif-display text-xs font-semibold uppercase tracking-widest rounded-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-40 disabled:scale-100 cursor-pointer"
                >
                  Submit RSVP Registration
                </button>

              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display text-xl font-bold text-gold-200">
                  RSVP Registered Successfully!
                </h4>
                <p className="font-serif-luxury text-sm text-gold-100/70 max-w-md italic leading-relaxed">
                  "Jai Jinendra. Your warm blessing means everything to Prince, Shreyal, and the entire Jain family. We look forward to meeting you at the grand Hotel Sukh Sagar."
                </p>
                <button 
                  onClick={() => {
                    setGuestName('');
                    setIsGoing(null);
                    setFormSubmitted(false);
                  }}
                  className="mt-4 px-5 py-2 border border-gold-500/30 hover:bg-gold-500/5 text-gold-300 rounded-lg text-[10px] font-serif-display uppercase tracking-widest transition-all"
                >
                  Register Another Guest
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
