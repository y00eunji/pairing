import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import type { keywordsList } from '@/types/ideal/ideal';

const getKeyword = async (): Promise<keywordsList[]> => {
  return await api.get<keywordsList[]>('/ideal/recommend/keyword');
};

export const useGetKeyword = () => {
  return useQuery<keywordsList[], Error>({
    queryKey: ['getKeyword'],
    queryFn: getKeyword,
  });
};
