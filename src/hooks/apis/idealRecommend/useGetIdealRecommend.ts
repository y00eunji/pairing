import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import type { idealRecommendList } from '@/types/ideal/ideal';

const getIdealRecommend = async (): Promise<idealRecommendList[]> => {
  return await api.get<idealRecommendList[]>('/ideal/recommend');
};

// 하루에 한 번만 새롭게 데이터를 가져오도록 함
export const useGetIdealRecommend = () => {
  return useQuery<idealRecommendList[], Error>({
    queryKey: ['idealRecommend'],
    queryFn: getIdealRecommend,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
