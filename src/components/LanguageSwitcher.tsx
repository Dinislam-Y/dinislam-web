'use client';

import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();

  const toggle = () => {
    const next = locale === 'en' ? 'ru' : 'en';
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    window.location.href = `${basePath}/${next}`;
  };

  return (
    <button
      onClick={toggle}
      className="text-[13px] uppercase tracking-[0.1em] text-[#360802]/50 hover:text-[#f73b20] transition-colors duration-300 cursor-none font-medium"
      aria-label="Toggle language"
    >
      {locale === 'en' ? 'RU' : 'EN'}
    </button>
  );
}
