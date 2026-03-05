'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaStore } from 'react-icons/fa';

const ease = [0.23, 1, 0.32, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function ProjectsSection() {
  const t = useTranslations('projects');

  const linkIcon = (type: string) => {
    switch (type) {
      case 'github': return <FaGithub className="w-4 h-4" />;
      case 'play': return <FaPlay className="w-3 h-3" />;
      case 'rustore': return <FaStore className="w-4 h-4" />;
      default: return <FaExternalLinkAlt className="w-3 h-3" />;
    }
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-40 px-[5vw] md:px-[10vw] bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.h2
          className="section-title text-[#360802] mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          {t('sectionTitle')}
        </motion.h2>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.key} variants={cardVariants}>
              <div className="project-card h-full flex flex-col">
                {/* Preview image */}
                <div className="relative h-[220px] overflow-hidden">
                  {project.previewImage ? (
                    <Image
                      src={project.previewImage}
                      alt={t(`${project.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ background: project.previewGradient }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[1.3rem] font-bold text-[#360802] mb-2 tracking-tight">
                    {t(`${project.key}.title`)}
                  </h3>
                  <p className="text-[0.9rem] text-[#666666] leading-relaxed mb-4 flex-1">
                    {t(`${project.key}.description`)}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {t(`${project.key}.tech`).split(', ').map((tech) => (
                      <span
                        key={tech}
                        className="text-[0.75rem] px-3 py-1 rounded-full bg-[#f5f5f5] text-[#666666] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <p className="text-[0.8rem] text-[#f73b20] font-medium mb-4">
                    {t(`${project.key}.highlights`)}
                  </p>

                  {/* Links */}
                  {project.links.length > 0 && (
                    <div className="flex gap-4 pt-4 border-t border-[rgba(0,0,0,0.06)]">
                      {project.links.map((link) => (
                        <a
                          key={link.type}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[0.8rem] text-[#360802] uppercase tracking-[0.08em] font-medium hover:text-[#f73b20] transition-colors duration-200 cursor-pointer"
                        >
                          {linkIcon(link.type)}
                          {t(link.type)}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
