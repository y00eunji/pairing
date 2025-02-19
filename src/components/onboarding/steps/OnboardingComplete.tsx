import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import type { StepChildProps } from '@/hooks/useFunnel';

import Title from '../Title';

import BackIcon from '/src/assets/icons/back_icon.svg';

export default function OnboardingComplete({ onPrev }: StepChildProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/pAIring');
  };

  return (
    <div className="relative h-[100dvh]">
      <div>
        <div className="w-full px-5 py-4 gap-6 flex justify-between">
          <div className="cursor-pointer flex items-center justify-center">
            <BackIcon onClick={onPrev} />
          </div>
        </div>
      </div>

      <div className="w-full px-5 py-8 flex flex-col">
        <Title title="모든 과정이 완료되었습니다." />
      </div>

      <div className="flex flex-col items-center w-full h-[70%] justify-center">
        <Image
          src="/images/onboarding-complete.png"
          alt="sign_in_complete"
          width={335}
          height={335}
        />

        <div className="font-14-regular mt-[20px] w-full text-center">
          페어링 시작하기를 누르면 <br /> 메인화면으로 이동합니다.
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-5 py-8">
        <Button
          shape="rectangle"
          variant="filled"
          className="w-full h-[55px]"
          onClick={handleClick}
        >
          페어링 시작하기
        </Button>
      </div>
    </div>
  );
}
