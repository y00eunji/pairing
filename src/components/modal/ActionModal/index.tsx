import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  icon?: React.ReactNode;
  message: string;
  buttons: {
    label: string;
    onClick: () => void;
    className?: string;
  }[];
  description?: string;
}

export default function ActionModal({
  isOpen,
  icon,
  message,
  buttons,
  description,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-0 w-80 shadow-lg text-center overflow-hidden">
        {/* 아이콘 (있으면 표시) */}
        {icon && <div className="flex justify-center pt-6">{icon}</div>}

        {/* 메시지 */}
        <p className="font-16-medium py-2">{message}</p>
        {description && <p className="font-14-regular py-2">{description}</p>}

        {/* 버튼 영역 */}
        <div className={cn('mt-6 py-2 border-t', buttons.length > 1 && 'flex')}>
          {buttons.map(({ label, onClick, className }) => (
            <button
              key={label}
              className={cn(
                'w-full font-medium py-2',
                buttons.length > 1 ? 'w-1/2' : '',
                className,
              )}
              onClick={onClick}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
