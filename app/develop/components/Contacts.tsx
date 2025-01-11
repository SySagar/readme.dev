'use client';
import React from 'react';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Text, Label } from '@groovy-box/ui';
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
import AnimateLayout from '@app/layout/AnimateLaoyout';

type typeContacts = {
  data: dataType;
  setData: React.Dispatch<React.SetStateAction<dataType>>;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  errors: any;
};

export default function Contacts({
  setData,
  register,
  handleSubmit,
  errors,
}: typeContacts) {
  return (
    <AnimateLayout>
      <div className="main flex flex-row w-full">
        <div className="form-view flex flex-1  flex-col gap-52">
          <div className="form-body flex flex-col gap-8">
            <form
              className="flex flex-col gap-4 w-[600px]"
              onChange={handleSubmit((data) => {
                console.log('contacts', data);
                setData((prev) => ({
                  ...prev,
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
                  type="email"
                  placeholder="example@email.com"
                />
              </div>
              {errors.contacts?.email && (
                <span className="text-red-500 text-xs">
                  {errors.contacts.email.message}
                </span>
              )}

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
              <div className="flex border border-[#666666] justify-start items-center rounded-sm">
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
              <div className="flex border border-[#666666] justify-start items-center rounded-sm">
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
              <div className="flex border border-[#666666] justify-start items-center rounded-sm">
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
    </AnimateLayout>
  );
}
