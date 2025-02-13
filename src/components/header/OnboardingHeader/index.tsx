import ProgressBar from '@/components/ProgressBar';

import BackIcon from '/public/assets/icons/back_icon.svg';

interface Props {
  onPrev?: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingHeader({
  onPrev,
  currentStep,
  totalSteps,
}: Props) {
  return (
    <div>
      <div className="w-full p-5 gap-6 flex flex-col">
        <BackIcon onClick={onPrev} />
      </div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
}
