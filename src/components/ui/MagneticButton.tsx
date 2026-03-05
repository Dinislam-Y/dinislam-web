'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
  primary?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({
  children,
  onClick,
  className = '',
  primary = false,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, { stiffness: 150, damping: 15 });
  const springY = useSpring(magnetY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    magnetX.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    magnetY.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };

  const handleMouseLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  const chars = children.split('');

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center rounded-full cursor-none ${
        primary
          ? 'bg-[#bd63ff] text-[#130c2a] border border-[#bd63ff] px-8 py-4 font-semibold hover:bg-[#d5aff4] hover:shadow-[0_0_40px_rgba(189,99,255,0.25)]'
          : 'bg-transparent text-[#eee9ff] border border-[hsla(0,0%,100%,0.15)] px-8 py-4 font-medium hover:border-[#bd63ff] hover:text-[#130c2a] hover:bg-[#bd63ff]'
      } transition-colors duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${className}`}
    >
      {/* Inner clipping container — isolates overflow from button's transform */}
      <span className="relative block overflow-hidden">
        {/* Original text — slides up on hover */}
        <span className="flex" aria-hidden="true">
          {chars.map((char, i) => (
            <span
              key={`orig-${i}`}
              className="inline-block transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-[110%]"
              style={{ transitionDelay: `${i * 25}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>

        {/* Clone text — slides in from below on hover */}
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          {chars.map((char, i) => (
            <span
              key={`clone-${i}`}
              className={`inline-block translate-y-[110%] transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 ${
                primary ? '' : 'text-[#bd63ff]'
              }`}
              style={{ transitionDelay: `${i * 25}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>

      <span className="sr-only">{children}</span>
    </motion.button>
  );
}
