import type { DrinkStatusKey, SmokeStatusKey } from '@/constants/wellness';

export interface myProfile {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  birth: Date;
  mbti: string;
  drink?: DrinkStatusKey;
  smoke?: SmokeStatusKey;
  city: string;
  district: string;
  hobby: string[];
  images: string[];
}
