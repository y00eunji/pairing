'use client';

import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

export default function IdealTypeStart({
  onNext,
  goToStep,
  currentStepNumber = 1,
  totalStepsNumber = 6,
}: StepChildProps) {
  const handlePrev = () => {
    goToStep?.('profile-photo');
  };

  return (
    <div className="relative h-[100dvh]">
      <OnboardingHeader
        onPrev={handlePrev}
        currentStep={currentStepNumber}
        totalSteps={totalStepsNumber}
      />

      <div className="w-full px-5 py-8 flex flex-col">
        <div>
          <div className="mb-10">
            <Title title="이상형 정보을 등록해주세요" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-5 py-8">
        <Button
          shape="rectangle"
          variant="filled"
          className="w-full h-[55px]"
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
