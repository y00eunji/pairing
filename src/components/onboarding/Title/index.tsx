import { cn } from '@/utils/cn';

interface TitleProps {
  title: string;
  currentStepNumber?: number;
  totalStepsNumber?: number;
  className?: string;
}

export default function Title({
  title,
  currentStepNumber,
  totalStepsNumber,
  className,
}: TitleProps) {
  return (
    <div className="flex items-center gap-2">
      <h2 className={cn('font-24-bold', className)}>{title}</h2>
      {currentStepNumber && (
        <p className="font-14-regular font-roboto text-gray1 text-center translate-y-1">
          {currentStepNumber} / {totalStepsNumber}
        </p>
      )}
    </div>
  );
}
