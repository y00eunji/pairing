import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';

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
  drink?: string;
  smoke?: string;
}

const putIdeal = async (ideal: idealTypeContent) => {
  return api.put<idealTypeContent>('/ideal', ideal);
};

export const usePutIdeal = () => {
  return useMutation({ mutationFn: putIdeal });
};
