import { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../../theme/useTheme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const PARTICLE_COUNT = 80;
const GLOW_RADIUS = 180;
const BASE_ALPHA = 0.15;
const GLOW_ALPHA = 0.8;
const GLOW_BLUR = 18;
const SPEED = 0.3;

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    radius: Math.random() * 1.5 + 1,
  }));
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const { theme, isDark } = useTheme();

  const accentColor = isDark ? '139,92,246' : '124,58,237';

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of particles.current) {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Distance to cursor
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / GLOW_RADIUS);

        // Interpolate alpha and size based on proximity
        const alpha = BASE_ALPHA + (GLOW_ALPHA - BASE_ALPHA) * proximity;
        const scale = 1 + proximity * 2;

        // Draw glow halo when close to cursor
        if (proximity > 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * scale * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentColor},${proximity * 0.15})`;
          ctx.fill();
        }

        // Draw the particle
        ctx.save();
        if (proximity > 0.1) {
          ctx.shadowColor = `rgba(${accentColor},${proximity * 0.7})`;
          ctx.shadowBlur = GLOW_BLUR * proximity;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentColor},${alpha})`;
        ctx.fill();
        ctx.restore();
      }
    },
    [accentColor]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.current = createParticles(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const loop = () => {
      draw(ctx, window.innerWidth, window.innerHeight);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
