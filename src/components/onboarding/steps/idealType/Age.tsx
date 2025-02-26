import { useState } from 'react';

import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import type { StepChildProps } from '@/hooks/useFunnel';

import OnboardingInput from '../../Input';
import Title from '../../Title';

export default function Age({
  onNext,
  onPrev,
  currentStepNumber = 4,
  totalStepsNumber = 6,
}: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const [minAge, setMinAge] = useState<string>(
    data?.idealType?.age?.min?.toString() || '',
  );
  const [maxAge, setMaxAge] = useState<string>(
    data?.idealType?.age?.max?.toString() || '',
  );

  const isButtonEnabled =
    Number(minAge) > 0 &&
    Number(maxAge) > 0 &&
    Number(maxAge) >= Number(minAge);

  const handleNext = () => {
    if (!isButtonEnabled) return;
    updateData({
      idealType: {
        ...data?.idealType,
        age: { min: Number(minAge), max: Number(maxAge) },
      },
    });
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
              title="내가 원하는 상대의 나이"
              currentStepNumber={currentStepNumber - 1}
              totalStepsNumber={totalStepsNumber - 2}
            />
            <div className="font-14-regular mt-[10px]">
              내가 원하는 상대방의 나이의 범위를 선택해주세요.
            </div>
          </div>

          <div className="flex flex-wrap gap-3 font-18-regular font-roboto">
            <div className="flex gap-3">
              <OnboardingInput
                className="w-8"
                value={minAge}
                maxLength={2}
                pattern="\d*"
                inputMode="numeric"
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9]/g, '')
                    .slice(0, 2);
                  setMinAge(value);
                }}
              />
              ~
              <OnboardingInput
                className="w-8"
                value={maxAge}
                maxLength={2}
                pattern="\d*"
                inputMode="numeric"
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9]/g, '')
                    .slice(0, 2);
                  setMaxAge(value);
                }}
              />
            </div>
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
