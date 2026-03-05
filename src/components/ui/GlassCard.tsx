'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useCallback } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !glow) return;
      cancelAnimationFrame(rafId.current);
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafId.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        ref.current.style.setProperty('--mouse-x', `${x}%`);
        ref.current.style.setProperty('--mouse-y', `${y}%`);
      });
    },
    [glow]
  );

  return (
    <motion.div
      ref={ref}
      className={`surface ${glow ? 'glow-hover' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={
        hover
          ? { y: -4, borderColor: 'rgba(247, 59, 32, 0.2)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }
          : undefined
      }
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
