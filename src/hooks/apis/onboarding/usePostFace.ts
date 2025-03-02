import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';
// import type { faceAuthContent } from '@/types/onboarding';

const postFace = async (data: FormData) => {
  return api.post('/member/face', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const usePostFace = () => {
  return useMutation({ mutationFn: postFace });
};
