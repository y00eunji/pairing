import { useState } from 'react';

import Image from 'next/image';

import faceAuthImg from '@/assets/images/face-auth-check.png';
import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../../Title';

export default function CheckImage({ onPrev, onNext }: StepChildProps) {
  // TODO : 로딩 상태에 따라 버튼 활성화
  const [loading] = useState(true);

  return (
    <div className="relative h-[100dvh]">
      <OnboardingHeader onPrev={onPrev} />

      <div className="w-full px-5 flex flex-col">
        <Title title="얼굴을 확인 중이에요.." />
      </div>

      <div className="flex flex-col items-center w-full h-[80%] justify-center">
        <Image src={faceAuthImg} alt="얼굴 확인" width={335} height={335} />

        <div className="font-14-regular mt-[20px] w-full text-center">
          잠시만 기다려주세요. <br /> 시간이 소요됩니다.
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-5 py-8">
        <Button
          shape="rectangle"
          variant={loading ? 'filled' : 'disabled'}
          className="w-full h-[55px]"
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
