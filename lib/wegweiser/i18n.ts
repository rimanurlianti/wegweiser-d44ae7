import type { Language } from './types';

type Copy = Record<string, { en: string; de: string }>;

export const copy: Copy = {
  continue: { en: 'Continue', de: 'Weiter' },
  back: { en: 'Back', de: 'Zurück' },
  edit: { en: 'Edit profile', de: 'Profil bearbeiten' },
  demoSchool: { en: 'Demo school data', de: 'Demo-Schuldaten' },
  confirmSchool: { en: 'Confirm with the school', de: 'Mit der Schule klären' },
  officialWebsite: { en: 'Official website', de: 'Offizielle Website' },
  viewFit: { en: 'View fit & questions', de: 'Passung & Fragen ansehen' },
  exploreSchools: { en: 'Explore schools', de: 'Schulen erkunden' },
};

export function t(key: keyof typeof copy, language: Language) {
  return copy[key][language];
}
