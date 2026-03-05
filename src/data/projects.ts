export interface Project {
  key: string;
  accentColor: string;
  previewGradient: string;
  previewImage?: string;
  links: { type: 'demo' | 'github' | 'play' | 'rustore'; url: string }[];
}

export const projects: Project[] = [
  {
    key: 'phraseGym',
    accentColor: '#6366f1',
    previewGradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
    previewImage: '/images/projects/phrasegym.svg',
    links: [
      { type: 'rustore', url: 'https://www.rustore.ru/catalog/app/com.d6apps.englishfit' },
      { type: 'github', url: 'https://github.com/Dinislam-Y/englishfit-web' },
    ],
  },
  {
    key: 'flingArrows',
    accentColor: '#0ea5e9',
    previewGradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    previewImage: '/images/projects/flingarrows.svg',
    links: [
      { type: 'github', url: 'https://github.com/Dinislam-Y/fling-arrows-web' },
    ],
  },
  {
    key: 'vpn',
    accentColor: '#a78bfa',
    previewGradient: 'linear-gradient(135deg, #a78bfa, #ec4899)',
    previewImage: '/images/projects/vpn.svg',
    links: [],
  },
];
