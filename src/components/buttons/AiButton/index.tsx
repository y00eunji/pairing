// AiButton 컴포넌트
import AiModal from '@/components/modal/AiModal';
import { useModal } from '@/hooks/useModal';

import { useState } from 'react';

import AiLogoIcon from '/public/assets/icons/ai_circle_logo.svg';

export default function AiButton() {
  const aiModal = useModal();
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  // 버튼 숨기기
  const handleOpenModal = () => {
    aiModal.openModal();
    setIsButtonVisible(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* ai 대화 추천 받기 버튼 */}
      {isButtonVisible && (
        <button
          className="flex items-center w-[160px] px-2 py-2 rounded-full 
          bg-gradient-to-r from-mainPink1 to-mainPink2 text-white font-semibold"
          onClick={handleOpenModal}
        >
          <div className="flex items-center justify-center rounded-full mr-2">
            <AiLogoIcon />
          </div>
          <p className="font-16-medium">대화 추천 받기</p>
        </button>
      )}

      {/* ai 모달 */}
      <div className="relative w-full h-full">
        {aiModal.isOpen && (
          <AiModal isOpen={aiModal.isOpen} isClose={aiModal.closeModal} />
        )}
      </div>
    </div>
  );
}
