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
import AdditionalData from './components/AdditionalData';
import Contacts from './components/Contacts';
// import { formSchema, FormData } from '@app/schema/contactsSchema';
// import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import { useTheme } from 'next-themes';


export type dataType = {
  firstName: string;
  description: string;
  location: string;
  currentlyBuilding: string;
  skills?: string[];
  showCounter?: {
    value: boolean;
    handle: string;
  };
  showTrophies?: {
    value: boolean;
    handle: string;
  };
  showStats?: {
    value: boolean;
    theme: string;
    handle: string;
  };
  contacts?: {
    email?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    dribble?: string;
    discord?: string;
    twitch?: string;
    behance?: string;
    instagram?: string;
    website?: string;
  };
};

export default function Develop() {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [data, setData] = useState<dataType>({
    firstName: '',
    description: '',
    location: '',
    currentlyBuilding: '',
    skills: [],
    showCounter: {
      value: false,
      handle: '',
    },
    showTrophies: {
      value: false,
      handle: '',
    },
    showStats: {
      value: false,
      theme: '',
      handle: '',
    },
    contacts: {
      email: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      dribble: '',
      discord: '',
      twitch: '',
      behance: '',
      instagram: '',
      website: '',
    },
  } as dataType);
  const mdEditor = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { resolvedTheme } = useTheme();
  console.log('resolvedTheme', resolvedTheme);

  const markdownPreview = useMarkdownParser(data,resolvedTheme);
  const [viewType, setViewType] = useState<'markdown' | 'preview'>('preview');

  console.log('data', data);
  console.log('oapge errors', errors);

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
    <div className="flex relative flex-col items-center justify-start gap-16 h-screen">
      <p className="hidden sm:block text-4xl font-bold text-center text-black dark:text-white z-20 py-8">
        Create Your Story
      </p>

      <div className="hidden sm:block absolute top-8 right-10">
        <a href="/" className="flex gap-1 items-center justify-center text-sm">
          <ChevronLeft size={15} />
          <span className="mt-1">Go home</span>
        </a>
      </div>

      <div className="hidden sm:flex main flex-row  min-w-full px-48 pb-8 gap-20">
        <div className="form-view flex flex-1  flex-col gap-52">
          <div className="form-body flex flex-col gap-8">
            <Tabs
              defaultValue="basic-info"
              className="flex flex-col justify-center items-center gap-9"
            >
              <TabsList>
                <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="additional">Additional</TabsTrigger>
              </TabsList>
              <TabsContent value="basic-info" className="w-full mt-5">
                <BasicInfo
                  data={data}
                  setData={setData}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                />
              </TabsContent>
              <TabsContent value="skills" className="mt-5">
                <Skills
                  data={data}
                  setData={setData}
                  register={register}
                  handleSubmit={handleSubmit}
                />
              </TabsContent>
              <TabsContent value="contacts" className="mt-5">
                <Contacts
                  data={data}
                  setData={setData}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                />
              </TabsContent>
              <TabsContent value="additional" className="mt-5">
                <AdditionalData
                  data={data}
                  setData={setData}
                  register={register}
                  handleSubmit={handleSubmit}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-start items-start border-[#575757] border-2 rounded-lg h-[700px] ">
          <div className="preview relative flex flex-1 p-6 rounded-t-lg    overflow-scroll no-scrollbar w-full border-[#575757] border-b-2 h-[650px]">
            {viewType === 'preview' ? (
              <div>
                {markdownPreview ? (
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="markdown pb-2"
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

      <div className=' md:hidden flex relative flex-col items-center px-4  gap-16 h-screen justify-center'>
        <Text variant='subtitle-2'>
        We recommend using the product in larger screens for better experience
        </Text>
      </div>
    </div>
  );
}
