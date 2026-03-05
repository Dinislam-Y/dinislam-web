'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import TextReveal from '@/components/ui/TextReveal';
import { gsap } from '@/lib/gsap';

const ease = [0.23, 1, 0.32, 1] as const;

export default function HeroSection({ loaderDone = false }: { loaderDone?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('hero');

  useEffect(() => {
    if (!loaderDone) return;

    const ctx = gsap.context(() => {
      if (scrollBtnRef.current) {
        gsap.to(scrollBtnRef.current, {
          y: 60, opacity: 0, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current, start: 'top top', end: '25% top', scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loaderDone]);

  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${id}`, offsetY: 64 },
      ease: 'power2.inOut',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
      style={{ paddingTop: 'max(4vw, 8vh)', paddingBottom: '6vmin' }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-[5vw] text-center">
        {/* Subtitle */}
        {loaderDone && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-[#666666] text-[clamp(0.9rem,0.85rem+0.3vw,1.1rem)] uppercase tracking-[0.2em] font-medium mb-6"
          >
            {t('title')}
          </motion.p>
        )}

        {/* Main title — character reveal */}
        {loaderDone && (
          <div className="mb-8">
            <TextReveal
              text="Dinislam"
              as="h1"
              className="hero-title text-[#360802]"
              stagger={40}
              delay={200}
            />
            <TextReveal
              text="Yanursaev"
              as="h1"
              className="hero-title text-[#f73b20]"
              stagger={40}
              delay={500}
            />
          </div>
        )}

        {/* Description */}
        {loaderDone && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease }}
            className="max-w-[600px] text-[#666666] text-[clamp(1rem,0.9rem+0.3vw,1.2rem)] leading-relaxed mb-10"
          >
            {t('subtitle')}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {loaderDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="btn-primary cursor-none"
            >
              {t('viewProjects')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-outline cursor-none"
            >
              {t('contactMe')}
            </button>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {loaderDone && (
        <motion.button
          ref={scrollBtnRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollTo('services')}
          className="self-center flex flex-col items-center gap-2 cursor-none will-change-transform mt-8"
        >
          <span className="text-[0.8rem] font-medium uppercase tracking-[0.15em] text-[#360802]/40">
            Scroll
          </span>
          <motion.svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            fill="none"
            className="text-[#360802]/30"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M2 2l10 10L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </motion.svg>
        </motion.button>
      )}
    </section>
  );
}
