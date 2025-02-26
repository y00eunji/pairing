import Button from '@/components/common/Button';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  isMobile: boolean;
  isButtonEnabled: boolean;
  onNext: () => void;
}

export function ActionButton({
  isMobile,
  isButtonEnabled,
  onNext,
}: ActionButtonProps) {
  return (
    <div
      className={cn(
        'bottom-0 left-0 w-full px-5 py-8',
        isMobile ? 'fixed bg-white' : 'absolute',
      )}
    >
      <Button
        shape="rectangle"
        variant={isButtonEnabled ? 'filled' : 'disabled'}
        className="w-full h-[55px]"
        onClick={onNext}
        disabled={!isButtonEnabled}
      >
        {isButtonEnabled ? '다음' : '사진을 촬영해주세요'}
      </Button>
    </div>
  );
}
