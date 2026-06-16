export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  illustrationType: 'sparkle' | 'stars' | 'heart' | 'blossom';
}

export interface FamilyMember {
  name: string;
  relation: string;
  phone: string;
}

export interface GuestBlessing {
  id: string;
  name: string;
  message: string;
  style: 'ivory' | 'gold' | 'emerald' | 'amber';
  createdAt: string;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: 'particle' | 'flower' | 'ring-shard';
}
