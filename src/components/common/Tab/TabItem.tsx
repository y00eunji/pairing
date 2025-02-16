import { cn } from '@/utils/cn';

import { useTab } from './TabGroup';

interface TabItemProps {
  value: string;
  children: React.ReactNode;
}

export default function TabItem({ value, children }: TabItemProps) {
  const { activeValue, setActiveValue } = useTab();
  const isActive = value === activeValue;

  const handleTabItemClick = () => setActiveValue(value);

  return (
    <div className="cursor-pointer w-[100px] font-20-bold">
      <li
        className={cn(
          'w-full h-[30px] flex justify-center items-center font-bold text-20px',
          {
            'text-gray1': !isActive,
            'text-mainPink1': isActive,
          },
        )}
        onClick={handleTabItemClick}
      >
        {children}
      </li>

      <div className="w-full flex justify-center">
        <div
          className={cn('w-[80%] h-[2px] rounded-[32px] mt-[6px]', {
            'bg-mainPink1': isActive,
          })}
        />
      </div>
    </div>
  );
}
