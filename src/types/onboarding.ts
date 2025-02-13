import type { Dispatch, SetStateAction } from 'react';

export interface OnboardingProps {
  setContent: Dispatch<SetStateAction<Content>>;
  onNext?: () => void;
  onPrev?: () => void;
  currentStepNumber?: number;
  totalStepsNumber?: number;
}

export interface Content {
  name?: string;
  gender?: string;
  birth?: string;
  address?: {
    city: string;
    district: string;
  };
  hobby?: string[];
  mbti?: string;
  wellness?: {
    drink?: string;
    smoke?: string;
  };
  photo?: string;
}
