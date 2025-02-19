'use client';

import ProfileImage from '@/components/common/ProfileImage';
import formatTime from '@/utils/date';

interface Props {
  name: string;
  time: Date;
  message: string;
  messageCnt: number;
  profileImage?: string;
}

export default function ChatListItem({
  name,
  time,
  message,
  messageCnt,
  profileImage,
}: Props) {
  return (
    <div className="w-full h-[96px] flex gap-[15px] justify-between py-[15px] px-[20px] bg-#f9f9f9">
      <div className="flex justify-center items-center">
        <ProfileImage
          src="/images/profile.png"
          className="rounded-full"
          size={65}
        />
      </div>

      <div className="flex flex-col gap-[8px] w-[calc(100%-65px)]">
        <div className="flex justify-between">
          <div className="font-bold text-[18px] text-black">{name}</div>
          <div className="text-gray1 text-[14px] font-roboto font-bold">
            {formatTime(time)}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="text-[14px] text-gray1 w-[74%] line-clamp-2">
            {message}
          </div>
          {messageCnt !== undefined && messageCnt > 0 && (
            <div className="min-w-[27px] h-[22px] px-[7px] py-[3px] bg-mainPink1 rounded-[20px] flex justify-center items-center">
              <div className="h-[16px] font-roboto text-[14px] font-bold text-white flex justify-center items-center">
                {messageCnt > 99 ? '99+' : messageCnt}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
