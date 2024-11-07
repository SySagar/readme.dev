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

  const handleSwitchChange = (checked: boolean,type: keyof dataType) => {
    console.log('checked', type);
    setData((prevData) => ({
      ...prevData,
      [type]: {
        value: checked,
        handle: '',
      },
    }));
  };

  const handleGithubChange = (e: React.ChangeEvent<HTMLInputElement>,type:keyof dataType) => {
    console.log('e', e.target.value)
    setData((prevData) => ({
      ...prevData,
      [type]: {
        value: e.target.value,
        handle: e.target.value,
      },
    }));
    
  };

  console.log('data', data);

  return (
    <div className="main flex flex-row w-full">
      <div className="form-view flex flex-1 flex-col gap-52">
        <div className="form-body flex flex-col gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
            <div>
                
            <div className="flex w-full items-center justify-between gap-40">
              <Label htmlFor="ShowProfileCount">
                Show Profile Visitor Count
              </Label>
              <Switch
                id="ShowProfileCount"
                className="ShowProfileCount"
                checked={Object.keys(data).length>0 && data.showCounter && data.showCounter.value}
                {...register('showCounter.value')}
                onCheckedChange={(e)=>handleSwitchChange(e,"showCounter")}
              />
            </div>

            {Object.keys(data).length > 0 && data.showCounter && data.showCounter.value && (
              <div className="mt-4 flex w-full items-center  gap-10">
                <Label htmlFor="profileHandle text-nowrap">Handle</Label>
                <input
                  id="profileHandle"
                  type="text"
                  className="rounded-md border px-3 py-2"
                  {...register('showCounter.handle')}
                  onChange={(e)=>handleGithubChange(e,"showCounter")}
                  defaultValue={data.showCounter.handle}
                />
              </div>
            )}
            
            </div>
            <div>
                
                <div className="flex w-full items-center justify-between gap-40">
                  <Label htmlFor="ShowTrophies">
                    Show Trophies
                  </Label>
                  <Switch
                    id="ShowTrophies"
                    className="ShowTrophies"
                    checked={Object.keys(data).length>0 && data.showTrophies && data.showTrophies.value}
                    {...register('showTrophies.value')}
                    onCheckedChange={(e)=>handleSwitchChange(e,"showTrophies")}
                  />
                </div>
    
                {Object.keys(data).length > 0 && data.showTrophies && data.showTrophies.value && (
                  <div className="mt-4 flex w-full items-center gap-10">
                    <Label htmlFor="profileHandle text-nowrap">Handle</Label>
                    <input
                      id="profileHandle"
                      type="text"
                      className="rounded-md border px-3 py-2"
                      {...register('showTrophies.handle')}
                      onChange={(e)=>handleGithubChange(e,"showTrophies")}
                      defaultValue={data.showTrophies.handle}
                    />
                  </div>
                )}
                
                </div>
          </form>
        </div>
      </div>
    </div>
  );
}
