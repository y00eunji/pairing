'use client';

import OnboardingHeader from '@/components/header/OnboardingHeader';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useCamera } from '@/hooks/useCamera';
import type { StepChildProps } from '@/hooks/useFunnel';
import { useIsMobile } from '@/hooks/useIsMobile';

import Title from '../../Title';
import { ActionButton } from './components/ActionButton';
import { CameraView } from './components/CameraView';

export default function FaceAuthImage({ onNext, goToStep }: StepChildProps) {
  const { updateData } = useOnboarding();
  const isMobile = useIsMobile();
  const camera = useCamera();
  const isButtonEnabled = !!camera.image && camera.isPhotoTaken;

  const handleNext = () => {
    if (!camera.image || !camera.isPhotoTaken) return;
    updateData({ faceAuth: { image: camera.image } });
    onNext?.();
  };

  return (
    <div className="relative h-[100dvh] overflow-y-auto">
      <OnboardingHeader onPrev={() => goToStep?.('ideal-wellness')} />
      <div className="w-full px-5 py-2 flex flex-col">
        <Title
          title="신원 확인을 위해 얼굴 인증을 진행합니다."
          className="mb-5"
        />
        <CameraView isMobile={isMobile} {...camera} />
        <ActionButton
          isMobile={isMobile}
          isButtonEnabled={isButtonEnabled}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
