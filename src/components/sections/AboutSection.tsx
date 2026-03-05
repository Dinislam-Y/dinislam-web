'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const ease = [0.23, 1, 0.32, 1] as const;

const CIRCLE_R = 34;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

export default function AboutSection() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActiveStep((prev) => Math.max(prev, i)),
        onEnterBack: () => setActiveStep(i),
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((tr) => tr.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="stepper-section py-24 md:py-40 px-[5vw] md:px-[10vw]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <motion.h2
          className="section-title text-white mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          {t('sectionTitle')}
        </motion.h2>

        {/* Stepper */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[40px] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          {experiences.map((exp, i) => {
            const isActive = i <= activeStep;
            const progress = isActive ? 1 : 0;
            const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

            return (
              <motion.div
                key={exp.key}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="relative flex items-start gap-6 md:gap-10 mb-16 last:mb-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
              >
                {/* Circle progress */}
                <div className="stepper-circle flex-shrink-0 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r={CIRCLE_R} className="stepper-circle-track" />
                    <circle
                      cx="40"
                      cy="40"
                      r={CIRCLE_R}
                      className="stepper-circle-progress"
                      strokeDasharray={CIRCLE_CIRCUMFERENCE}
                      strokeDashoffset={dashOffset}
                    />
                  </svg>
                  <span
                    className="absolute text-[0.85rem] font-bold transition-colors duration-400"
                    style={{ color: isActive ? '#f73b20' : 'rgba(255,255,255,0.3)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <p
                    className="text-[0.75rem] uppercase tracking-[0.15em] font-medium mb-2 transition-colors duration-400"
                    style={{ color: isActive ? '#f73b20' : 'rgba(255,255,255,0.3)' }}
                  >
                    {t(`timeline.${exp.key}.period`)}
                  </p>
                  <h3
                    className="text-[clamp(1.3rem,1.1rem+0.5vw,1.8rem)] font-bold mb-1 transition-colors duration-400"
                    style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
                  >
                    {t(`timeline.${exp.key}.company`)}
                  </h3>
                  <p
                    className="text-[0.95rem] mb-3 transition-colors duration-400"
                    style={{ color: isActive ? '#fa8270' : 'rgba(255,255,255,0.25)' }}
                  >
                    {t(`timeline.${exp.key}.role`)}
                  </p>
                  <p
                    className="text-[0.95rem] leading-relaxed transition-all duration-500"
                    style={{
                      color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)',
                      maxHeight: isActive ? '200px' : '0px',
                      overflow: 'hidden',
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    {t(`timeline.${exp.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
