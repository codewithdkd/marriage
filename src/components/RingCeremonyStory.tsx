import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RingCeremonyStory() {
  const [slideValue, setSlideValue] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [autoCompleteDelay, setAutoCompleteDelay] = useState<any>(null);

  useEffect(() => {
    if (slideValue >= 95 && !isLocked) {
      setIsLocked(true);
      triggerCelebrationConfetti();
    }
  }, [slideValue, isLocked]);

  const triggerCelebrationConfetti = () => {
    // Launch gold, silver, and champagne sparkle clouds!
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const colors = ['#f5eacf', '#dec576', '#c1932e', '#8c641b', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleReset = () => {
    setSlideValue(0);
    setIsLocked(false);
  };

  const forceLock = () => {
    setSlideValue(100);
    setIsLocked(true);
    triggerCelebrationConfetti();
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-[#15110A] to-[#100D09] text-white overflow-hidden">
      
      {/* Decorative luxury floral pattern shadows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-400/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-20 text-center">
        
        {/* Header section */}
        <div className="mb-12">
          <span className="font-serif-luxury text-gold-400 text-xs tracking-[0.3em] uppercase block mb-3 animate-pulse">
            Sacred Monogram
          </span>
          <h2 className="font-serif-display text-3xl md:text-5xl font-bold text-gold-gradient mb-4">
            The Ring Ceremony Story
          </h2>
          <div className="w-24 h-[1px] bg-gold-500/30 mx-auto" />
          <p className="max-w-xl mx-auto font-serif-luxury text-gold-200/60 text-sm italic mt-4 leading-relaxed">
            "A ring is a circle of love with no beginning and no end. To exchange them is to cross a spiritual bridge where two notes form a celestial chord."
          </p>
        </div>

        {/* Ring Interactive stage box */}
        <div className="relative w-full max-w-xl mx-auto rounded-3xl bg-[#1c1812]/75 border border-gold-400/20 p-8 shadow-[0_15px_45px_rgba(0,0,0,0.6)] backdrop-blur-md">
          
          <div className="flex justify-between items-center mb-6">
            <span className="font-serif-luxury text-[10px] text-gold-400 uppercase tracking-widest">
              Gwalior Palace Rituals
            </span>
            <span className="font-mono text-[9px] text-gold-400/40 uppercase tracking-widest bg-gold-500/10 px-2.5 py-0.5 rounded-full">
              State: {isLocked ? 'Bound' : 'Separated'}
            </span>
          </div>

          {/* Interactive Interactive Screen Canvas */}
          <div className="relative h-64 md:h-72 w-full rounded-2xl bg-[#0e0b08] border border-gold-500/10 flex items-center justify-center overflow-hidden">
            
            {/* Background grid matrix for high-tech premium feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(193,147,46,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(193,147,46,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Ambient gold glow in center */}
            <div className={`absolute w-36 h-36 rounded-full filter blur-[40px] transition-all duration-1000 ${isLocked ? 'bg-gold-500/25 scale-125 shadow-[0_0_50px_rgba(193,147,46,0.4)]' : 'bg-gold-500/5'}`} />

            {/* Simulated interactive items */}
            <div className="relative flex items-center justify-center w-full h-full">

              <AnimatePresence>
                {isLocked && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-10 text-center pointer-events-none"
                  >
                    <div className="sparkle-glow flex flex-col items-center select-none">
                      <Sparkles className="w-10 h-10 text-gold-300 mb-1" />
                      <span className="font-serif-display text-[15px] font-bold text-gold-200 tracking-[0.2em] uppercase">
                        Bound in Love
                      </span>
                      <span className="font-serif-luxury text-[11px] text-gold-100/50 mt-1 italic">
                        June 20, 2026
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* GROOM'S RING (Left Ring) */}
              <motion.div 
                style={{
                  // Moves to center based on slideValue
                  x: isLocked ? -35 : -140 + (slideValue * 1.05),
                  rotate: slideValue * 0.9,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className={`absolute z-20 w-36 h-36 pointer-events-none flex items-center justify-center`}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-gold-400 drop-shadow-[0_2px_15px_rgba(193,147,46,0.4)]">
                  {/* Outer Thick Band */}
                  <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="6" fill="none" />
                  <circle cx="50" cy="50" r="29" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
                  
                  {/* Groom ring heavy diamond on top */}
                  <polygon points="50,11 40,24 60,24" fill="#E2E8F0" stroke="currentColor" strokeWidth="1" />
                  {/* Diamond facet lines */}
                  <polyline points="40,24 50,18 60,24" fill="none" stroke="#fff" strokeWidth="1" />
                  <line x1="50" y1="11" x2="50" y2="24" stroke="#fff" strokeWidth="1" />
                  <circle cx="50" cy="11" r="2" fill="#fff" className="animate-ping" />
                  
                  {/* Inner gold engravings */}
                  <text x="50" y="52" fontSize="5" fill="currentColor" textAnchor="middle" className="font-serif-display font-medium tracking-tight">PRINCE</text>
                </svg>
              </motion.div>

              {/* BRIDE'S RING (Right Ring) */}
              <motion.div 
                style={{
                  // Moves to center based on slideValue
                  x: isLocked ? 35 : 140 - (slideValue * 1.05),
                  rotate: -slideValue * 0.9,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="absolute z-10 w-36 h-36 pointer-events-none flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-gold-300 drop-shadow-[0_2px_15px_rgba(234,218,162,0.3)]">
                  {/* Delicate Ring Band */}
                  <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="4.5" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke="#fff" strokeWidth="1" strokeOpacity="0.3" fill="none" />
                  
                  {/* Crown diamond settings (Multi gems representing traditional luxury) */}
                  <circle cx="50" cy="18" r="4.5" fill="#fff" stroke="currentColor" strokeWidth="1" />
                  <circle cx="43" cy="20" r="3" fill="#E2E8F0" stroke="currentColor" strokeWidth="1" />
                  <circle cx="57" cy="20" r="3" fill="#E2E8F0" stroke="currentColor" strokeWidth="1" />

                  {/* Inner gold engravings */}
                  <text x="50" y="52" fontSize="5" fill="currentColor" textAnchor="middle" className="font-serif-display font-medium tracking-tight">SHREYAL</text>
                </svg>
              </motion.div>

            </div>

          </div>

          {/* Interactive controls */}
          <div className="mt-8">
            {!isLocked ? (
              <div>
                <p className="font-serif-luxury text-xs text-gold-200/70 italic tracking-wider mb-3">
                  Slide or drag to join Prince and Shreyal's rings
                </p>

                {/* Custom range slider representing luxury gold bracket */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-serif-luxury text-gold-400">Prince</span>
                  
                  <div className="relative flex-1 flex items-center">
                    <input 
                      id="ring-slider"
                      type="range"
                      min="0"
                      max="100"
                      value={slideValue}
                      onChange={(e) => setSlideValue(Number(e.target.value))}
                      className="w-full h-1 bg-gold-900 border-none rounded-lg appearance-none cursor-ew-resize accent-gold-400"
                    />
                    <div 
                      className="absolute h-1 bg-gold-400 rounded-lg pointer-events-none"
                      style={{ width: `${slideValue}%` }}
                    />
                  </div>
                  
                  <span className="text-xs font-serif-luxury text-gold-300">Shreyal</span>
                </div>

                <button 
                  onClick={forceLock}
                  className="mt-5 w-full py-2.5 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 rounded-xl text-xs font-serif-display uppercase tracking-widest text-gold-200 transition-all active:scale-95"
                >
                  Quick Exchange Rings
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="font-serif-luxury text-sm text-gold-100 mb-4 tracking-normal font-light">
                  ✨ "A promise made, a journey begun, and a future filled with love."
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={triggerCelebrationConfetti}
                    className="px-6 py-2.5 bg-gold-gradient text-luxury-charcoal font-serif-display text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_15px_rgba(193,147,46,0.3)] hover:scale-105"
                  >
                    Shower Sparkles Again
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-4 py-2.5 bg-transparent border border-gold-500/30 hover:bg-gold-500/5 text-gold-300 font-serif-display text-xs uppercase tracking-widest rounded-xl transition-all"
                  >
                    Reset Link
                  </button>
                </div>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
