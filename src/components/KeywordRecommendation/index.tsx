import type { keywordsList } from '@/types/ideal/ideal';

import KeywordList from './KeywordList';

interface KeywordRecommendationProps {
  keywords: keywordsList[];
  onKeywordSelected: (keywordId: number) => void; // ▼ 추가
}

export default function KeywordRecommendation({
  keywords,
  onKeywordSelected,
}: KeywordRecommendationProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="w-full p-4 bg-white rounded-xl border-0.25
        shadow-[0px_6px_6px_rgba(0,0,0,0.02),_0px_-6px_6px_rgba(0,0,0,0.02),_6px_0px_6px_rgba(0,0,0,0.02),_-6px_0px_6px_rgba(0,0,0,0.02)]"
      >
        <p className="text-gray1 text-lg font-18-bold mb-8">맞춤 추천 키워드</p>
        <KeywordList
          keywords={keywords}
          onKeywordSelected={onKeywordSelected}
        />{' '}
      </div>
    </div>
  );
}
