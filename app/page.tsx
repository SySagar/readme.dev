'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@groovy-box/ui';
import Navbar from './components/Navbar';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [currentWord, setCurrentWord] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const words = ['Amazing', 'Dynamic', 'Fantastic'];

  const [cellCount, setCellCount] = useState(100);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [currentWord]);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setCellCount(isLargeScreen ? 100 : 200);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateGlowingCells = () => {
      const cells = document.querySelectorAll('.cell-inner');
      cells.forEach((cell) => cell.classList.remove('glow'));
      const glowCount = Math.floor(Math.random() * 5) + 3; // 3 to 7 cells glow at a time
      const shuffled = Array.from(cells).sort(() => 0.5 - Math.random());
      shuffled
        .slice(0, glowCount)
        .forEach((cell) => cell.classList.add('glow'));
    };

    const glowInterval = setInterval(updateGlowingCells, 2000);
    updateGlowingCells();

    return () => clearInterval(glowInterval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-screen w-screen bg-white text-black dark:bg-black dark:text-white overflow-hidden relative transition-colors duration-300">
      <Navbar />
      {/* Bird background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="bird-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 50 Q30 30 40 50 Q50 70 60 50"
                stroke="currentColor"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bird-pattern)" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-radial-gradient"></div>

      <div className={`absolute top-1/2 -translate-y-1/2  w-full z-50`}>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl hidden lg:block sm:text-4xl md:text-6xl  font-bold mb-8 text-center whitespace-nowrap ">
            Build{''}
            {words.map((word, index) => (
              <span
                key={word}
                className={`absolute transition-all blur duration-1000 ease-in-out ml-5 ${
                  index === currentWord
                    ? 'opacity-100 blur-none translate-y-0'
                    : 'opacity-0 blur-md translate-y-4'
                }`}
              >
                {word}
              </span>
            ))}
            <span className="ml-72">Readme for Github</span>
          </h1>
          <h3 className="inline lg:hidden font-bold mb-8 text-left lg:text-center whitespace-nowrap ">
            Build{''}
            {words.map((word, index) => (
              <span
                key={word}
                className={`absolute transition-all blur duration-1000 ease-in-out ml-5 ${
                  index === currentWord
                    ? 'opacity-100 blur-none translate-y-0'
                    : 'opacity-0 blur-md translate-y-4'
                }`}
              >
                {word}
              </span>
            ))}
            <br className="lg:hidden" />
            <span className="lg:ml-72">Readme for Github</span>
          </h3>
          <p className="text-[#71717a] w-5/6 md:w-1/3 text-center">
            Say goodbye to tedious README writing. Our tool offers a seamless
            experience, transforming your ideas into polished documentation.
          </p>
          <div className="flex flex-row gap-3 mt-16">
            <Button
              onClick={() => {
                router.push('/develop');
              }}
            >
              Start Building
            </Button>
            <a
              href="https://github.com/SySagar/readme.dev/issues"
              target="_blank"
            >
              <Button variant="outline">Suggest options</Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-[100px] z-20">
        <div className="flex flex-col gap-2 text-[#71717a] items-center">
          <p className="font-light text-[12px] sm:text-sm">
            Built using
            <a
              href="https://ui.soumyasagar.in/"
              target="_blank"
              className="dark:text-white text-black text-md px-1"
            >
              Groovy Box
            </a>
            and
            <a
              href="https://nextjs.org/"
              target="_blank"
              className="dark:text-white text-black text-md px-1"
            >
              NextJS
            </a>
          </p>
          <p className=" text-[12px] sm:text-sm">
            © {moment().format('YYYY')} Readme.dev
          </p>
        </div>
      </div>

      <div className="grid-container h-full pt-1 sm:pt-[3.7rem] border -z-10">
        <div className="grid h-[180vmin] w-[100vw] lg:h-[190vmin] lg:w-[100vw]">
          {[...Array(cellCount)].map((_, i) => (
            <div key={i} className="cell w-[70px] md:w-full ">
              <div className="cell-inner"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
