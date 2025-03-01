import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';
import type { DrinkStatusType, SmokeStatusType } from '@/constants/wellness';
import { DRINK_STATUS, SMOKE_STATUS } from '@/constants/wellness';
import type { ProfileContent } from '@/types/onboarding';

interface PostMyProfileData {
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

const postMyProfile = async (data: ProfileContent) => {
  const postData: PostMyProfileData = {
    name: data.name || '',
    age: new Date().getFullYear() - new Date(data.birth || '').getFullYear(),
    gender: data.gender || 'MALE',
    birth: data.birth || '',
    mbti: data.mbti || '',
    drink: data.drink || DRINK_STATUS.atAllNothing,
    smoking: data.smoke || SMOKE_STATUS.never,
    city: data.city || '',
    district: data.district || '',
    hobby: data.hobby || [],
    images:
      data.photo?.map((file) => {
        const imageUrl = URL.createObjectURL(file);
        const fileName = imageUrl.split('/')[imageUrl.split('/').length - 1];
        return fileName;
      }) || [],
  };

  return api.post('/member/profile', postData);
};

export const usePostMyProfile = () => {
  return useMutation({ mutationFn: postMyProfile });
};
