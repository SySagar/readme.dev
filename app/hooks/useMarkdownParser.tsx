import { dataType } from '@app/develop/page';
import { useState, useEffect } from 'react';
import {
  generateSocialLinks,
  type SocialMediaData,
} from '@app/lib/generateSocial';

const useMarkdownParser = (formData: dataType) => {
  const [markdownContent, setMarkdownContent] = useState(
    'Your markdown will appear here...',
  );

  const generateField = (
    value: string,
    prefix: string,
    color: string,
    prefixSpacing: number = 1,
  ) => {
    if (!value) return '';
    const spacer = '&nbsp;'.repeat(prefixSpacing);

    return `
${spacer}${prefix} <span style="color: ${color}; font-weight: 300;">${value}</span>

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

<div style="display: flex; align-items: center; margin-top: 20px;margin-bottom: 30px">
${formData.contacts && Object.entries(formData.contacts).length > 0 ? generateSocialLinks(formData.contacts as SocialMediaData, 7, 2) : ''}
</div>

${generateField(formData.location, '⚐', '#DBEAFE', 7)}

${generateField(formData.currentlyBuilding, 'ϟ', '#DBEAFE', 7)}

<br/>

${formData.skills && formData.skills.length > 0 ? `#### Skills` : ''}
${formData.skills && formData.skills.length > 0 ? generateArrayField(formData.skills) : ''}

<br/>

${formData.showCounter.value ? `![](https://komarev.com/ghpvc/?username=${formData.showCounter.handle})`:``}

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
