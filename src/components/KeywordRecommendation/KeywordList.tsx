'use client';

import { useModal } from '@/hooks/useModal';

import { useState } from 'react';

import Button from '../common/Button';
import ActionModal from '../modal/ActionModal';

import CheckIcon from '/src/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';

interface KeywordListProps {
  keywords: { icon: React.ReactNode; title: string }[];
}

export default function KeywordList({ keywords }: KeywordListProps) {
  // 모달 훅들
  const checkModal = useModal(); // 키워드 선택 전 여부 모달
  const checkModalSuccessModal = useModal(); // 선택 후 "완료" 모달
  const alreadyUsedModal = useModal(); // 버튼을 사용한 뒤 클릭 시 모달

  // 상태들
  const [keywordMessage, setKeywordMessage] = useState('');
  // "모든 버튼을 이미 눌렀는지" 여부 (true면 모든 버튼 비활성화)
  const [hasUsed, setHasUsed] = useState(false);

  // 키워드 버튼 클릭 시
  const handleKeywordClick = (keyword: string) => {
    // 이미 한 번이라도 버튼을 눌러서 hasUsed가 true라면
    // "사용한 상태" 모달 띄우기
    if (hasUsed) {
      alreadyUsedModal.openModal();
      return;
    }

    // 아직 한 번도 안 눌렀다면 확인 모달 열기
    setKeywordMessage(`${keyword} 키워드의 맞춤 추천을 받으시겠습니까?`);
    checkModal.openModal();
  };

  return (
    <div className="space-y-3">
      {keywords.map((item, index) => (
        <div key={index} className="flex items-center justify-between pb-1">
          {/* 키워드 정보 */}
          <div className="flex items-center space-x-3">
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </div>

          {/* 버튼: hasUsed가 true라면 disabledColor 스타일 */}
          <Button
            shape="circle"
            variant={hasUsed ? 'disabledColor' : 'filled'}
            className="w-20 h-8"
            onClick={() => handleKeywordClick(item.title)}
          >
            {hasUsed ? '완료' : '선택하기'}
          </Button>
        </div>
      ))}

      {/* (1) 키워드 선택 전 확인 모달 */}
      <ActionModal
        isOpen={checkModal.isOpen}
        icon={<ExclamationIcon />}
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
              // '확인'을 누르면, 모든 버튼을 막는다.
              setHasUsed(true);
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
        icon={<CheckIcon />}
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
        icon={<ExclamationIcon />}
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
