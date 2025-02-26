import type { DrinkStatusType, SmokeStatusType } from '@/constants/wellness';

export interface ProfileContent {
  name?: string;
  gender?: 'MALE' | 'FEMALE';
  birth?: string;
  address?: {
    city: string;
    district: string;
  };
  hobby?: string[];
  mbti?: string;
  drink?: DrinkStatusType;
  smoke?: SmokeStatusType;
  photo?: string[];
}

export interface idealTypeContent {
  mbti?: string[];
  address?: {
    city: string;
    district: string;
  }[];
  age?: {
    min: number;
    max: number;
  };
  hobby?: string[];
  drink?: DrinkStatusType;
  smoke?: SmokeStatusType;
}

export interface faceAuthContent {
  image: string;
}

export interface OnboardingData {
  profile?: ProfileContent;
  idealType?: idealTypeContent;
  faceAuth?: faceAuthContent;
}
