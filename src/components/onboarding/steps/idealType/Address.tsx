'use client';

import { useState } from 'react';

import AddressOption from '@/components/common/AddressOption';
import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import type { StepChildProps } from '@/hooks/useFunnel';

import DeleteIcon from '/public/assets/icons/address_delete.svg';

import Title from '../../Title';

export default function Address({
  onNext,
  onPrev,
  currentStepNumber = 2,
  totalStepsNumber = 4,
}: StepChildProps) {
  const { data, updateData } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState<
    {
      city: string;
      district: string;
    }[]
  >(data?.idealType?.address || []);

  const isButtonEnabled = selectedAddresses.length > 0;
  const canAddMore = selectedAddresses.length < 3;

  const handleAddressSelect = (city: string, district: string) => {
    const newAddress = { city, district };
    const exists = selectedAddresses.some(
      (addr) => addr.city === city && addr.district === district,
    );

    if (!exists && canAddMore) {
      setSelectedAddresses([...selectedAddresses, newAddress]);
    }
    setIsOpen(false);
  };

  const handleRemoveAddress = (indexToRemove: number) => {
    setSelectedAddresses(
      selectedAddresses.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleNext = () => {
    if (!isButtonEnabled) return;
    updateData({
      idealType: { ...data?.idealType, address: selectedAddresses },
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
              title="내가 원하는 상대의 위치"
              currentStepNumber={currentStepNumber - 1}
              totalStepsNumber={totalStepsNumber - 2}
            />
            <div className="font-14-regular mt-[10px]">
              내가 원하는 상대방의 위치를 최대 3곳 선택해주세요.
            </div>
          </div>

          <button
            onClick={() => canAddMore && setIsOpen(true)}
            className={`w-full h-[35px] border-b border-black text-start font-18-regular ${
              !canAddMore ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            {canAddMore
              ? '주소를 선택해주세요'
              : '최대 3개까지 선택 가능합니다'}
          </button>

          <div className="flex flex-wrap gap-3 mt-5">
            {selectedAddresses.map((address, index) => (
              <div
                key={`${address.city}-${address.district}-${index}`}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white rounded-[20px] border border-gray2"
              >
                <span className="font-14-regular">
                  {address.city} {address.district}
                </span>
                <button
                  onClick={() => handleRemoveAddress(index)}
                  className="ml-1 text-gray-500"
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}
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
