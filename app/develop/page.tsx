'use client';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, Button, Label } from '@groovy-box/ui';
import Markdown from 'react-markdown';
import useMarkdownParser from '@app/hooks/useMarkdownParser';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@app/components/ui/tabs';
import BasicInfo from './components/BasicInfo';
import Skills from './components/Skills';

export type dataType = {
  firstName: string;
  description: string;
  location: string;
  currentlyBuilding: string;
  skills?: string[];
};

export default function Develop() {
  const { register, handleSubmit, watch } = useForm();
  const [data, setData] = useState<dataType>({} as dataType);

  const markdownPreview = useMarkdownParser(data);

  return (
    <div className="flex relative flex-col items-center justify-center h-screen">
      <Text variant="heading-1" className="absolute top-8 left-16 py-16">
        Create Your Story
      </Text>
      <div className="main flex flex-row  min-w-full px-48 mt-80 py-8 gap-20">
        <div className="form-view flex flex-1  flex-col gap-52">
          <div className="form-body flex flex-col gap-8">
            <Tabs
              defaultValue="basic-info"
              className="flex flex-col justify-center items-center gap-9"
            >
              <TabsList>
                <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              <TabsContent value="basic-info" className="w-full">
                <BasicInfo
                  data={data}
                  setData={setData}
                  register={register}
                  handleSubmit={handleSubmit}
                />
              </TabsContent>
              <TabsContent value="skills">
                <Skills
                  data={data}
                  setData={setData}
                  register={register}
                  handleSubmit={handleSubmit}
                />
              </TabsContent>
            </Tabs>

            {/* <input type="submit" /> */}
            <div className="w-full flex justify-center">
              <Button variant={'default'} type="submit" className="max-w-24">
                submit
              </Button>
            </div>
          </div>
        </div>
        <div className="preview  flex flex-1 p-6 rounded-lg h-[600px] border-[#575757] border-2">
          {markdownPreview ? (
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className="markdown"
            >
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
