'use client';
import React from 'react';
import { Text } from '@groovy-box/ui';
import Navbar from '../components/Navbar';

export default function page() {
  return (
    <div className="h-screen w-screen bg-white text-black dark:bg-black dark:text-white overflow-hidden flex justify-center items-center relative duration-300">
      <Navbar />
      <div>
        <Text variant="heading-1" alignment="left">
          Why?
        </Text>
        <div className="w-[500px] mt-6">
          <Text variant="body-2" className="w-1/2 text-wrap" alignment="left">
            I used to make cool fancy readme when I was in first year. But damn
            too much tedious work! Always tired . Later I came to know that this
            stuff can be automated. So I made this tool to automate the process
            of creating fancy readme using some basic. This quickly build up a
            very basic readme for your project.
            <br />
            <br />
            <br />
            Although I am not a fan of fancy readme but I know that it is
            important to have a good readme for your project. So I made this
            tool to help you create a fancy readme for your project. This really
            helps people to understand your project better and also helps you to
            get more stars on your project. Hence why worry maintaing those
            stuff when we can automate right?
          </Text>
        </div>
      </div>
    </div>
  );
}
