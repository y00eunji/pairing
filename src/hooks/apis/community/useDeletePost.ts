import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api';

const deletePost = async (postId: number): Promise<void> => {
  await api.delete<void>(`/community/${postId}`);
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPostList'] });
    },
    onError: (error) => {
      console.error('게시물 삭제 실패:', error);
    },
  });
};
