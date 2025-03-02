import { useEffect } from 'react';

import Image from 'next/image';

import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { usePostFace } from '@/hooks/apis/onboarding/usePostFace';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

export default function CheckImage({ onPrev, onNext }: StepChildProps) {
  const { data } = useOnboarding();
  const { mutate, isSuccess, isPending } = usePostFace();

  useEffect(() => {
    if (data?.faceAuth?.image) {
      mutate({ image: data.faceAuth.image });
    }
  }, [data?.faceAuth?.image, mutate]);

  return (
    <div className="relative h-[100dvh]">
      <OnboardingHeader onPrev={onPrev} />

      <div className="w-full px-5 flex flex-col">
        <Title title="얼굴을 확인 중이에요.." />
      </div>

      <div className="flex flex-col items-center w-full h-[80%] justify-center">
        <Image
          src="/images/face-auth-check.png"
          alt="얼굴 확인"
          width={335}
          height={335}
        />

        <div className="font-14-regular mt-[20px] w-full text-center">
          잠시만 기다려주세요. <br /> 시간이 소요됩니다.
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-5 py-8">
        <Button
          shape="rectangle"
          variant={isSuccess ? 'filled' : 'disabled'}
          className="w-full h-[55px]"
          onClick={onNext}
          disabled={isPending || !isSuccess}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
