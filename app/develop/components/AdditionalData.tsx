'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  set,
} from 'react-hook-form';
import { Text, Button, Label } from '@groovy-box/ui';
import { Switch } from '@groovy-box/ui';
import { dataType } from '../page';
import { SelectIcon } from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectValue,
} from '@groovy-box/ui';

type typeBasicInfo = {
  data: dataType;
  setData: React.Dispatch<React.SetStateAction<dataType>>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
};

export default function AdditionalData({
  data,
  setData,
  register,
  handleSubmit,
}: typeBasicInfo) {
  console.log('data', data);

  const options = [
    { label: 'dark', value: 'dark' },
    { label: 'radical', value: 'radical' },
    { label: 'merko', value: 'merko' },
    { label: 'gruvbox', value: 'gruvbox' },
    { label: 'tokyonight', value: 'tokyonight' },
    { label: 'onedark', value: 'onedark' },
    { label: 'cobalt', value: 'cobalt' },
    { label: 'synthwave', value: 'synthwave' },
    { label: 'dracula', value: 'dracula' },
  ];

  const onSubmit = (formData: FieldValues) => {
    setData((prevData) => ({
      ...prevData,
      showCounter: {
        value: formData.showCounter.value,
        handle: formData.showCounter.handle,
      },
      showTrophies: {
        value: formData.showTrophies.value,
        handle: formData.showTrophies.handle,
      },
    }));
  };

  const handleSwitchChange = (checked: boolean, type: keyof dataType) => {
    setData((prevData) => ({
      ...prevData,
      [type]: {
        value: checked,
        handle: '',
      },
    }));
  };

  const handleStatsSwitchChange = (checked: boolean, type: keyof dataType) => {
    console.log('checked', type);
    setData((prevData) => ({
      ...prevData,
      [type]: {
        value: checked,
        handle: '',
        theme: 'radical',
      },
    }));
  };

  const handleGithubChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof dataType,
  ) => {
    console.log('e', e.target.value);
    setData((prevData) => ({
      ...prevData,
      [type]: {
        value: true,
        handle: e.target.value,
      },
    }));
  };

  const handleGithubStatsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof dataType,
  ) => {
    console.log('e', e.target.value);
    setData((prevData) => ({
      ...prevData,
      [type]: {
        value: true,
        handle: e.target.value,
        theme: 'radical',
      },
    }));
  };

  const handleThemeChange = (val: any) => {
    console.log('e', val);

    setData((prevData) => ({
      ...prevData,
      showStats: {
        value: true,
        handle: data.showStats.handle,
        theme: val,
      },
    }));
  };

  console.log('data', data);

  return (
    <div className="main flex flex-row w-full">
      <div className="form-view flex flex-1 flex-col gap-52">
        <div className="form-body flex flex-col gap-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-12"
          >
            <div>
              <div className="flex w-full items-center justify-between gap-40">
                <Label htmlFor="ShowProfileCount">
                  Show Profile Visitor Count
                </Label>
                <Switch
                  id="ShowProfileCount"
                  className="ShowProfileCount"
                  checked={
                    Object.keys(data).length > 0 &&
                    data.showCounter &&
                    data.showCounter.value
                  }
                  {...register('showCounter.value')}
                  onCheckedChange={(e) => handleSwitchChange(e, 'showCounter')}
                />
              </div>

              {Object.keys(data).length > 0 &&
                data.showCounter &&
                data.showCounter.value && (
                  <div className="mt-4 flex w-full items-center  gap-10">
                    <Label htmlFor="profileHandle text-nowrap">Handle</Label>
                    <input
                      id="profileHandle"
                      type="text"
                      className="rounded-md border px-3 py-2"
                      {...register('showCounter.handle')}
                      onChange={(e) => handleGithubChange(e, 'showCounter')}
                      defaultValue={data.showCounter.handle}
                    />
                  </div>
                )}
            </div>
            <div>
              <div className="flex w-full items-center justify-between gap-40">
                <Label htmlFor="ShowTrophies">Show Trophies</Label>
                <Switch
                  id="ShowTrophies"
                  className="ShowTrophies"
                  checked={
                    Object.keys(data).length > 0 &&
                    data.showTrophies &&
                    data.showTrophies.value
                  }
                  {...register('showTrophies.value')}
                  onCheckedChange={(e) => handleSwitchChange(e, 'showTrophies')}
                />
              </div>

              {Object.keys(data).length > 0 &&
                data.showTrophies &&
                data.showTrophies.value && (
                  <div className="mt-4 flex w-full items-center gap-10">
                    <Label htmlFor="profileHandle text-nowrap">Handle</Label>
                    <input
                      id="profileHandle"
                      type="text"
                      className="rounded-md border px-3 py-2"
                      {...register('showTrophies.handle')}
                      onChange={(e) => handleGithubChange(e, 'showTrophies')}
                      defaultValue={data.showTrophies.handle}
                    />
                  </div>
                )}
            </div>
            <div>
              <div className="flex w-full items-center justify-between gap-40">
                <Label htmlFor="ShowStats">Show Stats</Label>
                <Switch
                  id="ShowStats"
                  className="ShowStats"
                  checked={
                    Object.keys(data).length > 0 &&
                    data.showStats &&
                    data.showStats.value
                  }
                  {...register('showStats.value')}
                  onCheckedChange={(e) =>
                    handleStatsSwitchChange(e, 'showStats')
                  }
                />
              </div>

              {Object.keys(data).length > 0 &&
                data.showStats &&
                data.showStats.value && (
                  <div className="mt-4 flex w-full items-center gap-10">
                    <Label htmlFor="profileHandle text-nowrap">Handle</Label>
                    <input
                      id="profileHandle"
                      type="text"
                      className="rounded-md border px-3 py-2"
                      {...register('showStats.handle')}
                      onChange={(e) => handleGithubStatsChange(e, 'showStats')}
                      defaultValue={data.showStats.handle}
                    />

                    <Select
                      aria-label="Theme"
                      {...register('showStats.theme')}
                      onValueChange={handleThemeChange}
                    >
                      <SelectTrigger
                        className="SelectTrigger flex flex-row items-center justify-center"
                        aria-label="Theme"
                      >
                        <SelectValue placeholder="Select a Theme…" />
                        <SelectIcon className="SelectIcon">
                          <ChevronDownIcon />
                        </SelectIcon>
                      </SelectTrigger>

                      <SelectContent className="SelectContent w-full">
                        <SelectGroup className="max-h-40 w-full">
                          {options.map((option: any) => (
                            <SelectItem
                              key={option.value}
                              className="text-primaryText"
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
