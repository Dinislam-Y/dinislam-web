'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  text,
  className = '',
  as: Tag = 'h1',
  delay = 0,
  stagger = 30,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const chars = ref.current.querySelectorAll('.char');
    chars.forEach((char, i) => {
      const el = char as HTMLElement;
      el.style.transitionDelay = `${delay + i * stagger}ms`;
    });

    ref.current.classList.add('revealed');
  }, [isInView, delay, stagger]);

  const words = text.split(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`char-reveal ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
          {word.split('').map((char, ci) => (
            <span key={ci} className="char inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
