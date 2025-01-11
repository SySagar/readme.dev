'use client';
import React from 'react';
import { Text } from '@groovy-box/ui';
import Navbar from '../components/Navbar';
import PageAnimateLayout from '@app/layout/PageAnimateLayout';

export default function page() {
  return (
    <div className="h-screen w-screen bg-white text-black dark:bg-black dark:text-white overflow-hidden flex justify-center items-center relative duration-300">
      <Navbar />
      <PageAnimateLayout>
        <div>
          <Text variant="heading-1" alignment="left">
            Why?
          </Text>
          <div className="w-[500px] mt-6">
            <Text variant="body-2" className="w-1/2 text-wrap" alignment="left">
              I used to make cool fancy readme when I was in first year. But
              damn too much tedious work! Always tired . Later I came to know
              that this stuff can be automated. So I made this tool to automate
              the process of creating fancy readme using some basic. This
              quickly build up a very basic readme for your project.
              <br />
              <br />
              <br />
              Also this is the first project which uses my own design ui kit -{' '}
              <a
                className="dark:text-slate-200 text-slate-700 font-bold"
                target="_blank"
                href="https://ui.soumyasagar.in/"
              >
                Groovy Box UI
              </a>
              <br />
              with tailwindcss. I am very excited to see how it goes. Although
              it isn't that perfect but I am happy with the result as I am able
              to test my own design system in real world project.
            </Text>
          </div>
        </div>
      </PageAnimateLayout>
    </div>
  );
}
