import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api';
import type { Post, PostUpdate } from '@/types/community';

const updatePost = async (postId: number, data: PostUpdate): Promise<Post> => {
  return await api.put<Post>(`/community/${postId}`, data);
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, { postId: number; data: PostUpdate }>({
    mutationFn: ({ postId, data }) => updatePost(postId, data),
    onSuccess: (updatedPost) => {
      console.log('게시글 수정 성공:', updatedPost);
      queryClient.invalidateQueries({ queryKey: ['getPostList'] });
    },
    onError: (error) => {
      console.error('게시글 수정 실패:', error);
    },
  });
};
