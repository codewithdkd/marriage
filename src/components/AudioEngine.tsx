import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export default function AudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const feedbackNodeRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerIdsRef = useRef<number[]>([]);
  const isPlayingRef = useRef(false);

  // Tanpura drone nodes
  const droneNodesRef = useRef<any[]>([]);

  // Elegant Raga Bhupali scale (Pentatonic Major in C-Major context)
  // Sa (C), Re (D), Ga (E), Pa (G), Dha (A)
  // 130.81 (C3), 146.83 (D3), 164.81 (E3), 196.00 (G3), 220.00 (A3)
  // 261.63 (C4), 293.66 (D4), 329.63 (E4), 392.00 (G4), 440.00 (A4)
  // 523.25 (C5), 587.33 (D5), 659.25 (E5), 783.99 (G5), 880.00 (A5)
  const RAGA_NOTES = [
    261.63, 293.66, 329.63, 392.00, 440.00, 
    523.25, 587.33, 659.25, 783.99, 880.00
  ];

  useEffect(() => {
    // Keep playing ref in sync for loop cycles
    isPlayingRef.current = isPlaying;
    
    if (isPlaying) {
      startSynthesizer();
    } else {
      stopSynthesizer();
    }

    return () => {
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
        
        // Master gain controls
        masterGainRef.current = audioCtxRef.current.createGain();
        masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);

        // Low-pass filter for cozy warmth, emulating physical string instrument chambers
        filterNodeRef.current = audioCtxRef.current.createBiquadFilter();
        filterNodeRef.current.type = 'lowpass';
        filterNodeRef.current.frequency.setValueAtTime(1400, audioCtxRef.current.currentTime);

        // Ambient delay recreating an open temple hall
        delayNodeRef.current = audioCtxRef.current.createDelay(3.0);
        delayNodeRef.current.delayTime.setValueAtTime(0.75, audioCtxRef.current.currentTime);

        feedbackNodeRef.current = audioCtxRef.current.createGain();
        feedbackNodeRef.current.gain.setValueAtTime(0.5, audioCtxRef.current.currentTime);

        // Feedback routing loop
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

      startTanpuraDrone();
      scheduleClassicalMelody();
    } catch (e) {
      console.error('Failed to initialize Classical Audio Synthesis:', e);
    }
  };

  const stopSynthesizer = () => {
    cleanupTimers();
    stopTanpuraDrone();
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  // Continuous Tanpura background drone simulating traditional Indian string strings (Sa - Pa - Sa)
  const startTanpuraDrone = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !filterNodeRef.current) return;

    stopTanpuraDrone();

    // Frequencies representing the Pa, Sa (Root), Sa (High-Root), Octave-Low Sa
    // 196.00 Hz (Pa / G3), 130.81 Hz (Sa / C3), 130.81 Hz, 65.40 HZ (Sa / C2)
    const droneFreqs = [196.00, 130.81, 130.82, 65.40];
    const createdNodes: any[] = [];

    droneFreqs.forEach((freq, idx) => {
      // Create oscillator
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      // Traditional Tanpura has rich metallic harmonics - triangle or custom periodic wave is great,
      // here we use sawtooth filtered heavily for string buzz quality
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Lowpass filter dedicated to the drone to take out harshness
      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(idx === 3 ? 180 : 350, ctx.currentTime);

      // Slow amplitude modulation to simulate the plucking wheel of manual Tanpuras
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.18 + idx * 0.04, ctx.currentTime); // Slow sweep
      lfoGain.gain.setValueAtTime(0.02, ctx.currentTime); // Subtle volume swelling

      // Volume envelope
      gainNode.gain.setValueAtTime(0.005, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 3);

      // Route
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      
      osc.connect(droneFilter);
      droneFilter.connect(gainNode);
      gainNode.connect(filterNodeRef.current!);

      osc.start();
      lfo.start();

      createdNodes.push({ osc, lfo, gain: gainNode });
    });

    droneNodesRef.current = createdNodes;
  };

  const stopTanpuraDrone = () => {
    droneNodesRef.current.forEach(node => {
      try {
        node.osc.stop();
        node.lfo.stop();
      } catch (e) {}
    });
    droneNodesRef.current = [];
  };

  // Santoor / Sitar plucking synthesis
  const playSantoorPluck = (freq: number, startTime: number, duration: number, isSitarSlide = false) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !filterNodeRef.current || !delayNodeRef.current) return;

    // We blend a sharp attack triangle wave and a subtle buzz wave with a short bandpass sweep to simulate string plucking
    const pluckOsc1 = ctx.createOscillator();
    const pluckOsc2 = ctx.createOscillator();
    const soundGain = ctx.createGain();

    pluckOsc1.type = 'triangle';
    pluckOsc2.type = 'sawtooth';

    // Pitch bend (Meend effect) for that magical Indian Sitar glide
    if (isSitarSlide) {
      pluckOsc1.frequency.setValueAtTime(freq * 0.94, startTime);
      pluckOsc1.frequency.quadraticRampToValueAtTime(freq, startTime + 0.25);
      pluckOsc2.frequency.setValueAtTime(freq * 0.94, startTime);
      pluckOsc2.frequency.quadraticRampToValueAtTime(freq, startTime + 0.25);
    } else {
      // Small vibrato
      pluckOsc1.frequency.setValueAtTime(freq, startTime);
      pluckOsc1.frequency.linearRampToValueAtTime(freq * 1.002, startTime + 0.08);
      pluckOsc1.frequency.linearRampToValueAtTime(freq * 0.998, startTime + 0.16);
      pluckOsc2.frequency.setValueAtTime(freq * 2.0, startTime); // Double Octave overtone
    }

    // Santoor has instant, sharp pluck attack
    soundGain.gain.setValueAtTime(0, startTime);
    soundGain.gain.linearRampToValueAtTime(0.12, startTime + 0.005);
    soundGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    // Tone filter
    const pluckFilter = ctx.createBiquadFilter();
    pluckFilter.type = 'bandpass';
    pluckFilter.frequency.setValueAtTime(freq * 1.8, startTime);
    pluckFilter.frequency.exponentialRampToValueAtTime(freq * 0.8, startTime + 0.3);
    pluckFilter.Q.setValueAtTime(2.0, startTime);

    pluckOsc1.connect(soundGain);
    pluckOsc2.connect(pluckFilter);
    
    // Low gain for overtone buzz (Sitar resonance)
    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.012, startTime);
    pluckFilter.connect(overtoneGain);
    overtoneGain.connect(soundGain);

    soundGain.connect(filterNodeRef.current);
    soundGain.connect(delayNodeRef.current);

    pluckOsc1.start(startTime);
    pluckOsc2.start(startTime);

    pluckOsc1.stop(startTime + duration + 0.1);
    pluckOsc2.stop(startTime + duration + 0.1);
  };

  // Indian Bansuri (Woodwind native flute) style long tones
  const playBansuriFlute = (freq: number, startTime: number, duration: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !filterNodeRef.current || !delayNodeRef.current) return;

    const osc = ctx.createOscillator();
    const volumeNode = ctx.createGain();

    osc.type = 'sine';
    
    // Bansuri has rich breathy vibrato and slide
    osc.frequency.setValueAtTime(freq * 0.98, startTime);
    osc.frequency.linearRampToValueAtTime(freq, startTime + 0.3);
    
    // Waveform LFO vibrato
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(5.8, startTime); // 5.8Hz natural vibrato
    vibratoGain.gain.setValueAtTime(freq * 0.008, startTime); // subtle peak deviation

    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    // Filter breathing air sound simulation
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(freq * 2.0, startTime);
    bandpass.Q.setValueAtTime(0.8, startTime);

    // Flute volume envelope (softer, gradual fade)
    volumeNode.gain.setValueAtTime(0, startTime);
    volumeNode.gain.linearRampToValueAtTime(0.06, startTime + 0.4);
    volumeNode.gain.setValueAtTime(0.06, startTime + duration - 0.5);
    volumeNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(bandpass);
    bandpass.connect(volumeNode);
    volumeNode.connect(filterNodeRef.current);
    volumeNode.connect(delayNodeRef.current);

    osc.start(startTime);
    vibrato.start(startTime);
    
    osc.stop(startTime + duration + 0.1);
    vibrato.stop(startTime + duration + 0.1);
  };

  const scheduleClassicalMelody = () => {
    if (!isPlayingRef.current || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Pick a central phrase notes from Raga Bhupali Scale
    const notesInPhrase = 4 + Math.floor(Math.random() * 4);
    let cumulativeDelay = 0;

    for (let i = 0; i < notesInPhrase; i++) {
      const activeFreq = RAGA_NOTES[Math.floor(Math.random() * RAGA_NOTES.length)];
      const delayTime = 0.45 + Math.random() * 0.8;
      cumulativeDelay += delayTime;

      // Wrap timer reference
      const timerId = window.setTimeout(() => {
        if (isPlayingRef.current && audioCtxRef.current) {
          const typeChoice = Math.random();
          const freshCtx = audioCtxRef.current;
          
          if (typeChoice < 0.25) {
            // Soft long Bansuri flute melody
            playBansuriFlute(activeFreq, freshCtx.currentTime, 2.5 + Math.random() * 1.5);
          } else {
            // Plucked Santoor/Sitar phrase with meend slides
            const isSlide = Math.random() > 0.5;
            playSantoorPluck(activeFreq, freshCtx.currentTime, 1.5 + Math.random() * 1.2, isSlide);
          }
        }
      }, cumulativeDelay * 1000);
      
      timerIdsRef.current.push(timerId);
    }

    // Schedule next raga phrase recursively after completes
    const nextPhraseTimer = window.setTimeout(() => {
      scheduleClassicalMelody();
    }, (cumulativeDelay + 3.0 + Math.random() * 2) * 1000);

    timerIdsRef.current.push(nextPhraseTimer);
  };

  const toggleSoundState = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div 
      id="music-control"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1c1812]/95 border border-gold-400/30 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl transition-all duration-500 hover:border-gold-300 pointer-events-auto"
    >
      <div className="flex flex-col items-start select-none">
        <span className="font-serif-luxury text-[10px] text-gold-300 uppercase tracking-widest leading-none">
          Vedic Raga Accent
        </span>
        <span className="font-sans text-[9px] text-gold-100/60 leading-none mt-1">
          {isPlaying ? 'Tanpura & Santoor Playing' : 'Raga music muted'}
        </span>
      </div>

      <div className="h-4 w-[1px] bg-gold-400/20" />

      {/* Rotating Vinyl/Sitar Disc icon */}
      <button
        onClick={toggleSoundState}
        className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 transition-all duration-300 outline-none focus:ring-1 focus:ring-gold-300 cursor-pointer"
        aria-label="Toggle background classical music raga"
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
            className="text-gold-400/60 hover:text-gold-200 text-xs px-1 select-none cursor-pointer"
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
            className="text-gold-400/60 hover:text-gold-200 text-xs px-1 select-none cursor-pointer"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
