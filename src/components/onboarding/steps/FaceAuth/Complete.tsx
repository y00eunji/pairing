import Button from '@/components/common/Button';
import OnboardingHeader from '@/components/header/OnboardingHeader';
import type { StepChildProps } from '@/hooks/useFunnel';

import CheckIcon from '/src/assets/icons/alert_checkMark.svg';

import Title from '../../Title';

export default function FaceAuthComplete({ onPrev, onNext }: StepChildProps) {
  return (
    <div className="relative h-[100dvh]">
      <OnboardingHeader onPrev={onPrev} />

      <div className="w-full px-5 py-8 flex flex-col">
        <Title title="얼굴 인증이 완료되었어요!" />
      </div>

      <div className="flex flex-col items-center w-full h-[70%] justify-center">
        <CheckIcon fill="#FF4F75" />
        <div className="font-14-regular mt-[20px] w-full text-center">
          이제 프로필에 페이스 인증 <br /> 마크가 표시됩니다.
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-5 py-8">
        <Button
          shape="rectangle"
          variant="filled"
          className="w-full h-[55px]"
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
