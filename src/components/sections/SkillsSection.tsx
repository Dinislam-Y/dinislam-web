'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import TextReveal from '@/components/ui/TextReveal';
import { skillCategories } from '@/data/skills';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function SkillsSection() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="py-24 md:py-40 px-[5vw] md:px-[10vw] bg-[#f5f5f5] relative">
      {/* Negative margin overlap effect */}
      <div className="max-w-6xl mx-auto relative z-10 -mt-16">
        <TextReveal
          text={t('sectionTitle')}
          as="h2"
          className="section-title text-[#360802] text-center mb-16"
          stagger={35}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.key} variants={cardVariants}>
              <div className="surface glow-hover p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-[13px] uppercase tracking-[0.15em] text-[#f73b20] font-semibold mb-5">
                  {t(`categories.${cat.key}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill.name} className="skill-tag flex items-center gap-1.5">
                      {skill.icon && <skill.icon className="w-3.5 h-3.5 opacity-50" />}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
