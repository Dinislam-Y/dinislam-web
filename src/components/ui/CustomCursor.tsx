'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const opacity = useMotionValue(0);

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.3 });
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 22, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 22, mass: 0.5 });

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile || !mounted) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      opacity.set(1);
    };
    const leave = () => opacity.set(0);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [isMobile, mounted, mouseX, mouseY, opacity]);

  if (!mounted || isMobile) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: -4,
          translateY: -4,
          opacity,
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: -18,
          translateY: -18,
          opacity,
        }}
      />
    </>
  );
}
