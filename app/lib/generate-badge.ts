import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const skills = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Node', color: '#339933' },
  { name: 'Express', color: '#000000' },
  { name: 'Typescript', color: '#3178C6' },
  { name: 'Javascript', color: '#F7DF1E' },
  { name: 'HTML', color: '#E34F26' },
  { name: 'CSS', color: '#1572B6' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'Prisma', color: '#2D3748' },
  { name: 'Postgres', color: '#336791' },
  { name: 'CockroachDB', color: '#6933FF' }
];

function generateSVG(skill:string, color:string) {
  const width = skill.length * 8 + 32; // Dynamic width based on text length
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="32">
  <rect x="0" y="0" width="${width}" height="32" rx="4" ry="4" fill="#1F2937"/>
  <circle cx="12" cy="16" r="3" fill="${color}" opacity="0.8"/>
  <text x="${width/2}" y="16" dominant-baseline="middle" text-anchor="middle" 
        font-family="system-ui, -apple-system" font-size="14" fill="white">${skill}</text>
</svg>`;
}

const badgesDir =  path.join('public', 'badges');

// Create badges directory if it doesn't exist
if (!fs.existsSync(badgesDir)) {
  fs.mkdirSync(badgesDir, { recursive: true });
}

// Generate SVG files for each skill
skills.forEach(({ name, color }) => {
  const svg = generateSVG(name, color);
  fs.writeFileSync(path.join(badgesDir, `${name.toLowerCase()}.svg`), svg);
});

console.log('Badges generated successfully!', process.env.NEXT_PUBLIC_BASE_URL);

// Generate README section
const readmeSection = `# My Skills\n\n<!-- Tech Stack -->\n${
  skills.map(({ name }) => 
    `![${name}](${process.env.NEXT_PUBLIC_BASE_URL}/${name.toLowerCase()}.svg)`
  ).join('\n')
}\n`;

console.log('Add this to your README.md:');
console.log(readmeSection);