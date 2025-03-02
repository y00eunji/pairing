import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';
import type { keywordRecommendList } from '@/types/ideal/ideal';

const getKeywordRecommend = async (
  keywordId: string,
): Promise<keywordRecommendList[]> => {
  return await api.get<keywordRecommendList[]>(`/ideal/recommend/${keywordId}`);
};

// 버튼 클릭 등으로 수동 실행하도록 enabled: false 옵션 사용
export const useGetKeywordRecommend = (keywordId: string, enabled = false) => {
  return useQuery<keywordRecommendList[], Error>({
    queryKey: ['keywordRecommend', keywordId],
    queryFn: () => getKeywordRecommend(keywordId),
    staleTime: 1000 * 60 * 60 * 24,
    // cacheTime: 1000 * 60 * 60 * 24,
    enabled: enabled && keywordId !== undefined,
  });
};
