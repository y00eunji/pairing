'use client';

import BottomNavBar from '@/components/BottomNavBar';
import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';
import { useModal } from '@/hooks/useModal';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import ActionModal from '../../../components/modal/ActionModal/index';

import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';
import BackIcon from '/src/assets/icons/header_back.svg';

export default function PostCreate() {
  const [content, setContent] = useState(''); // 글자 수 상태 관리
  const maxLength = 80;
  const outModal = useModal(false);
  const router = useRouter();

  const [image, setImage] = useState<string>('');

  // 단일 이미지 업로드 핸들러
  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl);
  };

  // 단일 이미지 삭제 핸들러
  const handleImageDelete = () => {
    setImage('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <div className="relative flex flex-row items-center p-5 shadow-md">
        <button onClick={outModal.openModal} aria-label="뒤로가기">
          <BackIcon />
        </button>
        <h1 className="text-22px font-bold flex-1 text-center">글작성</h1>
      </div>

      <ActionModal
        isOpen={outModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message="현재 페이지를 나가시겠습니까?"
        description="작성하신 글이 삭제됩니다."
        buttons={[
          {
            label: '취소',
            onClick: outModal.closeModal,
          },
          {
            label: '확인',
            onClick: () => {
              router.push('/community');
            },
            className: 'text-mainPink1',
          },
        ]}
      />

      {/* 글 작성 영역 */}
      <div className="flex flex-col p-5 space-y-4">
        {/* 내용 입력 */}
        <div className="relative">
          <p className="text-18px font-medium pb-2">내용</p>
          <textarea
            placeholder="글을 작성해주세요."
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setContent(e.target.value);
              }
            }}
            className="w-full h-36 p-3 border border-gray2 rounded-xl text-14px font-medium resize-none
              focus:outline-none focus:border-mainPink1 pr-10"
          />
          {/* 글자 수 카운트 */}
          <p className="absolute bottom-3 right-3 text-gray1 text-12px">
            {content.length}/{maxLength}
          </p>
        </div>
      </div>

      {/* 사진 등록 영역 */}
      <div className="flex flex-col p-5 space-y-4">
        <p className="text-18px font-medium pb-2">사진 등록</p>
        <ImageUploader
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          imageUrl={image}
        />
      </div>

      {/* 하단 바 */}
      <BottomNavBar />

      {/* 등록 버튼  */}
      <div className="fixed bottom-[80px] left-0 right-0 z-20">
        <div className="mx-auto max-w-[520px] px-5 pb-[30px]">
          <Button shape="rectangle" variant="filled" className="w-full py-3">
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}
