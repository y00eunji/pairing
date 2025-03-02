'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useModal } from '@/hooks/useModal';
import type { keywordsList } from '@/types/ideal/ideal';

import Button from '../common/Button';
import ActionModal from '../modal/ActionModal';

import CheckIcon from '/src/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';

interface KeywordListProps {
  keywords: keywordsList[];
  onKeywordSelected: (keyword: keywordsList) => void;
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
  // 수정: 선택된 키워드 객체 저장 (기존 number | null 에서 변경)
  const [selectedKeyword, setSelectedKeyword] = useState<keywordsList | null>(
    null,
  );
  //  키워드 객체 저장
  const [pendingKeyword, setPendingKeyword] = useState<keywordsList | null>(
    null,
  );

  const handleKeywordClick = (keyword: keywordsList) => {
    if (hasUsed) {
      alreadyUsedModal.openModal();
      return;
    }

    setPendingKeyword(keyword);
    setKeywordMessage(
      `${keyword.keyword} 키워드의 맞춤 추천을\n받으시겠습니까?`,
    );
    checkModal.openModal();
  };

  return (
    <div className="space-y-4">
      {keywords.map((item, index) => (
        <div key={index} className="flex items-center justify-between pb-1">
          <div className="flex items-center space-x-3">
            {/* 키워드 아이콘 영역 */}
            <Image
              src={item.keywordIconUrl}
              alt={item.keyword}
              width={50}
              height={50}
              unoptimized={true}
              className="w-10 h-10"
            />
            {/* 키워드 영역 */}
            <span
              className={
                hasUsed && item.keyword === selectedKeyword?.keyword
                  ? 'font-18-medium text-mainPink1'
                  : 'font-18-regular text-black'
              }
            >
              {item.keyword}
            </span>
          </div>

          <Button
            shape="circle"
            variant={hasUsed ? 'disabledColor' : 'filled'}
            className="w-20 h-8"
            onClick={() => handleKeywordClick(item)}
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
        description={`맞춤 추천 키워드는 하루 한번만\n 선택이 가능합니다.`}
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

      {/* (3) 이미 버튼을 사용한 경우 모달 */}
      <ActionModal
        isOpen={alreadyUsedModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message={`오늘 추천 횟수를\n 모두 받으셨습니다.`}
        description={`내일 다시 사용자를 추천\n 받으실 수 있습니다.`}
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
