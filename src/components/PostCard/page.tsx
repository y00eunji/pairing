import Image from 'next/image';

import formatTime from '@/utils/date';

import Button from '../common/Button';
import UserProfile from '../profiles/UserProfile';

import MoreGrayIcon from '/src/assets/icons/more_gray.svg';

interface PostCardProps {
  name: string;
  age: number;
  location: string;
  content: string;
  imageUrl?: string;
  time: Date;
  buttonText: string;
  onMoreClick: () => void;
  onButtonClick: () => void;
}

export default function PostCard({
  name,
  age,
  location,
  content,
  imageUrl,
  time,
  buttonText,
  onMoreClick,
  onButtonClick,
}: PostCardProps) {
  return (
    <div
      className="bg-white rounded-lg p-1 m-5 items-center
    shadow-[0px_3px_3px_rgba(0,0,0,0.05),_0px_-3px_3px_rgba(0,0,0,0.05),_3px_0px_3px_rgba(0,0,0,0.05),_-3px_0px_3px_rgba(0,0,0,0.05)]"
    >
      {/* 헤더 */}
      <UserProfile
        name={name}
        age={age}
        location={location}
        imageSize={80}
        buttonComponent={
          <button
            className="absolute right-0 top-0 p-2 pt-4"
            onClick={onMoreClick}
          >
            <MoreGrayIcon />
          </button>
        }
      />

      <div className="m-4 border-t py-2">
        {/* 게시글 내용 */}
        <div className="flex flex-col">
          <p className="font-16-regular py-1">{content}</p>
          {/* 이미지 내용 */}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="게시글 image"
              className="mt-2 w-full object-cover"
            />
          )}
        </div>

        {/* 하단 */}
        <div className="flex justify-between pt-6">
          <p className="flex font-14-regular font-roboto text-gray1 items-center justify-center">
            {formatTime(time)}
          </p>
          {/* 분홍색 버튼 (원형) */}
          <Button
            shape="circle"
            variant="filled"
            className="px-[16px] py-[6px]"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
