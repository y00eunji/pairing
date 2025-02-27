'use client';

import { useState } from 'react';

import { useModal } from '@/hooks/useModal';
import type { keywordsList } from '@/types/ideal/ideal';

import Button from '../common/Button';
import ActionModal from '../modal/ActionModal';

import CheckIcon from '/src/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';

interface KeywordListProps {
  keywords: keywordsList[];
  onKeywordSelected: (keywordId: number) => void;
}

export default function KeywordList({
  keywords,
  onKeywordSelected,
}: KeywordListProps) {
  const checkModal = useModal();
  const checkModalSuccessModal = useModal();
  const alreadyUsedModal = useModal();

  const [keywordMessage, setKeywordMessage] = useState('');
  // "모든 버튼을 이미 눌렀는지" 여부 (true면 모든 버튼 비활성화)
  const [hasUsed, setHasUsed] = useState(false);
  // 선택 키워드 id 저장
  const [selectedKeyword, setSelectedKeyword] = useState<number | null>(null);
  // 선택 전 대기중인 키워드 id를 저장
  const [pendingKeyword, setPendingKeyword] = useState<number | null>(null);

  // 키워드 버튼 클릭 시
  const handleKeywordClick = (keywordId: number, title: string) => {
    if (hasUsed) {
      alreadyUsedModal.openModal();
      return;
    }

    setPendingKeyword(keywordId);
    setKeywordMessage(`${title} 키워드의 맞춤 추천을 받으시겠습니까?`);
    checkModal.openModal();
  };

  return (
    <div className="space-y-4">
      {keywords.map((item, index) => (
        <div key={index} className="flex items-center justify-between pb-1">
          {/* 키워드 정보 */}
          <div className="flex items-center space-x-3">
            <span>{item.icon}</span>
            <span
              className={
                hasUsed && item.keywordId === selectedKeyword
                  ? 'font-18-medium text-mainPink1'
                  : 'font-18-regular text-black'
              }
            >
              {item.title}
            </span>
          </div>

          {/* 버튼: hasUsed가 true라면 disabledColor 스타일 */}
          <Button
            shape="circle"
            variant={hasUsed ? 'disabledColor' : 'filled'}
            className="w-20 h-8"
            onClick={() => handleKeywordClick(item.keywordId, item.title)}
          >
            {hasUsed ? '완료' : '선택하기'}
          </Button>
        </div>
      ))}

      {/* (1) 키워드 선택 전 확인 모달 */}
      <ActionModal
        isOpen={checkModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message={keywordMessage}
        description="맞춤 추천 키워드는 하루 한번만 선택이 가능합니다."
        buttons={[
          {
            label: '취소',
            onClick: checkModal.closeModal,
          },
          {
            label: '확인',
            onClick: () => {
              setHasUsed(true);
              setSelectedKeyword(pendingKeyword);
              onKeywordSelected(pendingKeyword!);
              checkModal.closeModal();
              checkModalSuccessModal.openModal();
            },
            className: 'text-mainPink1',
          },
        ]}
      />

      {/* (2) 키워드 선택 완료 모달 */}
      <ActionModal
        isOpen={checkModalSuccessModal.isOpen}
        icon={<CheckIcon fill="#FF85A2" />}
        message="신청이 완료되었습니다."
        buttons={[
          {
            label: '닫기',
            onClick: checkModalSuccessModal.closeModal,
            className: 'w-full',
          },
        ]}
      />

      {/* (3) 이미 버튼을 사용한 뒤 다시 누를 때 뜨는 모달 */}
      <ActionModal
        isOpen={alreadyUsedModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message="오늘 추천 횟수를 모두 받으셨습니다."
        description="내일 다시 사용자를 추천 받으실 수 있습니다."
        buttons={[
          {
            label: '닫기',
            onClick: alreadyUsedModal.closeModal,
            className: 'w-full',
          },
        ]}
      />
    </div>
  );
}
