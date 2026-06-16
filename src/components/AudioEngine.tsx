import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export default function AudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const feedbackNodeRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerIdsRef = useRef<number[]>([]);
  const isPlayingRef = useRef(false);

  // Elegant penthouse note matrix (Pentatonic / Raga Bhupali Scale for luxurious ambient mood)
  const NOTES = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  useEffect(() => {
    // Keep playing ref in sync for the interval loops
    isPlayingRef.current = isPlaying;
    
    if (isPlaying) {
      startSynthesizer();
    } else {
      stopSynthesizer();
    }

    return () => {
      // Clear timers on unmount
      cleanupTimers();
    };
  }, [isPlaying]);

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const cleanupTimers = () => {
    timerIdsRef.current.forEach(id => window.clearTimeout(id));
    timerIdsRef.current = [];
  };

  const startSynthesizer = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Deep space ambient effects block
        masterGainRef.current = audioCtxRef.current.createGain();
        masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);

        // Low-pass filter for cozy warmth
        filterNodeRef.current = audioCtxRef.current.createBiquadFilter();
        filterNodeRef.current.type = 'lowpass';
        filterNodeRef.current.frequency.setValueAtTime(1000, audioCtxRef.current.currentTime);

        // Ambient echo delay
        delayNodeRef.current = audioCtxRef.current.createDelay(2.0);
        delayNodeRef.current.delayTime.setValueAtTime(0.6, audioCtxRef.current.currentTime);

        feedbackNodeRef.current = audioCtxRef.current.createGain();
        feedbackNodeRef.current.gain.setValueAtTime(0.4, audioCtxRef.current.currentTime);

        // Echo feedback routing loop
        delayNodeRef.current.connect(feedbackNodeRef.current);
        feedbackNodeRef.current.connect(delayNodeRef.current);

        // Main line routing
        filterNodeRef.current.connect(masterGainRef.current);
        delayNodeRef.current.connect(masterGainRef.current);
        masterGainRef.current.connect(audioCtxRef.current.destination);
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Schedule recursive soft melody chimes
      scheduleMelodyBlock();
    } catch (e) {
      console.error('Failed to initialize Web Audio Synthesis:', e);
    }
  };

  const stopSynthesizer = () => {
    cleanupTimers();
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const playChimeNode = (freq: number, startTime: number, duration: number, isBassChord = false) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !filterNodeRef.current || !delayNodeRef.current) return;

    // Core Oscillator for sweet chime tones
    const osc = ctx.createOscillator();
    const chimeGain = ctx.createGain();

    // Use Triangle/Sine blend for flute/marimba qualities
    osc.type = isBassChord ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm envelope modeling
    chimeGain.gain.setValueAtTime(0, startTime);
    // Linear attack to prevent click/pop sounds
    chimeGain.gain.linearRampToValueAtTime(isBassChord ? 0.08 : 0.15, startTime + 0.15);
    // Smooth exponential decay
    chimeGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    // Routing
    osc.connect(chimeGain);
    
    // Direct link to Warm Lowpass Filter
    chimeGain.connect(filterNodeRef.current);
    // Also feed a portion into the Deep Echo Delay for cathedral ambience
    chimeGain.connect(delayNodeRef.current);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  };

  const scheduleMelodyBlock = () => {
    if (!isPlayingRef.current || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Play a luxury baseline root chord on average intervals
    const baseRootNotes = [130.81, 146.83, 164.81, 196.00]; // Deep cozy roots: C3, D3, E3, G3
    const randomBase = baseRootNotes[Math.floor(Math.random() * baseRootNotes.length)];
    
    // Play warm bass pad root
    playChimeNode(randomBase, now, 6.0, true);
    // Play fifth harmonic
    playChimeNode(randomBase * 1.5, now + 0.2, 5.0, true);

    // Play active randomized pentatonic flute sequence
    const notesCount = 4 + Math.floor(Math.random() * 4);
    let cumulativeDelay = 0;

    for (let i = 0; i < notesCount; i++) {
      const activeFreq = NOTES[Math.floor(Math.random() * NOTES.length)];
      const noteDelay = 0.35 + Math.random() * 0.75;
      cumulativeDelay += noteDelay;

      // Wrap timer reference to maintain react clean cycles
      const timerId = window.setTimeout(() => {
        if (isPlayingRef.current && audioCtxRef.current) {
          playChimeNode(activeFreq, audioCtxRef.current.currentTime, 1.8 + Math.random() * 1.5);
        }
      }, cumulativeDelay * 1000);
      
      timerIdsRef.current.push(timerId);
    }

    // Schedule next block recursively after current sequence completes
    const nextBlockTimer = window.setTimeout(() => {
      scheduleMelodyBlock();
    }, (cumulativeDelay + 2.5 + Math.random() * 2) * 1000);

    timerIdsRef.current.push(nextBlockTimer);
  };

  const toggleSoundState = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div 
      id="music-control"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1c1812]/90 border border-gold-400/30 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl transition-all duration-500 hover:border-gold-300"
    >
      <div className="flex flex-col items-start select-none">
        <span className="font-serif-luxury text-[10px] text-gold-300 uppercase tracking-widest leading-none">
          Ambient Sound
        </span>
        <span className="font-sans text-[9px] text-gold-100/60 leading-none mt-1">
          {isPlaying ? 'Golden Winds Playing' : 'Ambient sound muted'}
        </span>
      </div>

      <div className="h-4 w-[1px] bg-gold-400/20" />

      {/* Rotating Vinyl icon */}
      <button
        onClick={toggleSoundState}
        className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 transition-all duration-300 outline-none focus:ring-1 focus:ring-gold-300"
        aria-label="Toggle background synthesizer"
      >
        <Disc className={`w-5 h-5 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
          </span>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1.5 transition-all duration-300">
          <button 
            onClick={() => setVolume(v => Math.max(0, v - 0.05))}
            className="text-gold-400/60 hover:text-gold-200 text-xs px-1 select-none"
          >
            -
          </button>
          <div className="w-12 h-1 bg-gold-900 rounded-full overflow-hidden relative">
            <div 
              className="bg-gold-400 h-full transition-all duration-150" 
              style={{ width: `${volume * 100 * 3.5}%` }}
            />
          </div>
          <button 
            onClick={() => setVolume(v => Math.min(0.4, v + 0.05))}
            className="text-gold-400/60 hover:text-gold-200 text-xs px-1 select-none"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
