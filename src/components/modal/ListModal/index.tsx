interface ListModalProps {
  isOpen: boolean;
  buttonList: {
    label: string;
    onClick: () => void;
    color?: string;
    className?: string;
  }[];
  oneButton: {
    label: string;
    onClick: () => void;
    color?: string;
    className?: string;
  };
}

export default function ListModal({
  isOpen,
  buttonList,
  oneButton,
}: ListModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50">
      <div className="max-w-sm pb-5 mx-auto">
        {/* 버튼 리스트 */}
        <div className="bg-white rounded-2xl py-2 w-full shadow-lg overflow-hidde">
          {buttonList.map(({ label, onClick, color }, index) => (
            <button
              key={index}
              className={`w-full py-2 font-bold  ${index !== buttonList.length - 1 ? 'border-b' : ''} ${color ? color : ''}`}
              onClick={onClick}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 단일 버튼 */}
        <div className="bg-white rounded-2xl mt-4 p-4 w-80 shadow-lg">
          <button
            className={`w-full font-bold ${oneButton.color ? oneButton.color : ''}`}
            onClick={oneButton.onClick}
          >
            {oneButton.label}
          </button>
        </div>
      </div>
    </div>
  );
}
