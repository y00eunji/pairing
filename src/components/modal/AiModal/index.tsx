import { createPortal } from 'react-dom';

import AiLogoIcon from '/src/assets/icons/ai_letter_logo.svg';
import DeleteIcon from '/src/assets/icons/delete_gray.svg';

interface AiModalProps {
  isOpen: boolean;
  isClose: () => void;
}

export default function AiModal({ isOpen, isClose }: AiModalProps) {
  if (!isOpen) return null;
  const conversationSummaries = [
    '현재 영화에 대한 대화가 이루어지고 있어요.',
    'A(상대방)님은 ?장르의 영화를 좋아해서 지금 개봉된 영화 중 ?를 보고 싶어해요.',
    'B(나)님도 그 영화를 같이 보는 것에 대해 긍정적인 의견을 밝혔어요.',
  ];
  const loveAnalyses = [
    '채팅 내용을 통한 A님의 호감도 분석 결과, ○○님에게 호감도가 있어보여요.',
  ];
  const conversationTopics = [
    '영화 볼 장소 정하기',
    '언급되지 않은 A님의 다른 취미에 대해서 이야기 해보기',
    '영화 볼 장소 정하기',
  ];

  const modalContent = (
    <div className="fixed inset-x-0 bottom-0 z-50 w-full max-w-[520px] mx-auto">
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={isClose} />
      {/* 바텀시트 컨텐츠 */}
      <div className="relative bg-white rounded-t-2xl overflow-hidden">
        {/* 바텀시트 핸들 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray2 rounded-full" />
        </div>

        {/* 헤더 */}
        <div className="flex flex-row items-center justify-center py-3">
          <AiLogoIcon />
          <h2 className="text-center pl-3">
            <span className="text-24px font-bold">대화 추천</span>
          </h2>
        </div>

        <div className="absolute right-0 top-0 m-5 cursor-pointer">
          <DeleteIcon onClick={isClose} />
        </div>

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
          <div className="flex flex-col p-6">
            {/* 대화 내용 요약 결과 */}
            <h3 className="flex justify-center items-center font-16-medium pb-4">
              대화 내용 요약 결과
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <ul className="font-14-regular space-y-2 list-disc marker:text-mainPink2 pl-2">
                {conversationSummaries.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 호감도 분석 결과 */}
            <h3 className="flex justify-center items-center font-16-medium pt-6 pb-4">
              호감도 분석 결과
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <ul className="font-14-regular space-y-2 list-disc marker:text-mainPink2 pl-2">
                {loveAnalyses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 대화 주제 추천 */}
            <h3 className="flex justify-center items-center font-16-medium pt-6 pb-4">
              대화 주제 추천
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <ul className="font-14-regular space-y-2 list-disc marker:text-mainPink2 pl-2">
                {conversationTopics.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return createPortal(modalContent, document.body);
}
