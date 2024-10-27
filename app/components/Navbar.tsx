'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@groovy-box/ui';
import Link from 'next/link';
import ThemeSwitcher from '@app/theme/ThemeSwitcher';

export default function Navbar() {
  const [activeLink, setActiveLink] = React.useState('home');

  return (
    <nav
      className={`flex items-center justify-between p-4 dark:bg-[#111111] dark:border-b-slate-600 border-b-[1px]`}
    >
      <div className="flex items-center space-x-2">
        <Button variant="link" asChild className="p-2 hover:text-slate-200">
          <Link href="/">Home</Link>
        </Button>

        <Button variant="link" className="p-2">
          <Link href="/about">About</Link>
        </Button>

        <Button variant="link" className="p-2">
          <Link href="/develop">Create</Link>
        </Button>
      </div>

      <div className="flex gap-3">
        <div
          className={`
        relative px-4 py-2 text-sm font-bold rounded-full
        ${'dark:bg-amber-400 dark:text-gray-900 bg-blue-500 text-white'}
        animate-pulse
      `}
        >
          <span className="relative z-10">beta</span>
          <div
            className={`
          absolute inset-0 rounded-full blur-sm
            ${'dark:bg-amber-400 bg-blue-400'}
        `}
          ></div>
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
