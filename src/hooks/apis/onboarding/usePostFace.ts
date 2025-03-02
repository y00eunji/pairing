import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';
import type { faceAuthContent } from '@/types/onboarding';

const postFace = async (data: faceAuthContent) => {
  return api.post('/member/face', { image: data.image });
};

export const usePostFace = () => {
  return useMutation({ mutationFn: postFace });
};
