'use client';

import { useState } from 'react';

import Button from '@/components/common/Button';
import ChipButton from '@/components/common/ChipButton';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import type { OnboardingProps } from '@/types/onboarding';

import Title from '../Title';

const hobbies = [
  '운동',
  '게임',
  '여행',
  '독서',
  '맛집탐방',
  '카페',
  '영화',
  '산책',
  '쇼핑',
];

export default function Hobby({
  setContent,
  onNext,
  onPrev,
  currentStepNumber = 5,
  totalStepsNumber = 8,
}: OnboardingProps) {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const isButtonEnabled = selectedHobbies.length > 0;

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((item) => item !== hobby)
        : [...prev, hobby],
    );
  };

  const handleNext = () => {
    if (!isButtonEnabled) return;

    setContent((prev) => ({ ...prev, hobby: selectedHobbies }));
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
              title="취미는 무엇인가요?"
              currentStepNumber={currentStepNumber}
              totalStepsNumber={totalStepsNumber}
            />
            <div className="font-14-regular mt-[10px]">
              최근 관심있는 취미를 0개 이상 선택해주세요.
            </div>
          </div>
          <div className="flex flex-wrap gap-3 font-18-regular">
            {hobbies.map((hobby) => (
              <ChipButton
                key={hobby}
                isSelected={selectedHobbies.includes(hobby)}
                onClick={() => toggleHobby(hobby)}
              >
                {hobby}
              </ChipButton>
            ))}
          </div>
        </div>

        <Button
          shape="rectangle"
          variant={isButtonEnabled ? 'filled' : 'disabled'}
          width="w-full"
          height="55px"
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
