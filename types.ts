
export type View = 'onboarding' | 'dashboard' | 'chat' | 'food' | 'doctors' | 'monitoring';

export interface UserProfile {
  name: string;
  age: number;
  type: 'Type 1' | 'Type 2' | 'Pre-diabetic';
  targetGlucose: { min: number; max: number };
  recentGlucose: number[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: 'Endocrinologist' | 'Dietitian' | 'General Practitioner';
  location: string;
  rating: number;
  image: string;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  glycemicIndex: 'Low' | 'Medium' | 'High';
  calories: number;
}
