'use client';

import { useTranslations } from 'next-intl';
import ScrollStack from '@/components/ui/ScrollStack';

const services = [
  { key: 'testAutomation', bg: '#f73b20' },
  { key: 'flutterDev', bg: '#f96853' },
  { key: 'qaLeadership', bg: '#fa8270' },
] as const;

export default function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section id="services" className="relative">
      <ScrollStack>
        {services.map((service, i) => (
          <div
            key={service.key}
            className="min-h-screen flex items-center justify-center px-[8vw] md:px-[12vw]"
            style={{ background: service.bg }}
          >
            <div className="max-w-3xl w-full">
              <span className="text-white/40 text-[0.85rem] uppercase tracking-[0.2em] font-medium mb-4 block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-white text-[clamp(2.5rem,2rem+3vw,5rem)] font-bold leading-[1.1] mb-6 tracking-tight">
                {t(`${service.key}.title`)}
              </h3>
              <p className="text-white/80 text-[clamp(1rem,0.9rem+0.4vw,1.3rem)] leading-relaxed max-w-xl">
                {t(`${service.key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </ScrollStack>
    </section>
  );
}
