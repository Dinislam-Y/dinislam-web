'use client';

import { useRef, useEffect, ReactNode, Children } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollStackProps {
  children: ReactNode;
}

export default function ScrollStack({ children }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childArray = Children.toArray(children);

  useEffect(() => {
    if (!containerRef.current) return;

    const panels =
      containerRef.current.querySelectorAll<HTMLElement>('.scroll-stack-panel');
    const triggers: ScrollTrigger[] = [];

    panels.forEach((panel, i) => {
      if (i === panels.length - 1) return;

      panel.style.willChange = 'transform, opacity';

      const trigger = ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          const scale = 1 - self.progress * 0.08;
          const opacity = 1 - self.progress * 0.6;
          const yOffset = self.progress * -30;
          gsap.set(panel, { scale, opacity, y: yOffset });
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      panels.forEach((panel) => {
        panel.style.willChange = 'auto';
      });
    };
  }, []);

  return (
    <div ref={containerRef}>
      {childArray.map((child, i) => (
        <div
          key={i}
          className="scroll-stack-panel relative rounded-[24px] overflow-hidden"
          style={{
            zIndex: i + 1,
            boxShadow: i > 0 ? '0 -20px 60px rgba(0,0,0,0.15)' : 'none',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
