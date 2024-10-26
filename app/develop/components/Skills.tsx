import React, { useEffect } from 'react';
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { Chip } from '@groovy-box/ui';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@groovy-box/ui';
import useMarkdownParser from '@app/hooks/useMarkdownParser';

export type DataType = {
  firstName: string;
  description: string;
  location: string;
  currentlyBuilding: string;
  skills?: string[];
};

type TypeBasicInfo = {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
};

export default function Skills({
  data,
  setData,
  register,
  handleSubmit,
}: TypeBasicInfo) {
  const { setValue, watch } = useForm({
    defaultValues: {
      skills: data.skills || [],
    },
  });

  const selectedSkills = watch('skills') || [];
  const registerSkills = register('skills');
  const markdownPreview = useMarkdownParser(data);

  const toggleSkill = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((item) => item !== skill)
      : [...selectedSkills, skill];

    setValue('skills', updatedSkills, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };

  useEffect(() => {
    if (data.firstName === undefined && selectedSkills.length > 0) {
      setData({
        ...data,
        firstName: '',
      });
    }
  }, [selectedSkills]);

  return (
    <div className="main flex flex-row w-full">
      <div className="form-view flex flex-1 flex-col gap-8">
        <form
          onChange={handleSubmit((data) => {
            setData(data as DataType);
          })}
        >
          <input
            type="hidden"
            {...registerSkills}
            value={JSON.stringify(selectedSkills)}
          />

          <div className="skills w-[350px]">
            <Accordion type="single" className="w-full" collapsible>
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger>Core Skills</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row flex-wrap gap-3">
                    {[
                      'React',
                      'Node',
                      'Express',
                      'Typescript',
                      'Javascript',
                      'HTML',
                      'CSS',
                      'GraphQL',
                      'Prisma',
                      'Postgres',
                      'CockroachDB',
                    ].map((skill) => (
                      <Chip
                        key={skill}
                        variant={
                          selectedSkills.includes(skill) ? 'filled' : 'outlined'
                        }
                        className="rounded-sm cursor-pointer"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </form>
      </div>
    </div>
  );
}
