import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface SkillCategory {
  title: string;
  skills: string[];
}

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

const SKILL_COLORS: { [key: string]: string } = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  Java: '#007396',
  'C++': '#00599C',
  Rust: '#000000',
  Go: '#00ADD8',
  React: '#61DAFB',
  Vue: '#4FC08D',
  Angular: '#DD0031',
  'Next.js': '#000000',
  Svelte: '#FF3E00',
  HTML: '#E34F26',
  CSS: '#1572B6',
  TailwindCSS: '#38B2AC',
  'Node.js': '#339933',
  Express: '#000000',
  NestJS: '#E0234E',
  Django: '#092E20',
  'Spring Boot': '#6DB33F',
  GraphQL: '#E10098',
  REST: '#0096D6',
  Solidity: '#363636',
  'Web3.js': '#F16822',
  'Ethers.js': '#2535A0',
  Hardhat: '#FFF100',
  IPFS: '#65C2CB',
  'Smart Contracts': '#3C3C3D',
};

function generateSVG(skill: string): string {
  const width = skill.length * 8 + 40;
  const color = SKILL_COLORS[skill] || '#4A5568';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="32">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#2D3748;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1A202C;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${width}" height="32" rx="6" ry="6" fill="url(#grad)"/>
    <circle cx="16" cy="16" r="4" fill="${color}" opacity="0.8">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    <text x="${width / 2 + 6}" y="16" dominant-baseline="middle" text-anchor="middle" 
          font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white">${skill}</text>
  </svg>`;
}

const badgesDir = path.join('public', 'badges');

if (!fs.existsSync(badgesDir)) {
  fs.mkdirSync(badgesDir, { recursive: true });
}

SKILL_CATEGORIES.forEach((category) => {
  category.skills.forEach((skill) => {
    const svg = generateSVG(skill);
    fs.writeFileSync(
      path.join(badgesDir, `${skill.toLowerCase().replace(/\s+/g, '-')}.svg`),
      svg,
    );
  });
});

console.log('Badges generated successfully!', process.env.NEXT_PUBLIC_BASE_URL);

const readmeSection = SKILL_CATEGORIES.map((category) => {
  const skillBadges = category.skills
    .map(
      (skill) =>
        `![${skill}](${process.env.NEXT_PUBLIC_BASE_URL}/badges/${skill.toLowerCase().replace(/\s+/g, '-')}.svg)`,
    )
    .join(' ');
  return `### ${category.title}\n\n${skillBadges}\n`;
}).join('\n');

const fullReadmeSection = `# My Skills\n\n${readmeSection}`;

console.log('Add this to your README.md:');
console.log(fullReadmeSection);
