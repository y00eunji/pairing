'use client';

import ResetIcon from '/src/assets/icons/text_reset.svg';

import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useInput } from '@/hooks/useInput';

import OnboardingInput from '../../Input';
import Title from '../../Title';

import type { StepChildProps } from '@/hooks/useFunnel';

export default function Name({
  onNext,
  onPrev,
  currentStepNumber = 1,
  totalStepsNumber = 8,
}: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const { value, setValue } = useInput(data?.profile?.name || '');

  const isButtonEnabled = value !== '';

  const handleNext = () => {
    if (!isButtonEnabled) return;

    updateData({ profile: { ...data?.profile, name: value } });
    onNext?.();
  };

  const handleReset = () => {
    setValue('');
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
              title="이름이 무엇인가요?"
              currentStepNumber={currentStepNumber}
              totalStepsNumber={totalStepsNumber - 1}
            />
          </div>
          <OnboardingInput
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value.trim())}
            rightIcon={value ? <ResetIcon onClick={handleReset} /> : undefined}
          />
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
