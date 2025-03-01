import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';
import type { idealTypeContent } from '@/types/onboarding';

const postIdeal = async (data: idealTypeContent) => {
  return api.post('/ideal', data);
};

export const usePostIdeal = () => {
  return useMutation({ mutationFn: postIdeal });
};
