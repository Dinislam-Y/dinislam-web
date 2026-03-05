'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Snippet {
  label: string;
  value: string;
  color: string;
  x: string;
  y: string;
  speed: number;
}

const snippets: Snippet[] = [
  { label: 'Tests', value: '2000+', color: '#00e5a0', x: '-45%', y: '15%', speed: 0.3 },
  { label: 'FPS', value: '60', color: '#0ea5e9', x: '42%', y: '20%', speed: 0.5 },
  { label: 'Coverage', value: '95%', color: '#a78bfa', x: '-40%', y: '65%', speed: 0.4 },
  { label: 'CI/CD', value: 'Auto', color: '#f59e0b', x: '38%', y: '70%', speed: 0.6 },
  { label: 'Uptime', value: '99.9%', color: '#ef4444', x: '50%', y: '45%', speed: 0.35 },
];

export default function FloatingSnippets() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const triggers: ScrollTrigger[] = [];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const snippet = snippets[i];

      // Entrance animation
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 2.4 + i * 0.15,
          ease: 'power2.out',
        }
      );

      // Parallax scrub on scroll
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const yOffset = self.progress * snippet.speed * -200;
          gsap.set(card, { y: yOffset });
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[5] hidden md:block"
    >
      {snippets.map((snippet, i) => (
        <div
          key={snippet.label}
          ref={(el) => { cardsRef.current[i] = el; }}
          className="absolute opacity-0"
          style={{
            left: `calc(50% + ${snippet.x})`,
            top: snippet.y,
          }}
        >
          <div
            className="px-4 py-3 rounded-xl backdrop-blur-sm bg-[#0a0a0a]/80 border"
            style={{ borderColor: `${snippet.color}30` }}
          >
            <p
              className="text-[18px] font-bold leading-none mb-1"
              style={{ color: snippet.color }}
            >
              {snippet.value}
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#555]">
              {snippet.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
