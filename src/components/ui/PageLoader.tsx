'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADER_DURATION = 2200;
const CURTAIN_DELAY = 400;

const ease = [0.23, 1, 0.32, 1] as const;

export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'done'>('loading');

  const handleRevealComplete = useCallback(() => {
    setPhase('done');
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / LOADER_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase('revealing'), CURTAIN_DELAY);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (phase === 'loading') {
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [phase]);

  if (phase === 'done') return null;

  const isLoading = phase === 'loading';
  const isRevealing = phase === 'revealing';

  return (
    <AnimatePresence onExitComplete={handleRevealComplete}>
      {(isLoading || isRevealing) && (
        <>
          {isLoading && (
            <motion.div
              key="loader-overlay"
              className="loader-overlay"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress number */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute top-[10vh] right-[10vw] text-[11vmax] font-bold tabular-nums"
                style={{ color: '#f73b20' }}
              >
                {progress}
              </motion.div>

              {/* Name */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="absolute bottom-[10vh] left-[10vw] text-sm tracking-[0.3em] uppercase font-light"
                style={{ color: '#360802' }}
              >
                Dinislam Yanursaev
              </motion.p>

              {/* Loading line */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%]">
                <div className="h-[1px] bg-[#360802]/10 w-full overflow-hidden">
                  <div
                    className="h-full transition-[width] duration-100 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: '#f73b20',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {isRevealing && (
            <>
              <motion.div
                key="curtain-top"
                className="loader-curtain loader-curtain-top"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1, ease }}
                onAnimationComplete={handleRevealComplete}
              />
              <motion.div
                key="curtain-bottom"
                className="loader-curtain loader-curtain-bottom"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1, ease }}
              />
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
