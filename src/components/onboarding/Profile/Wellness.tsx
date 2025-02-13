'use client';

import { useState } from 'react';

import Button from '@/components/common/Button';
import ChipButton from '@/components/common/ChipButton';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import type { OnboardingProps } from '@/types/onboarding';

import Title from '../Title';

// TODO: 임시 ID
const DRINK_OPTIONS = [
  { id: 'drink1', text: '즐깁니다' },
  { id: 'drink2', text: '피할 수 없을 때만' },
  { id: 'drink3', text: '가끔 마심' },
  { id: 'drink4', text: '자주 마심' },
  { id: 'drink5', text: '금주중' },
];

const SMOKE_OPTIONS = [
  { id: 'smoke1', text: '비흡연' },
  { id: 'smoke2', text: '가끔 피움' },
  { id: 'smoke3', text: '매일 피움' },
  { id: 'smoke4', text: '자주 마심' },
  { id: 'smoke5', text: '금연중' },
];

export default function Wellness({
  setContent,
  onNext,
  onPrev,
  currentStepNumber = 7,
  totalStepsNumber = 8,
}: OnboardingProps) {
  const [selectedWellness, setSelectedWellness] = useState<{
    drink?: string;
    smoke?: string;
  }>({});

  const handleSelect = (type: 'drink' | 'smoke', value: string) => {
    setSelectedWellness((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const isButtonEnabled = selectedWellness.drink && selectedWellness.smoke;

  const handleNext = () => {
    if (!isButtonEnabled) return;
    setContent((prev) => ({ ...prev, wellness: selectedWellness }));
    onNext?.();
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      <OnboardingHeader
        onPrev={onPrev}
        currentStep={currentStepNumber}
        totalSteps={totalStepsNumber}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-5 py-8 flex flex-col min-h-full">
          <div className="flex-1">
            <div className="mb-10">
              <Title
                title="음주 흡연 습관은 어떤가요?"
                currentStepNumber={currentStepNumber}
                totalStepsNumber={totalStepsNumber}
              />
            </div>
            <div className="flex flex-col gap-10 font-18-regular">
              <div className="w-full flex flex-col gap-3">
                <div className="font-14-medium">음주를 즐기시나요?</div>
                {DRINK_OPTIONS.map((option) => (
                  <ChipButton
                    key={option.id}
                    variant="wide"
                    isSelected={selectedWellness.drink === option.text}
                    onClick={() => handleSelect('drink', option.text)}
                  >
                    {option.text}
                  </ChipButton>
                ))}
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="font-14-medium">흡연스타일은 어떤가요?</div>
                {SMOKE_OPTIONS.map((option) => (
                  <ChipButton
                    key={option.id}
                    variant="wide"
                    isSelected={selectedWellness.smoke === option.text}
                    onClick={() => handleSelect('smoke', option.text)}
                  >
                    {option.text}
                  </ChipButton>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8">
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
      </div>
    </div>
  );
}
