'use client';

import { useState } from 'react';

import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

export default function FaceAuthImage({ onNext, goToStep }: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const [image, setImage] = useState<string>(data?.faceAuth?.image || '');
  const isButtonEnabled = !!image;

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl);
  };

  const handleImageDelete = () => {
    setImage('');
  };

  const handleNext = () => {
    if (!image) return;

    updateData({ faceAuth: { image } });
    onNext?.();
  };

  const handlePrev = () => {
    goToStep?.('ideal-wellness');
  };

  return (
    <div className="relative h-[100dvh]">
      <OnboardingHeader onPrev={handlePrev} />

      <div className="w-full px-5 py-8 flex flex-col">
        <div className="mb-10">
          <Title title="신원 확인을 위해 얼굴 인증을 진행합니다." />
        </div>

        <div className="w-full">
          <ImageUploader
            onImageUpload={handleImageUpload}
            onImageDelete={handleImageDelete}
            imageUrl={image}
            wide={true}
          />
        </div>

        <div className="font-14-regular mt-[20px] w-full text-center">
          얼굴이 정확하게 나온 정면 사진을 <br /> 업로드해주세요.
        </div>

        <div className="absolute bottom-0 left-0 w-full px-5 py-8">
          <Button
            shape="rectangle"
            variant={isButtonEnabled ? 'filled' : 'disabled'}
            className="w-full h-[55px]"
            onClick={handleNext}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
