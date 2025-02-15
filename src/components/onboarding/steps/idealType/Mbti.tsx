'use client';

import { useState } from 'react';

import Button from '@/components/common/Button';
import ChipButton from '@/components/common/ChipButton';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import MBTI_LIST from '@/constants/mbti';
import { useOnboarding } from '@/contexts/OnboardingContext';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

export default function Mbti({
  onNext,
  onPrev,
  currentStepNumber = 2,
  totalStepsNumber = 6,
}: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const [selectedMbti, setSelectedMbti] = useState<string[]>([]);

  const isButtonEnabled = selectedMbti.length > 0;

  const toggleMbti = (mbti: string) => {
    setSelectedMbti((prev) =>
      prev.includes(mbti)
        ? prev.filter((item) => item !== mbti)
        : [...prev, mbti],
    );
  };

  const handleNext = () => {
    if (!isButtonEnabled) return;

    updateData({ idealType: { ...data?.idealType, mbti: selectedMbti } });
    onNext?.();
  };

  return (
    <div className="relative h-[100dvh]">
      <OnboardingHeader
        onPrev={onPrev}
        currentStep={currentStepNumber}
        totalSteps={totalStepsNumber}
      />
      <div className="w-full px-5 py-8 flex flex-col">
        <div>
          <div className="mb-10">
            <Title
              title="내가 원하는 상대의 MBTI"
              currentStepNumber={currentStepNumber - 1}
              totalStepsNumber={totalStepsNumber - 2}
            />
            <div className="font-14-regular mt-[10px]">
              상대의 성격에 대해 원하는 MBTI를 선택해주세요.
            </div>
          </div>
          <div className="flex flex-wrap gap-3 font-18-regular font-roboto">
            {MBTI_LIST.map((mbti) => (
              <ChipButton
                key={mbti}
                isSelected={selectedMbti.includes(mbti)}
                onClick={() => toggleMbti(mbti)}
              >
                {mbti}
              </ChipButton>
            ))}
          </div>
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
