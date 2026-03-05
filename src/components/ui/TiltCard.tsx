'use client';

import { useRef, useCallback, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 10,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cardRef.current.style.transform = `perspective(1000px) rotateY(${x * tiltAmount}deg) rotateX(${-y * tiltAmount}deg)`;
    },
    [tiltAmount]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'none';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [&_a]:pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
