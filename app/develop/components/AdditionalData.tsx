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
    
      setData(prevData => ({
        ...prevData,
        showCounter: {
          value: formData.showCounter?.value || false,
          handle: formData.showCounter?.handle || ''
        }
      }));
    };
  
    const handleSwitchChange = (checked:boolean) => {
      setData(prevData => ({
        ...prevData,
        showCounter: {
          ...prevData.showCounter,
          value: checked,
          handle: ''
        }
      }));
    };

    const handleGithubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({
            ...prevData,
            showCounter: {
            ...prevData.showCounter,
            handle: e.target.value
            }
        }));
        }


    console.log('data', data);
  
    return (
      <div className="main flex flex-row w-full">
        <div className="form-view flex flex-1 flex-col gap-52">
          <div className="form-body flex flex-col gap-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=""
            >
              <div className="flex w-full items-center gap-40">
                <Label htmlFor="ShowProfileCount">
                  Show Profile Visitor Count
                </Label>
                <Switch
                  id="ShowProfileCount"
                  className="ShowProfileCount"
                  {...register('showCounter.value')}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
  
              {
              Object.keys(data).length > 0 
              && data.showCounter.value && (
                <div className="mt-4 flex w-full items-center gap-10">
                  <Label htmlFor="profileHandle text-nowrap">
                    Handle
                  </Label>
                  <input
                    id="profileHandle"
                    type="text"
                    className="rounded-md border px-3 py-2"
                    {...register('showCounter.handle')}
                    onChange={handleGithubChange}
                    defaultValue={data.showCounter.handle}
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }