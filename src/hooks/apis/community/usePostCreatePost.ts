import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';
import type { PostCreate } from '@/types/community';

const postCreatePosts = async (data: PostCreate): Promise<PostCreate> => {
  return await api.post<PostCreate>('/community', data);
};

export const usePostCreatePosts = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postCreatePosts,
    onSuccess: (data) => {
      console.log('생성된 게시물:', data);
      router.push('/community');
    },
    onError: (error) => {
      console.error('게시물 생성 실패:', error);
    },
  });
};
