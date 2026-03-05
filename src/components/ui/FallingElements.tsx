'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useInView } from 'framer-motion';
import { gsap } from '@/lib/gsap';

interface FallingElementsProps {
  count?: number;
  className?: string;
}

export default function FallingElements({
  count = 8,
  className = '',
}: FallingElementsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const elements = ref.current.querySelectorAll('.falling-el');
    const tweens: gsap.core.Tween[] = [];

    elements.forEach((el, i) => {
      tweens.push(
        gsap.fromTo(
          el,
          {
            y: -60,
            opacity: 0,
            scale: 0,
            rotation: ((i * 9301 + 49297) % 233280) / 233280 * 180 - 90,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'back.out(1.7)',
          }
        )
      );
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [isInView]);

  // Deterministic pseudo-random to avoid SSR hydration mismatch
  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = (i * 9301 + 49297) % 233280;
      const random = seed / 233280;
      const size = 4 + random * 8;
      const left = `${10 + (i / count) * 80}%`;
      const top = `${random * 60 + 20}%`;
      const isCircle = i % 3 !== 0;

      return (
        <div
          key={i}
          className={`falling-el absolute opacity-0 ${
            isCircle ? 'rounded-full' : 'rounded-sm rotate-45'
          }`}
          style={{
            width: size,
            height: size,
            left,
            top,
            background:
              i % 2 === 0
                ? 'rgba(0, 229, 160, 0.3)'
                : 'rgba(14, 165, 233, 0.3)',
          }}
        />
      );
    });
  }, [count]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {shapes}
    </div>
  );
}
