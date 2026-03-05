'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

export default function TypeWriter({
  text,
  speed = 80,
  className = '',
  delay = 500,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, text, speed, started]);

  return (
    <span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[1em] bg-purple-400 ml-1 align-middle"
      />
    </span>
  );
}
