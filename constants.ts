
import { Doctor } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mensah',
    specialty: 'Endocrinologist',
    location: 'Accra, Ghana',
    rating: 4.9,
    image: 'https://picsum.photos/seed/doc1/200/200'
  },
  {
    id: '2',
    name: 'Dr. James Okoro',
    specialty: 'Dietitian',
    location: 'Lagos, Nigeria',
    rating: 4.8,
    image: 'https://picsum.photos/seed/doc2/200/200'
  },
  {
    id: '3',
    name: 'Dr. Elena Petrova',
    specialty: 'Endocrinologist',
    location: 'London, UK',
    rating: 4.7,
    image: 'https://picsum.photos/seed/doc3/200/200'
  }
];

export const APP_THEME = {
  primary: 'blue-600',
  secondary: 'emerald-500',
  accent: 'orange-400',
  background: 'slate-50'
};
