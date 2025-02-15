import FistStageIcon from '/public/assets/icons/first_stage_indicator.svg';
import SecondStageIcon from '/public/assets/icons/second_stage_indicator.svg';
import ThirdStageIcon from '/public/assets/icons/third_stage_indicator.svg';

interface StageIndicatorProps {
  currentStage: number;
}

export default function StageIndicator({ currentStage }: StageIndicatorProps) {
  return (
    <div>
      {currentStage === 1 && <FistStageIcon />}
      {currentStage === 2 && <SecondStageIcon />}
      {currentStage === 3 && <ThirdStageIcon />}
    </div>
  );
}
