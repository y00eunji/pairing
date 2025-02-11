import KeywordList from './KeywordList';

interface KeywordRecommendationProps {
  keywords: { icon: React.ReactNode; title: string }[];
}

export default function KeywordRecommendation({
  keywords,
}: KeywordRecommendationProps) {
  return (
    <div className="flex items-center justify-center w-96">
      <div className="w-96 p-4 bg-white rounded-xl shadow-md border">
        <p className="text-gray1 text-lg font-18-bold mb-8">맞춤 추천 키워드</p>
        <KeywordList keywords={keywords} />
      </div>
    </div>
  );
}
