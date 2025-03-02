import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api';

export interface ParticipationResponse {
  id: number;
}

const postParticipation = async (
  postId: number,
  userId: string,
): Promise<ParticipationResponse> => {
  return await api.post<ParticipationResponse>(
    `/community/${postId}/participations`,
    null,
    {
      headers: {
        userid: userId,
      },
    },
  );
};

export const usePostParticipation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ParticipationResponse,
    Error,
    { postId: number; userId: string }
  >({
    mutationFn: ({ postId, userId }) => postParticipation(postId, userId),
    onSuccess: (data, variables) => {
      console.log('참여 성공:', data);
      queryClient.invalidateQueries({
        queryKey: ['participations', variables.postId],
      });
    },
    onError: (error) => {
      console.error('참여 실패:', error);
    },
  });
};
