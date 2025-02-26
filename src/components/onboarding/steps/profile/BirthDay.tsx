import CalendarIcon from '/src/assets/icons/calendar.svg';

import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import type { StepChildProps } from '@/hooks/useFunnel';
import { useInput } from '@/hooks/useInput';

import Title from '../../Title';

export default function BirthDay({
  onNext,
  onPrev,
  currentStepNumber = 3,
  totalStepsNumber = 8,
}: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const { value, setValue } = useInput(data?.profile?.birth || '');

  const isButtonEnabled = value !== '';

  const handleNext = () => {
    if (!isButtonEnabled) return;

    const today = new Date().toISOString().split('T')[0];
    updateData({ profile: { ...data?.profile, birth: value || today } });
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
              title="생일은 언제인가요?"
              currentStepNumber={currentStepNumber}
              totalStepsNumber={totalStepsNumber - 1}
            />
          </div>

          <div className="relative border-b border-black w-full pb-2 h-[40px]">
            <input
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value.trim())}
              className="w-full outline-none border-none peer text-transparent absolute inset-0 [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-textfield-decoration-container]:appearance-none"
              placeholder="생년월일을 선택해주세요"
            />
            {!value && (
              <div className="absolute left-0 top-0 h-full flex items-center text-gray-400 pointer-events-none peer-focus:hidden">
                생년월일을 선택해주세요
              </div>
            )}
            {value && (
              <div className="absolute left-0 top-0 h-full flex items-center pointer-events-none">
                {new Date(value).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
            <CalendarIcon className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
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
