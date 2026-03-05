'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface HorizontalScrollProps {
  children: ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const getScrollWidth = () => track.scrollWidth - window.innerWidth;

    track.style.willChange = 'transform';

    const tween = gsap.to(track, {
      x: () => -getScrollWidth(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollWidth()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onLeave: () => {
          track.style.willChange = 'auto';
        },
        onEnterBack: () => {
          track.style.willChange = 'transform';
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      track.style.willChange = 'auto';
    };
  }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div ref={trackRef} className="flex gap-6">
        {children}
      </div>
    </div>
  );
}
