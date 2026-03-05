'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import PageLoader from '@/components/ui/PageLoader';
import ScrollToTop from '@/components/ui/ScrollToTop';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import StatsSection from '@/components/sections/StatsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setLoaderDone(true)} />

      <SmoothScroll>
        <CustomCursor />
        {loaderDone && <ScrollProgress />}
        {loaderDone && <Navbar />}
        <main>
          <HeroSection loaderDone={loaderDone} />
          <ServicesSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <StatsSection />
          <ContactSection />
        </main>
        <Footer />
        {loaderDone && <ScrollToTop />}
      </SmoothScroll>
    </>
  );
}
