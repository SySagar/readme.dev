'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { Text, Button, Label } from '@groovy-box/ui';
import { dataType } from '../page';
import {
  Globe,
  Mail,
  Twitter,
  Linkedin,
  Youtube,
  Palette,
  Dribbble,
  Instagram,
} from 'lucide-react';

type typeContacts = {
  data: dataType;
  setData: React.Dispatch<React.SetStateAction<dataType>>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
};

export default function Contacts({
  data,
  setData,
  register,
  handleSubmit,
}: typeContacts) {
  const addEmoji = (emoji: any) => {
    setData((prev) => ({
      ...prev,
      description: prev.description + emoji,
    }));
  };

  return (
    <div className="main flex flex-row w-full">
      <div className="form-view flex flex-1  flex-col gap-52">
        <div className="form-body flex flex-col gap-8">
          <form
            className="flex flex-col gap-4 w-[600px]"
            onChange={handleSubmit((data) => {
              setData((prev) => ({
                ...prev,
                skills:
                  prev.skills && prev.skills.length > 0 ? prev.skills : [],
                contacts: {
                  ...prev.contacts,
                  ...data.contacts,
                },
              }));
            })}
          >
            <div className="flex border  border-[#666666] justify-start items-center rounded-sm">
              <Label
                className=" bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3  border-[#666666] flex items-center justify-center gap-2 text-center"
                htmlFor="website"
              >
                <Globe width={15} height={15} />
                <Text variant="subtitle-3">https://</Text>
              </Label>
              <input
                className="website w-full border-none outline-none"
                {...register('contacts.website')}
                placeholder="myWebsite.com"
              />
            </div>

            <div className="flex border border-[#666666] justify-start items-center rounded-sm">
              <Label
                className="bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3 border-[#666666] flex items-center justify-center gap-2"
                htmlFor="email"
              >
                <Mail width={15} height={15} />
                <span className="text-sm">mailto:</span>
              </Label>
              <input
                className="w-full border-none outline-none"
                {...register('contacts.email')}
                placeholder="example@email.com"
              />
            </div>

            {/* Twitter */}
            <div className="flex border border-[#666666] justify-start items-center rounded-sm">
              <Label
                className="bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3 border-[#666666] flex items-center justify-center gap-2"
                htmlFor="twitter"
              >
                <Twitter width={15} height={15} />
                <span className="text-sm">https://twitter.com/</span>
              </Label>
              <input
                className="w-full border-none outline-none "
                {...register('contacts.twitter')}
                placeholder="username"
              />
            </div>

            {/* LinkedIn */}
            <div className="flex border border-[#666666] justify-start items-center  rounded-sm">
              <Label
                className="bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3 border-[#666666] flex items-center justify-center gap-2"
                htmlFor="linkedin"
              >
                <Linkedin width={15} height={15} />
                <span className="text-sm">https://www.linkedin.com/in/</span>
              </Label>
              <input
                className="w-full border-none outline-none"
                {...register('contacts.linkedin')}
                placeholder="username"
              />
            </div>

            {/* YouTube */}
            <div className="flex border border-[#666666] justify-start items-center  rounded-sm">
              <Label
                className="bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3 border-[#666666] flex items-center justify-center gap-2"
                htmlFor="youtube"
              >
                <Youtube width={15} height={15} />
                <span className="text-sm">https://www.youtube.com/</span>
              </Label>
              <input
                className="w-full border-none outline-none"
                {...register('contacts.youtube')}
                placeholder="channel"
              />
            </div>

            {/* Discord */}
            <div className="flex border border-[#666666] justify-start items-center rounded-sm">
              <Label
                className="bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3 border-[#666666] flex items-center justify-center gap-2"
                htmlFor="discord"
              >
                <div>discord</div>
                <span className="text-sm">https://discord.com/</span>
              </Label>
              <input
                className="w-full border-none outline-none"
                {...register('contacts.discord')}
                placeholder="invite"
              />
            </div>

            {/* Behance */}
            <div className="flex border border-[#666666] justify-start items-center rounded-md rounded-sm">
              <Label
                className="bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3 border-[#666666] flex items-center justify-center gap-2"
                htmlFor="behance"
              >
                <Palette width={15} height={15} />
                <span className="text-sm">https://www.behance.net/</span>
              </Label>
              <input
                className="w-full border-none outline-none"
                {...register('contacts.behance')}
                placeholder="username"
              />
            </div>

            {/* Dribbble */}
            <div className="flex border border-[#666666] justify-start items-center rounded-md rounded-sm">
              <Label
                className="bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3 border-[#666666] flex items-center justify-center gap-2"
                htmlFor="dribble"
              >
                <Dribbble width={15} height={15} />
                <span className="text-sm">https://dribbble.com/</span>
              </Label>
              <input
                className="w-full border-none outline-none"
                {...register('contacts.dribble')}
                placeholder="username"
              />
            </div>

            {/* Instagram */}
            <div className="flex border border-[#666666] justify-start items-center rounded-md rounded-sm">
              <Label
                className="bg-[#f5f5f5]  dark:bg-[#1d1d1d] text-[#98a3a3] text-nowrap border-r-2 p-3 border-[#666666] flex items-center justify-center gap-2"
                htmlFor="instagram"
              >
                <Instagram width={15} height={15} />
                <span className="text-sm">http://instagram.com/</span>
              </Label>
              <input
                className="w-full border-none outline-none"
                {...register('contacts.instagram')}
                placeholder="username"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
