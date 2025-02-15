'use client';

import { useState } from 'react';

import Button from '@/components/common/Button';
import ChipButton from '@/components/common/ChipButton';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

type MbtiType = 'ei' | 'sn' | 'tf' | 'jp';
type MbtiValue = Record<MbtiType, string>;

const MBTI_OPTIONS = {
  ei: { title: '내향형 / 외향형', options: [{ value: 'I' }, { value: 'E' }] },
  sn: { title: '감각형 / 직관형', options: [{ value: 'S' }, { value: 'N' }] },
  tf: { title: '사고형 / 감정형', options: [{ value: 'T' }, { value: 'F' }] },
  jp: { title: '판단형 / 인식형', options: [{ value: 'J' }, { value: 'P' }] },
} as const;

export default function Mbti({
  onNext,
  onPrev,
  currentStepNumber = 6,
  totalStepsNumber = 8,
}: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const [selections, setSelections] = useState<MbtiValue>({
    ei: data?.profile?.mbti?.split('')[0] || '',
    sn: data?.profile?.mbti?.split('')[1] || '',
    tf: data?.profile?.mbti?.split('')[2] || '',
    jp: data?.profile?.mbti?.split('')[3] || '',
  });

  const isButtonEnabled = Object.values(selections).every(Boolean);

  const handleSelect = (type: MbtiType, value: string) => {
    setSelections((prev) => ({ ...prev, [type]: value }));
  };

  const handleNext = () => {
    if (!isButtonEnabled) return;

    const mbtiValue = Object.values(selections).join('');
    updateData({ profile: { ...data?.profile, mbti: mbtiValue } });
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
              title="MBTI를 선택해주세요."
              currentStepNumber={currentStepNumber}
              totalStepsNumber={totalStepsNumber - 1}
            />
          </div>

          {(
            Object.entries(MBTI_OPTIONS) as [
              MbtiType,
              (typeof MBTI_OPTIONS)[MbtiType],
            ][]
          ).map(([type, { title, options }]) => (
            <div key={type} className="mb-3">
              <div className="mb-2 font-14-medium">{title}</div>
              <div className="flex gap-4">
                {options.map(({ value }) => (
                  <ChipButton
                    key={value}
                    variant="medium"
                    onClick={() => handleSelect(type, value)}
                    isSelected={selections[type] === value}
                  >
                    {value}
                  </ChipButton>
                ))}
              </div>
            </div>
          ))}
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
