'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const ease = [0.23, 1, 0.32, 1] as const;

const statKeys = ['tests', 'regression', 'rating', 'fps'] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};

export default function StatsSection() {
  const t = useTranslations('stats');

  return (
    <section className="py-24 md:py-32 px-[5vw] md:px-[10vw]" style={{ background: '#f73b20' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="section-title text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          {t('sectionTitle')}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {statKeys.map((key) => (
            <motion.div key={key} variants={cardVariants}>
              <div className="stats-glass p-6 md:p-8 text-center">
                <AnimatedCounter
                  value={t(`items.${key}.value`)}
                  label={t(`items.${key}.label`)}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
