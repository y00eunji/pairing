interface TitleProps {
  title: string;
  currentStepNumber?: number;
  totalStepsNumber?: number;
}

export default function Title({
  title,
  currentStepNumber,
  totalStepsNumber,
}: TitleProps) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="font-24-bold">{title}</h2>
      {currentStepNumber && (
        <p className="font-14-regular font-roboto text-gray1 text-center translate-y-1">
          {currentStepNumber} / {totalStepsNumber}
        </p>
      )}
    </div>
  );
}
