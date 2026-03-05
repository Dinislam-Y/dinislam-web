'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { gsap } from '@/lib/gsap';

const sections = ['about', 'skills', 'projects', 'contact'] as const;
const ease = [0.23, 1, 0.32, 1] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(sectionId);
          });
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const updateIndicator = useCallback(() => {
    if (!activeSection || !indicatorRef.current) return;
    const btn = navItemsRef.current.get(activeSection);
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const parentRect = btn.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    gsap.to(indicatorRef.current, {
      x: rect.left - parentRect.left,
      width: rect.width,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [activeSection]);

  useEffect(() => { updateIndicator(); }, [activeSection, updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const scrollTo = (id: string) => {
    gsap.to(window, { duration: 1, scrollTo: { y: `#${id}`, offsetY: 64 }, ease: 'power2.inOut' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-blur' : ''
      }`}
      style={{ padding: '1.5rem 4vw' }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: 'power2.inOut' })}
          className="text-base font-bold tracking-tight cursor-none text-[#360802] hover:opacity-70 transition-opacity duration-200"
        >
          DY<span className="text-[#f73b20]">.</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-[2.5rem] relative">
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-[2px] bg-[#f73b20] rounded-full opacity-0"
            style={{ willChange: 'transform, width' }}
          />
          {sections.map((s, i) => (
            <React.Fragment key={s}>
              {i > 0 && (
                <span className="w-[0.3rem] h-[0.3rem] rounded-full bg-[#360802] opacity-20" aria-hidden="true" />
              )}
              <button
                ref={(el) => { if (el) navItemsRef.current.set(s, el); }}
                onClick={() => scrollTo(s)}
                className={`text-[0.9rem] uppercase cursor-none pb-1 transition-all duration-100 ease-in-out tracking-[0.08em] ${
                  activeSection === s
                    ? 'text-[#360802] font-bold opacity-100'
                    : 'text-[#360802] font-medium opacity-40 hover:opacity-100'
                }`}
              >
                {t(s)}
              </button>
            </React.Fragment>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#360802] cursor-none"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="md:hidden mt-4"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(60px)',
              WebkitBackdropFilter: 'blur(60px)',
              borderRadius: '1rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            }}
            onKeyDown={(e) => { if (e.key === 'Escape') setMobileOpen(false); }}
          >
            <div className="px-8 py-10 flex flex-col gap-[3rem]">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className={`text-left text-[2rem] uppercase font-semibold cursor-none ${
                    activeSection === s ? 'text-[#f73b20]' : 'text-[#360802]'
                  }`}
                >
                  {t(s)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
