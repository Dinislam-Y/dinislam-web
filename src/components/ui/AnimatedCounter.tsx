'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/^([\d.]+)/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(numericMatch[1]);
    const suffix = value.replace(numericMatch[1], '');
    const isFloat = value.includes('.');
    const duration = 2000;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const val = eased * target;

      if (progress >= 1) {
        setDisplay(
          isFloat ? target.toFixed(1) + suffix : Math.round(target) + suffix
        );
      } else {
        setDisplay(
          isFloat ? val.toFixed(1) + suffix : Math.round(val) + suffix
        );
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
        {display}
      </div>
      <div className="text-xs text-white/50 uppercase tracking-[0.15em] font-medium">
        {label}
      </div>
    </div>
  );
}
