import React, { useEffect, useRef } from 'react';
import { Particle } from '../types';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = window.innerWidth < 768 ? 40 : 85;

    // Mouse coordinates to attract/repel particles
    const mouse = { x: -1000, y: -1000, radius: 120 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const colors = [
      'rgba(245, 230, 204, 0.7)', // champagne
      'rgba(222, 197, 118, 0.8)', // gold light
      'rgba(193, 147, 46, 0.6)',  // gold default
      'rgba(253, 252, 247, 0.9)',  // ivory glow
      'rgba(255, 200, 200, 0.4)',  // pink lotus hue
    ];

    const generateParticle = (isInitial = false): Particle => {
      const typeRand = Math.random();
      let type: 'particle' | 'flower' | 'ring-shard' = 'particle';
      if (typeRand > 0.85) type = 'flower';
      else if (typeRand > 0.7) type = 'ring-shard';

      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : canvas.height + 20,
        size: type === 'particle' 
          ? Math.random() * 2.8 + 0.6 
          : type === 'flower' 
            ? Math.random() * 6 + 4 
            : Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.6 + 0.2), // slow upward motion
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        type
      };
    };

    // Instantiate initial block
    for (let i = 0; i < maxParticles; i++) {
      particles.push(generateParticle(true));
    }

    const drawSparkle = (c: CanvasRenderingContext2D, px: number, py: number, size: number, opacity: string) => {
      c.save();
      c.translate(px, py);
      c.fillStyle = colors[1];
      c.shadowBlur = size * 3;
      c.shadowColor = '#dec576';
      
      c.beginPath();
      // Draw 4-point golden star
      c.moveTo(0, -size * 2);
      c.quadraticCurveTo(0, 0, size * 2, 0);
      c.quadraticCurveTo(0, 0, 0, size * 2);
      c.quadraticCurveTo(0, 0, -size * 2, 0);
      c.quadraticCurveTo(0, 0, 0, -size * 2);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.fillStyle = p.color;
      c.shadowBlur = 4;
      c.shadowColor = 'rgba(255, 180, 180, 0.4)';

      c.beginPath();
      // Lotus Petal Bezier Curve
      c.moveTo(0, -p.size);
      c.bezierCurveTo(p.size, -p.size / 2, p.size, p.size / 2, 0, p.size);
      c.bezierCurveTo(-p.size, p.size / 2, -p.size, -p.size / 2, 0, -p.size);
      c.closePath();
      c.fill();
      c.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Upward movement
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Interaction with mouse pointer (push away slightly)
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Guide away vector
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Draw depending on type
        if (p.type === 'particle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = p.size > 2 ? 6 : 0;
          ctx.shadowColor = '#c1932e';
          ctx.fill();
        } else if (p.type === 'flower') {
          drawPetal(ctx, p);
        } else {
          // Draw star-shaped sparkles
          drawSparkle(ctx, p.x, p.y, p.size, p.color);
        }

        // Reset if drifted off screen bounds
        if (p.y < -15 || p.x < -15 || p.x > canvas.width + 15) {
          particles[idx] = generateParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
}
