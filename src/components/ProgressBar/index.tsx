interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const includeComplete = totalSteps + 1;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-mainPink1 transition-all"
          style={{ width: `${(currentStep / includeComplete) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
