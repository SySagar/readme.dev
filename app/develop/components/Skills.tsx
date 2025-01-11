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
import AnimateLayout from '@app/layout/AnimateLaoyout';

// Types
export type DataType = {
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

type TypeBasicInfo = {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
};

type SkillCategory = {
  title: string;
  skills: string[];
};

// Skill categories dataset
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Rust', 'Go'],
  },
  {
    title: 'Frontend',
    skills: [
      'React',
      'Vue',
      'Angular',
      'Next.js',
      'Svelte',
      'HTML',
      'CSS',
      'TailwindCSS',
    ],
  },
  {
    title: 'Backend',
    skills: [
      'Node.js',
      'Express',
      'NestJS',
      'Django',
      'Spring Boot',
      'GraphQL',
      'REST',
    ],
  },
  {
    title: 'Web3',
    skills: [
      'Solidity',
      'Web3.js',
      'Ethers.js',
      'Hardhat',
      'IPFS',
      'Smart Contracts',
    ],
  },
];

type SkillAccordionProps = {
  category: SkillCategory;
  selectedSkills: string[];
  onToggle: (skill: string) => void;
};

const SkillAccordion: React.FC<SkillAccordionProps> = ({
  category,
  selectedSkills,
  onToggle,
}) => {
  return (
    <AccordionItem value={`item-${category.title}`} className="border-b-0 p-4">
      <AccordionTrigger>{category.title}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-row flex-wrap gap-3">
          {category.skills.map((skill) => (
            <Chip
              key={skill}
              variant={selectedSkills.includes(skill) ? 'filled' : 'outlined'}
              className="rounded-sm cursor-pointer"
              onClick={() => onToggle(skill)}
            >
              {skill}
            </Chip>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

// Main Skills Component
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
    <AnimateLayout>
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
                {SKILL_CATEGORIES.map((category) => (
                  <SkillAccordion
                    key={category.title}
                    category={category}
                    selectedSkills={selectedSkills}
                    onToggle={toggleSkill}
                  />
                ))}
              </Accordion>
            </div>
          </form>
        </div>
      </div>
    </AnimateLayout>
  );
}
