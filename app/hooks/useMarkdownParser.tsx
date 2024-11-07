import { dataType } from '@app/develop/page';
import { useState, useEffect } from 'react';
import {
  generateSocialLinks,
  type SocialMediaData,
} from '@app/lib/generateSocial';
import { split } from 'postcss/lib/list';
import { tree } from 'next/dist/build/templates/app-page';

const useMarkdownParser = (formData: dataType) => {
  const [markdownContent, setMarkdownContent] = useState(
    'Your markdown will appear here...',
  );

  const generateField = (
    value: string,
    prefix: string,
    color: string,
    prefixSpacing: number = 1,
    prefixWords: string = '',
    type: string = 'span',
    link: string = '',
  ) => {
    if (!value) return '';
    const spacer = '&nbsp;'.repeat(prefixSpacing);

    const validTag = ['p', 'span', 'a'].includes(type.toLowerCase())
      ? type.toLowerCase()
      : 'span';
    const anchorStyle =
      validTag === 'a'
        ? 'text-decoration: underline; text-decoration-color: slategray;'
        : '';

    return `
${spacer}${prefix} ${prefixWords} <${validTag} ${validTag === 'a' && `href='${link}'`} ${validTag === 'a' && `target="_blank"`} style="color: ${color}; font-weight: 300; ${anchorStyle}">${value}</${validTag}>

`;
  };

  const generateArrayField = (skills: string[] | undefined) => {
    if (!skills || skills.length === 0) return '';

    const mapToSVG = (icon: string) => {
      return `https://raw.githubusercontent.com/SySagar/readme.dev/main/public/badges/${icon.toLowerCase()}.svg`;
    };

    const skillBadges = skills
      .map((skill) => `<img src="${mapToSVG(skill)}" alt="${skill}" /> &nbsp;`)
      .join(' ');

    return `
<div align="left" style="margin-top: 20px; margin-bottom: 20px; display:flex; gap:10px; overflow:hidden; word-wrap:break-word;flex-wrap:wrap;">
  ${skillBadges}
</div>
`;
  };

  useEffect(() => {
    const generateMarkdown = () => {
      const content = `# ${formData.firstName ? formData.firstName : ''}

<div align="left">

${generateField(formData.description, '⤷', '#6b7281', 7)}

<div style="display: ${formData.contacts && Object.entries(formData.contacts).length > 0 ? 'flex' : 'none'}; align-items: center; margin-top: 20px;margin-bottom: 30px">
  ${formData.contacts && Object.entries(formData.contacts).length > 0 ? generateSocialLinks(formData.contacts as SocialMediaData, 7, 2) : ''}
</div>

${generateField(formData.location, '⚐', '#DBEAFE', 7)}
${formData.currentlyBuilding ? generateField(formData.currentlyBuilding.split(',')[0], 'ϟ', '#DBEAFE', 7, 'Building', 'a', formData.currentlyBuilding.replace(/\s+/g, '').split(',')[1]) : ''}

<br/>

${formData.skills && formData.skills.length > 0 ? `#### Skills` : ''}
${formData.skills && formData.skills.length > 0 ? generateArrayField(formData.skills) : ''}

<br/>

${Object.entries(formData).length > 0 && formData.showStats && formData.showStats.value && String(formData.showStats.handle).trim() !== '' ? `![GitHub stats](https://github-readme-stats.vercel.app/api?username=${formData.showStats.handle}&show_icons=true&theme=${formData.showStats.theme})` : ``}

<br/>

${Object.entries(formData).length > 0 && formData.showTrophies && formData.showTrophies.value && String(formData.showTrophies.handle).trim() !== '' ? `![trophies](https://github-profile-trophy.vercel.app/?username=${formData.showTrophies.handle})` : ``}


<br/>

${Object.entries(formData).length > 0 && formData.showCounter && formData.showCounter.value && String(formData.showCounter.handle).trim() !== '' ? `![counter](https://komarev.com/ghpvc/?username=${formData.showCounter.handle})` : ``}

</div>`;

      setMarkdownContent(content);
    };

    if (
      Object.keys(formData).length > 0 &&
      Object.values(formData).some((val) => val !== '')
    ) {
      generateMarkdown();
    } else {
      setMarkdownContent('Your markdown will appear here...');
    }
  }, [formData]);

  return markdownContent;
};

export default useMarkdownParser;
