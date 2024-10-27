import { dataType } from '@app/develop/page';
import { useState, useEffect } from 'react';

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
      return `https://raw.githubusercontent.com/SySagar/readme.dev/cced67e23e6120615abc64633c64f319803c3c18/public/badges/${icon.toLowerCase()}.svg`;
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
      const content = `# ${formData.firstName}

<div align="left">

${generateField(formData.description, '⤷', '#6b7281', 7)}

${generateField(formData.location, '⚐', '#DBEAFE', 7)}

${generateField(formData.currentlyBuilding, 'ϟ', '#DBEAFE', 7)}
### Skills
${generateArrayField(formData.skills)}

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
