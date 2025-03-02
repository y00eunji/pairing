'use client';

import Button from '@/components/common/Button';
import ProgressBar from '@/components/ProgressBar';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { usePostIdeal } from '@/hooks/apis/onboarding/usePostIdeal';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

export default function Complete({ onNext }: StepChildProps) {
  const { data, setCurrentStage } = useOnboarding();

  const { mutate: postIdeal } = usePostIdeal();

  const handleNext = () => {
    setCurrentStage(3);

    postIdeal(data?.idealType || {});
    onNext?.();
  };

  return (
    <div className="relative h-[100dvh]">
      <div className="w-full mt-14">
        <ProgressBar currentStep={6} totalSteps={5} />
      </div>
      <div className="w-full px-5 py-8 flex flex-col h-[calc(100%-68px)] justify-between">
        <div>
          <div className="mb-10">
            <Title title="이상형 등록이 완료되었어요." />
            <div className="font-14-regular mt-[10px]">
              이제 마지막으로 본인 인증을 진행합니다.
            </div>
          </div>
        </div>

        <Button
          shape="rectangle"
          variant="filled"
          className="w-full h-[55px]"
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
