import Button from '@/components/common/Button';
import ChipButton from '@/components/common/ChipButton';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useInput } from '@/hooks/useInput';
import type { OnboardingProps } from '@/types/onboarding';

import Title from '../Title';

export default function Gender({
  setContent,
  onNext,
  onPrev,
  currentStepNumber = 2,
  totalStepsNumber = 8,
}: OnboardingProps) {
  const { value, setValue } = useInput<'male' | 'female'>();

  const isButtonEnabled = value !== undefined;

  const handleNext = () => {
    if (!isButtonEnabled) return;

    setContent((prev) => ({ ...prev, gender: value }));
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
              title="성별은 무엇인가요?"
              currentStepNumber={currentStepNumber}
              totalStepsNumber={totalStepsNumber}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ChipButton
              variant="wide"
              className="text-center font-18-medium pl-0"
              onClick={() => setValue('male')}
              isSelected={value === 'male'}
            >
              남성
            </ChipButton>
            <ChipButton
              variant="wide"
              className="text-center font-18-medium pl-0"
              onClick={() => setValue('female')}
              isSelected={value === 'female'}
            >
              여성
            </ChipButton>
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
