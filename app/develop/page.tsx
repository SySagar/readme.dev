"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, Button, Label } from "@groovy-box/ui";
import Markdown from "react-markdown";
import useMarkdownParser from "@app/hooks/useMarkdownParser";
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import EmojiPicker from 'emoji-picker-react';
import {Smile} from 'lucide-react'

export type dataType = {
  firstName: string;
  description: string;
  location: string;
  currentlyBuilding: string;
};

export default function page() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState<dataType>({} as dataType);
  const [emmojiPicker, setEmmojiPicker] = useState(false)

  const markdownPreview = useMarkdownParser(data);
  console.log("tests",markdownPreview);

  const addEmoji = (emoji: any) => {
    data.description += emoji.native
  }

  const handleEmoji = () => {
    setEmmojiPicker(!emmojiPicker)
  }

  console.log("test", emmojiPicker)

  return (
    <div className="flex relative flex-col items-center justify-center h-screen">
      <Text variant="heading-1" className="absolute top-8 left-16 py-16">
        Create Your Story
      </Text>
      <div className="main flex flex-row  min-w-full px-20 mt-80 py-8 gap-20">
        <div className="form-view flex flex-1  flex-col gap-52">
          <div className="form-body flex flex-col gap-8">
            <form
              className="form"
              onChange={handleSubmit((data) => {
                setData(data as dataType);
              })}
            >
              <Label className="form__label text-nowrap" htmlFor="firstName">
                Name:
              </Label>
              <input
                className="firstName"
                {...register("firstName")}
                placeholder="Your name"
              />

              <Label className="form__label" htmlFor="description">
                Description:
              </Label>
              <div className="flex gap-2 relative border-2">
              <textarea
                {...register("description")}
                className="description"
                placeholder="Briefly describe about yourself"
                />
              <Button onClick={handleEmoji} variant={"outline"} size={"icon"}>
                <Smile/>
              </Button>
                </div>
                <EmojiPicker open={emmojiPicker} className="absolute right-0" />

              <Label className="form__label text-nowrap" htmlFor="firstName">
                Location:
              </Label>
              <input
                className="location"
                {...register("location")}
                placeholder="Your location"
              />

              <Label className="form__label text-nowrap" htmlFor="firstName">
                Currently Building:
              </Label>
              <input
                className="currentlyBuilding"
                {...register("currentlyBuilding")}
                placeholder="Currently Building"
              />

              {/* <input type="submit" /> */}
              <div className="w-full flex justify-center">
                <Button variant={"default"} type="submit" className="max-w-24">
                  submit
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="preview  flex flex-1 p-6 rounded-lg h-[600px] border-[#575757] border-2">
          {markdownPreview ? (
            <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className="markdown">
              {markdownPreview}

            </Markdown>
          ) : (
            <p className="text-center">No content to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}
