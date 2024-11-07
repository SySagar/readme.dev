'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  set,
  useForm,
} from 'react-hook-form';
import { Text, Button, Label } from '@groovy-box/ui';
import Markdown from 'react-markdown';
import useMarkdownParser from '@app/hooks/useMarkdownParser';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import { dataType } from '../page';

type typeBasicInfo = {
  data: dataType;
  setData: React.Dispatch<React.SetStateAction<dataType>>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
};

export default function BasicInfo({
  data,
  setData,
  register,
  handleSubmit,
}: typeBasicInfo) {
  const [emmojiPicker, setEmmojiPicker] = useState(false);
  const { watch, setValue } = useForm();

  const markdownPreview = useMarkdownParser(data);
  const addEmoji = (emoji: any) => {
    setData((prev) => ({
      ...prev,
      description: prev.description + emoji,
    }));
  };

  const handleEmoji = (e: any) => {
    e.preventDefault();
    setEmmojiPicker(!emmojiPicker);
  };

  return (
    <div className="main flex flex-row w-full">
      <div className="form-view flex flex-1  flex-col gap-52">
        <div className="form-body flex flex-col gap-8">
          <form
            className="form"
            onChange={handleSubmit((data) => {
              setData((prev) => ({
                ...prev,
                ...data,
                contacts:
                  prev.contacts && Object.entries(prev.contacts).length > 0
                    ? (prev.contacts as any)
                    : [],
                skills:
                  prev.skills && prev.skills.length > 0 ? prev.skills : [],
              }));
            })}
          >
            <Label className="form__label text-nowrap" htmlFor="firstName">
              Name:
            </Label>
            <input
              className="firstName"
              {...register('firstName')}
              placeholder="Your name"
            />

            <Label className="form__label" htmlFor="description">
              Description:
            </Label>
            <div className="flex gap-2 relative ">
              <textarea
                {...register('description')}
                value={data.description}
                className="description"
                placeholder="Briefly describe about yourself"
              />
              <Button onClick={handleEmoji} variant={'outline'} size={'sm'}>
                <Smile size={15} />
              </Button>
            </div>
            <EmojiPicker
              open={emmojiPicker}
              style={{
                position: 'absolute',
                zIndex: 100,
                bottom: '10px',
                left: '45%',
              }}
              onEmojiClick={(item) => addEmoji(item.emoji)}
            />

            <Label className="form__label text-nowrap" htmlFor="firstName">
              Location:
            </Label>
            <input
              className="location"
              {...register('location')}
              placeholder="Your location"
            />

            <Label className="form__label text-nowrap" htmlFor="firstName">
              Currently Building:
            </Label>
            <input
              className="currentlyBuilding"
              {...register('currentlyBuilding')}
              placeholder="Currently Building , Link"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
