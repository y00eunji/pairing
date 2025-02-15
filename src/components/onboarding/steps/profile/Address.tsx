'use client';

import { useState } from 'react';

import AddressOption from '@/components/common/AddressOption';
import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

export default function Address({
  onNext,
  onPrev,
  currentStepNumber = 4,
  totalStepsNumber = 8,
}: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(
    data?.profile?.address || { city: '', district: '' },
  );

  const isButtonEnabled = address.city && address.district;

  const handleAddressSelect = (city: string, district: string) => {
    setAddress({ city, district });
  };

  const handleNext = () => {
    if (!isButtonEnabled) return;
    updateData({ profile: { ...data?.profile, address } });
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
              title="거주지는 어디인가요?"
              currentStepNumber={currentStepNumber}
              totalStepsNumber={totalStepsNumber - 1}
            />
          </div>

          <div className="border-b border-black">
            <input
              type="button"
              value={
                address.city || address.district
                  ? `${address.city} ${address.district}`
                  : '주소를 선택해주세요'
              }
              onClick={() => setIsOpen(true)}
              className="w-full h-[35px] outline-none border-none appearance-none bg-transparent border-b border-black text-gray-900 font-18-regular text-start pb-1 [text-align-last:start] [-webkit-text-fill-color:currentColor]"
            />
          </div>
        </div>

        <AddressOption
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={handleAddressSelect}
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
  );
}
