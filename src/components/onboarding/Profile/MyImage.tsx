'use client';

import { useState } from 'react';

import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import type { OnboardingProps } from '@/types/onboarding';

import Title from '../Title';

export default function MyImage({
  setContent,
  onNext,
  onPrev,
  currentStepNumber = 8,
  totalStepsNumber = 8,
}: OnboardingProps) {
  const [images, setImages] = useState<string[]>([]);
  const isButtonEnabled = images.length > 0;

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

  const handleNext = () => {
    if (images.length === 0) return;
    setContent((prev) => ({ ...prev, images }));
    onNext?.();
  };

  return (
    <div className="h-[100dvh]">
      <OnboardingHeader
        onPrev={onPrev}
        currentStep={currentStepNumber}
        totalSteps={totalStepsNumber}
      />

      <div className="w-full px-5 py-8 flex flex-col h-[calc(100%-56px)] justify-between">
        <div>
          <div className="mb-10">
            <Title
              title="마지막 단계에요!"
              currentStepNumber={currentStepNumber}
              totalStepsNumber={totalStepsNumber}
            />
            <Title title="최근에 찍은 사진을 추가해주세요." />
            <div className="font-14-regular mt-[10px]">
              프로필 사진을 3장 이상 추가해주세요.
              <br />
              얼굴이 잘 보이는 사진일수록 더 좋아요!
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, index) => (
              <ImageUploader
                key={index}
                onImageUpload={handleImageUpload}
                onImageDelete={() => handleImageDelete(index)}
                imageUrl={images[index]}
              />
            ))}
          </div>
        </div>

        <Button
          shape="rectangle"
          variant={isButtonEnabled ? 'filled' : 'disabled'}
          width="w-full"
          height="55px"
          className=""
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
