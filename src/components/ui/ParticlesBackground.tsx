'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          color: { value: '#00e5a0' },
          links: {
            color: '#00e5a0',
            distance: 180,
            enable: true,
            opacity: 0.04,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
          number: {
            density: { enable: true },
            value: 40,
          },
          opacity: {
            value: { min: 0.02, max: 0.12 },
          },
          shape: { type: 'circle' },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
          },
          modes: {
            grab: {
              distance: 160,
              links: { opacity: 0.1 },
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
