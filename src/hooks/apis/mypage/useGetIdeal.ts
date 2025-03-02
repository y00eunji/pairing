import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';

export interface idealResponse {
  idealTypeId: number;
  mbti: string[];
  address: [
    {
      city: string;
      district: string;
    },
  ];
  ageStart: number;
  ageEnd: number;
  hobby: string[];
  drink: string;
  smoke: string;
  member: {
    userId: number;
    name: string;
    age: number;
    heart: number;
    gender: string;
    email: string;
    birth: string;
    mbti: string;
    drink: string;
    smoking: string;
    joinAt: string;
    city: string;
    district: string;
    claimCount: number;
    enrolled: boolean;
    hobby: {
      hobbyId: number;
      hobby: string[];
      member: string;
    };
    photo: {
      photoId: number;
      photo: string[];
      member: string;
    };
    posts: [
      {
        postId: number;
        member: string;
        content: string;
        imageUrl: string;
        createdAt: string;
        claimCount: number;
      },
    ];
  };
}

const getIdeal = async () => {
  return api.get<idealResponse>('/ideal');
};

export const useGetIdeal = () => {
  return useQuery({ queryKey: ['ideal'], queryFn: getIdeal });
};
