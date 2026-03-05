'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTelegram, FaEnvelope, FaLinkedinIn, FaDownload, FaCopy, FaCheck } from 'react-icons/fa';

const EMAIL = 'dyanursaev@gmail.com';

const socials = [
  { icon: FaGithub, label: 'GitHub', url: 'https://github.com/dinislam-y' },
  { icon: FaTelegram, label: 'Telegram', url: 'https://t.me/dinislam47' },
  { icon: FaEnvelope, label: 'Email', url: `mailto:${EMAIL}` },
  { icon: FaLinkedinIn, label: 'LinkedIn', url: 'https://www.linkedin.com/in/ianursaev/' },
];

const ease = [0.23, 1, 0.32, 1] as const;

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-40 px-[5vw] md:px-[10vw] bg-white"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left — title */}
          <div className="md:w-[40%] flex flex-col justify-start">
            <motion.h2
              className="section-title text-[#360802] mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {t('sectionTitle')}
            </motion.h2>

            {/* Divider */}
            <div className="h-[2px] w-full bg-[#f73b20] mb-6" />

            {/* Availability */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="w-[0.6rem] h-[0.6rem] rounded-full bg-[#12e680]"
                style={{ boxShadow: '0px 0px 13.8px 0px #3ce795' }}
              />
              <span className="text-[0.95rem] font-medium text-[#666666]">
                {t('available')}
              </span>
            </motion.div>

            {/* Socials */}
            <div className="flex gap-4 mt-8">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#360802] hover:bg-[#f73b20] hover:text-white transition-colors duration-300 cursor-pointer"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* CV */}
            <a
              href={locale === 'ru' ? '/cv-rus.pdf' : '/cv-eng.pdf'}
              download
              className="inline-flex items-center gap-2 mt-6 text-[0.95rem] text-[#f73b20] hover:text-[#e0331a] font-medium transition-colors duration-200 cursor-pointer"
            >
              <FaDownload className="w-4 h-4" />
              {t('downloadCV')}
            </a>
          </div>

          {/* Right — form card */}
          <motion.div
            className="md:w-[60%]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="surface p-8 md:p-10">
              {/* Copy email */}
              <motion.button
                onClick={copyEmail}
                className="w-full mb-6 flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl border border-[#360802]/15 text-[#360802] text-[0.95rem] font-medium hover:bg-[#f5f5f5] transition-all duration-200 cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="copied" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[#12e680]">
                      <FaCheck className="w-4 h-4" /> Copied!
                    </motion.span>
                  ) : (
                    <motion.span key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <FaCopy className="w-4 h-4 opacity-50" /> {EMAIL}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                  const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                  const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                  window.location.href = `mailto:${EMAIL}?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-[0.85rem] text-[#360802] mb-2 font-medium">
                    {t('nameLabel')} <span className="text-[#f73b20]">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={t('namePlaceholder')}
                    className="w-full bg-[#f5f5f5] border border-transparent rounded-xl px-4 py-3 text-[#360802] text-[0.95rem] placeholder-[#360802]/30 focus:outline-none focus:border-[#f73b20] focus:ring-1 focus:ring-[#f73b20] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[0.85rem] text-[#360802] mb-2 font-medium">
                    {t('emailLabel')} <span className="text-[#f73b20]">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t('emailPlaceholder')}
                    className="w-full bg-[#f5f5f5] border border-transparent rounded-xl px-4 py-3 text-[#360802] text-[0.95rem] placeholder-[#360802]/30 focus:outline-none focus:border-[#f73b20] focus:ring-1 focus:ring-[#f73b20] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[0.85rem] text-[#360802] mb-2 font-medium">
                    {t('messageLabel')} <span className="text-[#f73b20]">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={t('messagePlaceholder')}
                    className="w-full bg-[#f5f5f5] border border-transparent rounded-xl px-4 py-3 text-[#360802] text-[0.95rem] placeholder-[#360802]/30 focus:outline-none focus:border-[#f73b20] focus:ring-1 focus:ring-[#f73b20] transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full cursor-pointer"
                >
                  {t('send')}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
