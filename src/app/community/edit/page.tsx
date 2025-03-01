'use client';

import BottomNavBar from '@/components/BottomNavBar';
import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import BackIcon from '/src/assets/icons/header_back.svg';

export default function PostEdit() {
  const [content, setContent] = useState(''); // 글자 수 상태 관리
  const maxLength = 80;
  const router = useRouter();

  // 단일 이미지 상태
  const [image, setImage] = useState<File | null>(null);

  // 단일 이미지 업로드 핸들러
  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  // 단일 이미지 삭제 핸들러
  const handleImageDelete = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <div className="relative flex flex-row items-center p-5 shadow-md">
        <button onClick={() => router.push('/community')} aria-label="뒤로가기">
          <BackIcon />
        </button>
        <h1 className="text-22px font-bold flex-1 text-center">글수정</h1>
      </div>

      {/* 글 수정 영역 */}
      <div className="flex flex-col p-5 space-y-4">
        {/* 내용 입력 */}
        <div className="relative">
          <p className="text-18px font-medium pb-2">내용</p>
          <textarea
            placeholder="글을 수정해주세요."
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setContent(e.target.value);
              }
            }}
            className="w-full h-36 p-3 border border-gray2 rounded-xl text-14px font-medium resize-none focus:outline-none focus:border-mainPink1 pr-10"
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
          image={image}
        />
      </div>

      {/* 하단 바 */}
      <BottomNavBar />

      {/* 수정 완료 버튼 */}
      <div className="fixed bottom-[80px] left-0 right-0 z-20">
        <div className="mx-auto max-w-[520px] px-5 pb-[30px]">
          <Button
            shape="rectangle"
            variant="filled"
            className="w-full py-3"
            onClick={() => {
              router.push('/community');
            }}
          >
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
