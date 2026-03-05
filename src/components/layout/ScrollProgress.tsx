'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <>
      {/* Glow shadow behind progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[99] h-[6px] blur-[4px] opacity-60 scroll-progress"
        style={{ scaleX: progress }}
      />
      {/* Actual progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] scroll-progress"
        style={{ scaleX: progress }}
      />
    </>
  );
}
