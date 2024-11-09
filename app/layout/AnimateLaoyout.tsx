'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AnimateLayout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="">
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, filter: 'blur(7px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(7px)' }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.2,
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
