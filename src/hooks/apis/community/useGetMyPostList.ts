import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import type { MyPost } from '@/types/community';

const getMyPostList = async (): Promise<MyPost[]> => {
  return await api.get<MyPost[]>('/community/myposts');
};

export const useGetMyPostList = () => {
  return useQuery<MyPost[], Error>({
    queryKey: ['getMyPostList'],
    queryFn: getMyPostList,
  });
};
