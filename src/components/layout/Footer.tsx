'use client';

import { useTranslations } from 'next-intl';
import { FaGithub, FaTelegram, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { gsap } from '@/lib/gsap';

const navItems = ['about', 'skills', 'projects', 'contact'] as const;

const socials = [
  { icon: FaGithub, label: 'GitHub', url: 'https://github.com/dinislam-y' },
  { icon: FaTelegram, label: 'Telegram', url: 'https://t.me/dinislam47' },
  { icon: FaLinkedinIn, label: 'LinkedIn', url: 'https://www.linkedin.com/in/ianursaev/' },
  { icon: FaEnvelope, label: 'Email', url: 'mailto:dyanursaev@gmail.com' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    gsap.to(window, { duration: 1, scrollTo: { y: `#${id}`, offsetY: 64 }, ease: 'power2.inOut' });
  };

  return (
    <footer className="bg-[#360802] text-white py-16 px-[5vw] md:px-[10vw]">
      <div className="max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-16">
          {/* Logo + description */}
          <div>
            <button
              onClick={() => gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: 'power2.inOut' })}
              className="text-2xl font-bold tracking-tight cursor-none mb-4 block"
            >
              DY<span className="text-[#f73b20]">.</span>
            </button>
            <p className="text-white/50 text-[0.85rem] leading-relaxed">
              {t('builtWith')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[0.75rem] uppercase tracking-[0.15em] text-white/30 font-semibold mb-4">
              {t('navigation')}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className="footer-link text-white/60 text-[0.9rem] hover:text-white cursor-none transition-colors duration-200"
                  >
                    {tNav(item)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[0.75rem] uppercase tracking-[0.15em] text-white/30 font-semibold mb-4">
              {t('connect')}
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#f73b20] hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.8rem] text-white/40">
            &copy; {year} Dinislam Yanursaev. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
