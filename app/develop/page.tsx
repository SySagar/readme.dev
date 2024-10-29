'use client';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, Button, Label, Toaster } from '@groovy-box/ui';
import Markdown from 'react-markdown';
import useMarkdownParser from '@app/hooks/useMarkdownParser';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useToast } from '@groovy-box/ui';
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
  const mdEditor = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const markdownPreview = useMarkdownParser(data);
  const [viewType, setViewType] = useState<'markdown' | 'preview'>('preview');

  console.log('markdownPreview', markdownPreview);

  const copyMD = async () => {
    await navigator.clipboard
      .writeText(mdEditor.current?.innerText || '')
      .then(() => {
        toast({
          title: 'Copied to clipboard',
          description: 'Markdown copied to clipboard',
          status: 'success',
        });
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'Failed to copy markdown to clipboard',
          status: 'error',
        });
      });
  };

  return (
    <div className="flex relative flex-col items-center justify-center h-screen">
      <Toaster />
      <Text variant="heading-1" className="absolute top-28 left-16 py-16 ">
        Create Your Story
      </Text>
      <div className="main flex flex-row  min-w-full px-48 mt-48 py-8 gap-20 pt-44">
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
        <div className="flex flex-col flex-1 justify-start items-start border-[#575757] border-2 rounded-lg h-[800px] ">
          <div className="preview relative flex flex-1 p-6 pb-0 rounded-t-lg  w-full border-[#575757] border-b-2">
            {viewType === 'preview' ? (
              <div>
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
            ) : (
              <div className="flex flex-col  items-start justify-start border w-full gap-5 overflow-hidden h-[670px]">
                <div className="border w-full flex justify-end items-center dark:bg-[#111111] p-3">
                  <Button onClick={copyMD} className="w-fit">
                    copy
                  </Button>
                </div>
                <div
                  ref={mdEditor}
                  className="p-3 whitespace-pre-wrap flex justify-start items-start overflow-scroll max-w-[550px]   no-scrollbar"
                >
                  {markdownPreview}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-4 p-3">
            <Button
              onClick={() => setViewType('preview')}
              variant={viewType === 'preview' ? 'outline' : 'default'}
            >
              Preview
            </Button>
            <Button
              onClick={() => setViewType('markdown')}
              variant={viewType === 'markdown' ? 'outline' : 'default'}
            >
              Markdown
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
