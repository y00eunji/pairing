import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api';
import type { DrinkStatusType, SmokeStatusType } from '@/constants/wellness';

interface MyPageProfileResponse {
  name?: string;
  age?: number;
  gender?: 'MALE' | 'FEMALE';
  birth?: string;
  mbti?: string;
  drink?: DrinkStatusType;
  smoking?: SmokeStatusType;
  city?: string;
  district?: string;
  hobby?: string[];
  images?: string[];
}

const putMyPageProfile = async (data: MyPageProfileResponse) => {
  return api.put<MyPageProfileResponse>('/member/profile', data);
};

export const usePutMyPageProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putMyPageProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-myPageProfile'] });
    },
  });
};
