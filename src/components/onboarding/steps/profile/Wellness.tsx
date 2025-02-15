'use client';

import { useState } from 'react';

import Button from '@/components/common/Button';
import ChipButton from '@/components/common/ChipButton';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import type { DrinkStatusType, SmokeStatusType } from '@/constants/wellness';
import { DRINK_STATUS, SMOKE_STATUS } from '@/constants/wellness';
import { useOnboarding } from '@/contexts/OnboardingContext';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

const DRINK_OPTIONS = Object.entries(DRINK_STATUS);
const SMOKE_OPTIONS = Object.entries(SMOKE_STATUS);

export default function Wellness({
  onNext,
  onPrev,
  currentStepNumber = 7,
  totalStepsNumber = 8,
}: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const [selectedWellness, setSelectedWellness] = useState<{
    drink?: DrinkStatusType;
    smoke?: SmokeStatusType;
  }>({
    drink: data?.profile?.drink,
    smoke: data?.profile?.smoke,
  });

  const handleSelect = (
    type: 'drink' | 'smoke',
    key: DrinkStatusType | SmokeStatusType,
  ) => {
    setSelectedWellness((prev) => ({
      ...prev,
      [type]: key,
    }));
  };

  const isButtonEnabled = selectedWellness.drink && selectedWellness.smoke;

  const handleNext = () => {
    if (!isButtonEnabled) return;
    updateData({
      profile: {
        ...data?.profile,
        drink: selectedWellness.drink,
        smoke: selectedWellness.smoke,
      },
    });
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
                totalStepsNumber={totalStepsNumber - 1}
              />
            </div>
            <div className="flex flex-col gap-10 font-18-regular">
              <div className="w-full flex flex-col gap-3">
                <div className="font-14-medium">음주를 즐기시나요?</div>
                {DRINK_OPTIONS.map(([key, text]) => (
                  <ChipButton
                    key={key}
                    variant="wide"
                    isSelected={selectedWellness.drink === key}
                    onClick={() =>
                      handleSelect('drink', key as DrinkStatusType)
                    }
                  >
                    {text}
                  </ChipButton>
                ))}
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="font-14-medium">흡연습타일은 어떤가요?</div>
                {SMOKE_OPTIONS.map(([key, text]) => (
                  <ChipButton
                    key={key}
                    variant="wide"
                    isSelected={selectedWellness.smoke === key}
                    onClick={() =>
                      handleSelect('smoke', key as SmokeStatusType)
                    }
                  >
                    {text}
                  </ChipButton>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8">
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
    </div>
  );
}
