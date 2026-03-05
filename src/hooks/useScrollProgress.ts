'use client';

import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export function useScrollProgress() {
  const progress = useMotionValue(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      progress.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [progress]);

  return progress;
}
