'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@groovy-box/ui';
import Link from 'next/link';
import ThemeSwitcher from '@app/theme/ThemeSwitcher';

const SCROLL_THRESHOLD = 200;

export default function Navbar() {
  const [activeLink, setActiveLink] = React.useState('home');
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollProgress(Math.min(currentScrollY / SCROLL_THRESHOLD, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isCompact = scrollProgress > 0;
  const scaleValue = 1 - scrollProgress * 0.5; // Scale from 1 to 0.98

  return (
    <nav
      className={`
        flex items-center justify-center 
        p-2
        sm:p-4 
        fixed 
        top-0 
         z-50
         w-full
        transition-all duration-300 ease-in-out
        ${isCompact ? 'bg-transparent' : 'dark:bg-transparent'}
      `}
    >
      <div
        className={`w-full flex  items-center justify-between 
      transition-all duration-700 ease-in-out
      p-2
      sm:p-4
      ${isCompact ? 'blurNav' : 'bg-transparent'}
      `}
        style={{
          width: `${scaleValue * 100}%`,
        }}
      >
        <div
          className={`flex items-center sm:space-x-2 transition-all duration-300`}
        >
          <Button
            variant="link"
            asChild
            className={`p-0 sm:p-2 hover:text-slate-200  ${isCompact ? 'text-sm' : ''}`}
          >
            <Link href="/">Home</Link>
          </Button>

          <Button
            variant="link"
            asChild
            className={`p-0 sm:p-2 ${isCompact ? 'text-sm' : ''}`}
          >
            <Link href="/about">About</Link>
          </Button>

          <Button
            variant="link"
            asChild
            className={`p-0 sm:p-2 ${isCompact ? 'text-sm' : ''}`}
          >
            <Link href="/develop">Create</Link>
          </Button>
        </div>

        <div
          className={`flex gap-2 sm:gap-3 items-center  transition-all duration-300`}
        >
          <div
            className={`
            relative 
            flex
            text-sm font-bold 
            h-fit
            px-3
            py-1
            rounded-full
            border-2
            dark:bg-orange-400  bg-blue-500
            animate-pulse
          `}
          >
            <span className="relative z-10 text-[10px] sm:text-sm text-white dark:text-[#3d0000]">
              beta
            </span>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
