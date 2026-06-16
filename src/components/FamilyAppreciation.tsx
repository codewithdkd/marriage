import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Heart } from 'lucide-react';
import { FamilyMember } from '../types';

export default function FamilyAppreciation() {
  const familyMembers: FamilyMember[] = [
    { name: "Pradeep Jain", relation: "Elder Blessing & Host", phone: "+91 96912 27291" },
    { name: "Anil Jain", relation: "Elder Blessing & Host", phone: "+91 88714 22534" },
    { name: "Rajesh Jain", relation: "Coordinator & Host", phone: "+91 84374 10187" },
    { name: "Dileep Jain", relation: "Coordinator & Host", phone: "+91 93016 85151" }
  ];

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
            Family Honor & Elders
          </h2>
          <div className="w-24 h-[1px] bg-gold-500/30 mx-auto" />
          <p className="max-w-xl mx-auto font-serif-luxury text-gold-100/60 text-sm italic mt-4 leading-relaxed">
            "With deep respect, we celebrate the warmth and unconditional love of our parents and family elders. This sacred journey blossoms under their protective shade."
          </p>
        </div>

        {/* Part 1: Elders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    Available for support and local guidance in Gwalior.
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

      </div>
    </section>
  );
}
