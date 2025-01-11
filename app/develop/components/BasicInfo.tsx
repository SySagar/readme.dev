'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { Text, Button, Label } from '@groovy-box/ui';
import useMarkdownParser from '@app/hooks/useMarkdownParser';
import AnimateLayout from '@app/layout/AnimateLaoyout';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import { dataType } from '../page';

type typeBasicInfo = {
  data: dataType;
  setData: React.Dispatch<React.SetStateAction<dataType>>;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  errors: any;
};

export default function BasicInfo({
  data,
  setData,
  register,
  handleSubmit,
  errors,
}: typeBasicInfo) {
  const [emmojiPicker, setEmmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const markdownPreview = useMarkdownParser(data);
  const addEmoji = (emoji: any) => {
    setData((prev) => ({
      ...prev,
      description: (prev.description || '') + emoji.emoji,
    }));
  };

  const handleEmoji = (e: any) => {
    e.preventDefault();
    setEmmojiPicker(!emmojiPicker);
  };

  const closeEmoji = () => {
    setEmmojiPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        closeEmoji();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onFormChange = handleSubmit((formData) => {
    setData((prev) => ({
      ...prev,
      firstName: formData.firstName || prev.firstName,
      description: formData.description || prev.description,
      location: formData.location || prev.location,
      currentlyBuilding: formData.currentlyBuilding || prev.currentlyBuilding,
    }));
  });

  return (
    <AnimateLayout>
      <div className="main flex flex-row w-full">
        <div className="form-view flex flex-1 flex-col gap-52">
          <div className="form-body flex flex-col gap-8">
            <form className="form" onChange={onFormChange}>
              <Label className="form__label text-nowrap" htmlFor="firstName">
                Name:
              </Label>
              <input
                className="firstName"
                {...register('firstName')}
                defaultValue={data.firstName}
                placeholder="Your name"
              />

              <Label className="form__label" htmlFor="description">
                Description:
              </Label>
              <div className="flex flex-col justify-start items-start w-full ">
                <div className="flex w-full gap-2 relative">
                  <textarea
                    {...register('description')}
                    value={data.description || ''}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }));
                    }}
                    className="description"
                    placeholder="Briefly describe about yourself"
                  />
                  <Button onClick={handleEmoji} variant={'outline'} size={'sm'}>
                    <Smile size={15} />
                  </Button>
                </div>
                {emmojiPicker && (
                  <div
                    ref={emojiPickerRef}
                    className="absolute z-50 right-0 top-1/4"
                  >
                    <EmojiPicker
                      width={300}
                      height={400}
                      onEmojiClick={addEmoji}
                    />
                  </div>
                )}
                {errors.description && (
                  <Text
                    variant="body-3"
                    alignment="left"
                    className="text-red-500"
                  >
                    {errors.description.message}
                  </Text>
                )}
              </div>

              <Label className="form__label text-nowrap" htmlFor="location">
                Location:
              </Label>
              <input
                className="location"
                {...register('location')}
                defaultValue={data.location}
                placeholder="Your location"
              />

              <Label
                className="form__label text-nowrap"
                htmlFor="currentlyBuilding"
              >
                Currently Building:
              </Label>
              <input
                className="currentlyBuilding"
                {...register('currentlyBuilding')}
                defaultValue={data.currentlyBuilding}
                placeholder="Currently Building, Link"
              />
            </form>
          </div>
        </div>
      </div>
    </AnimateLayout>
  );
}
