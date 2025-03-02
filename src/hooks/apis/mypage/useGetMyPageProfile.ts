import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import type { DrinkStatusType, SmokeStatusType } from '@/constants/wellness';

interface MyPageProfileResponse {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  birth: string;
  mbti: string;
  drink: DrinkStatusType;
  smoking: SmokeStatusType;
  city: string;
  district: string;
  hobby: string[];
  images: string[];
}

const getMyPageProfile = async () => {
  return api.get<MyPageProfileResponse>('/member/profile');
};

export const useGetMyPageProfile = () => {
  return useQuery({
    queryKey: ['get-myPageProfile'],
    queryFn: getMyPageProfile,
  });
};
