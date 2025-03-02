import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import type { MeListItem } from '@/types/community';

const getMeList = async (postId: number): Promise<MeListItem[]> => {
  return await api.get<MeListItem[]>(`/community/${postId}/participations`);
};

export const useGetMeList = (postId: number) => {
  return useQuery<MeListItem[], Error>({
    queryKey: ['getMeList', postId],
    queryFn: () => getMeList(postId),
    enabled: !!postId,
  });
};
