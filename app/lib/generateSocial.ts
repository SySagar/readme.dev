import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

type SocialPlatform =
  | 'email'
  | 'instagram'
  | 'twitter'
  | 'linkedin'
  | 'youtube'
  | 'dribble'
  | 'discord'
  | 'twitch'
  | 'behance'
  | 'website';

interface SocialMediaData {
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
}

const PLATFORM_CONFIG: Record<
  SocialPlatform,
  {
    baseUrl: string;
    svg: string;
    formatHandle: (handle: string) => string;
  }
> = {
  instagram: {
    baseUrl: 'https://instagram.com/',
    svg: `instagram`,
    formatHandle: (handle: string) => handle.replace('@', ''),
  },
  twitter: {
    baseUrl: 'https://twitter.com/',
    svg: `twitter`,
    formatHandle: (handle: string) => handle.replace('@', ''),
  },
  linkedin: {
    baseUrl: 'https://linkedin.com/in/',
    svg: `linkedin`,
    formatHandle: (handle: string) => handle,
  },
  youtube: {
    baseUrl: 'https://youtube.com/',
    svg: `youtube`,
    formatHandle: (handle: string) => handle,
  },
  email: {
    baseUrl: 'mailto:',
    svg: `mail`,
    formatHandle: (handle: string) => handle,
  },
  dribble: {
    baseUrl: 'https://dribble.com/',
    svg: `dribble`,
    formatHandle: (handle: string) => handle,
  },
  twitch: {
    baseUrl: 'https://twitch.tv/',
    svg: `twitch`,
    formatHandle: (handle: string) => handle,
  },
  behance: {
    baseUrl: 'https://behance.net/',
    svg: `palette`,
    formatHandle: (handle: string) => handle,
  },
  discord: {
    baseUrl: 'https://discord.com/',
    svg: `discord`,
    formatHandle: (handle: string) => handle,
  },
  website: {
    baseUrl: 'https://',
    svg: `website`,
    formatHandle: (handle: string) => handle,
  },
};

const generateSocialLinks = (
  data: SocialMediaData,
  prefixSpacing: number = 1,
  marginSpace: number = 0,
): string => {
  const socialEntries = Object.entries(data).filter(
    ([platform, handle]) => platform in PLATFORM_CONFIG && handle,
  ) as [SocialPlatform, string][];

  return socialEntries
    .map(([platform, handle]: [SocialPlatform, string], idx) => {
      const config = PLATFORM_CONFIG[platform];
      const formattedHandle = config.formatHandle(handle);
      const link = `${config.baseUrl}${formattedHandle}`;

      const spacer = '&nbsp;'.repeat(prefixSpacing);
      const margin = '&nbsp;'.repeat(marginSpace);

      console.log('config', config);

      return `
     ${idx === 0 ? spacer : ''}
        <a href="${link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;"><img src="https://raw.githubusercontent.com/SySagar/readme.dev/main/public/socials/${config.svg}.svg" alt="${config.svg}" /></a>
        ${margin}
      `.trim();
    })
    .join('\n');
};

// const generateMarkdownSocialLinks = (data: SocialMediaData): string => {
//   const socialEntries = Object.entries(data)
//     .filter(([platform, handle]) =>
//       platform in PLATFORM_CONFIG && handle) as [SocialPlatform, string][];

//   return socialEntries
//     .map(([platform, handle]) => {
//       const config = PLATFORM_CONFIG[platform];
//       const formattedHandle = config.formatHandle(handle);
//       const link = `${config.baseUrl}${formattedHandle}`;

//       const encodedSvg = config.svg
//         .replace(/"/g, "'")
//         .replace(/[\r\n]/g, '')
//         .replace(/#/g, '%23');

//       return `[![${platform} - ${formattedHandle}](data:image/svg+xml;base64,${btoa(encodedSvg)})](${link})`;
//     })
//     .join(' ');
// };

export {
  generateSocialLinks,
  //   generateMarkdownSocialLinks,
  type SocialMediaData,
  type SocialPlatform,
};
