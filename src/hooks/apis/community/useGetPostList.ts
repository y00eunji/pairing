import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import type { Post } from '@/types/community';

const getPostList = async (): Promise<Post[]> => {
  return await api.get<Post[]>('/community');
};

export const useGetPostList = () => {
  return useQuery<Post[], Error>({
    queryKey: ['getPostList'],
    queryFn: getPostList,
  });
};
