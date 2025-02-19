'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';

import BackIcon from '/src/assets/icons/back_icon.svg';

export default function EditImage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]); // TODO: 서버에서 기존 이미지 받아오기
  const isButtonEnabled = images.length >= 3;

  const handlePrev = () => {
    router.push('/mypage');
  };

  const handleImageUpload = (imageUrl: string) => {
    if (images.length >= 5) {
      alert('이미지는 최대 5장까지 업로드할 수 있습니다.');
      return;
    }
    setImages((prev) => [...prev, imageUrl]);
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (images.length >= 3) {
      // TODO: 서버에 이미지 저장 로직
      router.push('/mypage');
    } else {
      alert('사진을 3장 이상 추가해주세요.');
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="relative w-full px-5 py-4 gap-6 h-[68px] flex justify-center items-center shadow-md">
        <div className="absolute left-[20px]">
          <BackIcon onClick={handlePrev} />
        </div>
        <div className="font-18-medium">프로필 수정</div>
      </div>

      <div className="flex-1 px-5 py-8">
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, index) => (
            <ImageUploader
              key={index}
              onImageUpload={handleImageUpload}
              onImageDelete={() => handleImageDelete(index)}
              imageUrl={images[index]}
              wide={false}
            />
          ))}
        </div>
      </div>

      <div className="px-5 py-8">
        <Button
          shape="rectangle"
          variant={isButtonEnabled ? 'filled' : 'disabled'}
          className="w-full h-[55px]"
          onClick={handleSave}
        >
          수정 완료
        </Button>
      </div>
    </div>
  );
}
