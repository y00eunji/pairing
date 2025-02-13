'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import ProgressBar from '@/components/ProgressBar';

import Title from '../Title';

export default function Complete() {
  const router = useRouter();

  const handleNext = () => {
    console.log('complete');
    router.push('/onboarding');
  };

  return (
    <div className="h-[100dvh]">
      <div className="w-full mt-14">
        <ProgressBar currentStep={9} totalSteps={8} />
      </div>
      <div className="w-full px-5 py-8 flex flex-col h-[calc(100%-56px)] justify-between">
        <div>
          <div className="mb-10">
            <Title title="프로필 등록이 완료되었어요." />
            <div className="font-14-regular mt-[10px]">
              이후 이상형 정보 등록이 시작됩니다.
            </div>
          </div>
        </div>

        <Button
          shape="rectangle"
          variant="filled"
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
