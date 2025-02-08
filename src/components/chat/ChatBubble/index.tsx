import { cn } from '@/utils/cn';
import formatTime from '@/utils/date';
import { PropsWithChildren } from 'react';

interface Props {
  time: Date;
  isMe?: boolean; // 내가 보낸 메시지인지
  isRead?: boolean; // 읽음 표시
}

export default function ChatBubble({
  time,
  isMe = false,
  isRead = false,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col w-full">
      <div className={cn('max-w-[247px]', isMe && 'self-end')}>
        {/* 채팅 버블 */}
        <div
          className={cn(
            'p-[10px] text-[14px] mb-[20px] w-fit',
            isMe
              ? 'bg-mainPink1 text-white rounded-[14px] rounded-br-[1px]'
              : 'bg-gray3 text-black rounded-[14px] rounded-bl-[1px]',
          )}
        >
          {children}
        </div>

        {/* 채팅 시간, 읽음 표시 */}
        <div
          className={cn(
            'flex gap-[5px] text-black text-[12px] items-center',
            isMe && 'justify-end',
          )}
        >
          {isMe && (
            <div className="font-medium leading-[14px]">{isRead && '읽음'}</div>
          )}
          <div className="font-roboto translate-y-[0.5px]">
            {formatTime(time)}
          </div>
        </div>
      </div>
    </div>
  );
}
