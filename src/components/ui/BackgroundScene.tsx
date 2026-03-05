'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Parallax background scene with floating shapes that scale,
 * move and crossfade on scroll — inspired by davidlangarica.dev.
 */
export default function BackgroundScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);
  const orbCRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Main container: slow parallax shift
      gsap.to(containerRef.current, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      // Orb A: scale up + drift right on scroll
      if (orbARef.current) {
        gsap.fromTo(orbARef.current,
          { scale: 1, x: '0%', opacity: 0.5 },
          {
            scale: 1.8, x: '20%', opacity: 0.15,
            ease: 'none',
            scrollTrigger: { trigger: document.body, start: 'top top', end: '50% center', scrub: 1 },
          }
        );
      }

      // Orb B: scale + shift opposite direction
      if (orbBRef.current) {
        gsap.fromTo(orbBRef.current,
          { scale: 0.8, x: '0%', opacity: 0.3 },
          {
            scale: 2, x: '-25%', opacity: 0.6,
            ease: 'none',
            scrollTrigger: { trigger: document.body, start: '20% top', end: '70% center', scrub: 1.2 },
          }
        );
      }

      // Orb C: appears later, scales big
      if (orbCRef.current) {
        gsap.fromTo(orbCRef.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 2.5, opacity: 0.4,
            ease: 'none',
            scrollTrigger: { trigger: document.body, start: '40% top', end: 'bottom bottom', scrub: 1.5 },
          }
        );
      }

      // Mesh overlay: subtle rotation + scale
      if (meshRef.current) {
        gsap.to(meshRef.current, {
          rotation: 15,
          scale: 1.3,
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 2 },
        });
      }

      // Stars: parallax at different speed
      if (starsRef.current) {
        gsap.to(starsRef.current, {
          y: '-30%',
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -100 }}
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-scene-base" />

      {/* Large orb A — top left purple */}
      <div
        ref={orbARef}
        className="absolute bg-scene-orb"
        style={{
          width: '60vmax',
          height: '60vmax',
          top: '-10%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(120, 40, 200, 0.35) 0%, transparent 70%)',
        }}
      />

      {/* Orb B — center-right magenta */}
      <div
        ref={orbBRef}
        className="absolute bg-scene-orb"
        style={{
          width: '50vmax',
          height: '50vmax',
          top: '30%',
          right: '-20%',
          background: 'radial-gradient(circle, rgba(180, 50, 220, 0.25) 0%, transparent 65%)',
        }}
      />

      {/* Orb C — bottom blue-purple */}
      <div
        ref={orbCRef}
        className="absolute bg-scene-orb"
        style={{
          width: '70vmax',
          height: '70vmax',
          bottom: '-20%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(80, 60, 220, 0.3) 0%, transparent 60%)',
        }}
      />

      {/* Mesh/grid overlay — subtle geometric texture */}
      <div
        ref={meshRef}
        className="absolute inset-[-20%] opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(189,99,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(189,99,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating sparkle stars */}
      <div ref={starsRef} className="absolute inset-0">
        {[
          { top: '8%', left: '15%', size: 3, delay: 0 },
          { top: '25%', left: '75%', size: 2, delay: 1.5 },
          { top: '45%', left: '40%', size: 4, delay: 0.8 },
          { top: '60%', left: '85%', size: 2.5, delay: 2 },
          { top: '75%', left: '20%', size: 3, delay: 1.2 },
          { top: '15%', left: '55%', size: 2, delay: 0.3 },
          { top: '88%', left: '60%', size: 3.5, delay: 1.8 },
          { top: '35%', left: '10%', size: 2, delay: 2.5 },
          { top: '55%', left: '65%', size: 3, delay: 0.5 },
          { top: '70%', left: '45%', size: 2, delay: 1 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute bg-scene-star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              background: '#d5aff4',
              boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(189,99,255,0.3)`,
              animation: `star-twinkle ${2 + star.delay}s ease-in-out ${star.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* 4-pointed sparkle decorations (like original) */}
      <Sparkle top="12%" left="80%" size={24} delay={0} />
      <Sparkle top="55%" left="8%" size={32} delay={1.2} />
      <Sparkle top="82%" left="70%" size={20} delay={0.6} />
    </div>
  );
}

function Sparkle({ top, left, size, delay }: { top: string; left: string; size: number; delay: number }) {
  return (
    <svg
      className="absolute"
      style={{
        top, left,
        width: size, height: size,
        animation: `star-twinkle ${2.5 + delay}s ease-in-out ${delay}s infinite alternate`,
      }}
      viewBox="0 0 24 24"
      fill="#d5aff4"
    >
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
    </svg>
  );
}
